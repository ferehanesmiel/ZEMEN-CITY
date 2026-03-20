import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingCart, 
  MapPin, 
  Truck, 
  Heart, 
  Sprout, 
  Stethoscope, 
  Wrench,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Users,
  Activity,
  Package,
  Map as MapIcon,
  Search,
  Plus,
  Zap
} from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { useToast } from '../context/ToastContext';

interface SimulationProps {
  activeApp: string;
}

export function DemoSimulation({ activeApp }: SimulationProps) {
  const { updateBalance, addNotification, setActiveRunners, setTotalDonations } = useDemo();
  const { addToast } = useToast();
  const [step, setStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    setStep(0);
    setIsSimulating(false);
  }, [activeApp]);

  const handleAction = async (action: string, amount: number, message: string, type: 'reward' | 'payment') => {
    setIsSimulating(true);
    addToast(`Processing ${action}...`, 'info');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    updateBalance(amount);
    addNotification(message, type);
    addToast(message, type === 'reward' ? 'success' : 'info');
    setStep(prev => prev + 1);
    setIsSimulating(false);
  };

  const renderSimulation = () => {
    switch (activeApp) {
      case 'market':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Fresh Teff', price: 45, img: 'https://picsum.photos/seed/teff/200/200' },
                { name: 'Organic Coffee', price: 85, img: 'https://picsum.photos/seed/coffee/200/200' },
                { name: 'Local Honey', price: 120, img: 'https://picsum.photos/seed/honey/200/200' },
                { name: 'Spices Mix', price: 35, img: 'https://picsum.photos/seed/spices/200/200' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="bg-zinc-800/50 border border-white/5 rounded-2xl p-4 flex flex-col gap-3"
                >
                  <img src={item.img} alt={item.name} className="w-full h-24 object-cover rounded-xl" />
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-medium text-white">{item.name}</h4>
                      <p className="text-xs text-orange-500 font-bold">{item.price} SBR</p>
                    </div>
                    <button 
                      onClick={() => handleAction('Purchase', -item.price, `Ordered ${item.name} from Smart Market`, 'payment')}
                      disabled={isSimulating}
                      className="p-2 bg-orange-500 rounded-lg text-white hover:bg-orange-600 transition-colors disabled:opacity-50"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <AnimatePresence>
              {step > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                    <Truck size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Runner Assigned</p>
                    <p className="text-xs text-zinc-400">Delivery in progress to your location</p>
                  </div>
                  <div className="ml-auto">
                    <Zap size={16} className="text-orange-500 animate-pulse" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      case 'scout':
        return (
          <div className="space-y-6">
            <div className="bg-zinc-800/50 border border-white/5 rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <MapIcon size={120} />
              </div>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Search size={20} className="text-orange-500" />
                Active Scout Missions
              </h4>
              <div className="space-y-4">
                {[
                  { title: 'Verify Shop Location', reward: 15, icon: MapPin },
                  { title: 'Update Price Data', reward: 10, icon: TrendingUp },
                  { title: 'Street Mapping', reward: 25, icon: Activity },
                ].map((mission, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                        <mission.icon size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{mission.title}</p>
                        <p className="text-xs text-zinc-500">Earn {mission.reward} SBR</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleAction('Verification', mission.reward, `Earned ${mission.reward} SBR for ${mission.title}`, 'reward')}
                      disabled={isSimulating}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50"
                    >
                      Verify
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-800/50 rounded-2xl border border-white/5">
                <p className="text-xs text-zinc-500 mb-1 uppercase tracking-wider font-bold">Your Rank</p>
                <p className="text-xl font-bold text-white">City Scout #12</p>
              </div>
              <div className="p-4 bg-zinc-800/50 rounded-2xl border border-white/5">
                <p className="text-xs text-zinc-500 mb-1 uppercase tracking-wider font-bold">Total Earned</p>
                <p className="text-xl font-bold text-orange-500">450 SBR</p>
              </div>
            </div>
          </div>
        );

      case 'runner':
        return (
          <div className="space-y-6">
            <div className="bg-zinc-800/50 border border-white/5 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-semibold text-white">Runner Dashboard</h4>
                <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-full border border-emerald-500/20">
                  Online
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white">
                        <Package size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">New Delivery Request</p>
                        <p className="text-xs text-zinc-400">2.4 km away • 15 SBR</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        handleAction('Delivery', 15, 'Delivery completed! Earned 15 SBR', 'reward');
                        setActiveRunners(prev => prev + 1);
                      }}
                      disabled={isSimulating}
                      className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-50"
                    >
                      Accept & Deliver
                    </button>
                    <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-bold rounded-xl transition-colors">
                      Decline
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-zinc-900/50 rounded-2xl border border-white/5">
                    <p className="text-xs text-zinc-500 mb-1">Today's Deliveries</p>
                    <p className="text-xl font-bold text-white">8</p>
                  </div>
                  <div className="p-4 bg-zinc-900/50 rounded-2xl border border-white/5">
                    <p className="text-xs text-zinc-500 mb-1">Today's Earnings</p>
                    <p className="text-xl font-bold text-emerald-500">120 SBR</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'heart':
        return (
          <div className="space-y-6">
            <div className="bg-zinc-800/50 border border-white/5 rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Heart size={120} className="text-red-500" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-4">Blooming Heart Impact</h4>
              <p className="text-sm text-zinc-400 mb-6">Support local community projects and track your social impact in real-time.</p>
              
              <div className="space-y-4">
                {[
                  { title: 'Community Garden', target: 5000, current: 3450, icon: Sprout },
                  { title: 'School Supplies', target: 2000, current: 1850, icon: Users },
                ].map((project, i) => (
                  <div key={i} className="p-4 bg-zinc-900/50 rounded-2xl border border-white/5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                          <project.icon size={20} />
                        </div>
                        <p className="text-sm font-bold text-white">{project.title}</p>
                      </div>
                      <button 
                        onClick={() => {
                          handleAction('Donation', -50, `Donated 50 SBR to ${project.title}`, 'payment');
                          setTotalDonations(prev => prev + 50);
                        }}
                        disabled={isSimulating}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50"
                      >
                        Donate 50 SBR
                      </button>
                    </div>
                    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(project.current / project.target) * 100}%` }}
                        className="h-full bg-red-500"
                      />
                    </div>
                    <div className="flex justify-between mt-2">
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Progress</p>
                      <p className="text-[10px] text-zinc-500 font-bold">{Math.round((project.current / project.target) * 100)}% Funded</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'farm':
        return (
          <div className="space-y-6">
            <div className="bg-zinc-800/50 border border-white/5 rounded-3xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Sprout size={20} className="text-emerald-500" />
                Farm Link Marketplace
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { name: 'Bulk Teff (100kg)', price: 4500, farmer: 'Abebe F.', location: 'Gojjam' },
                  { name: 'Coffee Beans (50kg)', price: 3200, farmer: 'Sara M.', location: 'Jimma' },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-zinc-900/50 rounded-2xl border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">{item.name}</p>
                      <p className="text-xs text-zinc-500">Farmer: {item.farmer} • {item.location}</p>
                      <p className="text-sm text-emerald-500 font-bold mt-1">{item.price} SBR</p>
                    </div>
                    <button 
                      onClick={() => handleAction('Wholesale', -item.price, `Purchased ${item.name} from Farm Link`, 'payment')}
                      disabled={isSimulating}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50"
                    >
                      Buy Bulk
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'pharma':
        return (
          <div className="space-y-6">
            <div className="bg-zinc-800/50 border border-white/5 rounded-3xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Stethoscope size={20} className="text-blue-500" />
                Pharma Link
              </h4>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Search medicine or pharmacy..." 
                  className="w-full bg-zinc-900 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Pain Relief', pharmacy: 'City Pharma', price: 45, stock: 'In Stock' },
                  { name: 'Vitamin C', pharmacy: 'Health First', price: 85, stock: 'In Stock' },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-zinc-900/50 rounded-2xl border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">{item.name}</p>
                      <p className="text-xs text-zinc-500">{item.pharmacy} • {item.stock}</p>
                      <p className="text-sm text-blue-500 font-bold mt-1">{item.price} SBR</p>
                    </div>
                    <button 
                      onClick={() => handleAction('Pharmacy', -item.price, `Ordered ${item.name} from Pharma Link`, 'payment')}
                      disabled={isSimulating}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50"
                    >
                      Order
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'hub':
        return (
          <div className="space-y-6">
            <div className="bg-zinc-800/50 border border-white/5 rounded-3xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Wrench size={20} className="text-yellow-500" />
                Service Hub
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'Plumbing', provider: 'FixIt Pro', price: 150, icon: Wrench },
                  { name: 'Electrician', provider: 'Volt Masters', price: 200, icon: Zap },
                  { name: 'Cleaning', provider: 'Pure Clean', price: 100, icon: Activity },
                  { name: 'IT Support', provider: 'Tech Help', price: 250, icon: Search },
                ].map((service, i) => (
                  <div key={i} className="p-4 bg-zinc-900/50 rounded-2xl border border-white/5 flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                      <service.icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{service.name}</p>
                      <p className="text-xs text-zinc-500">{service.provider}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm font-bold text-yellow-500">{service.price} SBR</p>
                      <button 
                        onClick={() => handleAction('Service', -service.price, `Booked ${service.name} from Service Hub`, 'payment')}
                        disabled={isSimulating}
                        className="p-2 bg-yellow-500 rounded-lg text-white hover:bg-yellow-600 transition-colors disabled:opacity-50"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-[500px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeApp}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderSimulation()}
        </motion.div>
      </AnimatePresence>

      {isSimulating && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] rounded-3xl flex items-center justify-center z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"
          />
        </div>
      )}
    </div>
  );
}
