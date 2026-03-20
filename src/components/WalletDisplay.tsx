import { motion } from 'motion/react';
import { Wallet, ArrowUpRight, ArrowDownLeft, Heart, Recycle, TrendingUp, ShieldCheck, History } from 'lucide-react';
import { Transaction } from '../types';

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', type: 'earn', amount: 250, description: 'Adama Scout Data Verification', timestamp: '2 hours ago' },
  { id: '2', type: 'spend', amount: 1250, description: 'Smart Market: Cement Order', timestamp: '5 hours ago' },
  { id: '3', type: 'donate', amount: 50, description: 'Blooming Heart: Tree Planting', timestamp: 'Yesterday' },
  { id: '4', type: 'recycle', amount: 100, description: 'Plastic Bottle Recycling Reward', timestamp: '2 days ago' },
];

export default function WalletDisplay() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Main Wallet Card */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="lg:col-span-7 bg-gradient-to-br from-fire-orange to-orange-600 rounded-[3rem] p-10 text-white shadow-2xl shadow-fire-orange/20 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[60px] -mr-32 -mt-32 rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 blur-[60px] -ml-32 -mb-32 rounded-full" />

        <div className="relative z-10 space-y-12">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-white/70 font-bold uppercase tracking-widest text-xs">Total Balance</p>
              <h3 className="text-6xl font-black tracking-tighter">3,450 <span className="text-3xl text-white/80">SBR</span></h3>
              <p className="text-white/60 font-medium">≈ 10,350.00 ETB</p>
            </div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
              <Wallet className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <ArrowUpRight className="w-5 h-5 text-green-300" />
                <span className="text-white/70 font-bold text-sm">Earned</span>
              </div>
              <p className="text-2xl font-black">+1,200 SBR</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <ArrowDownLeft className="w-5 h-5 text-red-300" />
                <span className="text-white/70 font-bold text-sm">Spent</span>
              </div>
              <p className="text-2xl font-black">-850 SBR</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
            <ShieldCheck className="w-6 h-6 text-white/60" />
            <p className="text-sm text-white/60 leading-relaxed">
              Your SBR is secured by the <span className="text-white font-bold">Zemen Blockchain</span>. Every coin has a unique traceable ID.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Transaction History */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="lg:col-span-5 bg-white rounded-[3rem] p-10 shadow-xl shadow-dark-blue/5 border border-dark-blue/5"
      >
        <div className="flex items-center justify-between mb-8">
          <h4 className="text-2xl font-black text-dark-blue flex items-center gap-3 tracking-tight">
            <History className="w-6 h-6 text-fire-orange" />
            Activity
          </h4>
          <button className="text-fire-orange font-bold text-sm hover:underline">View All</button>
        </div>

        <div className="space-y-6">
          {MOCK_TRANSACTIONS.map((tx) => (
            <div key={tx.id} className="flex items-center gap-4 group">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                tx.type === 'earn' ? 'bg-green-100 text-green-600' :
                tx.type === 'spend' ? 'bg-blue-100 text-blue-600' :
                tx.type === 'donate' ? 'bg-red-100 text-red-600' :
                'bg-orange-100 text-orange-600'
              }`}>
                {tx.type === 'earn' ? <TrendingUp className="w-5 h-5" /> :
                 tx.type === 'spend' ? <ArrowDownLeft className="w-5 h-5" /> :
                 tx.type === 'donate' ? <Heart className="w-5 h-5" /> :
                 <Recycle className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <h5 className="font-bold text-dark-blue">{tx.description}</h5>
                <p className="text-dark-blue/40 text-xs">{tx.timestamp}</p>
              </div>
              <div className={`font-black ${
                tx.type === 'earn' ? 'text-green-600' : 'text-dark-blue'
              }`}>
                {tx.type === 'earn' ? '+' : '-'}{tx.amount} SBR
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 bg-dark-blue rounded-2xl text-white">
          <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Coin ID Concept</p>
          <p className="text-sm leading-relaxed">
            Every SBR coin is traceable. You can see exactly where your donated coins are being used in real-time.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
