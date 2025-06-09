import React, { useState, useRef, useEffect, FormEvent } from 'react';

type Role = 'user' | 'assistant';
type ChatMode = 'n8n' | 'vapi';

interface Message {
  role: Role;
  text: string;
  timestamp: Date;
}

const config = {
  n8nWebhookUrl: 'https://app.husai.com.co/webhook/dcf5d023-d831-4471-b8e5-85434e158053',
  vapiApiKey: 'vapi_1234567890abcdef',
  assistantId: 'assistant_1234567890abcdef',
};

function useAutoScroll(dep: any) {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dep]);
  return endRef;
}

const BusinessAssistant: React.FC = () => {
  const [business, setBusiness] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [conversation, setConversation] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState<ChatMode>('n8n');
  const [isRecording, setIsRecording] = useState(false);

  const businessRef = useRef<HTMLTextAreaElement>(null);
  const userInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const conversationEndRef = useAutoScroll(conversation);

  // --- Audio recognition effect
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-CO';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognitionRef.current = recognition;

      recognition.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        addMsg('user', transcript);
        handleAudio(transcript);
      };
      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);
    }
  }, []);

  // --- Helpers
  function addMsg(role: Role, text: string) {
    setConversation((c) => [...c, { role, text, timestamp: new Date() }]);
  }
  function systemMsg(description: string) {
    return `Eres un asistente virtual para la empresa: "${description}". Debes ser amable, profesional, relevante y proponer soluciones concretas.`;
  }
  function welcomeMsg(description: string) {
    const t = description.toLowerCase();
    let msg = '¡Hola! Soy tu asistente virtual personalizado. ';
    if (t.includes('tecnología') || t.includes('software')) msg += 'Estoy especializado en temas tecnológicos. ';
    else if (t.includes('servicio') || t.includes('consultoría')) msg += 'Puedo ayudarte con servicios y atención al cliente. ';
    if (t.includes('cliente')) msg += 'También puedo asistirte con preguntas de clientes. ';
    return msg + '¿En qué puedo ayudarte hoy?';
  }

  async function handleBusiness(e: FormEvent) {
    e.preventDefault();
    const desc = businessRef.current?.value.trim() || '';
    if (!desc) return notify('Por favor ingresa una descripción de tu empresa', 'error');
    setBusiness(desc);
    setLoading(true);
    setTimeout(() => {
      setSystemPrompt(systemMsg(desc));
      setChatVisible(true);
      setLoading(false);
      addMsg('assistant', welcomeMsg(desc));
    }, 800);
  }

  async function handleText(e: FormEvent) {
    e.preventDefault();
    const msg = userInputRef.current?.value.trim() || '';
    if (!msg) return;
    addMsg('user', msg);
    userInputRef.current!.value = '';
    setIsTyping(true);
    try {
      const r = await fetch(config.n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessContext: business, userMessage: msg }),
      });
      const data = await r.json();
      addMsg('assistant', data.reply || 'No obtuve respuesta en este momento.');
    } catch {
      addMsg('assistant', 'Lo siento, hubo un problema al procesar tu mensaje.');
    }
    setIsTyping(false);
  }

  async function handleAudio(transcript: string) {
    try {
      const res = await fetch('https://api.vapi.ai/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.vapiApiKey,
        },
        body: JSON.stringify({ assistantId: config.assistantId, prompt: transcript, context: business }),
      });
      const { reply } = await res.json();
      addMsg('assistant', reply || 'No pude procesar tu solicitud de audio.');
      speak(reply);
    } catch {
      addMsg('assistant', 'Ocurrió un error con el servicio de voz.');
    }
  }

  function speak(text: string) {
    if ('speechSynthesis' in window) {
      const utter = new window.SpeechSynthesisUtterance(text);
      utter.lang = 'es-CO';
      window.speechSynthesis.speak(utter);
    }
  }

  function toggleRecording() {
    if (!recognitionRef.current) return notify('Reconocimiento de voz no soportado.', 'error');
    if (isRecording) recognitionRef.current.stop();
    else try {
      recognitionRef.current.start();
      setIsRecording(true);
    } catch { notify('No se pudo iniciar el micrófono.', 'error'); }
  }

  function notify(msg: string, type: 'info' | 'error') {
    // Simple notification. Use your preferred solution in prod
    alert(msg);
  }

  function reset() {
    setBusiness('');
    setSystemPrompt('');
    setConversation([]);
    setChatVisible(false);
    setLoading(false);
    businessRef.current && (businessRef.current.value = '');
  }

  // --- Render
  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      {!chatVisible ? (
        <form onSubmit={handleBusiness} className="glass-card p-8 relative overflow-hidden">
          <h2 className="text-2xl font-semibold mb-2">Crea tu asistente virtual personalizado</h2>
          <p className="mb-6">Describe tu empresa y necesidades para generar un asistente adaptado.</p>
          <textarea
            ref={businessRef}
            className="input-field w-full resize-none mb-4"
            rows={5}
            placeholder="Ej: Somos una empresa de desarrollo de software..."
          />
          <button type="submit" className="glass-button" disabled={loading}>
            Crear mi asistente
          </button>
          {loading && <div className="absolute inset-0 flex items-center justify-center bg-dark-background/60">Procesando...</div>}
        </form>
      ) : (
        <div className="glass-card p-6 flex flex-col h-[600px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Asistente Virtual</h3>
            <div className="flex items-center gap-2">
              <select value={mode} onChange={e => setMode(e.target.value as ChatMode)} className="input-field">
                <option value="n8n">Chat</option>
                <option value="vapi">Audio</option>
              </select>
              <button onClick={reset} className="p-1 rounded-full hover:bg-dark-border" aria-label="Volver">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 mb-4">
            {conversation.map((m, i) => (
              <div key={i} className={`flex mb-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl shadow-md ${m.role === 'user'
                  ? 'bg-purple-primary text-white rounded-br-none'
                  : 'bg-dark-card/60 text-text-primary rounded-bl-none'
                }`}>
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  <span className="block text-xs mt-1 text-right text-text-secondary">
                    {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {mode === 'n8n' && isTyping && (
              <div className="flex mb-4 justify-start"><span className="animate-bounce">...</span></div>
            )}
            <div ref={conversationEndRef} />
          </div>
          {mode === 'n8n' ? (
            <form onSubmit={handleText} className="flex items-center gap-2">
              <input ref={userInputRef} type="text" className="input-field flex-1" placeholder="Escribe tu mensaje aquí..." autoComplete="off" disabled={!systemPrompt} />
              <button type="submit" className="glass-button p-2" disabled={isTyping || !systemPrompt}>Enviar</button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <button onClick={toggleRecording} className="glass-button">
                {isRecording ? 'Detener' : 'Hablar'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BusinessAssistant;
