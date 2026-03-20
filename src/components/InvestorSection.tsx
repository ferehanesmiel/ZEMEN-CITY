import { motion } from 'motion/react';
import { Download, Calendar, ArrowRight, TrendingUp, ShieldCheck, Globe } from 'lucide-react';

export default function InvestorSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <h3 className="text-4xl md:text-5xl font-black text-dark-blue tracking-tight leading-tight">
          Join the <span className="text-fire-orange">Digital Revolution</span> of Cities.
        </h3>
        <p className="text-lg text-dark-blue/60 leading-relaxed">
          Zemen Digital City is more than a platform—it's a sustainable, scalable, and highly profitable digital economy model designed for the next generation of African cities.
        </p>
        
        <div className="space-y-6">
          {[
            { icon: TrendingUp, title: 'High Growth Potential', desc: 'Capturing the rapidly growing digital commerce market in Ethiopia.' },
            { icon: ShieldCheck, title: 'Secure Infrastructure', desc: 'Blockchain-backed currency and verified data ecosystem.' },
            { icon: Globe, title: 'Scalable Model', desc: 'Modular architecture ready for expansion across the continent.' },
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-12 h-12 bg-fire-orange/10 rounded-2xl flex items-center justify-center shrink-0">
                <item.icon className="w-6 h-6 text-fire-orange" />
              </div>
              <div>
                <h4 className="font-bold text-dark-blue">{item.title}</h4>
                <p className="text-dark-blue/60 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button className="bg-fire-orange hover:bg-fire-orange/90 text-white font-black px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-xl shadow-fire-orange/20">
            <Download className="w-5 h-5" />
            Download Pitch Deck
          </button>
          <button className="bg-dark-blue hover:bg-dark-blue/90 text-white font-black px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-xl shadow-dark-blue/20">
            <Calendar className="w-5 h-5" />
            Request Meeting
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="bg-gradient-to-br from-dark-blue to-blue-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-fire-orange/20 blur-[80px] -mr-32 -mt-32 rounded-full" />
          
          <div className="relative z-10 space-y-8">
            <div className="space-y-2">
              <p className="text-fire-orange font-bold uppercase tracking-widest text-xs">Investment Opportunity</p>
              <h4 className="text-3xl font-black tracking-tight">Seed Round Open</h4>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <span className="text-white/60">Target Raise</span>
                <span className="text-2xl font-black">$2.5M USD</span>
              </div>
              <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <span className="text-white/60">Equity Offered</span>
                <span className="text-2xl font-black">15%</span>
              </div>
              <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <span className="text-white/60">Minimum Ticket</span>
                <span className="text-2xl font-black">$50K USD</span>
              </div>
            </div>

            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-sm font-bold text-fire-orange mb-2">Use of Funds:</p>
              <ul className="text-sm text-white/60 space-y-2">
                <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Tech Stack Scaling (40%)</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Market Expansion (30%)</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Operations & Team (20%)</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Marketing & PR (10%)</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
