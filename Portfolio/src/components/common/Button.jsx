import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  // variants: 'primary', 'secondary', 'icon'
  const baseClass = variant === 'icon' 
    ? 'btn-icon' 
    : variant === 'secondary' 
      ? 'btn-secondary' 
      : 'btn-primary';

  return (
    <button className={`${baseClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
