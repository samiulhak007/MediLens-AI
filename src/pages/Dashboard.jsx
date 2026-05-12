import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import useGroq from '../hooks/useGroq';
import Navbar from '../components/layout/Navbar';
import UploadZone from '../components/dashboard/UploadZone';
import AnalysisResults from '../components/dashboard/AnalysisResults';
import { 
  PlusCircle, 
  History, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Calendar,
  ChevronRight,
  Globe
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment } from 'firebase/firestore';
import { generatePDF } from '../utils/generatePDF';

const Dashboard = () => {
  const { user, userData } = useAuth();
  const { analyzePrescription, analyzing } = useGroq();
  const [imageUrl, setImageUrl] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [language, setLanguage] = useState('english');

  const handleUploadComplete = (url) => {
    setImageUrl(url);
    toast.success("Image uploaded successfully!");
  };

  const handleAnalyze = async () => {
    if (!imageUrl) return;
    try {
      const result = await analyzePrescription(imageUrl, language);
      setAnalysisResult(result);
      
      // Save to History
      await addDoc(collection(db, 'users', user.uid, 'records'), {
        cloudinaryUrl: imageUrl,
        analysisResult: result,
        language: language,
        createdAt: serverTimestamp(),
        medicinesCount: result.medications?.length || 0,
        interactionsCount: result.drug_interactions?.length || 0,
        isPublic: false
      });

      // Increment analysis count in user profile
      await updateDoc(doc(db, 'users', user.uid), {
        analysisCount: increment(1)
      });

      toast.success("Analysis complete and saved to history!");
    } catch (error) {
      toast.error("Failed to analyze prescription. Please try again.");
    }
  };

  const handleDiscard = () => {
    setImageUrl(null);
    setAnalysisResult(null);
  };

  const stats = [
    { label: "Total Analyses", value: userData?.analysisCount || 0, icon: History, color: "text-brand-cyan" },
    { label: "Medicines Identified", value: "24", icon: CheckCircle2, color: "text-brand-emerald" }, // Mocked or calculated
    { label: "Interactions Found", value: "2", icon: AlertCircle, color: "text-amber-500" }, // Mocked
    { label: "Reports Generated", value: userData?.analysisCount || 0, icon: Clock, color: "text-brand-purple" },
  ];

  return (
    <div className="min-h-screen bg-brand-navy">
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
          <div className="flex items-center space-x-3 bg-white/5 p-2 rounded-2xl border border-white/5">
            <div className="p-3 bg-brand-cyan/10 rounded-xl">
              <Globe size={20} className="text-brand-cyan" />
            </div>
            <div className="pr-4">
              <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Active Plan</p>
              <p className="text-sm font-bold text-white capitalize">{userData?.plan || 'Free'}</p>
            </div>
            <Button size="sm" variant="ghost" className="text-brand-cyan">Upgrade</Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <Card key={i} className="flex items-center space-x-4 p-4 border-none bg-white/5">
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
          {!analysisResult ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-syne font-bold flex items-center">
                  <PlusCircle className="mr-3 text-brand-cyan" />
                  New Analysis
                </h2>
                {imageUrl && (
                  <div className="flex items-center space-x-4">
                    <select 
                      value={language} 
                      onChange={(e) => setLanguage(e.target.value)}
                      className="bg-brand-card border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-cyan"
                    >
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                      <option value="tamil">Tamil</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                    </select>
                    <Button 
                      isLoading={analyzing} 
                      onClick={handleAnalyze}
                      disabled={!imageUrl || analyzing}
                    >
                      Analyze Now
                    </Button>
                  </div>
                )}
              </div>
              
              <UploadZone 
                onUploadComplete={handleUploadComplete} 
                isAnalyzing={analyzing}
              />
            </motion.div>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-syne font-bold">Analysis Report</h2>
                <Button variant="secondary" onClick={handleDiscard}>
                  Start New
                </Button>
              </div>
              <AnalysisResults 
                data={analysisResult} 
                onDiscard={handleDiscard}
                onDownload={() => generatePDF(analysisResult)}
                onShare={() => toast.success("Share link generated!")}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
