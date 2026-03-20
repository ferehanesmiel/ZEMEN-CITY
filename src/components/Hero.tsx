import React from 'react';
import { motion } from 'motion/react';
import { Globe, ArrowRight, Zap, Shield, Users, Coins } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-orange-500/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-widest"
          >
            <Zap size={14} />
            <span>The Operating System for Africa</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black text-white tracking-tight leading-[0.9]"
          >
            ZEMEN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              DIGITAL CITY
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-zinc-400 leading-relaxed"
          >
            A unified digital ecosystem connecting people, businesses, and logistics. 
            Powered by SBR, the future of traceable digital currency.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="w-full sm:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)]">
              <span>Explore Ecosystem</span>
              <ArrowRight size={20} />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-2xl border border-white/5 transition-all">
              View Whitepaper
            </button>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: 'Active Users', value: '125K+', icon: Users },
              { label: 'SBR Circulating', value: '4.2M', icon: Coins },
              { label: 'Cities Covered', value: '12', icon: Globe },
              { label: 'Secure Nodes', value: '850', icon: Shield },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-center gap-2 text-zinc-500 mb-1">
                  <stat.icon size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{stat.label}</span>
                </div>
                <p className="text-2xl font-black text-white tracking-tight">{stat.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Animated Coin */}
        <div className="mt-20 relative flex justify-center">
          <motion.div
            animate={{ 
              rotateY: [0, 360],
              y: [0, -20, 0]
            }}
            transition={{ 
              rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-orange-400 to-orange-700 p-1 shadow-[0_0_100px_rgba(249,115,22,0.4)] flex items-center justify-center"
            style={{ perspective: 1000 }}
          >
            <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center border-4 border-orange-500/50">
              <span className="text-4xl md:text-6xl font-black text-orange-500 tracking-tighter">SBR</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
