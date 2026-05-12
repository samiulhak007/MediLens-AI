import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const StatItem = ({ label, value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const numericValue = parseInt(value.replace(/,/g, ''));

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = numericValue;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <div ref={ref} className="text-center p-6 border-r border-white/5 last:border-0">
      <div className="text-4xl font-syne font-extrabold text-brand-cyan mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-white/50 text-sm font-medium uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
};

const StatsBar = () => {
  const stats = [
    { label: "Prescriptions Analyzed", value: "50,000", suffix: "+" },
    { label: "Accuracy Rate", value: "99", suffix: ".2%" },
    { label: "Languages Supported", value: "5", suffix: "" },
    { label: "Users Worldwide", value: "10,000", suffix: "+" },
  ];

  return (
    <div className="py-12 bg-white/5 border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <StatItem key={idx} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
