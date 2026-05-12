import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import useReminders from '../hooks/useReminders';
import { Plus, Bell, Clock, CheckCircle2, AlertCircle, Calendar as CalendarIcon, Trash2, Pill } from 'lucide-react';

const Reminders = () => {
  const { reminders, loading, addReminder, deleteReminder } = useReminders();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReminder, setNewReminder] = useState({ name: '', dosage: '', time: '08:00' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addReminder(newReminder);
    setIsModalOpen(false);
    setNewReminder({ name: '', dosage: '', time: '08:00' });
  };

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
            <Button icon={Plus} onClick={() => setIsModalOpen(true)}>Add New Reminder</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-brand-cyan/10 rounded-lg">
                  <CalendarIcon className="text-brand-cyan" size={20} />
                </div>
                <h2 className="text-2xl font-bold text-white">Your Schedule</h2>
              </div>

              <div className="space-y-4">
                <AnimatePresence>
                  {reminders.map((med, i) => (
                    <motion.div
                      key={med.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <Card className="p-6 bg-white/5 border-white/5 flex items-center justify-between group hover:bg-white/10 transition-colors">
                        <div className="flex items-center space-x-6">
                          <div className="text-xl font-mono font-bold text-white/40 group-hover:text-brand-cyan transition-colors">
                            {med.time}
                          </div>
                          <div className="h-12 w-px bg-white/10" />
                          <div>
                            <h3 className="text-lg font-bold text-white">{med.name}</h3>
                            <p className="text-sm text-white/40">{med.dosage}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button 
                            onClick={() => deleteReminder(med.id)}
                            className="p-2 text-white/20 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                          <Button size="sm">Mark Taken</Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {reminders.length === 0 && !loading && (
                  <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                    <Bell size={48} className="mx-auto text-white/10 mb-4" />
                    <p className="text-white/40">No reminders set yet. Click "Add New" to get started.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-8">
              <Card className="p-8 bg-brand-card/40 backdrop-blur-md border-white/5 text-center">
                <div className="relative inline-flex items-center justify-center mb-6">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={364} strokeDashoffset={364 * (1 - (reminders.length > 0 ? 0.8 : 0))} className="text-brand-cyan transition-all duration-1000" />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-bold text-white">{reminders.length > 0 ? '80%' : '0%'}</span>
                    <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Adherence</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Health Insights</h3>
                <p className="text-sm text-white/40">Keep up the streak! Consistent medication is key to recovery.</p>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Add Reminder Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Reminder">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase">Medicine Name</label>
            <input 
              required
              type="text" 
              placeholder="e.g. Paracetamol"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan"
              value={newReminder.name}
              onChange={(e) => setNewReminder({...newReminder, name: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase">Dosage</label>
              <input 
                required
                type="text" 
                placeholder="e.g. 500mg"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan"
                value={newReminder.dosage}
                onChange={(e) => setNewReminder({...newReminder, dosage: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase">Time</label>
              <input 
                required
                type="time" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan"
                value={newReminder.time}
                onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
              />
            </div>
          </div>
          <Button type="submit" className="w-full">Create Reminder</Button>
        </form>
      </Modal>
    </div>
  );
};

export default Reminders;
