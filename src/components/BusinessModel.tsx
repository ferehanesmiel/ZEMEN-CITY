import { motion } from 'motion/react';
import { DollarSign, BarChart3, Users, Truck, ShoppingBag, Heart, ShieldCheck, Zap } from 'lucide-react';

const REVENUE_STREAMS = [
  { icon: ShoppingBag, label: 'Shop Subscriptions', desc: 'Monthly fees for premium shop features', color: '#FF4500' },
  { icon: Zap, label: 'Product Promotions', desc: 'Featured placement in Smart Market', color: '#FFD700' },
  { icon: Truck, label: 'Delivery Commissions', desc: 'Small fee per Runner Link delivery', color: '#001F3F' },
  { icon: Users, label: 'Runner Subscriptions', desc: 'Access to high-volume delivery routes', color: '#4A90E2' },
  { icon: Heart, label: 'Sponsored Projects', desc: 'Corporate social impact partnerships', color: '#E02424' },
  { icon: BarChart3, label: 'Data Insights', desc: 'Anonymized city commerce analytics', color: '#10B981' },
];

export default function BusinessModel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {REVENUE_STREAMS.map((stream, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="bg-white rounded-3xl p-8 shadow-xl shadow-dark-blue/5 border border-dark-blue/5 group hover:bg-dark-blue transition-all duration-500"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform"
            style={{ backgroundColor: stream.color }}
          >
            <stream.icon className="w-7 h-7 text-white" />
          </div>
          <h4 className="text-xl font-black mb-3 text-dark-blue group-hover:text-white transition-colors tracking-tight">
            {stream.label}
          </h4>
          <p className="text-dark-blue/60 group-hover:text-white/60 transition-colors leading-relaxed">
            {stream.desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
