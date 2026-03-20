import { motion } from 'motion/react';
import { ArrowRight, Play, TrendingUp, Globe, ShoppingBag, Truck, Heart, Search } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-dark-blue">
      {/* Background Animation Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-fire-orange/10 blur-[120px] -mr-96 -mt-96 rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 blur-[100px] -ml-72 -mb-72 rounded-full animate-pulse" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-fire-orange text-sm font-bold uppercase tracking-widest"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fire-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-fire-orange"></span>
              </span>
              Digitizing Ethiopia's Future
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]"
            >
              ZEMEN <br />
              <span className="text-fire-orange">DIGITAL</span> <br />
              CITY
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/60 max-w-xl leading-relaxed font-medium"
            >
              A unified platform connecting shops, users, and services through a smart digital economy powered by <span className="text-white font-bold">SBR (Scout Birr)</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <button className="bg-fire-orange hover:bg-fire-orange/90 text-white font-black px-10 py-5 rounded-2xl text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-2xl shadow-fire-orange/20 group">
                Explore Ecosystem
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white/5 hover:bg-white/10 text-white font-black px-10 py-5 rounded-2xl text-lg flex items-center justify-center gap-3 transition-all border border-white/10 backdrop-blur-md">
                <Play className="w-5 h-5 fill-white" />
                Live Demo
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-8 pt-8 border-t border-white/5"
            >
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt="User"
                    className="w-12 h-12 rounded-full border-4 border-dark-blue"
                  />
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-dark-blue bg-fire-orange flex items-center justify-center text-white font-bold text-xs">
                  +50k
                </div>
              </div>
              <p className="text-white/40 text-sm font-medium">
                Trusted by <span className="text-white font-bold">50,000+</span> users <br />
                across Adama City.
              </p>
            </motion.div>
          </div>

          {/* Visual Element: Floating Cards/Coins */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="relative"
            >
              {/* Central Coin */}
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="w-64 h-64 bg-fire-orange rounded-full flex items-center justify-center shadow-[0_0_100px_rgba(255,69,0,0.4)] relative z-20 mx-auto"
              >
                <div className="w-48 h-48 bg-white/10 rounded-full border-4 border-white/20 flex items-center justify-center">
                  <span className="text-7xl font-black text-white tracking-tighter">SBR</span>
                </div>
              </motion.div>

              {/* Floating App Icons */}
              {[
                { icon: ShoppingBag, color: 'bg-blue-500', pos: 'top-0 left-0', delay: 0 },
                { icon: Truck, color: 'bg-green-500', pos: 'top-0 right-0', delay: 1 },
                { icon: Heart, color: 'bg-red-500', pos: 'bottom-0 left-0', delay: 2 },
                { icon: Search, color: 'bg-purple-500', pos: 'bottom-0 right-0', delay: 3 },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: item.delay, ease: 'easeInOut' }}
                  className={`absolute ${item.pos} w-20 h-20 ${item.color} rounded-2xl flex items-center justify-center shadow-2xl z-30`}
                >
                  <item.icon className="w-10 h-10 text-white" />
                </motion.div>
              ))}

              {/* Orbiting Particles */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                className="absolute inset-0 -z-10"
              >
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 bg-fire-orange rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 45}deg) translate(200px)`,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
