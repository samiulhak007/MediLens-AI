import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  LogOut, 
  User, 
  LayoutDashboard, 
  History, 
  ShieldCheck, 
  Sun, 
  Moon,
  Bell,
  Menu,
  X
} from 'lucide-react';
import Button from '../ui/Button';

const Navbar = () => {
  const { user, userData, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  if (userData?.role === 'admin') {
    navLinks.push({ name: 'Admin', path: '/admin', icon: ShieldCheck });
  }

  const Logo = () => (
    <Link to="/" className="flex items-center space-x-2 group">
      <div className="relative w-10 h-10 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-brand-cyan group-hover:scale-110 transition-transform">
          <path d="M50 20C30 20 15 35 15 50C15 65 30 80 50 80C70 80 85 65 85 50C85 35 70 20 50 20ZM50 70C39 70 30 61 30 50C30 39 39 30 50 30C61 30 70 39 70 50C70 61 61 70 50 70Z" />
          <path d="M50 40C44.5 40 40 44.5 40 50C40 55.5 44.5 60 50 60C55.5 60 60 55.5 60 50C60 44.5 55.5 40 50 40Z" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-syne font-extrabold text-white leading-none">MediLens AI</span>
        <span className="text-[10px] text-brand-cyan font-medium tracking-widest uppercase">See Beyond</span>
      </div>
    </Link>
  );

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-brand-navy/80 backdrop-blur-lg border-b border-white/5 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Logo />

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {user ? (
            <>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-brand-cyan flex items-center ${
                    location.pathname === link.path ? 'text-brand-cyan' : 'text-white/70'
                  }`}
                >
                  <link.icon className="w-4 h-4 mr-1.5" />
                  {link.name}
                </Link>
              ))}
              <div className="h-6 w-px bg-white/10 mx-2" />
              <div className="flex items-center space-x-4">
                <button 
                  onClick={toggleTheme}
                  className="p-2 text-white/70 hover:text-white transition-colors"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <div className="relative">
                  <Bell size={20} className="text-white/70 hover:text-white cursor-pointer" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-cyan rounded-full" />
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-1.5" />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-white/70 hover:text-white text-sm font-medium">Login</Link>
              <Button onClick={() => navigate('/login')} size="sm">Get Started</Button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-card border-b border-white/5 p-6 md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {user ? (
                <>
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-white/70 hover:text-white flex items-center p-2 rounded-lg hover:bg-white/5"
                    >
                      <link.icon className="w-5 h-5 mr-3" />
                      {link.name}
                    </Link>
                  ))}
                  <button 
                    onClick={handleLogout}
                    className="flex items-center text-red-400 p-2 rounded-lg hover:bg-red-500/10"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-white/70 p-2">Login</Link>
                  <Button onClick={() => navigate('/login')}>Get Started</Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
