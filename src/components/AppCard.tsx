import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { AppInfo } from '../types';

interface AppCardProps {
  app: AppInfo;
  index: number;
  key?: string | number;
}

export default function AppCard({ app, index }: AppCardProps) {
  // @ts-ignore
  const Icon = LucideIcons[app.icon] || LucideIcons.HelpCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative bg-white rounded-3xl p-8 shadow-xl shadow-dark-blue/5 border border-dark-blue/5 overflow-hidden"
    >
      <div
        className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full opacity-10 transition-transform group-hover:scale-150"
        style={{ backgroundColor: app.color }}
      />
      
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg transition-transform group-hover:scale-110"
        style={{ backgroundColor: app.color }}
      >
        <Icon className="w-8 h-8 text-white" />
      </div>

      <h3 className="text-2xl font-black mb-4 tracking-tight text-dark-blue">{app.name}</h3>
      <p className="text-dark-blue/60 leading-relaxed mb-8">{app.description}</p>
      
      <motion.button
        whileHover={{ x: 5 }}
        className="flex items-center gap-2 text-fire-orange font-bold text-sm uppercase tracking-widest"
      >
        Explore App
        <LucideIcons.ArrowRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}
