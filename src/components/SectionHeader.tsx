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
          className="text-xs font-black uppercase tracking-[0.3em] text-fire-orange mb-4 block"
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-6xl font-black mt-4 mb-8 tracking-tighter text-white uppercase"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg leading-relaxed text-white/60 font-medium"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
