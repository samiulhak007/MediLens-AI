import React, { useState } from 'react';
import { Search, Info, AlertTriangle, Pill, Download, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { generateMedicinePDF } from '../../utils/generateMedicinePDF';

const MedicineSearch = ({ onSearch, isAnalyzing }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const res = await onSearch(query);
    setResult(res);
  };

  const handleDownload = () => {
    if (result) {
      generateMedicinePDF(result, query);
    }
  };

  return (
    <div className="w-full space-y-6">
      <Card className="p-6 border-brand-cyan/20">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Enter medicine names to compare (e.g. Paracetamol vs Ibuprofen)..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-cyan"
            />
          </div>
          <Button type="submit" isLoading={isAnalyzing} disabled={!query.trim() || isAnalyzing}>
            Search & Compare
          </Button>
        </form>
      </Card>

      <AnimatePresence>
        {result && result.medicines && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-brand-cyan/10 rounded-lg">
                  <Layers className="text-brand-cyan w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-white">Comparison Report</h2>
              </div>
              <Button variant="secondary" onClick={handleDownload} className="flex items-center space-x-2">
                <Download size={18} />
                <span>Download Report</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {result.medicines.map((medicine, index) => (
                <Card key={index} className="p-6 border-brand-cyan/10 bg-brand-navy/40 backdrop-blur-md hover:border-brand-cyan/30 transition-all duration-300">
                  <div className="flex items-start justify-between border-b border-white/5 pb-4 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-brand-cyan/10 rounded-xl flex items-center justify-center">
                        <Pill className="text-brand-cyan w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{medicine.name}</h3>
                        <p className="text-xs text-white/40">{medicine.generic_name} • {medicine.category}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-brand-cyan text-xs font-bold flex items-center mb-2 uppercase tracking-wider">
                        <Info className="w-3.5 h-3.5 mr-1.5" /> How It Works
                      </h4>
                      <p className="text-white/70 leading-relaxed text-xs bg-white/5 p-3 rounded-lg border border-white/5">
                        {medicine.how_it_works}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-white/60 text-xs font-bold mb-2 uppercase tracking-wider">Uses</h4>
                        <ul className="space-y-1">
                          {medicine.common_uses.slice(0, 3).map((use, i) => (
                            <li key={i} className="text-[11px] text-white/50 flex items-center">
                              <span className="w-1 h-1 rounded-full bg-brand-cyan mr-2" />
                              {use}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-amber-400/80 text-xs font-bold mb-2 uppercase tracking-wider flex items-center">
                          <AlertTriangle size={12} className="mr-1" /> Warnings
                        </h4>
                        <ul className="space-y-1">
                          {medicine.warnings.slice(0, 2).map((w, i) => (
                            <li key={i} className="text-[11px] text-amber-400/60 leading-tight">
                              • {w}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MedicineSearch;
