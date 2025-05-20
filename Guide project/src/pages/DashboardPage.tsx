import { motion } from 'framer-motion';
import { useCardHover } from '../hooks/useCardHover';
import Logo from '../components/Logo';
import DashboardLayout from '../components/layout/DashboardLayout';

const cards = [
  { title: 'Projects', desc: 'Manage your AI projects in one place.' },
  { title: 'Analytics', desc: 'Visualise usage & performance insights.' },
  { title: 'Settings', desc: 'Personalise your HusAI workspace.' },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <header className="text-center mb-12 z-10">
        <h1 className="text-4xl md:text-5xl font-bold animate-glow">Welcome to your Dashboard</h1>
        <p className="text-text-secondary mt-2">Choose an action to get started</p>
      </header>

      <section className="grid gap-8 px-6 w-full max-w-6xl z-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(card => (
          <GlassCard key={card.title} {...card} />
        ))}
      </section>
    </DashboardLayout>
  );
}

function GlassCard({ title, desc }: { title: string; desc: string }) {
  const { style, handlers } = useCardHover(18);

  return (
    <motion.div
      className="glass-card p-8 rounded-3xl cursor-pointer select-none transform-gpu"
      style={style}
      whileTap={{ scale: 0.96 }}
      {...handlers}
    >
      <Logo size={44} className="mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-text-secondary leading-relaxed">{desc}</p>
    </motion.div>
  );
}
