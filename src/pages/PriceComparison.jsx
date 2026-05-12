import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import useGroq from '../hooks/useGroq';
import { Search, Tag, TrendingDown, Info, ShoppingCart, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const PriceComparison = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const { comparePrices, analyzing } = useGroq();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      const data = await comparePrices(query);
      setResult(data);
    } catch (error) {
      toast.error("Failed to fetch price comparison.");
    }
  };

  return (
    <div className="min-h-screen bg-brand-navy bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-fixed bg-no-repeat relative">
      <div className="absolute inset-0 bg-brand-navy/90 backdrop-blur-xl"></div>
      
      <div className="relative z-10">
        <Navbar />
        
        <main className="container mx-auto px-4 pt-32 pb-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge variant="info" className="mb-4">Smart Savings</Badge>
              <h1 className="text-5xl font-syne font-extrabold text-white mb-6">
                Medicine <span className="text-brand-cyan">Price Comparison</span>
              </h1>
              <p className="text-xl text-white/50 leading-relaxed">
                Save up to 90% on your prescriptions by comparing brand names with AI-suggested generic alternatives.
              </p>
            </motion.div>

            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onSubmit={handleSearch}
              className="mt-10 relative max-w-2xl mx-auto"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-brand-cyan/20 rounded-2xl blur-xl group-focus-within:bg-brand-cyan/40 transition-all duration-500" />
                <div className="relative flex items-center bg-brand-card/60 backdrop-blur-md border border-white/10 rounded-2xl p-2 focus-within:border-brand-cyan transition-all">
                  <Search className="ml-4 text-white/30" size={20} />
                  <input 
                    type="text" 
                    placeholder="Enter brand name (e.g., Lipitor, Advil, Glucophage)..."
                    className="flex-1 bg-transparent border-none text-white px-4 py-4 focus:outline-none text-lg"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <Button 
                    type="submit" 
                    disabled={analyzing || !query.trim()}
                    className="px-8"
                    icon={analyzing ? Loader2 : Sparkles}
                  >
                    {analyzing ? 'Analyzing...' : 'Compare'}
                  </Button>
                </div>
              </div>
            </motion.form>
          </div>

          {result && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Brand Info */}
              <div className="lg:col-span-1">
                <Card className="p-8 bg-brand-card/40 border-white/5 h-full">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                      <Tag className="text-white/40" size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Selected Brand</p>
                      <h3 className="text-2xl font-bold text-white">{result.medicine}</h3>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-8">
                    <p className="text-sm text-white/40 mb-1">Average Market Price</p>
                    <p className="text-3xl font-bold text-white">{result.brand_price}</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center">
                      <Info size={12} className="mr-2" /> Saving Tips
                    </h4>
                    <ul className="space-y-3">
                      {result.tips.map((tip, i) => (
                        <li key={i} className="flex items-start text-sm text-white/70">
                          <div className="w-1.5 h-1.5 bg-brand-cyan rounded-full mt-1.5 mr-3 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </div>

              {/* Generic Alternatives */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white flex items-center">
                    <TrendingDown className="mr-3 text-brand-emerald" /> Generic Alternatives
                  </h3>
                  <Badge variant="success">Cheaper Options Found</Badge>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {result.generics.map((gen, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Card className="p-6 bg-white/5 border-white/5 hover:bg-white/10 transition-all group">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-brand-emerald/10 rounded-xl flex items-center justify-center text-brand-emerald border border-brand-emerald/20">
                              <ShoppingCart size={20} />
                            </div>
                            <div>
                              <h4 className="text-lg font-bold text-white group-hover:text-brand-emerald transition-colors">{gen.name}</h4>
                              <p className="text-xs text-white/40 uppercase font-bold">Generic Equivalent</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-8">
                            <div className="text-right">
                              <p className="text-xs text-white/40 mb-1">Generic Price</p>
                              <p className="text-xl font-bold text-white">{gen.price}</p>
                            </div>
                            <div className="px-4 py-2 bg-brand-emerald/10 rounded-xl border border-brand-emerald/20 text-center min-w-[100px]">
                              <p className="text-[10px] text-brand-emerald font-bold uppercase tracking-tighter">Save Up To</p>
                              <p className="text-lg font-extrabold text-brand-emerald">{gen.savings}</p>
                            </div>
                            <button className="p-3 bg-white/5 rounded-xl hover:bg-brand-cyan hover:text-brand-navy transition-all">
                              <ArrowRight size={20} />
                            </button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <Card className="p-6 bg-brand-cyan/10 border-brand-cyan/20">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-brand-cyan/20 rounded-lg">
                      <Sparkles className="text-brand-cyan" size={20} />
                    </div>
                    <div>
                      <h4 className="text-brand-cyan font-bold mb-1">AI Savings Insight</h4>
                      <p className="text-sm text-white/70 leading-relaxed">
                        {result.savings_insight}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PriceComparison;
