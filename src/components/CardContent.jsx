// CardContent.jsx
import React from 'react';

const CardContent = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default CardContent;
