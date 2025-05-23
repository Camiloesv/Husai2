import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Card from '../components/ui/Card';
import { useText } from '../hooks/useText';

interface ServiceContent {
  title: string;
  summary: string;
  sections: { heading: string; points: string[] }[];
}

const SERVICES: Record<string, ServiceContent> = {
  'dx-ia-360': {
    title: 'Dx‑IA 360° — Diagnóstico y hoja de ruta de Inteligencia Artificial',
    summary:
      'Evaluación de madurez digital e IA en cinco ejes (estrategia, datos, procesos, tecnología y talento) en tres semanas.',
    sections: [
      {
        heading: 'Por qué importa',
        points: [
          'El 24% de las empresas cita la falta de conocimiento como barrera principal.',
          'Sin datos y procesos mapeados, cualquier proyecto de IA fracasa.'
        ]
      },
      {
        heading: 'Entregables clave',
        points: [
          'Mapa de procesos y datos con scoring de automatización.',
          'Quick‑wins de alto impacto (casos de uso ≤ 90 días, ROI ≥ 150%).',
          'Business case financiero (capex/opex, TIR, pay‑back).',
          'Plan de gestión del cambio alineado al marco ético colombiano.'
        ]
      },
      {
        heading: 'Cómo se vende',
        points: [
          'Pack PyME: COP 9,5 M – incluye 5 procesos críticos.',
          'Corporate: COP 35 M – hasta 20 procesos y workshops para C‑level.'
        ]
      }
    ]
  },
  'co-pilot-ai': {
    title: 'Co‑Pilot AI — Consultoría estratégica, gobierno y capacitación 70‑20‑10',
    summary:
      'Acompañamiento continuo de 3 a 12 meses para convertir la hoja de ruta en capacidad interna.',
    sections: [
      {
        heading: 'Módulos clave',
        points: [
          'Arquitectura & Integración: latencia ↓30%, errores de datos ↓40%.',
          'Gobernanza & Ética: políticas de datos y cumplimiento CONPES‑IA.',
          'Upskilling 70‑20‑10: talleres hands‑on, mentoring y micro‑lecciones.'
        ]
      },
      {
        heading: 'Elementos diferenciadores',
        points: [
          'Contenido sectorial para facilitar la adopción.',
          'Comunidad de práctica con retos mensuales y office hours.',
          'OKR de éxito compartidos firmados con el cliente.'
        ]
      }
    ]
  },
  'sprint-ia-90': {
    title: 'Sprint‑IA 90 — Diseño e implementación de pilotos “ROI‑Rápido”',
    summary:
      'Desarrollo de 1‑3 pilotos listos para producción en 90 días combinando RPA, IA generativa y analítica predictiva.',
    sections: [
      {
        heading: 'Verticales pre‑empaquetados',
        points: [
          'Atención al cliente: chatbot multicanal con hand‑off a humano.',
          'Cadena de suministro: predicción de demanda e inventario dinámico.',
          'Ciberseguridad: detección de anomalías en tiempo real.'
        ]
      },
      {
        heading: 'Metodología',
        points: [
          'Design Thinking + Lean AI para prototipo en 2 semanas.',
          'MVP operativo en sandbox seguro con usuarios reales.',
          'Escalamiento en la infraestructura del cliente o IA‑as‑a‑Service.'
        ]
      },
      {
        heading: 'Garantías',
        points: [
          'KPI acordado o continuamos sin costo hasta alcanzarlo.',
          'Transferencia de conocimiento para el equipo interno.'
        ]
      }
    ]
  }
};

const ServicePage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();

  const { common } = useText();
  const service = serviceId ? SERVICES[serviceId] : undefined;

  if (!service) {
    return (
      <div className="py-20 text-center text-text-secondary">
        Servicio no encontrado.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate('/#services')}
        className="flex items-center gap-2 text-text-tertiary hover:text-purple-primary transition-colors mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
        {common.backHome}
      </button>

      <h1 className="text-4xl font-bold text-text-primary mb-6">{service.title}</h1>
      <p className="text-text-secondary mb-8">{service.summary}</p>

      {service.sections.map((section, idx) => (
        <Card key={idx} className="p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>
          <ul className="list-disc list-inside space-y-2 text-text-secondary">
            {section.points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
};

export default ServicePage;
