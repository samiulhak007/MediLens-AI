import React from 'react';
import { twMerge } from 'tailwind-merge';

const Badge = ({ children, variant = 'info', className }) => {
  const variants = {
    info: 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20',
    success: 'bg-brand-emerald/10 text-brand-emerald border-brand-emerald/20',
    warning: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    danger: 'bg-red-500/10 text-red-500 border-red-500/20',
    neutral: 'bg-white/5 text-white/60 border-white/10',
  };

  return (
    <span
      className={twMerge(
        'px-2.5 py-0.5 rounded-full text-xs font-semibold border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
