import { motion } from 'motion/react';
import { Globe, Mail, Phone, MapPin, Twitter, Linkedin, Github, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-blue text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-fire-orange rounded-full flex items-center justify-center shadow-lg shadow-fire-orange/20">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter">ZEMEN <span className="text-fire-orange">CITY</span></span>
            </div>
            <p className="text-white/60 leading-relaxed">
              Digitizing city life, commerce, and kindness through a unified smart digital economy powered by SBR.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -5, color: '#FF4500' }}
                  href="#"
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/60 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-fire-orange">Quick Links</h4>
            <ul className="space-y-4 text-white/60">
              {['Smart Market', 'Adama Scout', 'Runner Link', 'Blooming Heart', 'SBR Wallet'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-fire-orange">Contact Us</h4>
            <ul className="space-y-4 text-white/60">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-fire-orange" />
                <span>hello@zemencity.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-fire-orange" />
                <span>+251 911 000 000</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-fire-orange" />
                <span>Adama, Ethiopia</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-fire-orange">Stay Updated</h4>
            <p className="text-white/60 mb-4 text-sm">Get the latest news about the Zemen ecosystem.</p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-fire-orange transition-colors"
              />
              <button className="w-full bg-fire-orange hover:bg-fire-orange/90 text-white font-bold py-3 rounded-lg transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
          <p>© {currentYear} Zemen Digital City. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
