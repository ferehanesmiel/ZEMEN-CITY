import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingCart, 
  MapPin, 
  Truck, 
  Heart, 
  Sprout, 
  Stethoscope, 
  Wrench,
  LayoutDashboard,
  TrendingUp,
  BarChart3,
  Users,
  Zap,
  Shield,
  Coins
} from 'lucide-react';
import { DemoProvider } from './context/DemoContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AppCard } from './components/AppCard';
import { WalletDisplay } from './components/WalletDisplay';
import { DemoSimulation } from './components/DemoSimulation';
import { BusinessModel } from './components/BusinessModel';
import { Roadmap } from './components/Roadmap';
import { Footer } from './components/Footer';

const APPS = [
  { id: 'market', name: 'Smart Market', description: 'Browse and buy products from local shops using SBR.', icon: 'ShoppingCart', color: 'text-orange-500' },
  { id: 'scout', name: 'Adama Scout', description: 'Collect city data, verify locations, and earn SBR rewards.', icon: 'MapPin', color: 'text-orange-500' },
  { id: 'runner', name: 'Runner Link', description: 'Real-time logistics and delivery powered by local runners.', icon: 'Truck', color: 'text-orange-500' },
  { id: 'heart', name: 'Blooming Heart', description: 'Support social impact projects and track your donations.', icon: 'Heart', color: 'text-red-500' },
  { id: 'farm', name: 'Farm Link', description: 'Direct marketplace connecting farmers to urban markets.', icon: 'Sprout', color: 'text-emerald-500' },
  { id: 'pharma', name: 'Pharma Link', description: 'Access essential medicines and healthcare services.', icon: 'Stethoscope', color: 'text-blue-500' },
  { id: 'hub', name: 'Service Hub', description: 'Book verified local service providers and professionals.', icon: 'Wrench', color: 'text-yellow-500' },
];

function App() {
  const [activeApp, setActiveApp] = useState('market');

  return (
    <DemoProvider>
      <ToastProvider>
        <div className="min-h-screen bg-black text-zinc-400 font-sans selection:bg-orange-500 selection:text-white">
          <Navbar />
          
          <main>
            <Hero />

            {/* Ecosystem Section */}
            <section className="py-24 bg-zinc-950/50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-12">
                  {/* Left: App Selection */}
                  <div className="w-full md:w-1/3 space-y-4">
                    <div className="mb-8">
                      <h2 className="text-3xl font-black text-white mb-2 tracking-tight">ECOSYSTEM</h2>
                      <p className="text-sm text-zinc-500">Select a module to explore the digital city simulation.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {APPS.map((app) => (
                        <React.Fragment key={app.id}>
                          <AppCard
                            name={app.name}
                            description={app.description}
                            icon={app.icon}
                            color={app.color}
                            isActive={activeApp === app.id}
                            onClick={() => setActiveApp(app.id)}
                          />
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Right: Simulation & Wallet */}
                  <div className="flex-1 space-y-8">
                    <div className="sticky top-24 space-y-8">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                              <Zap size={20} className="text-orange-500" />
                              Live Simulation
                            </h3>
                            <div className="flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-orange-500 text-[10px] font-bold uppercase tracking-widest rounded-full border border-orange-500/20">
                              Demo Mode Active
                            </div>
                          </div>
                          <DemoSimulation activeApp={activeApp} />
                        </div>
                        <WalletDisplay />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Business Model Section */}
            <section className="py-24 border-t border-white/5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 space-y-4">
                  <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">BUSINESS MODEL</h2>
                  <p className="max-w-2xl mx-auto text-zinc-500">A sustainable, multi-stream revenue engine designed for scalability across Africa.</p>
                </div>
                <BusinessModel />
              </div>
            </section>

            {/* Roadmap Section */}
            <section className="py-24 bg-zinc-950/50 border-t border-white/5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                  <div className="space-y-8 sticky top-24">
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">PROJECT ROADMAP</h2>
                    <p className="text-lg text-zinc-500 leading-relaxed">
                      Our phased approach ensures stability and scalability. We are currently in Phase 3, 
                      expanding our logistics network across major urban centers.
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl">
                        <p className="text-3xl font-black text-white mb-1">8</p>
                        <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Strategic Phases</p>
                      </div>
                      <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl">
                        <p className="text-3xl font-black text-orange-500 mb-1">3</p>
                        <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Phases Completed</p>
                      </div>
                    </div>
                  </div>
                  <Roadmap />
                </div>
              </div>
            </section>

            {/* Admin Preview Section */}
            <section className="py-24 border-t border-white/5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/5 rounded-[40px] p-12 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 opacity-5">
                    <LayoutDashboard size={300} />
                  </div>
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-500/20">
                        Admin Controls
                      </div>
                      <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">CITY OPERATING SYSTEM</h2>
                      <p className="text-zinc-500 leading-relaxed">
                        Centralized monitoring for city officials and platform administrators. 
                        Track real-time logistics, market health, and social impact metrics.
                      </p>
                      <ul className="space-y-4">
                        {[
                          { text: 'Real-time SBR Transaction Monitoring', icon: BarChart3 },
                          { text: 'Logistics & Runner Network Management', icon: Truck },
                          { text: 'Shop & Service Provider Verification', icon: Shield },
                          { text: 'Social Impact & Donation Tracking', icon: Heart },
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-orange-500">
                              <item.icon size={16} />
                            </div>
                            {item.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-8 bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl space-y-2">
                        <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Network Load</p>
                        <p className="text-3xl font-black text-white">84%</p>
                        <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="w-[84%] h-full bg-orange-500" />
                        </div>
                      </div>
                      <div className="p-8 bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl space-y-2">
                        <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Active Nodes</p>
                        <p className="text-3xl font-black text-emerald-500">Online</p>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-2 h-2 rounded-full bg-emerald-500" />)}
                        </div>
                      </div>
                      <div className="col-span-2 p-8 bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl space-y-4">
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">City Growth Rate</p>
                          <TrendingUp size={16} className="text-emerald-500" />
                        </div>
                        <div className="flex items-end gap-2 h-20">
                          {[40, 60, 45, 70, 85, 65, 90].map((h, i) => (
                            <motion.div
                              key={i}
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              className="flex-1 bg-orange-500/20 border-t-2 border-orange-500 rounded-t-sm"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <Footer />
        </div>
      </ToastProvider>
    </DemoProvider>
  );
}

export default App;
