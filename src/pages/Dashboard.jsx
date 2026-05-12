import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import useGroq from '../hooks/useGroq';
import Navbar from '../components/layout/Navbar';
import MedicineSearch from '../components/dashboard/MedicineSearch';
import { 
  History, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Calendar
} from 'lucide-react';
import Card from '../components/ui/Card';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { userData } = useAuth();
  const { searchMedicine, analyzing } = useGroq();
  const [language] = useState('english');

  const handleMedicineSearch = async (query) => {
    try {
      const result = await searchMedicine(query, language);
      return result;
    } catch (error) {
      toast.error("Failed to fetch medicine details.");
      return null;
    }
  };

  const stats = [
    { label: "Total Searches", value: userData?.analysisCount || 0, icon: History, color: "text-brand-cyan" },
    { label: "Medicines Identified", value: "24", icon: CheckCircle2, color: "text-brand-emerald" },
    { label: "Interactions Found", value: "2", icon: AlertCircle, color: "text-amber-500" },
    { label: "Reports Generated", value: userData?.analysisCount || 0, icon: Clock, color: "text-brand-purple" },
  ];

  return (
    <div className="min-h-screen bg-brand-navy bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-fixed bg-no-repeat relative">
      {/* Heavy Glassmorphism Overlay for Medical Theme */}
      <div className="absolute inset-0 bg-brand-navy/90 backdrop-blur-xl"></div>
      
      <div className="relative z-10">
        <Navbar />
        
        <main className="container mx-auto px-4 pt-32 pb-20">
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div>
              <h1 className="text-4xl font-syne font-extrabold text-white mb-2">
                Good morning, {userData?.name?.split(' ')[0] || 'User'} 👋
              </h1>
              <p className="text-white/50 flex items-center">
                <Calendar size={14} className="mr-2" />
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, i) => (
              <Card key={i} className="flex items-center space-x-4 p-4 border-none bg-brand-card/40 backdrop-blur-md">
                <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <div>
                  <p className="text-xs text-white/40">{stat.label}</p>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <h2 className="text-2xl font-bold text-white">AI Medicine Search & Comparison</h2>
              </div>
              
              <MedicineSearch 
                onSearch={handleMedicineSearch}
                isAnalyzing={analyzing}
              />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
