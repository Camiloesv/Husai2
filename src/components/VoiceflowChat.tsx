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
        const FormExtension = {
          name: 'Forms',
          type: 'response',
          match: ({ trace }: any) =>
            trace.type === 'Custom_Form' || trace.payload?.name === 'Custom_Form',
          render: async ({ trace, element }: any) => {
            const formContainer = document.createElement('form');
            formContainer.style.backgroundColor = '#f9f9f9';
            formContainer.style.padding = '20px';
            formContainer.style.borderRadius = '12px';
            formContainer.style.width = '100%';
            formContainer.style.fontFamily = 'Segoe UI, sans-serif';
        
            const addCue = (text: string) => {
              const cue = document.createElement('div');
              cue.textContent = text;
              cue.style.fontSize = '0.75rem';
              cue.style.color = '#666';
              cue.style.marginTop = '4px';
              return cue;
            };
        
            const createLabel = (text: string) => {
              const label = document.createElement('label');
              label.textContent = text;
              Object.assign(label.style, {
                display: 'block',
                marginBottom: '6px',
                fontSize: '0.85rem',
                fontWeight: '600',
                color: '#333',
              });
              return label;
            };
        
            const createInput = (type: string, className: string, placeholder: string) => {
              const input = document.createElement('input');
              input.type = type;
              input.required = true;
              input.placeholder = placeholder;
              input.className = className;
              Object.assign(input.style, {
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                width: '100%',
                fontSize: '1rem',
              });
              return input;
            };
        
            // Fetch countries

            const countries = await fetch('https://restcountries.com/v3.1/all')
            .then(res => res.json())
            .then(data => data.map((c: any) => ({
              name: c.name.common,
              code: c.idd?.root ? `${c.idd.root}${(c.idd.suffixes?.[0] || '')}` : '',
              flag: c.flags?.emoji || '',
            })).filter((c: any) => c.code))
            .then(countries => countries.sort((a: any, b: any) => a.name.localeCompare(b.name)));

        
            // Country selector
            const countryWrapper = document.createElement('div');
            const countryLabel = createLabel('Country');
            const countrySelect = document.createElement('select');
            Object.assign(countrySelect.style, {
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '1rem',
            });
            countries.forEach((c: any) => {
              const option = document.createElement('option');
              option.value = c.code;
              option.textContent = `${c.flag} ${c.name} (${c.code})`;
              countrySelect.appendChild(option);
            });
            countryWrapper.appendChild(countryLabel);
            countryWrapper.appendChild(countrySelect);
            countryWrapper.appendChild(addCue('Selecciona tu país'));
        
            // Name
            const nameLabel = createLabel('Name');
            const nameInput = createInput('text', 'name', 'Eduardo Moreno');
            const nameCue = addCue('Tu nombre completo');
        
            // Email
            const emailLabel = createLabel('Email');
            const emailInput = createInput('email', 'email', 'ej. name@gmail.com');
            emailInput.pattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$';
            emailInput.title = 'Invalid email address';
            const emailCue = addCue('Usa un correo electrónico válido');
        
            // Phone
            const phoneLabel = createLabel('Phone Number');
            const phoneInput = createInput('tel', 'phone', '3201234567');
            phoneInput.pattern = '\\d+';
            phoneInput.title = 'Solo números';
            const phoneCue = addCue('Número sin espacios ni símbolos');
        
            // Submit button
            const submitButton = document.createElement('button');
            submitButton.type = 'submit';
            submitButton.innerHTML = `
              <span style="display: inline-flex; align-items: center; justify-content: center; gap: 8px;">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="20" height="20">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                Enviar
              </span>
            `;
            Object.assign(submitButton.style, {
              padding: '12px',
              borderRadius: '10px',
              background: 'linear-gradient(to right, #8b5cf6, #7c3aed)',
              color: 'white',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              fontSize: '1rem',
              marginTop: '20px',
            });
        
            // Append to form
            formContainer.appendChild(nameLabel);
            formContainer.appendChild(nameInput);
            formContainer.appendChild(nameCue);
        
            formContainer.appendChild(emailLabel);
            formContainer.appendChild(emailInput);
            formContainer.appendChild(emailCue);
        
            formContainer.appendChild(countryWrapper);
        
            formContainer.appendChild(phoneLabel);
            formContainer.appendChild(phoneInput);
            formContainer.appendChild(phoneCue);
        
            formContainer.appendChild(submitButton);
        
            formContainer.addEventListener('submit', (event) => {
              event.preventDefault();
        
              const valid = nameInput.checkValidity() && emailInput.checkValidity() && phoneInput.checkValidity();
              if (!valid) {
                if (!nameInput.checkValidity()) nameInput.style.borderColor = 'red';
                if (!emailInput.checkValidity()) emailInput.style.borderColor = 'red';
                if (!phoneInput.checkValidity()) phoneInput.style.borderColor = 'red';
                return;
              }
        
              submitButton.remove();
        
              window.voiceflow?.chat?.interact?.({
                type: 'complete',
                payload: {
                  name: nameInput.value,
                  email: emailInput.value,
                  phone: `${countrySelect.value} ${phoneInput.value}`,
                  country: countrySelect.selectedOptions[0]?.textContent || '',
                },
              });
            });
        
            element.appendChild(formContainer);
          },
        };
      

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
             assistant: { extensions: [FormExtension],
              stylesheet: "data:text/css;base64,LyogRXN0aWxvIGdsYXNzbW9ycGhpc20gcGFyYSBlbCBjb250ZW5lZG9yIGdlbmVyYWwgZGVsIGNoYXQgKi8KLnZmcmMtY2hhdCB7CiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KTsgLyogRm9uZG8gbXV5IHN1dGlsIHkgY2FzaSB0cmFuc3BhcmVudGUgKi8KICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMTJweCk7CiAgLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXI6IGJsdXIoMTJweCk7CiAgYm9yZGVyLXJhZGl1czogMTZweDsKICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7Cn0KCi8qIENhYmVjZXJhIHRyYW5zcGFyZW50ZSBjb24gZWZlY3RvIGdsYXNzICovCi52ZnJjLWhlYWRlciB7CiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgcmdiYSgxNjAsMjgsMTgwLDAuNiksIHJnYmEoMjksNzgsMjE2LDAuNikpOwogIGJhY2tkcm9wLWZpbHRlcjogYmx1cigxMHB4KTsKICAtd2Via2l0LWJhY2tkcm9wLWZpbHRlcjogYmx1cigxMHB4KTsKICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpOwogIGNvbG9yOiAjZmZmOwp9CgoKLyogRm9vdGVyIHRvdGFsbWVudGUgdHJhbnNwYXJlbnRlICovCi52Zi1mb290ZXIgewogIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50Owp9CgovKiBJbnB1dCBkZSBlbnbDrW8gKHBhcmEgZWwgYWdlbnRlIG8gZm9ybXVsYXJpb3MpIGNvbiB0b25vIGF6dWwgeSBnbGFzc21vcnBoaXNtICovCi52ZnJjLWlucHV0IHsKICBiYWNrZ3JvdW5kOiByZ2JhKDI5LCA3OCwgMjE2LCAwLjIpOyAgLyogQXp1bCBzdWF2ZSBjb24gdHJhbnNwYXJlbmNpYSAqLwogIGJhY2tkcm9wLWZpbHRlcjogYmx1cig4cHgpOwogIC13ZWJraXQtYmFja2Ryb3AtZmlsdGVyOiBibHVyKDhweCk7CiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyOSwgNzgsIDIxNiwgMC40KTsKICBib3JkZXItcmFkaXVzOiAxMHB4OwogIHBhZGRpbmc6IDEwcHg7CiAgY29sb3I6ICNmZmY7CiAgZm9udC1zaXplOiAxcmVtOwp9CgovKiBNZW5zYWplcyBkZSByZXNwdWVzdGEgZGVsIHVzdWFyaW86IGJsYW5jbyBjb24gdHJhbnNwYXJlbmNpYSBwYXJhIGJ1ZW5hIGxlZ2liaWxpZGFkICovCi52ZnJjLXVzZXItcmVzcG9uc2UgLnZmcmMtbWVzc2FnZSB7CiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpOyAvKiBCbGFuY28gc2VtaXRyYW5zcGFyZW50ZSAqLwogIGNvbG9yOiAjMWUyOTNiOwogIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC40KTsKICBib3JkZXItcmFkaXVzOiAxMnB4OwogIHBhZGRpbmc6IDEwcHg7Cn0KCi8qIE1lbnNhamVzIGRlbCBhc2lzdGVudGUgY29uIGdsYXNzbW9ycGhpc20gKG1hbnRlbmllbmRvIGNvbnRyYXN0ZSBwYXJhIGJ1ZW5hIGxlY3R1cmEpICovCi52ZnJjLXN5c3RlbS1yZXNwb25zZSAudmZyYy1tZXNzYWdlIHsKICBiYWNrZ3JvdW5kOiByZ2JhKDMwLCA1OCwgMTM4LCAwLjQpOwogIGNvbG9yOiAjZmZmOwogIGJvcmRlci1yYWRpdXM6IDEycHg7CiAgcGFkZGluZzogMTBweDsKICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoNnB4KTsKICAtd2Via2l0LWJhY2tkcm9wLWZpbHRlcjogYmx1cig2cHgpOwogIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKTsKfQoKLyogQm90w7NuIGxhbnphZG9yIChsYXVuY2hlcikgY29uIHN1dGlsIGVmZWN0byBnbGFzcyAqLwoudmZyYy1sYXVuY2hlciB7CiAgYmFja2dyb3VuZDogcmdiYSgyOSwgNzgsIDIxNiwgMC44KTsKICBjb2xvcjogI2ZmZjsKICBib3JkZXItcmFkaXVzOiA1MCU7CiAgcGFkZGluZzogMTJweDsKICBib3gtc2hhZG93OiAwIDRweCA4cHggcmdiYSgwLCAwLCAwLCAwLjIpOwp9CgovKiBCb3RvbmVzIGRlbCBhc2lzdGVudGUgY29uIGVmZWN0byBnbGFzcyAqLwoudmZyYy1zeXN0ZW0tcmVzcG9uc2UgLnZmcmMtYnV0dG9uIHsKICBiYWNrZ3JvdW5kOiByZ2JhKDI5LCA3OCwgMjE2LCAwLjYpOwogIGNvbG9yOiAjZmZmOwogIGJvcmRlci1yYWRpdXM6IDhweDsKICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI5LCA3OCwgMjE2LCAwLjQpOwogIGJhY2tkcm9wLWZpbHRlcjogYmx1cig0cHgpOwogIC13ZWJraXQtYmFja2Ryb3AtZmlsdGVyOiBibHVyKDRweCk7CiAgcGFkZGluZzogOHB4IDEycHg7Cn0KCi8qIE9jdWx0YXIgd2F0ZXJtYXJrICovCi52ZnJjLWZvb3Rlci0td2F0ZXJtYXJrIHsKICBkaXNwbGF5OiBub25lOwp9Cg=="
            }});
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
          } catch (e) {
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
  onClick={toggleChat}
  className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg transition-transform duration-300 ease-out hover:scale-110 group ${
    isOpen
      ? 'bg-dark-modal text-text-secondary hover:bg-dark-border'
      : 'bg-purple-primary text-white hover:bg-purple-hover hover:shadow-[0_0_12px_rgba(168,85,247,0.7)]'
  }`}
  aria-label={isOpen ? 'Close chat' : 'Open chat'}
>
  {isOpen ? (
    <X size={24} />
  ) : (
    <MessageSquare size={24} className="text-white" />
  )}

  {/* Tooltip hacia la izquierda */}
  {!isOpen && (
    <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-md">
      Habla con nuestro agente
    </span>
  )}
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
