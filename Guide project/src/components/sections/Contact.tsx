import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import Card from '../ui/Card';
import ChatWindow from '../chat/ChatWindow';

const Contact: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <section id="contact" className="mb-32">
      <Card className="p-8 md:p-12">
        <h2 className="text-3xl font-bold text-text-primary text-center mb-8">Ready to Transform Your Data?</h2>
        <p className="text-text-secondary text-center max-w-2xl mx-auto mb-12">
          Let's discuss how HusAI can help your business leverage the power of AI and data analytics.
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => setIsChatOpen(true)}
            className="glass-card p-6 flex items-center gap-4 hover:bg-dark-modal/30 transition-all duration-200"
          >
            <MessageSquare className="w-6 h-6 text-purple-primary" />
            <span className="text-text-primary">Start Live Chat</span>
          </button>
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