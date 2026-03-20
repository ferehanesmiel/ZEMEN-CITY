import { motion } from 'motion/react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  light?: boolean;
}

export default function SectionHeader({ title, subtitle, description, light = false }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl mx-auto text-center mb-16 px-4">
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-sm font-bold uppercase tracking-widest ${light ? 'text-fire-orange/80' : 'text-fire-orange'}`}
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`text-4xl md:text-5xl font-black mt-4 mb-6 tracking-tight ${light ? 'text-white' : 'text-dark-blue'}`}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`text-lg leading-relaxed ${light ? 'text-white/70' : 'text-dark-blue/70'}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
