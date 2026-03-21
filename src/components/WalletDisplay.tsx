import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, History, Coins, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';

export function WalletDisplay() {
  const { user, login } = useAuth();
  const { wallet, transactions, loading } = useWallet();

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-12 text-center space-y-6 flex flex-col items-center justify-center min-h-[400px]"
      >
        <div className="w-20 h-20 bg-orange-500/10 rounded-3xl flex items-center justify-center text-orange-500 mb-4">
          <WalletIcon size={40} />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-white tracking-tight">CENTRAL WALLET</h3>
          <p className="text-zinc-500 max-w-xs mx-auto">Login to access your SBR balance and manage transactions across the ecosystem.</p>
        </div>
        <button 
          onClick={login}
          className="flex items-center gap-2 px-8 py-3 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)]"
        >
          <LogIn size={20} />
          <span>Connect Wallet</span>
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-orange-600 to-orange-800 rounded-[40px] p-8 text-white shadow-2xl"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <WalletIcon size={120} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2 opacity-80">
            <Coins size={18} />
            <span className="text-sm font-medium uppercase tracking-wider">SBR Wallet Balance</span>
          </div>
          
          <div className="flex items-baseline gap-2">
            <motion.span
              key={wallet?.balance}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl font-black"
            >
              {(wallet?.balance || 0).toLocaleString()}
            </motion.span>
            <span className="text-xl font-medium opacity-80">SBR</span>
          </div>

          <div className="mt-2 text-sm font-bold text-white/60">
            ≈ {((wallet?.balance || 0) * 0.45).toLocaleString()} ETB
          </div>
          
          <div className="mt-8 flex gap-4">
            <button className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-md py-3 rounded-2xl flex items-center justify-center gap-2 transition-colors font-bold">
              <ArrowUpRight size={18} />
              <span>Send</span>
            </button>
            <button className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-md py-3 rounded-2xl flex items-center justify-center gap-2 transition-colors font-bold">
              <ArrowDownLeft size={18} />
              <span>Convert</span>
            </button>
          </div>
        </div>
      </motion.div>

      <div className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-white font-bold">
            <History size={20} className="text-orange-500" />
            <span className="uppercase tracking-widest text-sm">Recent Activity</span>
          </div>
          <button className="text-xs text-orange-500 hover:underline font-bold uppercase tracking-widest">View All</button>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {transactions.length === 0 ? (
              <div className="text-center py-12 text-zinc-500 text-sm italic">
                No recent transactions
              </div>
            ) : (
              transactions.map((tx) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-black/40 border border-white/5"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    tx.type === 'earn' ? 'bg-emerald-500/10 text-emerald-500' :
                    tx.type === 'spend' ? 'bg-orange-500/10 text-orange-500' :
                    'bg-blue-500/10 text-blue-500'
                  }`}>
                    {tx.type === 'earn' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white font-bold">{tx.description}</p>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
                      {tx.timestamp?.toDate ? tx.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                    </p>
                  </div>
                  <div className={`text-sm font-black ${
                    tx.type === 'earn' ? 'text-emerald-500' : 'text-orange-500'
                  }`}>
                    {tx.type === 'earn' ? '+' : '-'}{Math.abs(tx.amount)} SBR
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
