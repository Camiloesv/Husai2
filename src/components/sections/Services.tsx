import React from 'react';
import { Brain, Database, LineChart, ChevronRight } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useText } from '../../hooks/useText'; // Ajusta si la ruta es distinta

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'purple' | 'info' | 'success';
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, color }) => {
  return (
    <Card className="p-8">
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
      <h3 className="text-xl font-bold text-text-primary mb-4">{title}</h3>
      <p className="text-text-secondary mb-6">{description}</p>
      <Button variant="text" color={color}>
        Learn More
        <ChevronRight className="w-4 h-4" />
      </Button>
    </Card>
  );
};

const Services: React.FC = () => {
  const { services } = useText();

  const serviceData = [
    {
      icon: <Brain className="w-full h-full" />,
      title: services.ai,
      description: services.aiDesc,
      color: 'purple' as const,
    },
    {
      icon: <Database className="w-full h-full" />,
      title: services.data,
      description: services.dataDesc,
      color: 'info' as const,
    },
    {
      icon: <LineChart className="w-full h-full" />,
      title: services.predictive,
      description: services.predictiveDesc,
      color: 'success' as const,
    },
  ];

  return (
    <section id="services" className="mb-32">
      <h2 className="text-3xl font-bold text-text-primary text-center mb-16">
        {services.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {serviceData.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
            color={service.color}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
