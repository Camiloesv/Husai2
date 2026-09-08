interface SpeechRecognitionResultEvent { results: ArrayLike<ArrayLike<{ transcript: string }>> }
interface SpeechRecognitionInstance {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}
interface Window {
  SpeechRecognition?: new () => SpeechRecognitionInstance;
  webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  voiceflow?: { chat?: {
    load(config: Record<string, unknown>): void | Promise<void>;
    open?(): void;
    close?(): void;
    show?(): void;
    hide?(): void;
    destroy?(): void;
    interact?(event: { type: string; payload: Record<string, unknown> }): void;
  } };
}
