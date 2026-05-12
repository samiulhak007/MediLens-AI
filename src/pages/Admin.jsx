import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { Users, BarChart3, Database, ShieldCheck, Search, Download, Trash2, Edit2, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Button from '../components/ui/Button';
import { db } from '../firebase/config';
import { collection, query, limit, onSnapshot, getDocs } from 'firebase/firestore';

const Admin = () => {
  const [userList, setUserList] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAnalyses: 0,
    adminCount: 0,
    proUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time listener for users
    const q = query(collection(db, 'users'), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUserList(users);
      
      // Calculate aggregate stats
      let totalAnalyses = 0;
      let admins = 0;
      let pros = 0;
      
      users.forEach(u => {
        totalAnalyses += (u.analysisCount || 0);
        if (u.role === 'admin') admins++;
        if (u.plan === 'pro') pros++;
      });

      setStats({
        totalUsers: snapshot.size,
        totalAnalyses: totalAnalyses,
        adminCount: admins,
        proUsers: pros
      });
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const chartData = [
    { name: 'Jan', users: 10 },
    { name: 'Feb', users: 25 },
    { name: 'Mar', users: 45 },
    { name: 'Apr', users: 80 },
    { name: 'May', users: userList.length },
  ];

  return (
    <div className="min-h-screen bg-brand-navy bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-fixed bg-no-repeat relative">
      <div className="absolute inset-0 bg-brand-navy/95 backdrop-blur-xl"></div>
      
      <div className="relative z-10">
        <Navbar />
        
        <main className="container mx-auto px-4 pt-32 pb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div>
              <h1 className="text-4xl font-syne font-extrabold text-white mb-2">Admin Panel</h1>
              <p className="text-white/50">Real-time system oversight and user management.</p>
            </div>
            <div className="flex space-x-4">
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex items-center">
                <Database size={16} className="text-brand-cyan mr-2" />
                <span className="text-xs text-white/70 font-medium">Database Connected</span>
              </div>
            </div>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-brand-cyan' },
              { label: 'Total Analyses', value: stats.totalAnalyses, icon: BarChart3, color: 'text-brand-emerald' },
              { label: 'Pro Members', value: stats.proUsers, icon: ShieldCheck, color: 'text-brand-purple' },
              { label: 'System Admins', value: stats.adminCount, icon: ShieldCheck, color: 'text-amber-500' },
            ].map((stat, i) => (
              <Card key={i} className="p-6 bg-white/5 border-white/5 flex items-center space-x-4">
                <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 font-bold uppercase">{stat.label}</p>
                  <p className="text-xl font-bold text-white">{loading ? '...' : stat.value}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Users Table */}
          <Card className="overflow-hidden border-white/5 bg-white/5 backdrop-blur-md">
            <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="text-xl font-bold text-white">User Management</h3>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input type="text" placeholder="Search users..." className="bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-brand-cyan" />
                </div>
                <Button size="sm" variant="secondary" icon={Download}>Export CSV</Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/5">
                    <th className="p-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">User</th>
                    <th className="p-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">Role</th>
                    <th className="p-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">Plan</th>
                    <th className="p-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">Analyses</th>
                    <th className="p-4 text-[10px] font-bold text-white/40 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {userList.map(user => (
                    <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan font-bold text-xs mr-3">
                            {user.name ? user.name[0] : user.email[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{user.name || 'No Name'}</p>
                            <p className="text-xs text-white/30">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={user.role === 'admin' ? 'info' : 'neutral'} className="capitalize">{user.role}</Badge>
                      </td>
                      <td className="p-4">
                        <Badge variant={user.plan === 'pro' ? 'success' : 'neutral'} className="capitalize">{user.plan}</Badge>
                      </td>
                      <td className="p-4 text-sm text-white/60 font-mono">{user.analysisCount || 0}</td>
                      <td className="p-4 text-right space-x-2">
                        <button className="p-2 text-white/30 hover:text-white transition-colors"><Eye size={16}/></button>
                        <button className="p-2 text-white/30 hover:text-brand-cyan transition-colors"><Edit2 size={16}/></button>
                        <button className="p-2 text-white/30 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                      </td>
                    </tr>
                  ))}
                  {userList.length === 0 && !loading && (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-white/20">No users found in database</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Admin;
