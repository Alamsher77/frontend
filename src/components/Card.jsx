// Card.jsx
import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white border mb-2 p-6 rounded-md shadow-md  ${className}`}>
      {children}
    </div>
  );
};

export default Card;
