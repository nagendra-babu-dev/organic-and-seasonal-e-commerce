import React from 'react';

const Badge = ({ children, variant = 'success', className = '', ...props }) => {
  const variants = {
    success: 'bg-success',
    warning: 'bg-warning text-dark',
    danger: 'bg-danger',
    info: 'bg-info',
    secondary: 'bg-secondary'
  };

  return (
    <span className={`badge ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};

export default Badge;