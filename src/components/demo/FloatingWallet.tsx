import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export default function FloatingWallet() {
  const { balance } = useDemo();
  const [prevBalance, setPrevBalance] = useState(balance);
  const [showChange, setShowChange] = useState<number | null>(null);

  useEffect(() => {
    if (balance !== prevBalance) {
      const diff = balance - prevBalance;
      setShowChange(diff);
      setPrevBalance(balance);
      const timer = setTimeout(() => setShowChange(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [balance, prevBalance]);

  return (
    <div className="fixed top-24 right-4 z-[60] pointer-events-none sm:right-8">
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="pointer-events-auto glass-card rounded-2xl p-4 flex items-center gap-4 shadow-[0_0_30px_rgba(255,106,0,0.2)] border-fire-orange/20"
      >
        <div className="w-12 h-12 bg-gradient-to-br from-fire-orange to-gold-accent rounded-xl flex items-center justify-center shadow-lg">
          <Wallet className="w-6 h-6 text-white" />
        </div>
        
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">SBR Balance</span>
          <div className="flex items-baseline gap-2">
            <motion.span
              key={balance}
              initial={{ scale: 1.2, color: '#ff6a00' }}
              animate={{ scale: 1, color: '#ffffff' }}
              className="text-2xl font-black tracking-tighter"
            >
              {balance.toLocaleString()}
            </motion.span>
            <span className="text-xs font-black text-fire-orange">SBR</span>
          </div>
        </div>

        <AnimatePresence>
          {showChange !== null && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: -40, opacity: 1 }}
              exit={{ y: -60, opacity: 0 }}
              className={`absolute right-0 font-black text-lg ${showChange > 0 ? 'text-green-500' : 'text-red-500'}`}
            >
              {showChange > 0 ? <TrendingUp className="inline w-4 h-4 mr-1" /> : <TrendingDown className="inline w-4 h-4 mr-1" />}
              {showChange > 0 ? '+' : ''}{showChange}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
