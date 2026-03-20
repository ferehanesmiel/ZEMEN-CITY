import React from 'react';
import { motion } from 'motion/react';
import { 
  ShoppingCart, 
  MapPin, 
  Truck, 
  Heart, 
  Sprout, 
  Stethoscope, 
  Wrench,
  Globe,
  CheckCircle2
} from 'lucide-react';

const PHASES = [
  { phase: 1, title: 'Smart Market', icon: ShoppingCart, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { phase: 2, title: 'Zemen Scout', icon: MapPin, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { phase: 3, title: 'Runner Link', icon: Truck, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { phase: 4, title: 'Blooming Heart', icon: Heart, color: 'text-red-500', bg: 'bg-red-500/10' },
  { phase: 5, title: 'Farm Link', icon: Sprout, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { phase: 6, title: 'Pharma Link', icon: Stethoscope, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { phase: 7, title: 'Service Hub', icon: Wrench, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  { phase: 8, title: 'National Expansion', icon: Globe, color: 'text-blue-400', bg: 'bg-blue-400/10' },
];

export function Roadmap() {
  return (
    <div className="relative space-y-8">
      <div className="absolute left-8 top-4 bottom-4 w-px bg-zinc-800" />
      
      {PHASES.map((phase, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="relative flex items-center gap-6 group"
        >
          <div className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center ${phase.bg} ${phase.color} border border-white/5 group-hover:border-white/20 transition-all`}>
            <phase.icon size={28} />
            {i < 3 && (
              <div className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow-lg">
                <CheckCircle2 size={12} />
              </div>
            )}
          </div>
          
          <div className="flex-1 p-6 bg-zinc-900/50 border border-white/5 rounded-2xl group-hover:border-white/10 transition-all">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Phase {phase.phase}</span>
              {i < 3 && <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Completed</span>}
            </div>
            <h4 className="text-lg font-bold text-white">{phase.title}</h4>
            <p className="text-sm text-zinc-500 mt-1">
              {i < 3 ? 'Fully integrated and operational' : 'Development and integration in progress'}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
