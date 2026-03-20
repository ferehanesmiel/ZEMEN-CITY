import { motion } from 'motion/react';
import { BarChart3, Users, ShoppingBag, Truck, Heart, TrendingUp, ShieldCheck, Activity } from 'lucide-react';

const DASHBOARD_STATS = [
  { label: 'Total SBR in Circulation', value: '1,250,000', icon: TrendingUp, color: 'text-fire-orange' },
  { label: 'Active SBR Users', value: '52,430', icon: Users, color: 'text-blue-500' },
  { label: 'Active Smart Shops', value: '458', icon: ShoppingBag, color: 'text-green-500' },
  { label: 'Active Runners', value: '1,240', icon: Truck, color: 'text-purple-500' },
  { label: 'Total Donations', value: '250,000 SBR', icon: Heart, color: 'text-red-500' },
  { label: 'System Security Status', value: 'Optimal', icon: ShieldCheck, color: 'text-emerald-500' },
];

export default function AdminDashboard() {
  return (
    <div className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-dark-blue/5 border border-dark-blue/5 overflow-hidden relative">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-dark-blue rounded-2xl flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-3xl font-black text-dark-blue tracking-tight">Control <span className="text-fire-orange">Dashboard</span></h3>
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-bold border border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Live System Monitoring
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DASHBOARD_STATS.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-dark-blue/5 rounded-3xl p-8 border border-dark-blue/5 group hover:bg-dark-blue transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <BarChart3 className="w-5 h-5 text-dark-blue/20 group-hover:text-white/20" />
            </div>
            <h4 className="text-3xl font-black text-dark-blue group-hover:text-white transition-colors tracking-tighter mb-2">{stat.value}</h4>
            <p className="text-dark-blue/40 group-hover:text-white/40 transition-colors text-sm font-bold uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 p-8 bg-fire-orange rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2">
          <h4 className="text-2xl font-black tracking-tight">System Health: 99.9%</h4>
          <p className="text-white/80">Blockchain nodes are synchronized and processing transactions in real-time.</p>
        </div>
        <button className="bg-white text-fire-orange font-black px-8 py-4 rounded-2xl shadow-xl shadow-black/10 transition-all transform hover:scale-105 hover:bg-white/90">
          Access Full Admin Panel
        </button>
      </div>
    </div>
  );
}
