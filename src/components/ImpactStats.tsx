import { motion } from 'motion/react';
import { Users, ShoppingBag, Truck, Heart, Globe, BarChart3 } from 'lucide-react';

const IMPACT_STATS = [
  { label: 'Local Businesses Empowered', value: '450+', icon: ShoppingBag, color: 'bg-fire-orange' },
  { label: 'Jobs Created for Riders', value: '1,200+', icon: Truck, color: 'bg-blue-500' },
  { label: 'Cities Digitized', value: '3', icon: Globe, color: 'bg-green-500' },
  { label: 'Community Projects Funded', value: '25+', icon: Heart, color: 'bg-red-500' },
  { label: 'Active SBR Users', value: '50K+', icon: Users, color: 'bg-purple-500' },
  { label: 'Transaction Volume', value: '2.5M SBR', icon: BarChart3, color: 'bg-yellow-500' },
];

export default function ImpactStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
      {IMPACT_STATS.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center group hover:bg-white/10 transition-all"
        >
          <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
            <stat.icon className="w-7 h-7 text-white" />
          </div>
          <h4 className="text-4xl font-black text-white mb-2 tracking-tighter">{stat.value}</h4>
          <p className="text-white/40 text-sm font-bold uppercase tracking-widest">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
