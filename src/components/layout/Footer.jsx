import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Briefcase, Code } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="pt-20 pb-10 bg-brand-navy border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <svg viewBox="0 0 100 100" className="w-8 h-8 fill-brand-cyan">
                <path d="M50 20C30 20 15 35 15 50C15 65 30 80 50 80C70 80 85 65 85 50C85 35 70 20 50 20ZM50 70C39 70 30 61 30 50C30 39 39 30 50 30C61 30 70 39 70 50C70 61 61 70 50 70Z" />
              </svg>
              <span className="text-xl font-syne font-extrabold text-white">MediLens AI</span>
            </Link>
            <p className="text-white/50 text-sm mb-6 leading-relaxed">
              MediLens AI is your intelligent medical companion. We help you see beyond the prescription with AI-powered analysis and clarity.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/5 rounded-lg text-white/50 hover:text-brand-cyan hover:bg-white/10 transition-all">
                <Globe size={18} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg text-white/50 hover:text-brand-cyan hover:bg-white/10 transition-all">
                <Briefcase size={18} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg text-white/50 hover:text-brand-cyan hover:bg-white/10 transition-all">
                <Code size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li><Link to="/login" className="hover:text-brand-cyan transition-colors">How it Works</Link></li>
              <li><Link to="/login" className="hover:text-brand-cyan transition-colors">Features</Link></li>
              <li><Link to="/login" className="hover:text-brand-cyan transition-colors">Pricing</Link></li>
              <li><Link to="/login" className="hover:text-brand-cyan transition-colors">Testimonials</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li><a href="#" className="hover:text-brand-cyan transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-sm text-white/50 mb-4">Get healthcare insights and product updates.</p>
            <div className="flex space-x-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-cyan flex-grow"
              />
              <button className="bg-brand-cyan text-brand-navy px-4 py-2 rounded-lg text-sm font-bold">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-white/30">
            © 2026 MediLens AI. All rights reserved.
          </p>
          <div className="max-w-md text-center md:text-right">
            <p className="text-[10px] text-white/20 italic">
              Disclaimer: MediLens AI is not a substitute for professional medical advice, diagnosis, or treatment. 
              Always seek the advice of your physician or other qualified health provider with any questions you may have 
              regarding a medical condition.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
