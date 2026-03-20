import React from 'react';
import { Globe, Twitter, Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/5 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                <Globe size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white tracking-tight leading-none">ZEMEN</span>
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Digital City</span>
              </div>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Building the future of digital infrastructure in Africa. A unified ecosystem for a connected continent.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Github size={20} /></a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Ecosystem</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors">Smart Market</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Adama Scout</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Runner Link</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blooming Heart</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li className="flex items-center gap-3"><Mail size={16} /> info@zemen.city</li>
              <li className="flex items-center gap-3"><Phone size={16} /> +251 911 000 000</li>
              <li className="flex items-center gap-3"><MapPin size={16} /> Addis Ababa, Ethiopia</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-600">© 2026 Zemen Digital City. All rights reserved.</p>
          <div className="flex gap-8 text-xs text-zinc-600">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
