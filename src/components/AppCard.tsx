import React from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';

interface AppCardProps {
  name: string;
  description: string;
  icon: string;
  color: string;
  onClick: () => void;
  isActive?: boolean;
}

export function AppCard({ name, description, icon, color, onClick, isActive }: AppCardProps) {
  const IconComponent = (Icons as any)[icon];

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative w-full p-6 text-left rounded-2xl border transition-all duration-300 ${
        isActive 
          ? 'bg-zinc-900 border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.15)]' 
          : 'bg-zinc-900/50 border-white/5 hover:border-white/10'
      }`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color} bg-opacity-10`}>
        {IconComponent && <IconComponent className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
      <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
      
      {isActive && (
        <motion.div
          layoutId="active-glow"
          className="absolute inset-0 rounded-2xl bg-orange-500/5 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
    </motion.button>
  );
}
