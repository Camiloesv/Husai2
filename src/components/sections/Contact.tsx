import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import ChatWindow from '../chat/ChatWindow';
import { useText } from '../../hooks/useText';

const Contact: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { contact } = useText();

  return (
    <section id="contact" className="relative py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto"
      >
        <Card className="p-10 md:p-14">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-text-primary text-center mb-4">
            {contact.title}
          </h2>
          <p className="text-text-secondary text-center max-w-2xl mx-auto mb-10 leading-relaxed">
            {contact.subtitle}
          </p>
          <div className="flex justify-center">
            <a
              href="https://wa.me/573212686430?text=Hola%2C%20quiero%20agendar%20un%20diagn%C3%B3stico%20con%20HUSAI"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                onClick={() => setIsChatOpen(true)}
                className="glass-card p-5 px-7 flex items-center gap-4 hover:bg-dark-modal/40 hover:scale-[1.02] transition-all duration-300"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt="WhatsApp"
                  className="w-6 h-6"
                />
                <span className="text-text-primary font-medium">{contact.button}</span>
              </button>
            </a>
          </div>
        </Card>
      </motion.div>

      <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </section>
  );
};

export default Contact;
