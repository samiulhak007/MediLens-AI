import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { Trophy, Zap, Award, Flame, TrendingUp, Info, Lock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HealthScore = () => {
  const data = [
    { name: 'W1', score: 65 },
    { name: 'W2', score: 72 },
    { name: 'W3', score: 68 },
    { name: 'W4', score: 85 },
    { name: 'W5', score: 78 },
    { name: 'W6', score: 92 },
  ];

  const badges = [
    { name: 'First Scan', desc: 'Analyzed first prescription', unlocked: true, icon: Zap },
    { name: 'Streak Starter', desc: '3 day medicine streak', unlocked: true, icon: Flame },
    { name: 'Perfect Week', desc: '100% adherence for 7 days', unlocked: false, icon: Trophy },
    { name: 'AI Explorer', desc: 'Asked 10 questions to AI', unlocked: true, icon: Award },
  ];

  return (
    <div className="min-h-screen bg-brand-navy bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-fixed bg-no-repeat relative">
      <div className="absolute inset-0 bg-brand-navy/90 backdrop-blur-xl"></div>
      
      <div className="relative z-10">
        <Navbar />
        
        <main className="container mx-auto px-4 pt-32 pb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div>
              <h1 className="text-4xl font-syne font-extrabold text-white mb-2">Health Score & Insights</h1>
              <p className="text-white/50">Gamified tracking of your medicine adherence and health activity.</p>
            </div>
            <div className="flex items-center space-x-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
              <div className="text-right mr-4">
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Total Points</p>
                <p className="text-xl font-bold text-brand-cyan">1,250</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex items-center ml-4">
                <div className="w-10 h-10 bg-brand-cyan/20 rounded-full flex items-center justify-center mr-3">
                  <Trophy className="text-brand-cyan" size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 font-bold uppercase">Level</p>
                  <p className="text-lg font-bold text-white">4 <span className="text-xs text-white/40 font-normal">Health Champion</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Score Gauge */}
            <Card className="lg:col-span-1 p-8 bg-brand-card/40 backdrop-blur-md border-brand-cyan/20 flex flex-col items-center text-center">
              <div className="relative inline-flex items-center justify-center mb-8">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-white/5" />
                  <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="16" fill="transparent" strokeDasharray={552} strokeDashoffset={552 * (1 - 0.92)} className="text-brand-cyan transition-all duration-1000" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-6xl font-syne font-extrabold text-white">92</span>
                  <span className="text-xs text-brand-cyan font-bold uppercase tracking-widest mt-2">Excellent</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Weekly Health Score</h3>
              <p className="text-sm text-white/40 mb-8">You're in the top 5% of users this week! Your adherence is outstanding.</p>
              
              <div className="w-full space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/60">Medicine Adherence</span>
                  <span className="text-brand-cyan font-bold">40/40</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-cyan w-full" />
                </div>
                <div className="flex justify-between items-center text-sm pt-2">
                  <span className="text-white/60">AI Activity</span>
                  <span className="text-brand-purple font-bold">18/20</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-purple w-[90%]" />
                </div>
              </div>
            </Card>

            {/* Score History Chart */}
            <Card className="lg:col-span-2 p-8 bg-white/5 border-white/5">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <TrendingUp size={20} className="mr-3 text-brand-emerald" /> Performance Trend
                </h3>
                <div className="flex space-x-2">
                  <Badge variant="neutral">Last 6 Weeks</Badge>
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#ffffff40', fontSize: 12 }} 
                      dy={10}
                    />
                    <YAxis 
                      hide={true}
                      domain={[0, 100]}
                    />
                    <Tooltip 
                      contentStyle={{ background: '#1a2235', border: '1px solid #ffffff10', borderRadius: '12px' }}
                      itemStyle={{ color: '#00d4ff' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#00d4ff" 
                      strokeWidth={4} 
                      dot={{ fill: '#00d4ff', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 8, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-[10px] text-white/40 font-bold uppercase mb-1">Current Streak</p>
                  <p className="text-xl font-bold text-orange-500 flex items-center">
                    <Flame size={18} className="mr-2" /> 12 Days
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-[10px] text-white/40 font-bold uppercase mb-1">Total Badges</p>
                  <p className="text-xl font-bold text-brand-purple">14</p>
                </div>
              </div>
            </Card>

            {/* Badges Section */}
            <Card className="lg:col-span-3 p-8 bg-white/5 border-white/5">
              <h3 className="text-xl font-bold text-white mb-8">Achievements & Badges</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {badges.map((badge, i) => (
                  <div key={i} className={`flex flex-col items-center text-center group cursor-help ${!badge.unlocked ? 'opacity-40 grayscale' : ''}`}>
                    <div className={`w-20 h-20 rounded-2xl mb-4 flex items-center justify-center relative transition-all duration-300 ${
                      badge.unlocked 
                      ? 'bg-brand-cyan/10 border border-brand-cyan/20 group-hover:bg-brand-cyan/20 group-hover:scale-110' 
                      : 'bg-white/5 border border-white/10'
                    }`}>
                      <badge.icon size={32} className={badge.unlocked ? 'text-brand-cyan' : 'text-white/20'} />
                      {!badge.unlocked && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Lock size={16} className="text-white/40" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-bold text-white mb-1">{badge.name}</p>
                    <p className="text-[10px] text-white/40 leading-tight">{badge.desc}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HealthScore;
