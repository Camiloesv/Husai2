import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X } from 'lucide-react';

// Declare global voiceflow property at the top level
declare global {
  interface Window {
    voiceflow?: {
      chat?: {
        load: (config: any) => void;
        open?: () => void;
        close?: () => void;
        hide?: () => void;
        show?: () => void;
        destroy?: () => void;
      };
    };
  }
}

const VOICEFLOW_PROJECT_ID = '67ded4676cef5247fa195655'; // Your Project ID
const VOICEFLOW_CONTAINER_ID = 'voiceflow-chat-container';

const VoiceflowChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoaded = useRef(false); // To track if the script has been loaded
  const chatApi = useRef(window.voiceflow?.chat); // Store API reference

  // Effect to load the script and initialize the chat ONCE
  useEffect(() => {
    // Only load if not already loaded
    if (!isLoaded.current) {
      const script = document.createElement('script');
      script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
      script.type = 'text/javascript';
      script.onload = () => {
        // Ensure the global voiceflow object and chat property exist
        if (window.voiceflow?.chat) {
          chatApi.current = window.voiceflow.chat; // Store API reference
          chatApi.current.load({
            verify: { projectID: VOICEFLOW_PROJECT_ID },
            url: 'https://general-runtime.voiceflow.com',
            versionID: 'production',
            render: {
              mode: 'embedded',
              target: document.getElementById(VOICEFLOW_CONTAINER_ID),
            },
             // Start hidden if using show/hide API
            runtime: {
              startHidden: true,
            },
            // Optional: Add assistant configuration if needed
            // assistant: { ... }
          });
          isLoaded.current = true; // Mark as loaded
          // If component was opened while loading, show it now
          if (isOpen && typeof chatApi.current?.show === 'function') {
             chatApi.current.show();
          }
        } else {
          console.error('Voiceflow chat object not found after script load.');
        }
      };
      script.onerror = () => {
        console.error('Failed to load Voiceflow script.');
      };
      document.body.appendChild(script);

      // Cleanup function to remove script if component unmounts
      return () => {
        const existingScript = document.querySelector(`script[src="${script.src}"]`);
        if (existingScript && document.body.contains(existingScript)) {
          try {
            document.body.removeChild(existingScript);
          } catch (e) {
             console.warn("Could not remove Voiceflow script on unmount:", e);
          }
        }
        // Attempt to destroy chat instance on unmount
        if (typeof chatApi.current?.destroy === 'function') {
          try {
            chatApi.current.destroy();
          } catch(e) {
            console.warn("Could not destroy Voiceflow chat on unmount:", e);
          }
        }
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array: Load script only once on mount

  // Effect to show/hide the chat using API after it's loaded
  useEffect(() => {
    if (isLoaded.current && chatApi.current) {
      if (isOpen) {
        if (typeof chatApi.current.show === 'function') {
          chatApi.current.show();
        }
      } else {
        if (typeof chatApi.current.hide === 'function') {
          chatApi.current.hide();
        }
      }
    }
  }, [isOpen]); // Run when isOpen changes

  // Handle button click - just toggle state
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
      {/* Chat Trigger Button */}
      <button
        onClick={toggleChat} // Use the new handler
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg transition-transform duration-300 ease-out hover:scale-110 ${
          isOpen
            ? 'bg-dark-modal text-text-secondary hover:bg-dark-border'
            : 'bg-purple-primary text-white hover:bg-purple-hover'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Container - Always rendered, visibility controlled by API/opacity */}
      <div
        className={`fixed bottom-[calc(3.5rem+1.5rem)] right-6 z-40 w-[90vw] max-w-md h-[70vh] max-h-[600px]
                   bg-dark-card/60 backdrop-blur-lg border border-dark-border/50
                   rounded-lg shadow-xl overflow-hidden flex flex-col
                   transition-opacity duration-300 ease-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} // Use opacity for smooth transition + pointer-events
      >
        {/* Voiceflow Embedded Target */}
        <div id={VOICEFLOW_CONTAINER_ID} className="flex-grow h-full w-full">
          {/* Voiceflow chat will be rendered here */}
        </div>
      </div>
    </>
  );
};

export default VoiceflowChat;
