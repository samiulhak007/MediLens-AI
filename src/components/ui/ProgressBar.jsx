import React from 'react';

const ProgressBar = ({ progress, label, color = "brand-cyan" }) => {
  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between text-xs font-bold text-white/50">
          <span>{label}</span>
          <span>{progress}%</span>
        </div>
      )}
      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-${color} transition-all duration-300`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
