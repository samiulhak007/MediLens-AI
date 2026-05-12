import React from 'react';
import Navbar from '../components/layout/Navbar';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { Users, BarChart3, Database, ShieldCheck, Search, Download, Trash2, Edit2, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const Admin = () => {
  const userStats = [
    { name: 'Mon', users: 400 },
    { name: 'Tue', users: 300 },
    { name: 'Wed', users: 600 },
    { name: 'Thu', users: 800 },
    { name: 'Fri', users: 500 },
    { name: 'Sat', users: 900 },
    { name: 'Sun', users: 1100 },
  ];

  const analysisData = [
    { name: 'Day 1', count: 45 },
    { name: 'Day 2', count: 52 },
    { name: 'Day 3', count: 48 },
    { name: 'Day 4', count: 70 },
    { name: 'Day 5', count: 61 },
    { name: 'Day 6', count: 85 },
    { name: 'Day 7', count: 92 },
  ];

  const users = [
    { id: 1, name: 'Imran Khan', email: 'imran@example.com', role: 'admin', joined: '2026-05-01', status: 'verified' },
    { id: 2, name: 'Priya Sharma', email: 'priya@example.com', role: 'user', joined: '2026-05-05', status: 'verified' },
    { id: 3, name: 'John Doe', email: 'john@example.com', role: 'user', joined: '2026-05-10', status: 'unverified' },
  ];

  return (
    <div className="min-h-screen bg-brand-navy">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-syne font-extrabold text-white mb-2">Admin Panel</h1>
            <p className="text-white/50">System oversight, analytics, and user management.</p>
          </div>
          <div className="flex space-x-4">
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex items-center">
              <Database size={16} className="text-brand-cyan mr-2" />
              <span className="text-xs text-white/70 font-medium">System Healthy</span>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Users', value: '1,284', icon: Users, color: 'text-brand-cyan' },
            { label: 'Total Analyses', value: '5,492', icon: BarChart3, color: 'text-brand-emerald' },
            { label: 'Active Reminders', value: '3,102', icon: ShieldCheck, color: 'text-brand-purple' },
            { label: 'Admin Users', value: '12', icon: ShieldCheck, color: 'text-amber-500' },
          ].map((stat, i) => (
            <Card key={i} className="p-6 bg-white/5 border-white/5 flex items-center space-x-4">
              <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-[10px] text-white/40 font-bold uppercase">{stat.label}</p>
                <p className="text-xl font-bold text-white">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Growth Chart */}
          <Card className="p-8 bg-white/5 border-white/5">
            <h3 className="text-lg font-bold text-white mb-8">User Registrations (Last 7 Days)</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userStats}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#ffffff40', fontSize: 12 }} dy={10} />
                  <Tooltip contentStyle={{ background: '#1a2235', border: '1px solid #ffffff10', borderRadius: '12px' }} />
                  <Area type="monotone" dataKey="users" stroke="#00d4ff" fillOpacity={1} fill="url(#colorUsers)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Activity Chart */}
          <Card className="p-8 bg-white/5 border-white/5">
            <h3 className="text-lg font-bold text-white mb-8">Analyses per Day</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analysisData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#ffffff40', fontSize: 12 }} dy={10} />
                  <Tooltip contentStyle={{ background: '#1a2235', border: '1px solid #ffffff10', borderRadius: '12px' }} cursor={{fill: '#ffffff05'}} />
                  <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Users Table */}
        <Card className="overflow-hidden border-white/5 bg-white/5">
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
                  <th className="p-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">Joined</th>
                  <th className="p-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">Status</th>
                  <th className="p-4 text-[10px] font-bold text-white/40 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan font-bold text-xs mr-3">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{user.name}</p>
                          <p className="text-xs text-white/30">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={user.role === 'admin' ? 'info' : 'neutral'} className="capitalize">{user.role}</Badge>
                    </td>
                    <td className="p-4 text-sm text-white/60">{user.joined}</td>
                    <td className="p-4">
                      <Badge variant={user.status === 'verified' ? 'success' : 'warning'} className="capitalize">{user.status}</Badge>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button className="p-2 text-white/30 hover:text-white transition-colors"><Eye size={16}/></button>
                      <button className="p-2 text-white/30 hover:text-brand-cyan transition-colors"><Edit2 size={16}/></button>
                      <button className="p-2 text-white/30 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Admin;
