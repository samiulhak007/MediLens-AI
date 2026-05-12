import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Plus, Bell, Clock, CheckCircle2, AlertCircle, Calendar as CalendarIcon } from 'lucide-react';

const Reminders = () => {
  const [reminders] = useState([
    { name: 'Paracetamol', dosage: '500mg', time: '08:00 AM', status: 'taken', color: 'brand-cyan' },
    { name: 'Amoxicillin', dosage: '250mg', time: '02:00 PM', status: 'upcoming', color: 'brand-purple' },
    { name: 'Metformin', dosage: '1000mg', time: '08:00 PM', status: 'upcoming', color: 'brand-emerald' },
  ]);

  return (
    <div className="min-h-screen bg-brand-navy bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-fixed bg-no-repeat relative">
      <div className="absolute inset-0 bg-brand-navy/90 backdrop-blur-xl"></div>
      
      <div className="relative z-10">
        <Navbar />
        
        <main className="container mx-auto px-4 pt-32 pb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div>
              <h1 className="text-4xl font-syne font-extrabold text-white mb-2">Medicine Reminders</h1>
              <p className="text-white/50">Manage your daily dose schedule and tracking.</p>
            </div>
            <Button icon={Plus}>Add New Reminder</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Today's Schedule */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-brand-cyan/10 rounded-lg">
                  <CalendarIcon className="text-brand-cyan" size={20} />
                </div>
                <h2 className="text-2xl font-bold text-white">Today's Schedule</h2>
              </div>

              <div className="space-y-4">
                {reminders.map((med, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="p-6 bg-white/5 border-white/5 flex items-center justify-between group hover:bg-white/10 transition-colors">
                      <div className="flex items-center space-x-6">
                        <div className="text-xl font-mono font-bold text-white/40 group-hover:text-brand-cyan transition-colors">
                          {med.time.split(' ')[0]}
                          <span className="text-[10px] ml-1 opacity-50">{med.time.split(' ')[1]}</span>
                        </div>
                        <div className="h-12 w-px bg-white/10" />
                        <div>
                          <h3 className="text-lg font-bold text-white">{med.name}</h3>
                          <p className="text-sm text-white/40">{med.dosage} • Twice Daily</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {med.status === 'taken' ? (
                          <Badge variant="success" icon={CheckCircle2}>Taken</Badge>
                        ) : (
                          <div className="flex space-x-2">
                            <Button size="sm" variant="secondary">Skip</Button>
                            <Button size="sm">Take Now</Button>
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-8">
              <Card className="p-8 bg-brand-card/40 backdrop-blur-md border-white/5 text-center">
                <div className="relative inline-flex items-center justify-center mb-6">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={364} strokeDashoffset={364 * 0.15} className="text-brand-cyan transition-all duration-1000" />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-bold text-white">85%</span>
                    <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Adherence</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Great job, Imran!</h3>
                <p className="text-sm text-white/40">You've missed only 2 doses this week. Keep up the streak!</p>
              </Card>

              <Card className="p-6 bg-white/5 border-white/5 space-y-6">
                <h4 className="font-bold text-white flex items-center">
                  <Bell size={16} className="mr-2 text-brand-cyan" /> Notification Settings
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                    <span className="text-sm text-white/70">Push Notifications</span>
                    <div className="w-10 h-5 bg-brand-cyan rounded-full relative">
                      <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                    <span className="text-sm text-white/70">WhatsApp Reminders</span>
                    <div className="w-10 h-5 bg-white/10 rounded-full relative">
                      <div className="absolute left-1 top-1 w-3 h-3 bg-white/30 rounded-full" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reminders;
