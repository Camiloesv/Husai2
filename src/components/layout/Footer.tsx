import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-dark-border pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-text-tertiary text-sm">
          © 2024 HusAI. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-text-tertiary hover:text-text-primary transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="text-text-tertiary hover:text-text-primary transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-text-tertiary hover:text-text-primary transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;