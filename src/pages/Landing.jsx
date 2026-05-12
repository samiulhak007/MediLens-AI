import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/landing/Hero';
import HowItWorks from '../components/landing/HowItWorks';
import Features from '../components/landing/Features';
import FAQ from '../components/landing/FAQ';
import Footer from '../components/layout/Footer';
import AnimatedBackground from '../components/landing/AnimatedBackground';

const Landing = () => {
  return (
    <div className="relative min-h-screen bg-brand-navy selection:bg-brand-cyan/30">
      <AnimatedBackground />
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
