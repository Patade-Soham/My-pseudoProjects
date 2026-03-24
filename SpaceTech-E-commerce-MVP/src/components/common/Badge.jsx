import React from 'react';

const Badge = ({ children, variant = 'category', className = '' }) => {
  const baseStyles = "inline-flex items-center px-3 py-1.5 rounded-full font-mono text-[11px] font-bold tracking-widest uppercase";
  
  const variants = {
    category: "bg-cosmic-cyan/15 text-cosmic-cyan border border-cosmic-cyan/30",
    discount: "bg-mars-orange/15 text-mars-orange border border-mars-orange/30",
    new: "bg-success-green/15 text-success-green border border-success-green/30",
    featured: "bg-gradient-cosmic text-star-white border-none",
    stock: "bg-success-green/15 text-success-green",
    outofstock: "bg-error-red/15 text-error-red"
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
