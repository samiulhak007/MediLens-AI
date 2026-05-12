import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { 
  Search, 
  Filter, 
  Calendar, 
  Pill, 
  AlertCircle, 
  ChevronRight, 
  Trash2, 
  FileText,
  Download,
  Share2,
  History as HistoryIcon
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import AnalysisResults from '../components/dashboard/AnalysisResults';
import toast from 'react-hot-toast';
import { generatePDF } from '../utils/generatePDF';

const History = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'users', user.uid, 'records'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRecords(docs);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const filteredRecords = records.filter(record => {
    const searchString = searchTerm.toLowerCase();
    const patientName = record.analysisResult?.patient_info?.name?.toLowerCase() || '';
    const medicines = record.analysisResult?.medications?.map(m => m.name.toLowerCase()).join(' ') || '';
    return patientName.includes(searchString) || medicines.includes(searchString);
  });

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this record?")) {
      try {
        await deleteDoc(doc(db, 'users', user.uid, 'records', id));
        toast.success("Record deleted.");
      } catch (error) {
        toast.error("Failed to delete record.");
      }
    }
  };

  const openRecord = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-navy bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-fixed bg-no-repeat relative">
      {/* Heavy Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-brand-navy/90 backdrop-blur-xl"></div>
      
      <div className="relative z-10">
        <Navbar />
        
        <main className="container mx-auto px-4 pt-32 pb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div>
              <h1 className="text-4xl font-syne font-extrabold text-white mb-2">Prescription History</h1>
              <p className="text-white/50">View and manage your previous analyses.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search by medicine or patient..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-brand-cyan w-full md:w-64"
                />
              </div>
              <Button variant="secondary" icon={Download}>Export All</Button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-64 bg-white/5 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : filteredRecords.length === 0 ? (
            <Card className="flex flex-col items-center justify-center py-20 text-center border-none bg-brand-card/40 backdrop-blur-md">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <HistoryIcon className="w-10 h-10 text-white/20" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No records found</h3>
              <p className="text-white/40 mb-8">You haven't analyzed any prescriptions yet or none match your search.</p>
              <Button onClick={() => navigate('/dashboard')}>Start Analyzing</Button>
            </Card>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredRecords.map((record) => (
                <motion.div
                  key={record.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  onClick={() => openRecord(record)}
                  className="cursor-pointer group"
                >
                  <Card className="h-full border-white/5 hover:border-brand-cyan/30 hover:bg-brand-card-hover transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => handleDelete(record.id, e)}
                        className="p-2 text-white/30 hover:text-red-500 bg-black/20 rounded-lg backdrop-blur-sm transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-brand-cyan/10 rounded-xl flex items-center justify-center">
                        <FileText className="text-brand-cyan" size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white truncate max-w-[150px]">
                          {record.analysisResult?.patient_info?.name || "Patient Record"}
                        </h3>
                        <p className="text-xs text-white/40">
                          {record.createdAt?.toDate().toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center text-sm text-white/70">
                        <Pill size={16} className="mr-2 text-brand-cyan" />
                        {record.medicinesCount} Medicines identified
                      </div>
                      <div className="flex items-center text-sm text-white/70">
                        <AlertCircle size={16} className={`mr-2 ${record.interactionsCount > 0 ? 'text-amber-500' : 'text-brand-emerald'}`} />
                        {record.interactionsCount} Interaction warnings
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <Badge variant="neutral" className="capitalize">{record.language}</Badge>
                      <div className="flex items-center text-xs font-bold text-brand-cyan group-hover:translate-x-1 transition-transform">
                        View Report <ChevronRight size={14} className="ml-1" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Analysis Details"
        maxWidth="max-w-6xl"
      >
        {selectedRecord && (
          <div className="space-y-8">
            <div className="aspect-video w-full bg-brand-navy rounded-2xl overflow-hidden border border-white/10 mb-8">
              <img src={selectedRecord.cloudinaryUrl} alt="Prescription" className="w-full h-full object-contain" />
            </div>
            <AnalysisResults 
              data={selectedRecord.analysisResult} 
              onDiscard={() => {
                handleDelete(selectedRecord.id, { stopPropagation: () => {} });
                setIsModalOpen(false);
              }}
              onDownload={() => generatePDF(selectedRecord.analysisResult)}
              onShare={() => toast.success("Share link generated!")}
            />
          </div>
        )}
      </Modal>
      </div>
    </div>
  );
};

export default History;
