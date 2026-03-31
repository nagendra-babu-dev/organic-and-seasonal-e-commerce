import React from 'react';

const Button = ({ children, variant = 'organic', size = 'md', className = '', ...props }) => {
  const variants = {
    organic: 'btn-organic',
    outline: 'btn-outline-organic',
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    success: 'btn-success'
  };

  const sizes = {
    sm: 'py-1 px-3',
    md: 'py-2 px-4',
    lg: 'py-3 px-5'
  };

  return (
    <button className={`btn ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;