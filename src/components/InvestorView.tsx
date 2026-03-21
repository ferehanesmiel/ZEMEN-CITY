import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Users, Truck, BarChart3, ArrowRight, Zap, Globe } from 'lucide-react';

export function InvestorView() {
  const [userCount, setUserCount] = useState(10000);
  
  const calculateRevenue = (users: number) => {
    // Simplified model: $5 per user per month from various streams
    return users * 5;
  };

  const stats = [
    { label: 'Projected Users', value: userCount.toLocaleString(), icon: Users, color: 'text-blue-500' },
    { label: 'Monthly Revenue', value: `$${calculateRevenue(userCount).toLocaleString()}`, icon: TrendingUp, color: 'text-emerald-500' },
    { label: 'SBR Circulation', value: (userCount * 100).toLocaleString(), icon: Zap, color: 'text-orange-500' },
    { label: 'Daily Deliveries', value: (userCount * 0.15).toFixed(0), icon: Truck, color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-zinc-900/50 border border-white/5 rounded-3xl space-y-4"
          >
            <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">{stat.label}</p>
              <p className="text-2xl font-black text-white">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 bg-zinc-900/50 border border-white/5 rounded-[40px] space-y-8">
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white tracking-tight">GROWTH SIMULATOR</h3>
            <p className="text-sm text-zinc-500">Adjust user base to see projected ecosystem revenue.</p>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-bold uppercase tracking-widest">
                <span className="text-zinc-500">User Base</span>
                <span className="text-orange-500">{userCount.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="1000000"
                step="1000"
                value={userCount}
                onChange={(e) => setUserCount(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>

            <div className="p-6 bg-black/40 border border-white/5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-400">Projected Annual Revenue</p>
                <p className="text-xl font-black text-emerald-500">${(calculateRevenue(userCount) * 12).toLocaleString()}</p>
              </div>
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(userCount / 1000000) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-[40px] text-white space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Globe size={200} />
          </div>
          <div className="relative z-10 space-y-6">
            <h3 className="text-3xl font-black tracking-tight leading-none">READY TO SCALE ACROSS ETHIOPIA</h3>
            <p className="text-white/80 leading-relaxed">
              Our modular architecture allows us to deploy Zemen Digital City in any urban center within weeks. 
              We are building the digital backbone for the next generation of African smart cities.
            </p>
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-orange-600 font-bold rounded-xl hover:bg-zinc-100 transition-colors">
              Download Pitch Deck <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
