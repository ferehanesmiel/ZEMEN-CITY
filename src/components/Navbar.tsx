import { motion } from 'motion/react';
import { Menu, X, Wallet, Globe } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Ecosystem', href: '#ecosystem' },
    { name: 'Live Demo', href: '#demo' },
    { name: 'Wallet', href: '#wallet' },
    { name: 'Investors', href: '#investors' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-dark-blue/90 backdrop-blur-md text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
              className="w-10 h-10 bg-fire-orange rounded-full flex items-center justify-center shadow-lg shadow-fire-orange/20"
            >
              <Globe className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-xl font-black tracking-tighter">ZEMEN <span className="text-fire-orange">CITY</span></span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="hover:text-fire-orange px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <button className="bg-fire-orange hover:bg-fire-orange/90 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all transform hover:scale-105">
                <Wallet className="w-4 h-4" />
                Connect SBR
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-fire-orange focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-dark-blue border-b border-white/10"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:text-fire-orange block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <button className="w-full bg-fire-orange text-white px-6 py-3 rounded-md text-base font-bold flex items-center justify-center gap-2 mt-4">
              <Wallet className="w-5 h-5" />
              Connect SBR
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
