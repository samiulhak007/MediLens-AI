import React from 'react';
import { twMerge } from 'tailwind-merge';

const Card = ({ children, variant = 'default', className, ...props }) => {
  const variants = {
    default: 'bg-brand-card border border-white/5',
    glass: 'glass-card',
    bordered: 'bg-brand-card border-2 border-brand-cyan/20',
  };

  return (
    <div
      className={twMerge(
        'rounded-2xl p-6 transition-all duration-300',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
