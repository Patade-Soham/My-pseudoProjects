import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, variant = 'standard', className = '', ...props }) => {
  // variants: 'standard', 'glass', 'project'
  const baseClass = variant === 'glass' 
    ? 'card-glass' 
    : variant === 'project' 
      ? 'project-card' 
      : 'card relative overflow-hidden group/cardborder';

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`${baseClass} ${className}`} 
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan/0 to-accent-purple/0 group-hover/cardborder:from-accent-cyan/10 group-hover/cardborder:to-accent-purple/10 pointer-events-none transition-colors duration-500 z-0"></div>
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {children}
      </div>
    </motion.div>
  );
};

export default Card;
