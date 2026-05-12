import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Play, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

const Hero = () => {
  const navigate = useNavigate();

  const badges = [
    "Instant AI Analysis",
    "Secure & Private",
    "PDF Reports",
    "Drug Interaction Check",
    "5 Languages",
    "Powered by Groq"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2 text-left z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-syne font-extrabold text-white leading-tight mb-6">
                See Beyond the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-emerald">
                  Prescription
                </span>
              </h1>
              <p className="text-xl text-white/70 mb-8 max-w-xl leading-relaxed">
                MediLens AI reads, analyzes, and explains your medical prescriptions in seconds. 
                Drug interactions, dosage insights, side effects — all in plain language.
              </p>

              <motion.div 
                className="flex flex-wrap gap-3 mb-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {badges.map((badge, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-brand-cyan"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{badge}</span>
                  </motion.div>
                ))}
              </motion.div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/login')}
                  icon={ArrowRight}
                  className="group"
                >
                  Start Analyzing Free
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  icon={Play}
                  className="group"
                >
                  Watch Demo
                </Button>
              </div>

              <div className="mt-12 flex items-center space-x-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-navy bg-brand-card overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex text-amber-400 mb-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-white/50">Trusted by 10,000+ patients and caregivers</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Visual */}
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-cyan to-brand-purple rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-brand-card/80 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
                  {/* Mockup Header */}
                  <div className="h-12 bg-white/5 border-b border-white/5 flex items-center px-6 space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                  </div>
                  {/* Mockup Content */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <div className="h-8 w-32 bg-white/5 rounded-lg animate-pulse" />
                      <div className="h-8 w-8 bg-brand-cyan/20 rounded-full animate-pulse" />
                    </div>
                    <div className="space-y-4">
                      <div className="h-32 w-full bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/5 flex items-center justify-center">
                        <div className="text-center">
                          <div className="scan-line" />
                          <div className="text-brand-cyan text-sm font-medium">Scanning Prescription...</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-24 bg-white/5 rounded-xl border border-white/5 p-4">
                          <div className="w-1/2 h-3 bg-white/10 rounded mb-3" />
                          <div className="w-3/4 h-3 bg-brand-cyan/20 rounded" />
                        </div>
                        <div className="h-24 bg-white/5 rounded-xl border border-white/5 p-4">
                          <div className="w-1/2 h-3 bg-white/10 rounded mb-3" />
                          <div className="w-3/4 h-3 bg-brand-emerald/20 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Decorative Elements */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-24 h-24 bg-brand-cyan/10 rounded-full blur-3xl"
              />
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-emerald/10 rounded-full blur-3xl"
              />
            </motion.div>
          </div>
        </div>

        {/* ECG Line at Bottom */}
        <div className="absolute bottom-0 left-0 w-full h-24 pointer-events-none opacity-20">
          <svg width="100%" height="100%" viewBox="0 0 1200 100" preserveAspectRatio="none">
            <path
              className="ecg-line"
              d="M0,50 L100,50 L110,40 L120,60 L130,10 L140,90 L150,50 L300,50 L310,30 L320,70 L330,50 L500,50 L510,10 L520,90 L530,50 L700,50 L710,40 L720,60 L730,10 L740,90 L750,50 L1200,50"
              fill="none"
              stroke="#00d4ff"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
