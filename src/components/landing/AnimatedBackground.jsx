import React, { useMemo } from 'react';

const AnimatedBackground = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      size: Math.random() * 200 + 50,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      opacity: Math.random() * 0.15 + 0.05,
      x1: (Math.random() - 0.5) * 20,
      y1: (Math.random() - 0.5) * 20,
      x2: (Math.random() - 0.5) * 20,
      y2: (Math.random() - 0.5) * 20,
    }));
  }, []);

  return (
    <div className="particle-container">
      {/* Mesh Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy to-[#1a1f3c] opacity-100" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.1)_0%,transparent_50%)]" />
      
      {/* Perspective Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) scale(2)',
          transformOrigin: 'top'
        }} 
      />

      {/* Floating Orbs */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.x}%`,
            top: `${p.y}%`,
            '--duration': `${p.duration}s`,
            '--opacity': p.opacity,
            '--x1': `${p.x1}%`,
            '--y1': `${p.y1}%`,
            '--x2': `${p.x2}%`,
            '--y2': `${p.y2}%`,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
