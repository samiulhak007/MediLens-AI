import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import { db } from '../firebase/config';
import { 
  collection, 
  query, 
  orderBy, 
  getDocs, 
  limit,
  where,
  getCountFromServer
} from 'firebase/firestore';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  Activity, 
  Globe, 
  ShieldCheck, 
  Search,
  MoreVertical,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const Admin = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    verifiedUsers: 0,
    totalAnalyses: 0,
    analysesToday: 0
  });
  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // Fetch User Count
        const usersSnap = await getCountFromServer(collection(db, 'users'));
        const verifiedSnap = await getCountFromServer(query(collection(db, 'users'), where('emailVerified', '==', true)));
        
        // Fetch Recent Users
        const recentUsersSnap = await getDocs(query(collection(db, 'users'), orderBy('joinedAt', 'desc'), limit(10)));
        const usersList = recentUsersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Mock chart data (in real app, fetch from stats collection)
        const lineData = [
          { name: 'May 1', val: 400 }, { name: 'May 3', val: 600 },
          { name: 'May 5', val: 500 }, { name: 'May 7', val: 900 },
          { name: 'May 9', val: 800 }, { name: 'May 11', val: 1200 },
          { name: 'May 12', val: 1500 },
        ];

        setStats({
          totalUsers: usersSnap.data().count,
          verifiedUsers: verifiedSnap.data().count,
          totalAnalyses: 5432,
          analysesToday: 128
        });
        setUsers(usersList);
        setLoading(false);
      } catch (error) {
        console.error("Admin fetch error", error);
      }
    };

    fetchAdminData();
  }, []);

  const chartData = [
    { name: 'May 06', users: 400, analyses: 2400 },
    { name: 'May 07', users: 300, analyses: 1398 },
    { name: 'May 08', users: 200, analyses: 9800 },
    { name: 'May 09', users: 278, analyses: 3908 },
    { name: 'May 10', users: 189, analyses: 4800 },
    { name: 'May 11', users: 239, analyses: 3800 },
    { name: 'May 12', users: 349, analyses: 4300 },
  ];

  const COLORS = ['#00d4ff', '#10b981', '#8b5cf6', '#f59e0b'];

  const StatCard = ({ label, value, icon: Icon, trend }) => (
    <Card className="p-6 border-none bg-white/5 relative overflow-hidden group">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl bg-brand-cyan/10 text-brand-cyan">
          <Icon size={24} />
        </div>
        {trend && (
          <div className="flex items-center text-brand-emerald text-xs font-bold">
            <TrendingUp size={12} className="mr-1" />
            {trend}%
          </div>
        )}
      </div>
      <div>
        <p className="text-white/40 text-sm font-medium uppercase tracking-wider">{label}</p>
        <p className="text-3xl font-syne font-extrabold text-white mt-1">{value.toLocaleString()}</p>
      </div>
      {/* Mini Chart Decoration */}
      <div className="absolute -bottom-2 -right-2 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon size={96} />
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-brand-navy">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-syne font-extrabold text-white mb-2">Admin Command Center</h1>
            <p className="text-white/50">Platform analytics and user management.</p>
          </div>
          <Button variant="secondary" icon={ArrowUpRight}>System Status</Button>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard label="Total Users" value={stats.totalUsers} icon={Users} trend={12} />
          <StatCard label="Verified Users" value={stats.verifiedUsers} icon={CheckCircle2} trend={8} />
          <StatCard label="Total Analyses" value={stats.totalAnalyses} icon={Activity} trend={24} />
          <StatCard label="Analyses Today" value={stats.analysesToday} icon={Clock} trend={15} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Charts Area */}
          <Card className="lg:col-span-2 p-8 h-[450px]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold">Growth & Activity</h3>
              <div className="flex space-x-2">
                <Badge variant="info">30 Days</Badge>
                <Badge variant="neutral">90 Days</Badge>
              </div>
            </div>
            <div className="w-full h-full pb-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} />
                  <YAxis stroke="#ffffff40" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a2235', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="analyses" stroke="#00d4ff" fillOpacity={1} fill="url(#colorUsers)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Distribution Chart */}
          <Card className="p-8 h-[450px]">
            <h3 className="text-xl font-bold mb-8">Language Distribution</h3>
            <div className="w-full h-full pb-10">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'English', value: 45 },
                      { name: 'Hindi', value: 25 },
                      { name: 'Tamil', value: 15 },
                      { name: 'Others', value: 15 },
                    ]}
                    cx="50%"
                    cy="45%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-4 mt-[-40px]">
                {['English', 'Hindi', 'Tamil', 'Others'].map((lang, i) => (
                  <div key={lang} className="flex items-center space-x-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-xs text-white/50">{lang}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Users Table */}
        <Card className="p-0 overflow-hidden">
          <div className="p-8 flex items-center justify-between border-b border-white/5">
            <h3 className="text-xl font-bold">Recent User Activity</h3>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input 
                type="text" 
                placeholder="Search users..." 
                className="bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-brand-cyan"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/2 border-b border-white/5 text-white/40 text-xs uppercase tracking-widest font-bold">
                  <th className="px-8 py-4">User</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Analyses</th>
                  <th className="px-8 py-4">Joined At</th>
                  <th className="px-8 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-8 py-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={user.photoURL || `https://ui-avatars.com/api/?name=${user.name}`} 
                          className="w-10 h-10 rounded-full border border-white/10" 
                          alt=""
                        />
                        <div>
                          <p className="text-sm font-bold text-white">{user.name}</p>
                          <p className="text-xs text-white/30">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <Badge variant={user.emailVerified ? 'success' : 'warning'}>
                        {user.emailVerified ? 'Verified' : 'Pending'}
                      </Badge>
                    </td>
                    <td className="px-8 py-4">
                      <p className="text-sm font-mono text-brand-cyan">{user.analysisCount || 0}</p>
                    </td>
                    <td className="px-8 py-4 text-xs text-white/40">
                      {new Date(user.joinedAt?.seconds * 1000).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-4">
                      <button className="p-2 text-white/30 hover:text-white transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 border-t border-white/5 text-center">
            <button className="text-sm font-bold text-brand-cyan hover:underline">View All Users</button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Admin;
