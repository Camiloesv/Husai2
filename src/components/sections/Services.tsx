import React from 'react';
import { Brain, Database, LineChart, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useText } from '../../hooks/useText';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'purple' | 'info' | 'success';
  index: number;
  cta: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, color, index, cta }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="p-8 h-full">
        <div
          className={`w-12 h-12 ${
            color === 'purple'
              ? 'text-purple-primary'
              : color === 'info'
              ? 'text-status-info'
              : 'text-status-success'
          } mb-6`}
        >
          {icon}
        </div>
        <h3 className="font-display text-xl font-semibold text-text-primary mb-3">{title}</h3>
        <p className="text-text-secondary mb-6 leading-relaxed">{description}</p>
        <Button variant="text" color={color}>
          {cta}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </Card>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const { services } = useText();

  const serviceData = [
    {
      icon: <Brain className="w-full h-full" strokeWidth={1.5} />,
      title: services.ai,
      description: services.aiDesc,
      color: 'purple' as const,
    },
    {
      icon: <Database className="w-full h-full" strokeWidth={1.5} />,
      title: services.data,
      description: services.dataDesc,
      color: 'info' as const,
    },
    {
      icon: <LineChart className="w-full h-full" strokeWidth={1.5} />,
      title: services.predictive,
      description: services.predictiveDesc,
      color: 'success' as const,
    },
  ];

  return (
    <section id="services" className="relative py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-purple-hover mb-4">Servicios</p>
          <h2 className="font-display font-semibold text-4xl md:text-5xl leading-tight text-text-primary">
            {services.title}
          </h2>
          <p className="mt-5 text-text-secondary text-lg">{services.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceData.map((service, index) => (
            <ServiceCard
              key={index}
              index={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              color={service.color}
              cta={services.learnMore}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
