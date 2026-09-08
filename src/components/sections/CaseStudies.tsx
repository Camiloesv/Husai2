import React from 'react';
import { Award, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useText } from '../../hooks/useText';

interface CaseStudyProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: string;
  color: 'purple' | 'info';
  index: number;
  cta: string;
}

const CaseStudy: React.FC<CaseStudyProps> = ({ icon, title, description, category, color, index, cta }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="p-8 h-full">
        <div className="flex items-start gap-4 mb-6">
          <div
            className={`w-9 h-9 ${
              color === 'purple' ? 'text-purple-primary' : 'text-status-info'
            } flex-shrink-0`}
          >
            {icon}
          </div>
          <div>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-text-primary mb-2 leading-snug">
              {title}
            </h3>
            <p className="text-text-secondary leading-relaxed">{description}</p>
          </div>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-dark-border/40">
          <span className="text-text-tertiary text-xs tracking-wider uppercase">{category}</span>
          <Button variant="text" color={color}>
            {cta}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

const CaseStudies: React.FC = () => {
  const { cases } = useText();

  const caseStudies = [
    {
      icon: <Award className="w-full h-full" strokeWidth={1.5} />,
      title: cases.case1Title,
      description: cases.case1Desc,
      category: cases.case1Category,
      color: 'purple' as const,
    },
    {
      icon: <Award className="w-full h-full" strokeWidth={1.5} />,
      title: cases.case2Title,
      description: cases.case2Desc,
      category: cases.case2Category,
      color: 'info' as const,
    },
  ];

  return (
    <section id="cases" className="relative py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-purple-hover mb-4">Casos</p>
          <h2 className="font-display font-semibold text-4xl md:text-5xl leading-tight text-text-primary">
            {cases.title}
          </h2>
          <p className="mt-5 text-text-secondary text-lg">{cases.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <CaseStudy
              key={index}
              index={index}
              icon={study.icon}
              title={study.title}
              description={study.description}
              category={study.category}
              color={study.color}
              cta={cases.readMore}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
