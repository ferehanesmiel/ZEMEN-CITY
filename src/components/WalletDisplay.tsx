import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet, ArrowUpRight, ArrowDownLeft, History, Coins } from 'lucide-react';
import { useDemo } from '../context/DemoContext';

export function WalletDisplay() {
  const { balance, notifications } = useDemo();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-orange-600 to-orange-800 rounded-3xl p-8 text-white shadow-2xl"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Wallet size={120} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2 opacity-80">
            <Coins size={18} />
            <span className="text-sm font-medium uppercase tracking-wider">SBR Wallet Balance</span>
          </div>
          
          <div className="flex items-baseline gap-2">
            <motion.span
              key={balance}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl font-bold"
            >
              {balance.toLocaleString()}
            </motion.span>
            <span className="text-xl font-medium opacity-80">SBR</span>
          </div>
          
          <div className="mt-8 flex gap-4">
            <button className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-md py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
              <ArrowUpRight size={18} />
              <span>Send</span>
            </button>
            <button className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-md py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
              <ArrowDownLeft size={18} />
              <span>Receive</span>
            </button>
          </div>
        </div>
      </motion.div>

      <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-white font-semibold">
            <History size={20} className="text-orange-500" />
            <span>Recent Activity</span>
          </div>
          <button className="text-xs text-orange-500 hover:underline">View All</button>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-zinc-500 text-sm italic">
                No recent transactions
              </div>
            ) : (
              notifications.map((notif) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-800/50 border border-white/5"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    notif.type === 'reward' ? 'bg-emerald-500/10 text-emerald-500' :
                    notif.type === 'payment' ? 'bg-orange-500/10 text-orange-500' :
                    'bg-blue-500/10 text-blue-500'
                  }`}>
                    {notif.type === 'reward' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">{notif.message}</p>
                    <p className="text-xs text-zinc-500">
                      {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(notif.timestamp)}
                    </p>
                  </div>
                  <div className={`text-sm font-bold ${
                    notif.type === 'reward' ? 'text-emerald-500' : 'text-orange-500'
                  }`}>
                    {notif.type === 'reward' ? '+' : '-'}{Math.floor(Math.random() * 50) + 10} SBR
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
