/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SectionHeader from './components/SectionHeader';
import AppCard from './components/AppCard';
import DemoSimulation from './components/DemoSimulation';
import WalletDisplay from './components/WalletDisplay';
import BusinessModel from './components/BusinessModel';
import ImpactStats from './components/ImpactStats';
import Roadmap from './components/Roadmap';
import InvestorSection from './components/InvestorSection';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import { AppInfo } from './types';
import { motion } from 'motion/react';
import { ArrowRight, Wallet, TrendingUp, Heart, Recycle, ShoppingBag, Truck, Search, Globe } from 'lucide-react';

const ECOSYSTEM_APPS: AppInfo[] = [
  {
    id: 'market',
    name: 'Smart Market',
    description: 'The future of e-commerce. Shop from local vendors with instant SBR payments.',
    icon: 'ShoppingBag',
    color: '#ff6a00',
    category: 'core'
  },
  {
    id: 'scout',
    name: 'Adama Scout',
    description: 'City discovery and real-time data. Find the best spots and navigate like a local.',
    icon: 'Search',
    color: '#121826',
    category: 'core'
  },
  {
    id: 'runner',
    name: 'Runner Link',
    description: 'Ultra-fast logistics and delivery. Track your orders in real-time across the city.',
    icon: 'Truck',
    color: '#ffaa00',
    category: 'core'
  },
  {
    id: 'heart',
    name: 'Blooming Heart',
    description: 'Social impact and donations. Direct support for community projects using SBR.',
    icon: 'Heart',
    color: '#ff4444',
    category: 'core'
  },
  {
    id: 'farm',
    name: 'Farm Link',
    description: 'Direct-from-farm marketplace. Connecting local agriculture with urban demand.',
    icon: 'Sprout',
    color: '#10b981',
    category: 'expansion'
  },
  {
    id: 'pharma',
    name: 'Pharma Link',
    description: 'Medicine finder and pharmacy network. Essential healthcare at your fingertips.',
    icon: 'Stethoscope',
    color: '#3b82f6',
    category: 'expansion'
  },
  {
    id: 'services',
    name: 'Service Hub',
    description: 'Local services marketplace. From repairs to professional consulting.',
    icon: 'Wrench',
    color: '#8b5cf6',
    category: 'expansion'
  }
];

export default function App() {
  return (
    <div className="min-h-screen bg-dark-bg text-white overflow-x-hidden">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Ecosystem Overview */}
        <section id="ecosystem" className="py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader 
              subtitle="The Zemen Ecosystem"
              title="Seven Apps, One Unified Economy"
              description="Our modular platform connects every aspect of city life, from commerce to social impact, all powered by a single digital currency."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
              {ECOSYSTEM_APPS.map((app, index) => (
                <AppCard key={app.id} app={app} index={index} />
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 p-8 bg-dark-blue rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-dark-blue/20"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-fire-orange rounded-2xl flex items-center justify-center shadow-lg shadow-fire-orange/20">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-black tracking-tight">Central SBR Wallet</h4>
                  <p className="text-white/60">The heartbeat of the Zemen Digital City economy.</p>
                </div>
              </div>
              <button className="bg-white text-dark-blue font-black px-8 py-4 rounded-2xl transition-all transform hover:scale-105 hover:bg-fire-orange hover:text-white">
                Learn about SBR
              </button>
            </motion.div>
          </div>
        </section>

        {/* Live Demo Section */}
        <section id="demo" className="py-32 bg-dark-blue relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader 
              light
              subtitle="Experience the Future"
              title="Interactive Ecosystem Demo"
              description="See how SBR flows between users, shops, and runners in real-time. Try the simulation below."
            />
            <DemoSimulation />
          </div>
        </section>

        {/* Wallet System */}
        <section id="wallet" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader 
              subtitle="SBR Digital Currency"
              title="The Smart Wallet System"
              description="Earn, spend, and donate with total transparency. Every transaction is traceable and contributes to the city's growth."
            />
            <WalletDisplay />

            {/* Wallet Flow Diagram */}
            <div className="mt-32 text-center">
              <h4 className="text-2xl font-black text-dark-blue mb-16 tracking-tight uppercase tracking-widest text-sm">The Circular SBR Economy</h4>
              <div className="flex flex-wrap justify-center gap-12 md:gap-24">
                {[
                  { icon: TrendingUp, label: 'Earn', color: 'bg-green-500' },
                  { icon: ShoppingBag, label: 'Spend', color: 'bg-blue-500' },
                  { icon: Truck, label: 'Deliver', color: 'bg-purple-500' },
                  { icon: Heart, label: 'Donate', color: 'bg-red-500' },
                  { icon: Recycle, label: 'Recycle', color: 'bg-orange-500' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative group"
                  >
                    <div className={`w-20 h-20 ${item.color} rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform relative z-10`}>
                      <item.icon className="w-10 h-10 text-white" />
                    </div>
                    <p className="mt-4 font-black text-dark-blue tracking-tight">{item.label}</p>
                    {i < 4 && (
                      <div className="hidden lg:block absolute top-10 left-full w-24 h-0.5 bg-dark-blue/10 -z-10" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Business Model */}
        <section className="py-32 bg-deep-blue/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader 
              subtitle="Sustainable Growth"
              title="Our Business Model"
              description="A diversified revenue strategy built on subscriptions, commissions, and data-driven insights."
            />
            <BusinessModel />
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-32 bg-dark-blue relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeader 
              light
              subtitle="Social Impact"
              title="Digitizing for Good"
              description="We measure our success not just in transactions, but in the positive change we bring to the community."
            />
            <ImpactStats />
          </div>
        </section>

        {/* Roadmap */}
        <section className="py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader 
              subtitle="The Journey"
              title="Strategic Roadmap"
              description="Our clear vision for scaling the Zemen ecosystem across Ethiopia and beyond."
            />
            <Roadmap />
          </div>
        </section>

        {/* Investor Section */}
        <section id="investors" className="py-32 bg-deep-blue/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader 
              subtitle="Investment"
              title="Investor Opportunity"
              description="Be part of the digital transformation of African cities. We are currently raising our seed round."
            />
            <InvestorSection />
          </div>
        </section>

        {/* Admin Dashboard Demo */}
        <section className="py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader 
              subtitle="Transparency"
              title="Admin Control Center"
              description="A glimpse into the real-time monitoring and management tools that power the Zemen ecosystem."
            />
            <AdminDashboard />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-fire-orange relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
                Ready to Digitizing <br /> Your City?
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">
                Join thousands of users and businesses already thriving in the Zemen Digital City ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="bg-dark-blue hover:bg-dark-blue/90 text-white font-black px-12 py-5 rounded-2xl text-xl transition-all transform hover:scale-105 shadow-2xl shadow-black/20">
                  Get Started Now
                </button>
                <button className="bg-white text-fire-orange font-black px-12 py-5 rounded-2xl text-xl transition-all transform hover:scale-105 shadow-2xl shadow-white/20">
                  Contact Sales
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
