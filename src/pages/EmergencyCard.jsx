import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Download, Share2, Printer, Plus, User, Phone, Droplet, Heart, Shield } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const EmergencyCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div className="min-h-screen bg-brand-navy bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-fixed bg-no-repeat relative">
      <div className="absolute inset-0 bg-brand-navy/90 backdrop-blur-xl"></div>
      
      <div className="relative z-10">
        <Navbar />
        
        <main className="container mx-auto px-4 pt-32 pb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div>
              <h1 className="text-4xl font-syne font-extrabold text-white mb-2">Emergency Medical Card</h1>
              <p className="text-white/50">Your critical health information, accessible when it matters most.</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="secondary" icon={Share2}>Share Link</Button>
              <Button icon={Download}>Download PDF</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Editor Form */}
            <div className="space-y-8">
              <Card className="p-8 bg-brand-card/40 backdrop-blur-md border-white/5 space-y-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <User size={20} className="mr-3 text-brand-cyan" /> Personal Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase">Full Name</label>
                      <input type="text" defaultValue="Imran Khan" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase">Blood Group</label>
                      <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
                        <option>O Positive</option>
                        <option>A Positive</option>
                        <option>B Positive</option>
                        <option>AB Positive</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <Phone size={20} className="mr-3 text-brand-emerald" /> Emergency Contacts
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <input type="text" placeholder="Contact Name" defaultValue="Zoya Khan" className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm" />
                      <input type="text" placeholder="Phone" defaultValue="+91 98765 43210" className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm" />
                    </div>
                    <Button variant="ghost" size="sm" icon={Plus} className="w-full text-xs">Add Contact</Button>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <Heart size={20} className="mr-3 text-red-400" /> Medical Info
                  </h3>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase">Known Allergies</label>
                    <textarea defaultValue="Peanuts, Penicillin" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm h-24 resize-none" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Live Preview */}
            <div className="flex flex-col items-center">
              <div className="mb-8 flex space-x-2 bg-white/5 p-1 rounded-xl">
                <button 
                  onClick={() => setIsFlipped(false)}
                  className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${!isFlipped ? 'bg-brand-cyan text-brand-navy' : 'text-white/40 hover:text-white'}`}
                >
                  Front Side
                </button>
                <button 
                  onClick={() => setIsFlipped(true)}
                  className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${isFlipped ? 'bg-brand-cyan text-brand-navy' : 'text-white/40 hover:text-white'}`}
                >
                  Back Side
                </button>
              </div>

              <motion.div
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="w-full max-w-md aspect-[1.58/1] relative cursor-pointer"
              >
                {/* Front Side */}
                <div className={`absolute inset-0 backface-hidden ${isFlipped ? 'hidden' : 'block'}`}>
                  <Card className="w-full h-full p-8 bg-gradient-to-br from-brand-navy to-brand-navy/80 border-brand-cyan/20 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-brand-cyan font-bold uppercase tracking-widest">Emergency Medical Card</span>
                        <h4 className="text-2xl font-bold text-white mt-1">Imran Khan</h4>
                      </div>
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                        <Shield className="text-brand-cyan" size={24} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <span className="text-[8px] text-white/40 font-bold uppercase block mb-1">Blood Group</span>
                        <div className="flex items-center text-xl font-bold text-red-400">
                          <Droplet size={16} className="mr-2" /> O POSITIVE
                        </div>
                      </div>
                      <div>
                        <span className="text-[8px] text-white/40 font-bold uppercase block mb-1">Allergies</span>
                        <p className="text-xs text-white/80 font-bold truncate">Peanuts, Penicillin</p>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10">
                      <span className="text-[8px] text-white/40 font-bold uppercase block mb-1">Emergency Contact</span>
                      <p className="text-xs text-white font-bold">Zoya Khan (Wife) • +91 98765 43210</p>
                    </div>
                  </Card>
                </div>

                {/* Back Side */}
                <div className={`absolute inset-0 backface-hidden ${!isFlipped ? 'hidden' : 'block'} transform rotate-y-180`}>
                  <Card className="w-full h-full p-8 bg-brand-navy border-white/10 overflow-hidden flex items-center justify-between">
                    <div className="flex-1 pr-8 space-y-4">
                      <div>
                        <span className="text-[8px] text-white/40 font-bold uppercase block mb-1">Conditions</span>
                        <p className="text-[10px] text-white/80 leading-tight">Hypertension, Mild Asthma</p>
                      </div>
                      <div>
                        <span className="text-[8px] text-white/40 font-bold uppercase block mb-1">Medications</span>
                        <p className="text-[10px] text-white/80 leading-tight">Paracetamol, Metformin, Salbutamol Inhaler</p>
                      </div>
                      <div className="pt-4">
                        <p className="text-[8px] text-brand-cyan font-bold italic">Scan for full medical profile and insurance details</p>
                      </div>
                    </div>
                    <div className="w-32 h-32 bg-white p-2 rounded-xl">
                      <QRCodeSVG value="https://ai-medilens.vercel.app/emergency/imran" size={112} level="H" />
                    </div>
                  </Card>
                </div>
              </motion.div>
              
              <div className="mt-12 flex space-x-6 text-white/30">
                <Printer size={20} className="hover:text-white cursor-pointer" />
                <Download size={20} className="hover:text-white cursor-pointer" />
                <Share2 size={20} className="hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmergencyCard;
