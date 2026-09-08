import { useEffect, useRef, type MutableRefObject } from 'react';
import * as THREE from 'three';
import type { MotionValue } from 'framer-motion';

interface Props {
  enabled: boolean;
  pointer: MutableRefObject<{ x: number; y: number; active: boolean }>;
  progress: MotionValue<number>;
  onFailure: () => void;
}
export default function ParticleField({ enabled, pointer, progress, onFailure }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const state = useRef({ enabled });
  const control = useRef<{ update(): void }>();
  useEffect(() => { state.current = { enabled }; control.current?.update(); }, [enabled]);
  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' }); }
    catch { onFailure(); return; }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 60);
    camera.position.z = 16;
    const count = 6000;
    const positions = new Float32Array(count * 3);
    const basePositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const lavender = new THREE.Color('#d6c2ff');
    const violet = new THREE.Color('#8950e8');
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      const z = Math.random() * 2 - 1;
      positions.set([x, y, z], i * 3);
      basePositions.set([x, y, z], i * 3);
      const color = lavender.clone().lerp(violet, Math.random());
      colors.set([color.r, color.g, color.b], i * 3);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const sprite = document.createElement('canvas'); sprite.width = 32; sprite.height = 32;
    const context = sprite.getContext('2d');
    if (context) {
      const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, '#ffffff'); gradient.addColorStop(0.2, '#ffffff'); gradient.addColorStop(0.48, '#ffffff80'); gradient.addColorStop(1, '#ffffff00');
      context.fillStyle = gradient; context.fillRect(0, 0, 32, 32);
    }
    const texture = new THREE.CanvasTexture(sprite);
    const material = new THREE.PointsMaterial({ size: 0.13, map: texture, vertexColors: true, transparent: true, opacity: 0.75, depthWrite: false, blending: THREE.AdditiveBlending });
    const cloud = new THREE.Points(geometry, material);
    scene.add(cloud);
    renderer.setClearColor(0x000000, 0); container.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    let frame = 0;
    let last = 0;
    let clock = 0;
let disposed = false;
    let mobile = false;
    let halfW = 9;
    let halfH = 6;
    const render = (instant: boolean, dt = 0.016) => {
      const running = state.current.enabled;
      const scroll = progress.get();
      const input = pointer.current;
      if (running) clock += dt;
      const px = input.x * halfW;
      const py = input.y * halfH;
      const spread = 1.15 + scroll * 0.45;
      const spring = instant ? 1 : 0.045;
      const sway = running ? 1 : 0;
      const radius = Math.min(halfW, halfH) * 0.45;
      for (let i = 0; i < count; i++) {
        const offset = i * 3;
        const bx = basePositions[offset] * halfW * spread;
        const by = basePositions[offset + 1] * halfH * spread + Math.sin(clock * 0.6 + i * 0.13) * 0.03 * sway * (halfH / 6);
        const bz = basePositions[offset + 2] * 3 * spread;
        let x = positions[offset];
        let y = positions[offset + 1];
        const z = positions[offset + 2];
        if (running && input.active && !mobile) {
          const dx = x - px;
          const dy = y - py;
          const distance = Math.sqrt(dx * dx + dy * dy) + 0.001;
          const force = Math.max(0, radius - distance) * 0.06;
          x += dx / distance * force;
          y += dy / distance * force;
        }
        positions[offset] += (bx - x) * spring;
        positions[offset + 1] += (by - y) * spring;
        positions[offset + 2] += (bz - z) * spring;
      }
      geometry.attributes.position.needsUpdate = true;
      if (running) {
        cloud.rotation.y = clock * 0.035 + input.x * 0.05;
        cloud.rotation.x = input.y * 0.04;
      }
      renderer.render(scene, camera);
    };
    const loop = (time: number) => {
      frame = 0;
      if (disposed || !state.current.enabled) return;
      const threshold = mobile ? 32 : 16;
      if (time - last >= threshold) { render(false, Math.min((time - last) / 1000, 0.05)); last = time; }
      frame = requestAnimationFrame(loop);
    };
    const update = () => {
      cancelAnimationFrame(frame); frame = 0;
      container.dataset.rendering = state.current.enabled ? 'active' : 'paused';
      if (state.current.enabled) { last = performance.now(); frame = requestAnimationFrame(loop); }
      else render(true);
    };
    control.current = { update };
    const resize = () => {
      const rect = container.getBoundingClientRect();
      mobile = window.matchMedia('(max-width: 760px)').matches;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1 : 1.5));
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / Math.max(rect.height, 1); camera.updateProjectionMatrix();
      halfW = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z * camera.aspect;
      halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      geometry.setDrawRange(0, mobile ? 1500 : count); render(!state.current.enabled);
    };
    const observer = new ResizeObserver(resize); observer.observe(container);
    const contextLost = (event: Event) => { event.preventDefault(); onFailure(); };
    renderer.domElement.addEventListener('webglcontextlost', contextLost);
    resize(); update();
    return () => {
      disposed = true; cancelAnimationFrame(frame); observer.disconnect(); control.current = undefined;
      renderer.domElement.removeEventListener('webglcontextlost', contextLost);
      geometry.dispose(); material.dispose(); texture.dispose(); renderer.dispose(); renderer.domElement.remove();
    };
  }, [pointer, progress, onFailure]);
  return <div className="particle-field" ref={host} />;
}
