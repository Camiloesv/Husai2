import React from 'react';
import { TFunction } from 'i18next';
import { Mail, MessageSquare, Users } from 'lucide-react';
// Import motion if you want to add animations later
// import { motion } from 'framer-motion';

interface ContactSectionProps {
  t: TFunction;
}

const ContactSection: React.FC<ContactSectionProps> = ({ t }) => {
  // Add animation variants here if needed later
  // const containerVariants = { ... };
  // const itemVariants = { ... };

  return (
    <section id="contact" className="mb-32">
      {/* Add motion.div wrapper here if animating */}
      <div className="glass-card p-8 md:p-12">
        {/* Add motion.h2 here if animating */}
        <h2 className="text-3xl font-bold text-text-primary text-center mb-8">
          {t('contact.title')}
        </h2>
        {/* Add motion.p here if animating */}
        <p className="text-text-secondary text-center max-w-2xl mx-auto mb-12">
          {t('contact.description')}
        </p>
        {/* Add motion.div wrapper here if animating grid items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Add motion.a wrapper here if animating */}
          <a href={`mailto:${t('contact.email')}`} className="glass-card p-6 flex items-center gap-4 hover:bg-dark-modal/30">
            <Mail className="w-6 h-6 text-purple-primary" />
            <span className="text-text-primary">{t('contact.email')}</span>
          </a>
          {/* Add motion.a wrapper here if animating */}
          <a href="#" className="glass-card p-6 flex items-center gap-4 hover:bg-dark-modal/30">
            <MessageSquare className="w-6 h-6 text-status-info" />
            <span className="text-text-primary">{t('contact.chat')}</span>
          </a>
          {/* Add motion.a wrapper here if animating */}
          <a href="#" className="glass-card p-6 flex items-center gap-4 hover:bg-dark-modal/30">
            <Users className="w-6 h-6 text-status-success" />
            <span className="text-text-primary">{t('contact.meeting')}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
