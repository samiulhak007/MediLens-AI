import React, { useState } from 'react';
import { Search, Info, AlertTriangle, Pill } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import Card from '../ui/Card';

const MedicineSearch = ({ onSearch, isAnalyzing }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const res = await onSearch(query);
    setResult(res);
  };

  return (
    <div className="w-full space-y-6">
      <Card className="p-6 border-brand-cyan/20">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Enter a medicine name (e.g. Paracetamol) or describe what it's for..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-cyan"
            />
          </div>
          <Button type="submit" isLoading={isAnalyzing} disabled={!query.trim() || isAnalyzing}>
            Search AI
          </Button>
        </form>
      </Card>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="p-8 border-brand-cyan/30 bg-brand-navy/60 backdrop-blur-md">
              <div className="flex items-start justify-between border-b border-white/10 pb-6 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-brand-cyan/20 rounded-2xl flex items-center justify-center">
                    <Pill className="text-brand-cyan w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-syne font-bold text-white">{result.name}</h3>
                    <p className="text-white/60 font-medium">{result.generic_name} • {result.category}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-brand-cyan font-bold flex items-center mb-3">
                      <Info className="w-5 h-5 mr-2" /> How It Works
                    </h4>
                    <p className="text-white/80 leading-relaxed text-sm bg-white/5 p-4 rounded-xl border border-white/5">
                      {result.how_it_works}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-bold mb-3">Common Uses</h4>
                    <ul className="space-y-2">
                      {result.common_uses.map((use, i) => (
                        <li key={i} className="flex items-center text-sm text-white/70">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan mr-3" />
                          {use}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-amber-400 font-bold flex items-center mb-3">
                      <AlertTriangle className="w-5 h-5 mr-2" /> Warnings & Side Effects
                    </h4>
                    <div className="bg-amber-400/5 border border-amber-400/20 p-4 rounded-xl space-y-4">
                      {result.warnings.length > 0 && (
                        <div>
                          <p className="text-xs uppercase tracking-wider text-amber-400/70 font-bold mb-2">Warnings</p>
                          <ul className="space-y-1">
                            {result.warnings.map((w, i) => (
                              <li key={i} className="text-sm text-amber-400/90 flex items-start">
                                <span className="mr-2">•</span> {w}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {result.side_effects.length > 0 && (
                        <div>
                          <p className="text-xs uppercase tracking-wider text-white/40 font-bold mb-2">Side Effects</p>
                          <p className="text-sm text-white/70">{result.side_effects.join(', ')}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {result.alternatives && result.alternatives.length > 0 && (
                    <div>
                      <h4 className="text-white font-bold mb-3">Common Alternatives</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.alternatives.map((alt, i) => (
                          <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/60">
                            {alt}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MedicineSearch;
