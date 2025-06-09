import React from 'react';
import { Award, ChevronRight } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useText } from '../../hooks/useText'; // Ajusta la ruta si es necesario

interface CaseStudyProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: string;
  color: 'purple' | 'info';
}

const CaseStudy: React.FC<CaseStudyProps> = ({ icon, title, description, category, color }) => {
  return (
    <Card className="p-8">
      <div className="flex items-start gap-4 mb-6">
        <div className={`w-8 h-8 ${color === 'purple' ? 'text-purple-primary' : 'text-status-info'} flex-shrink-0`}>
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-2">{title}</h3>
          <p className="text-text-secondary">{description}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-text-tertiary">{category}</span>
        <Button variant="text" color={color}>
          Read Case Study
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};

const CaseStudies: React.FC = () => {
  const { cases } = useText();

  const caseStudies = [
    {
      icon: <Award className="w-full h-full" />,
      title: cases.case1Title,
      description: cases.case1Desc,
      category: 'Tech & Innovation', // puedes internacionalizarlo también si lo deseas
      color: 'purple' as const
    },
    {
      icon: <Award className="w-full h-full" />,
      title: cases.case2Title,
      description: cases.case2Desc,
      category: 'Healthcare', // también puedes traducirlo si se usa en otros idiomas
      color: 'info' as const
    }
  ];

  return (
    <section id="cases" className="mb-32">
      <h2 className="text-3xl font-bold text-text-primary text-center mb-16">
        {cases.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {caseStudies.map((study, index) => (
          <CaseStudy 
            key={index}
            icon={study.icon}
            title={study.title}
            description={study.description}
            category={study.category}
            color={study.color}
          />
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;
