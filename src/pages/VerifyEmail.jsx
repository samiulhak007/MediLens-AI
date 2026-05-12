import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, RefreshCw, ArrowRight, LogOut } from 'lucide-react';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase/config';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import AnimatedBackground from '../components/landing/AnimatedBackground';

const VerifyEmail = () => {
  const { user, refreshUser, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.emailVerified) {
      navigate('/dashboard');
    }

    const interval = setInterval(async () => {
      await refreshUser();
      if (auth.currentUser?.emailVerified) {
        toast.success("Email verified!");
        navigate('/dashboard');
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [user, navigate, refreshUser]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleResend = async () => {
    if (cooldown > 0) return;
    setLoading(true);
    try {
      await sendEmailVerification(auth.currentUser);
      toast.success("Verification email sent!");
      setCooldown(60);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleManualCheck = async () => {
    await refreshUser();
    if (auth.currentUser?.emailVerified) {
      toast.success("Email verified!");
      navigate('/dashboard');
    } else {
      toast.error("Still not verified. Please check your inbox.");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-brand-navy">
      <AnimatedBackground />
      
      <Card variant="glass" className="w-full max-w-md p-10 text-center z-10 border-t-4 border-t-brand-cyan">
        <div className="w-20 h-20 bg-brand-cyan/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
          <Mail className="w-10 h-10 text-brand-cyan" />
        </div>
        
        <h2 className="text-3xl font-syne font-bold text-white mb-4">Check Your Inbox</h2>
        <p className="text-white/50 mb-8 leading-relaxed">
          We've sent a verification link to <br />
          <span className="text-white font-bold">{user?.email}</span>. <br />
          Please click the link to activate your account.
        </p>

        <div className="space-y-4">
          <Button 
            className="w-full" 
            onClick={handleManualCheck}
            icon={ArrowRight}
          >
            I've verified, take me in
          </Button>
          
          <Button 
            variant="secondary" 
            className="w-full" 
            onClick={handleResend}
            isLoading={loading}
            disabled={cooldown > 0}
            icon={RefreshCw}
          >
            {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Verification Email"}
          </Button>
        </div>

        <div className="mt-10 pt-8 border-t border-white/5 flex flex-col space-y-4">
          <button 
            onClick={() => navigate('/login')}
            className="text-sm text-brand-cyan hover:underline font-medium"
          >
            Sign in with a different account
          </button>
          <button 
            onClick={() => logout().then(() => navigate('/login'))}
            className="flex items-center justify-center text-xs text-red-400/50 hover:text-red-400 transition-colors"
          >
            <LogOut size={12} className="mr-1.5" />
            Logout
          </button>
        </div>
      </Card>
    </div>
  );
};

export default VerifyEmail;
