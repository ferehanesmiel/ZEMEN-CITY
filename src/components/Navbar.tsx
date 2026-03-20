import React from 'react';
import { motion } from 'motion/react';
import { Globe, Menu, X, Coins, LayoutDashboard, Settings, LogOut } from 'lucide-react';
import { useDemo } from '../context/DemoContext';

export function Navbar() {
  const { balance } = useDemo();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]"
            >
              <Globe size={24} />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white tracking-tight leading-none">ZEMEN</span>
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Digital City</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Ecosystem</a>
            <a href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Business Model</a>
            <a href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Roadmap</a>
            <a href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Impact</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/5 rounded-full">
              <Coins size={16} className="text-orange-500" />
              <span className="text-sm font-bold text-white">{balance.toLocaleString()}</span>
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">SBR</span>
            </div>
            
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white/70 hover:text-white transition-colors md:hidden"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-900 border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <a href="#" className="block text-lg font-medium text-white/70 hover:text-white">Ecosystem</a>
              <a href="#" className="block text-lg font-medium text-white/70 hover:text-white">Business Model</a>
              <a href="#" className="block text-lg font-medium text-white/70 hover:text-white">Roadmap</a>
              <a href="#" className="block text-lg font-medium text-white/70 hover:text-white">Impact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

import { AnimatePresence } from 'motion/react';
