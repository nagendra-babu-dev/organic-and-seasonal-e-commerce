import React from 'react';

const Card = ({ children, className = '', onClick, hover = true }) => {
  const hoverClass = hover ? 'hover-grow' : '';
  
  return (
    <div className={`card border-0 rounded-4 shadow-sm ${hoverClass} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

Card.Body = ({ children, className = '' }) => (
  <div className={`card-body p-4 ${className}`}>{children}</div>
);

Card.Image = ({ src, alt, className = '' }) => (
  <img src={src} alt={alt} className={`card-img-top ${className}`} />
);

Card.Title = ({ children, className = '' }) => (
  <h5 className={`card-title fw-bold ${className}`}>{children}</h5>
);

Card.Text = ({ children, className = '' }) => (
  <p className={`card-text text-muted ${className}`}>{children}</p>
);

export default Card;