import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import Card from '../ui/Card';
import ChatWindow from '../chat/ChatWindow';
import { useText } from '../../hooks/useText'; // Ajusta si la ruta varía

const Contact: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { contact } = useText();

  return (
    <section id="contact" className="mb-32">
      <Card className="p-8 md:p-12">
        <h2 className="text-3xl font-bold text-text-primary text-center mb-8">
          {contact.title}
        </h2>
        <p className="text-text-secondary text-center max-w-2xl mx-auto mb-12">
          {contact.subtitle}
        </p>
        <div className="flex justify-center">

        <a
          href="https://wa.me/573212686430?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20de%20Husai"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            onClick={() => setIsChatOpen(true)}
            className="glass-card p-6 flex items-center gap-4 hover:bg-dark-modal/30 transition-all duration-200"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              className="w-6 h-6"
            />
            <span className="text-text-primary">{contact.button}</span>
          </button>
          </a> 

        </div>
      </Card>
      
      <ChatWindow 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </section>
  );
};

export default Contact;
