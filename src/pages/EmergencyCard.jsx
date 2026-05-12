import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Download, Share2, Printer, Plus, User, Phone, Droplet, Heart, Shield, Save, Loader2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { db } from '../firebase/config';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const EmergencyCard = () => {
  const { user } = useAuth();
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cardData, setCardData] = useState({
    fullName: '',
    bloodGroup: 'O Positive',
    emergencyContactName: '',
    emergencyContactPhone: '',
    allergies: '',
    conditions: '',
    medications: ''
  });

  useEffect(() => {
    if (!user) return;
    const fetchCard = async () => {
      try {
        const docRef = doc(db, 'users', user.uid, 'data', 'emergency_card');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCardData(docSnap.data());
        } else {
          // Default data if none exists
          setCardData(prev => ({ ...prev, fullName: user.displayName || '', email: user.email }));
        }
      } catch (error) {
        console.error("Error fetching emergency card:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCard();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await setDoc(doc(db, 'users', user.uid, 'data', 'emergency_card'), {
        ...cardData,
        updatedAt: serverTimestamp()
      });
      toast.success("Emergency Card updated!");
    } catch (error) {
      toast.error("Failed to save data.");
    } finally {
      setSaving(false);
    }
  };
  
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
              <Button 
                icon={saving ? Loader2 : Save} 
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="text-brand-cyan animate-spin" size={48} />
            </div>
          ) : (
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
                        <input 
                          type="text" 
                          value={cardData.fullName} 
                          onChange={(e) => setCardData({...cardData, fullName: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-brand-cyan outline-none" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-white/40 uppercase">Blood Group</label>
                        <select 
                          value={cardData.bloodGroup}
                          onChange={(e) => setCardData({...cardData, bloodGroup: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-brand-cyan outline-none"
                        >
                          <option value="O Positive">O Positive</option>
                          <option value="O Negative">O Negative</option>
                          <option value="A Positive">A Positive</option>
                          <option value="A Negative">A Negative</option>
                          <option value="B Positive">B Positive</option>
                          <option value="B Negative">B Negative</option>
                          <option value="AB Positive">AB Positive</option>
                          <option value="AB Negative">AB Negative</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <Phone size={20} className="mr-3 text-brand-emerald" /> Emergency Contact
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="Contact Name" 
                        value={cardData.emergencyContactName}
                        onChange={(e) => setCardData({...cardData, emergencyContactName: e.target.value})}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-brand-cyan outline-none" 
                      />
                      <input 
                        type="text" 
                        placeholder="Phone Number" 
                        value={cardData.emergencyContactPhone}
                        onChange={(e) => setCardData({...cardData, emergencyContactPhone: e.target.value})}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-brand-cyan outline-none" 
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <Heart size={20} className="mr-3 text-red-400" /> Medical Conditions
                    </h3>
                    <textarea 
                      placeholder="List any chronic conditions or allergies..."
                      value={cardData.conditions}
                      onChange={(e) => setCardData({...cardData, conditions: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm h-24 resize-none focus:border-brand-cyan outline-none" 
                    />
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
                    <Card className="w-full h-full p-8 bg-gradient-to-br from-brand-navy to-brand-navy/80 border-brand-cyan/20 overflow-hidden relative shadow-2xl">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                      <div className="flex justify-between items-start mb-8">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-brand-cyan font-bold uppercase tracking-widest">Emergency Medical Card</span>
                          <h4 className="text-2xl font-bold text-white mt-1">{cardData.fullName || 'YOUR NAME'}</h4>
                        </div>
                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                          <Shield className="text-brand-cyan" size={24} />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <span className="text-[8px] text-white/40 font-bold uppercase block mb-1">Blood Group</span>
                          <div className="flex items-center text-xl font-bold text-red-400 uppercase">
                            <Droplet size={16} className="mr-2" /> {cardData.bloodGroup}
                          </div>
                        </div>
                        <div>
                          <span className="text-[8px] text-white/40 font-bold uppercase block mb-1">Status</span>
                          <p className="text-xs text-white/80 font-bold truncate">Verified Member</p>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/10">
                        <span className="text-[8px] text-white/40 font-bold uppercase block mb-1">Emergency Contact</span>
                        <p className="text-xs text-white font-bold">{cardData.emergencyContactName || 'NONE'} • {cardData.emergencyContactPhone || 'NONE'}</p>
                      </div>
                    </Card>
                  </div>

                  {/* Back Side */}
                  <div className={`absolute inset-0 backface-hidden ${!isFlipped ? 'hidden' : 'block'} transform rotate-y-180`}>
                    <Card className="w-full h-full p-8 bg-brand-navy border-white/10 overflow-hidden flex items-center justify-between shadow-2xl">
                      <div className="flex-1 pr-8 space-y-4">
                        <div>
                          <span className="text-[8px] text-white/40 font-bold uppercase block mb-1">Conditions</span>
                          <p className="text-[10px] text-white/80 leading-tight line-clamp-3">{cardData.conditions || 'None listed'}</p>
                        </div>
                        <div className="pt-4">
                          <p className="text-[8px] text-brand-cyan font-bold italic">Scan for full medical profile and insurance details</p>
                        </div>
                      </div>
                      <div className="w-32 h-32 bg-white p-2 rounded-xl">
                        <QRCodeSVG value={`https://medilens.app/emergency/${user?.uid}`} size={112} level="H" />
                      </div>
                    </Card>
                  </div>
                </motion.div>
                
                <div className="mt-12 flex space-x-6 text-white/30">
                  <Printer size={20} className="hover:text-white cursor-pointer" title="Print Card" />
                  <Download size={20} className="hover:text-white cursor-pointer" title="Download Image" />
                  <Share2 size={20} className="hover:text-white cursor-pointer" title="Share Access" />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EmergencyCard;
