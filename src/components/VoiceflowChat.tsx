import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FormExtension from './chat/FormExtension';
import { DIAGNOSTIC_FALLBACK_URL } from '../lib/openDiagnostico';

export default function VoiceflowChat() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const trigger = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const { i18n } = useTranslation();
  const lang = i18n.language.slice(0, 2);
  const text = lang === 'fr' ? ['Ouvrir le chat', 'Fermer le chat', 'Chargement du conseiller…', 'Le chat est indisponible.', 'Ouvrir le formulaire de diagnostic'] : lang === 'en' ? ['Open chat', 'Close chat', 'Loading advisor…', 'Chat is unavailable.', 'Open discovery form'] : ['Abrir chat', 'Cerrar chat', 'Cargando asesor…', 'El chat no está disponible.', 'Abrir formulario de diagnóstico'];
  useEffect(() => {
    const reveal = () => setOpen(true);
    window.addEventListener('husai:open-chat', reveal);
    return () => window.removeEventListener('husai:open-chat', reveal);
  }, []);
  useEffect(() => { if (open) close.current?.focus(); }, [open]);
  useEffect(() => {
    if (status !== 'loading') return;
    let cancelled = false;
    const script = document.createElement('script');
    script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
    script.async = true;
    const fail = () => { if (!cancelled) setStatus('error'); };
    const timeout = window.setTimeout(fail, 15000);
    script.onload = async () => {
      try {
        if (cancelled || !window.voiceflow?.chat) throw new Error('Chat unavailable');
        await window.voiceflow.chat.load({ verify: { projectID: '67ded4676cef5247fa195655' }, url: 'https://general-runtime.voiceflow.com', versionID: 'production', render: { mode: 'embedded', target: document.getElementById('voiceflow-chat-container') }, assistant: { extensions: [FormExtension] } });
        if (!cancelled) { window.clearTimeout(timeout); setStatus('ready'); }
      } catch { fail(); }
    };
    script.onerror = fail;
    document.body.appendChild(script);
    return () => { cancelled = true; window.clearTimeout(timeout); script.onload = null; script.onerror = null; script.remove(); };
  }, [status]);
  useEffect(() => () => { window.voiceflow?.chat?.destroy?.(); }, []);
  const hide = () => { setOpen(false); trigger.current?.focus(); };
  return <><button ref={trigger} className="chat-fab" aria-label={open ? text[1] : text[0]} aria-expanded={open} aria-controls="husai-chat" onClick={() => { setOpen(!open); if (status === 'idle') setStatus('loading'); }}>{open ? <X size={20} /> : <MessageSquare size={20} />}</button>
    <section id="husai-chat" className="chat-dialog" role="dialog" aria-label="HusAI" hidden={!open} data-ready={status === 'ready'} onKeyDown={e => { if (e.key === 'Escape') hide(); }}><header><span>HusAI / Intelligence in motion</span><button ref={close} aria-label={text[1]} onClick={hide}><X size={18} /></button></header>
      {status !== 'ready' && <div className="chat-status" role="status">{status === 'error' ? text[3] : text[2]}<a href={DIAGNOSTIC_FALLBACK_URL} target="_blank" rel="noopener noreferrer">{text[4]}</a></div>}
      <div id="voiceflow-chat-container" className="chat-target" />
    </section></>;
}
