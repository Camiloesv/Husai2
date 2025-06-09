import React from 'react';
import { useInView } from 'react-intersection-observer';

const companies = [
  {
    name: 'Gemini',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg'
  },
  {
    name: 'Meta',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg'
  },
  {
    name: 'Mistral AI',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Mistral_AI_logo_%282025%E2%80%93%29.svg'
  },
  {
    name: 'Anthropic',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Claude_AI_logo.svg'
  },
  {
    name: 'DeepSeek',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/DeepSeek_logo.svg'
  },
  {
    name: 'OpenAI',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg'
  },
  {
    name: 'Qwen',
    logo: 'https://registry.npmmirror.com/@lobehub/icons-static-png/1.43.0/files/dark/qwen.png'
  },
  {
    name: 'Cohere',
    logo: 'https://cohere.com/logo.svg'
  }
];

// Duplicate the array to create a seamless loop
const duplicatedCompanies = [...companies, ...companies];

const AICompanies: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div ref={ref} className="w-full overflow-hidden py-6">
      {/* Infinite Scroll Container */}
      <div className="relative w-full">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark-background to-transparent z-10" />

        {/* Scrolling Track */}
        <div 
          className={`flex gap-16 py-4 ${
            inView ? 'animate-scroll' : ''
          }`}
          style={{ width: 'fit-content' }}
        >
          {duplicatedCompanies.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="flex items-center justify-center w-32 h-32 bg-dark-card/30 rounded-2xl p-6 backdrop-blur-sm
                       hover:bg-dark-card/50 transition-all duration-300 group"
            >
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="w-full h-full object-contain filter brightness-0 invert opacity-50 
                         group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AICompanies;
