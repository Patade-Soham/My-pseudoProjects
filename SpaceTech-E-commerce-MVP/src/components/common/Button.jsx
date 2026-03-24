import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, variant = 'primary', size = 'md', className = '', to, onClick, type = 'button', disabled = false, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center font-heading font-bold uppercase tracking-wider transition-all duration-300 rounded-lg";
  
  const variants = {
    primary: "bg-gradient-cosmic text-star-white shadow-[0_4px_20px_rgba(0,212,255,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(0,212,255,0.5)] border-none",
    secondary: "bg-transparent text-cosmic-cyan border-2 border-cosmic-cyan hover:bg-cosmic-cyan/10 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]",
    icon: "bg-nebula-blue border border-white/10 text-white hover:bg-cosmic-cyan hover:border-cosmic-cyan hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:scale-110 rounded-full",
    outline: "border border-moon-silver/30 text-moon-silver hover:border-moon-silver/60 bg-transparent"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: variant === 'icon' ? "w-12 h-12" : "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer";
  const styles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`;

  if (to) {
    return (
      <Link to={to} className={styles} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={styles} {...props}>
      {children}
    </button>
  );
};

export default Button;
