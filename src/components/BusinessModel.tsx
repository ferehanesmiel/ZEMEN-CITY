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
  TrendingUp,
  BarChart3
} from 'lucide-react';

const REVENUE_STREAMS = [
  { name: 'Shop Subscriptions', icon: ShoppingCart, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { name: 'Pharmacy Subscriptions', icon: Stethoscope, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { name: 'Service Provider Fees', icon: Wrench, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  { name: 'Farmer Commission', icon: Sprout, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { name: 'Delivery Commissions', icon: Truck, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { name: 'Promotions & Ads', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { name: 'Sponsored Projects', icon: Heart, color: 'text-red-500', bg: 'bg-red-500/10' },
  { name: 'Data Insights', icon: BarChart3, color: 'text-blue-400', bg: 'bg-blue-400/10' },
];

export function BusinessModel() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {REVENUE_STREAMS.map((stream, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl flex flex-col items-center text-center gap-4 transition-all hover:border-white/10"
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stream.bg} ${stream.color}`}>
            <stream.icon size={24} />
          </div>
          <h4 className="text-sm font-semibold text-white leading-tight">{stream.name}</h4>
        </motion.div>
      ))}
    </div>
  );
}
