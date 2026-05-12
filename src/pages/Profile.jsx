import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import { 
  User, 
  Mail, 
  Shield, 
  Bell, 
  Globe, 
  CreditCard, 
  LogOut, 
  Trash2, 
  Camera,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { db } from '../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, userData, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    allergies: userData?.allergies?.join(', ') || '',
    conditions: userData?.conditions?.join(', ') || ''
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        name: formData.name,
        allergies: formData.allergies.split(',').map(s => s.trim()).filter(s => s),
        conditions: formData.conditions.split(',').map(s => s.trim()).filter(s => s)
      });
      setIsEditing(false);
      toast.success("Profile updated!");
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'medical', label: 'Medical Profile', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing & Plan', icon: CreditCard },
  ];

  const [activeSection, setActiveSection] = useState('personal');

  return (
    <div className="min-h-screen bg-brand-navy">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Nav */}
          <aside className="lg:w-1/4">
            <Card className="p-4 space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                    activeSection === section.id 
                      ? 'bg-brand-cyan text-brand-navy font-bold' 
                      : 'text-white/50 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <section.icon size={18} />
                  <span>{section.label}</span>
                </button>
              ))}
              <div className="pt-4 mt-4 border-t border-white/5">
                <button 
                  onClick={logout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            
            {activeSection === 'personal' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-syne font-bold">Personal Information</h3>
                    <Button variant="secondary" onClick={() => setIsEditing(!isEditing)}>
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </Button>
                  </div>

                  <div className="flex items-center space-x-8 mb-10">
                    <div className="relative group">
                      <img 
                        src={userData?.photoURL || `https://ui-avatars.com/api/?name=${userData?.name}&background=00d4ff&color=0a0e1a`} 
                        alt="Profile" 
                        className="w-24 h-24 rounded-full border-4 border-brand-cyan/20"
                      />
                      <button className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-full flex items-center justify-center text-white transition-opacity">
                        <Camera size={24} />
                      </button>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-white">{userData?.name || 'User'}</h4>
                      <div className="flex items-center text-white/50 mt-1">
                        <Mail size={14} className="mr-2" />
                        {userData?.email}
                        {userData?.emailVerified && <CheckCircle2 size={12} className="ml-2 text-brand-emerald" />}
                      </div>
                      <Badge variant="info" className="mt-2">Joined {new Date(userData?.joinedAt?.seconds * 1000).toLocaleDateString()}</Badge>
                    </div>
                  </div>

                  <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white/50">Display Name</label>
                        <input 
                          type="text" 
                          disabled={!isEditing}
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan disabled:opacity-50"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white/50">Language Preference</label>
                        <select 
                          disabled={!isEditing}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan disabled:opacity-50"
                        >
                          <option value="english">English</option>
                          <option value="hindi">Hindi</option>
                          <option value="tamil">Tamil</option>
                          <option value="spanish">Spanish</option>
                          <option value="french">French</option>
                        </select>
                      </div>
                    </div>
                    {isEditing && (
                      <Button type="submit">Save Changes</Button>
                    )}
                  </form>
                </Card>
              </motion.div>
            )}

            {activeSection === 'medical' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-2xl font-syne font-bold">Medical Profile</h3>
                      <p className="text-sm text-white/40">Provide this info for better AI analysis context.</p>
                    </div>
                    <Button variant="secondary" onClick={() => setIsEditing(!isEditing)}>
                      {isEditing ? 'Cancel' : 'Update Info'}
                    </Button>
                  </div>

                  <form onSubmit={handleUpdate} className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-amber-500">
                        <AlertTriangle size={18} />
                        <h4 className="font-bold">Known Allergies</h4>
                      </div>
                      <textarea 
                        disabled={!isEditing}
                        placeholder="Penicillin, Peanuts, Sulfa drugs..."
                        value={formData.allergies}
                        onChange={(e) => setFormData({...formData, allergies: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan disabled:opacity-50 h-24"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-brand-purple">
                        <Shield size={18} />
                        <h4 className="font-bold">Chronic Conditions</h4>
                      </div>
                      <textarea 
                        disabled={!isEditing}
                        placeholder="Diabetes, Hypertension, Asthma..."
                        value={formData.conditions}
                        onChange={(e) => setFormData({...formData, conditions: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan disabled:opacity-50 h-24"
                      />
                    </div>

                    {isEditing && (
                      <Button type="submit">Save Medical Profile</Button>
                    )}
                  </form>
                </Card>
              </motion.div>
            )}

            {activeSection === 'billing' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="p-8 border-brand-cyan/20">
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <p className="text-xs text-white/30 uppercase tracking-widest font-bold">Current Plan</p>
                      <h3 className="text-4xl font-syne font-extrabold text-white mt-1 capitalize">{userData?.plan || 'Free'}</h3>
                    </div>
                    <Button variant="primary">Upgrade to Pro</Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-xs text-white/30 mb-1">Analyses this month</p>
                      <p className="text-2xl font-bold text-brand-cyan">{userData?.analysisCount || 0} / 5</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-xs text-white/30 mb-1">Renewal Date</p>
                      <p className="text-2xl font-bold text-white">N/A</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-xs text-white/30 mb-1">Total Savings</p>
                      <p className="text-2xl font-bold text-brand-emerald">₹0</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Danger Zone */}
            <div className="pt-12">
              <h4 className="text-sm font-bold text-red-500 uppercase tracking-widest mb-4">Danger Zone</h4>
              <Card className="border-red-500/20 bg-red-500/5 flex items-center justify-between p-6">
                <div>
                  <h5 className="font-bold text-white">Delete Account</h5>
                  <p className="text-sm text-white/50">Permanently remove your account and all history. This cannot be undone.</p>
                </div>
                <Button variant="danger" icon={Trash2}>Delete Forever</Button>
              </Card>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
