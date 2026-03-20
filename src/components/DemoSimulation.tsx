import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingCart, Truck, CheckCircle, Wallet, MapPin, Package, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from './Toast';

const DEMO_PRODUCTS = [
  { id: '1', name: 'Cement (50kg)', price: 1200, shop: 'Adama Construction Supplies', location: 'Bole, Adama', image: 'https://picsum.photos/seed/cement/400/300' },
  { id: '2', name: 'Medicine Pack', price: 450, shop: 'City Central Pharmacy', location: 'Piasa, Adama', image: 'https://picsum.photos/seed/medicine/400/300' },
  { id: '3', name: 'Fresh Coffee (1kg)', price: 350, shop: 'Harar Coffee House', location: 'Mela, Adama', image: 'https://picsum.photos/seed/coffee/400/300' },
];

export default function DemoSimulation() {
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [walletBalance, setWalletBalance] = useState(5000);
  const [isProcessing, setIsProcessing] = useState(false);
  const { addToast } = useToast();

  const filteredProducts = DEMO_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setWalletBalance(prev => prev - selectedProduct.price - 50); // 50 for delivery
      setStep(3);
      setIsProcessing(false);
      addToast(`Order placed successfully! -${selectedProduct.price + 50} SBR`, 'success');
      setTimeout(() => {
        addToast('Runner #4209 is on the way!', 'info');
      }, 2000);
    }, 2000);
  };

  const resetDemo = () => {
    setStep(1);
    setSearch('');
    setSelectedProduct(null);
  };

  return (
    <div className="bg-dark-blue rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-fire-orange/10 border border-white/10 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-fire-orange/10 blur-[100px] -mr-48 -mt-48 rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 blur-[100px] -ml-48 -mb-48 rounded-full" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Simulation UI */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-black text-white tracking-tight">Live <span className="text-fire-orange">Demo</span></h3>
            <div className="bg-white/5 px-4 py-2 rounded-full flex items-center gap-3 border border-white/10">
              <Wallet className="w-5 h-5 text-scout-birr" />
              <span className="text-white font-bold">{walletBalance} SBR</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search product (e.g., cement, medicine)"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 text-white focus:outline-none focus:border-fire-orange transition-all"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedProduct(product);
                        setStep(2);
                      }}
                      className="bg-white/5 border border-white/10 rounded-2xl p-4 cursor-pointer hover:bg-white/10 transition-all group"
                    >
                      <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-xl mb-4" />
                      <h4 className="text-white font-bold group-hover:text-fire-orange transition-colors">{product.name}</h4>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-scout-birr font-black">{product.price} SBR</span>
                        <span className="text-white/40 text-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {product.location}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <button onClick={() => setStep(1)} className="text-white/60 hover:text-white flex items-center gap-2 text-sm font-bold">
                  <ArrowRight className="w-4 h-4 rotate-180" /> Back to search
                </button>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row gap-8">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full md:w-48 h-48 object-cover rounded-2xl" />
                  <div className="flex-1 space-y-4">
                    <h4 className="text-3xl font-black text-white">{selectedProduct.name}</h4>
                    <p className="text-white/60 flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5 text-fire-orange" />
                      Sold by: <span className="text-white font-bold">{selectedProduct.shop}</span>
                    </p>
                    <p className="text-white/60 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-fire-orange" />
                      Location: <span className="text-white font-bold">{selectedProduct.location}</span>
                    </p>
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex justify-between text-white/60 mb-2">
                        <span>Product Price</span>
                        <span>{selectedProduct.price} SBR</span>
                      </div>
                      <div className="flex justify-between text-white/60 mb-4">
                        <span>Runner Delivery Fee</span>
                        <span>50 SBR</span>
                      </div>
                      <div className="flex justify-between text-2xl font-black text-scout-birr">
                        <span>Total</span>
                        <span>{selectedProduct.price + 50} SBR</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleOrder}
                  disabled={isProcessing}
                  className="w-full bg-fire-orange hover:bg-fire-orange/90 text-white font-black py-5 rounded-2xl text-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                      />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Truck className="w-6 h-6" />
                      Send Runner Now
                    </>
                  )}
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-8"
              >
                <div className="relative inline-block">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 12 }}
                    className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/20"
                  >
                    <CheckCircle className="w-12 h-12 text-white" />
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 bg-green-500 rounded-full -z-10"
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="text-4xl font-black text-white">Order Confirmed!</h4>
                  <p className="text-white/60 text-lg max-w-md mx-auto">
                    Runner <span className="text-white font-bold">#4209</span> has picked up your order from {selectedProduct.shop}.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-sm mx-auto space-y-4">
                  <div className="flex justify-between text-white/60">
                    <span>Transaction ID</span>
                    <span className="text-white font-mono">SBR-TX-99281</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Wallet Deduction</span>
                    <span className="text-red-400 font-bold">-{selectedProduct.price + 50} SBR</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>New Balance</span>
                    <span className="text-scout-birr font-bold">{walletBalance} SBR</span>
                  </div>
                </div>

                <button
                  onClick={resetDemo}
                  className="text-fire-orange font-bold hover:underline flex items-center gap-2 mx-auto"
                >
                  Start New Simulation <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Process Visualization */}
        <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-8">
          <h4 className="text-xl font-bold text-white mb-6">Simulation <span className="text-fire-orange">Status</span></h4>
          
          <div className="space-y-12 relative">
            {/* Vertical Line */}
            <div className="absolute left-[1.35rem] top-2 bottom-2 w-0.5 bg-white/10" />

            {[
              { icon: Search, label: 'Product Discovery', desc: 'Searching smart market ecosystem', active: step >= 1 },
              { icon: Package, label: 'Order Placement', desc: 'Connecting with local shop inventory', active: step >= 2 },
              { icon: Wallet, label: 'SBR Settlement', desc: 'Secure digital currency deduction', active: step >= 3 },
              { icon: Truck, label: 'Runner Logistics', desc: 'Real-time delivery tracking', active: step >= 3 },
            ].map((item, i) => (
              <div key={i} className={`flex gap-6 relative transition-opacity duration-500 ${item.active ? 'opacity-100' : 'opacity-20'}`}>
                <div className={`w-11 h-11 rounded-full flex items-center justify-center z-10 ${item.active ? 'bg-fire-orange text-white shadow-lg shadow-fire-orange/20' : 'bg-white/10 text-white/40'}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h5 className={`font-bold ${item.active ? 'text-white' : 'text-white/40'}`}>{item.label}</h5>
                  <p className="text-white/40 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10">
            <div className="flex items-center gap-4 p-4 bg-fire-orange/10 rounded-2xl border border-fire-orange/20">
              <div className="w-10 h-10 bg-fire-orange rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-white/80">
                <span className="font-bold text-white">No Login Required.</span> This is a sandbox demo of the Zemen ecosystem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
