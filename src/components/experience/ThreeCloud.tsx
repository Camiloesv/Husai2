import { useEffect, useRef, type MutableRefObject } from 'react';
import * as THREE from 'three';
import type { MotionValue } from 'framer-motion';

interface Props {
  enabled: boolean;
  mode: number;
  pointer: MutableRefObject<{ x: number; y: number; active: boolean }>;
  progress: MotionValue<number>;
  onFailure: () => void;
}
export default function ThreeCloud({ enabled, mode, pointer, progress, onFailure }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const state = useRef({ enabled, mode });
  const control = useRef<{ update(): void }>();
  useEffect(() => { state.current = { enabled, mode }; control.current?.update(); }, [enabled, mode]);
  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' }); }
    catch { onFailure(); return; }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 30);
    camera.position.z = 6.7;
    const count = 3600;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const targets = [new Float32Array(count * 3), new Float32Array(count * 3), new Float32Array(count * 3)];
    const lavender = new THREE.Color('#d6c2ff');
    const violet = new THREE.Color('#8950e8');
    for (let i = 0; i < count; i++) {
      const u = ((i * 7919) % count) / count;
      const v = ((i * 1543) % count) / count;
      const theta = i * 2.399963;
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);
      const radius = 1.25 + u * 0.48;
      // Three deterministic shapes share particle identity during morphing.
      targets[0].set([(1.25 + 0.34 * Math.cos(phi * 7)) * Math.cos(theta), Math.sin(phi * 7) * 0.34 + Math.sin(theta * 2) * 0.18, (1.25 + 0.34 * Math.cos(phi * 7)) * Math.sin(theta)], i * 3);
      targets[1].set([(u - 0.5) * 3.4, (i % 5 - 2) * 0.49 + Math.sin(u * 8) * 0.12, (v - 0.5) * 2.4], i * 3);
      targets[2].set([radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta)], i * 3);
      positions.set(targets[2].subarray(i * 3, i * 3 + 3), i * 3);
      const color = lavender.clone().lerp(violet, u);
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
    const material = new THREE.PointsMaterial({ size: 0.045, map: texture, vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending });
    const cloud = new THREE.Points(geometry, material);
    const group = new THREE.Group(); group.add(cloud); scene.add(group);
    const linePositions = new Float32Array(120 * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    const lineMaterial = new THREE.LineBasicMaterial({ color: '#b6a0ee', transparent: true, opacity: 0.1, depthWrite: false });
    group.add(new THREE.LineSegments(lineGeometry, lineMaterial));
    renderer.setClearColor(0x000000, 0); container.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    let frame = 0;
    let last = 0;
    let clock = 0;
    let disposed = false;
    let mobile = false;
    let rotateX = 0;
    let rotateY = 0;
    const render = (instant: boolean, dt = 0.016) => {
      const running = state.current.enabled;
      const scroll = mobile ? 0 : progress.get();
      const input = pointer.current;
      const target = targets[state.current.mode];
      const blend = instant ? 1 : 1 - Math.exp(-dt * 4);
      if (running) clock += dt;
      for (let i = 0; i < count; i++) {
        const offset = i * 3;
        let x = target[offset]; let y = target[offset + 1]; let z = target[offset + 2];
        const p = scroll * 0.72;
        x = x * (1 - p) + ((i % 18) / 17 - 0.5) * 3.6 * p;
        y = y * (1 - p) + ((Math.floor(i / 18) % 12) / 11 - 0.5) * 2.8 * p;
        z *= 1 - p;
        if (running) {
          y += Math.sin(clock * 0.75 + i * 0.1) * 0.028;
          if (input.active && !mobile) {
            const dx = x - input.x * 2.2; const dy = y - input.y * 2.2;
            const distance = Math.sqrt(dx * dx + dy * dy) + 0.001;
            const force = Math.max(0, 0.85 - distance) * 0.48;
            x += dx / distance * force; y += dy / distance * force; z += force * 0.9;
          }
        }
        positions[offset] += (x - positions[offset]) * blend;
        positions[offset + 1] += (y - positions[offset + 1]) * blend;
        positions[offset + 2] += (z - positions[offset + 2]) * blend;
      }
      geometry.attributes.position.needsUpdate = true;
      for (let i = 0; i < 120; i++) {
        const a = (i * 29) % count * 3; const b = ((i * 29 + 7) % count) * 3;
        const distance = Math.hypot(positions[a] - positions[b], positions[a + 1] - positions[b + 1], positions[a + 2] - positions[b + 2]);
        linePositions.set(positions.subarray(a, a + 3), i * 6);
        linePositions.set(positions.subarray(distance < 1 ? b : a, (distance < 1 ? b : a) + 3), i * 6 + 3);
      }
      lineGeometry.attributes.position.needsUpdate = true; lineMaterial.opacity = 0.1 + scroll * 0.3;
      const px = running && input.active && !mobile ? -input.y * 0.17 : 0;
      const py = running && input.active && !mobile ? input.x * 0.2 : 0;
      rotateX += (px - rotateX) * blend; rotateY += (py - rotateY) * blend;
      group.rotation.set(0.4 + rotateX + scroll * 0.3, clock * 0.07 + rotateY, -0.22);
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
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.25 : 1.75));
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / Math.max(rect.height, 1); camera.updateProjectionMatrix();
      geometry.setDrawRange(0, mobile ? 1100 : count); render(!state.current.enabled);
    };
    const observer = new ResizeObserver(resize); observer.observe(container);
    const contextLost = (event: Event) => { event.preventDefault(); onFailure(); };
    renderer.domElement.addEventListener('webglcontextlost', contextLost);
    resize(); update();
    return () => {
      disposed = true; cancelAnimationFrame(frame); observer.disconnect(); control.current = undefined;
      renderer.domElement.removeEventListener('webglcontextlost', contextLost);
      geometry.dispose(); material.dispose(); texture.dispose(); lineGeometry.dispose(); lineMaterial.dispose(); renderer.dispose(); renderer.domElement.remove();
    };
  }, [pointer, progress, onFailure]);
  return <div className="three-cloud" ref={host} />;
}
