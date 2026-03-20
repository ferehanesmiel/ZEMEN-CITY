import { motion } from 'motion/react';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';

const PHASES = [
  { phase: 'Phase 1', title: 'Smart Market', status: 'completed', desc: 'E-commerce platform launch with local shop integration.' },
  { phase: 'Phase 2', title: 'Adama Scout', status: 'completed', desc: 'City data crowdsourcing and verification system.' },
  { phase: 'Phase 3', title: 'Runner Link', status: 'current', desc: 'Logistics and delivery network for on-demand services.' },
  { phase: 'Phase 4', title: 'Blooming Heart', status: 'upcoming', desc: 'Social impact and transparent donation tracking.' },
  { phase: 'Phase 5', title: 'Full SBR Ecosystem', status: 'upcoming', desc: 'Centralized digital currency across all apps.' },
  { phase: 'Phase 6', title: 'Expansion', status: 'upcoming', desc: 'Scaling the Zemen ecosystem to other major cities.' },
];

export default function Roadmap() {
  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-dark-blue/10 hidden lg:block" />

      <div className="space-y-12 lg:space-y-0">
        {PHASES.map((phase, i) => (
          <div key={i} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-0 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`lg:w-1/2 p-8 bg-white rounded-3xl shadow-xl shadow-dark-blue/5 border border-dark-blue/5 relative z-10 ${i % 2 === 0 ? 'lg:mr-12' : 'lg:ml-12'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-fire-orange font-black uppercase tracking-widest text-xs">{phase.phase}</span>
                {phase.status === 'completed' ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : phase.status === 'current' ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-3 h-3 bg-fire-orange rounded-full"
                  />
                ) : (
                  <Circle className="w-5 h-5 text-dark-blue/10" />
                )}
              </div>
              <h4 className="text-2xl font-black text-dark-blue mb-4 tracking-tight">{phase.title}</h4>
              <p className="text-dark-blue/60 leading-relaxed">{phase.desc}</p>
            </motion.div>

            {/* Dot on line */}
            <div className="hidden lg:flex w-12 h-12 bg-dark-blue rounded-full items-center justify-center z-20 shadow-xl border-4 border-white">
              <div className={`w-4 h-4 rounded-full ${phase.status === 'completed' ? 'bg-green-500' : phase.status === 'current' ? 'bg-fire-orange' : 'bg-white/20'}`} />
            </div>

            {/* Spacer for other side */}
            <div className="hidden lg:block lg:w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
