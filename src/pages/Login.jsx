import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ArrowRight, Code } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import AnimatedBackground from '../components/landing/AnimatedBackground';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  
  const { login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const res = await login(formData.email, formData.password);
        if (!res.user.emailVerified) {
          toast.error("Please verify your email first.");
          navigate('/verify-email');
        } else {
          toast.success("Welcome back!");
          navigate('/dashboard');
        }
      } else {
        await signup(formData.email, formData.password, formData.name);
        toast.success("Account created! Please check your email for verification.");
        navigate('/verify-email');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success("Logged in with Google!");
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-brand-navy overflow-hidden">
      <AnimatedBackground />
      
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center gap-12 z-10">
        {/* Left Side: Brand Messaging */}
        <div className="hidden lg:block lg:w-1/2 text-left">
          <Link to="/" className="inline-flex items-center space-x-2 mb-12">
            <svg viewBox="0 0 100 100" className="w-12 h-12 fill-brand-cyan">
              <path d="M50 20C30 20 15 35 15 50C15 65 30 80 50 80C70 80 85 65 85 50C85 35 70 20 50 20ZM50 70C39 70 30 61 30 50C30 39 39 30 50 30C61 30 70 39 70 50C70 61 61 70 50 70Z" />
            </svg>
            <span className="text-3xl font-syne font-extrabold text-white">MediLens AI</span>
          </Link>
          <h1 className="text-5xl font-syne font-extrabold text-white mb-6 leading-tight">
            Step Into the Future of <br />
            <span className="text-brand-cyan">Personal Healthcare.</span>
          </h1>
          <p className="text-xl text-white/50 mb-10 max-w-md leading-relaxed">
            Join 10,000+ users who are already seeing beyond their prescriptions with MediLens AI.
          </p>
          <div className="space-y-6">
            {[
              "Analyze prescriptions in 5 languages",
              "Instant drug interaction warnings",
              "Plain language medical summaries",
              "Secure history and PDF exports"
            ].map((feature, i) => (
              <div key={i} className="flex items-center space-x-3 text-white/70">
                <div className="w-6 h-6 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                  <ArrowRight size={14} />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card variant="glass" className="p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-emerald" />
              
              <div className="mb-10 text-center lg:text-left">
                <h2 className="text-3xl font-syne font-bold text-white mb-2">
                  {isLogin ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-white/50">
                  {isLogin 
                    ? "Enter your credentials to access your dashboard." 
                    : "Fill in the details below to start your journey."}
                </p>
              </div>

              <div className="flex p-1 bg-white/5 rounded-xl mb-8">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                    isLogin ? 'bg-brand-cyan text-brand-navy shadow-lg' : 'text-white/50 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                    !isLogin ? 'bg-brand-cyan text-brand-navy shadow-lg' : 'text-white/50 hover:text-white'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70 ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-brand-cyan transition-colors"
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-brand-cyan transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-sm font-medium text-white/70">Password</label>
                    {isLogin && (
                      <Link to="/forgot-password" size="sm" className="text-xs text-brand-cyan hover:underline">
                        Forgot Password?
                      </Link>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                    <input
                      required
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-brand-cyan transition-colors"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  isLoading={loading} 
                  className="w-full py-4 text-lg"
                >
                  {isLogin ? "Sign In" : "Create Account"}
                </Button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-brand-card px-4 text-white/30">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center space-x-2 py-3 px-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5.04c1.61 0 3.05.56 4.19 1.66l3.14-3.14C17.43 1.68 14.94 1 12 1 7.24 1 3.2 3.96 1.17 8.07l3.74 2.9C5.82 7.7 8.69 5.04 12 5.04z" />
                    <path fill="#4285F4" d="M23.64 12.2c0-.83-.07-1.63-.2-2.4H12v4.55h6.52c-.28 1.48-1.12 2.74-2.37 3.58l3.69 2.87c2.16-1.99 3.41-4.93 3.41-8.6z" />
                    <path fill="#FBBC05" d="M5.82 13.03c-.23-.69-.36-1.42-.36-2.18s.13-1.49.36-2.18l-3.74-2.9C1.17 7.82 0 9.8 0 12s1.17 4.18 2.08 5.13l3.74-2.9z" />
                    <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.9l-3.69-2.87c-1.1.74-2.51 1.17-4.27 1.17-3.31 0-6.12-2.23-7.12-5.24l-3.74 2.9C3.2 20.04 7.24 23 12 23z" />
                  </svg>
                  <span className="text-sm font-medium">Google</span>
                </button>
                <button className="flex items-center justify-center space-x-2 py-3 px-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group">
                  <Code className="w-5 h-5" />
                  <span className="text-sm font-medium">GitHub</span>
                </button>
              </div>

              <div className="mt-8 text-center text-sm text-white/50">
                {isLogin ? (
                  <p>
                    Don't have an account?{" "}
                    <button onClick={() => setIsLogin(false)} className="text-brand-cyan hover:underline font-bold">
                      Sign Up
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <button onClick={() => setIsLogin(true)} className="text-brand-cyan hover:underline font-bold">
                      Sign In
                    </button>
                  </p>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
