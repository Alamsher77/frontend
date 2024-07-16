import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4" style={{marginTop:'20px'}}>
      <div className="container mx-auto text-center">
        <p>&copy; { new Date().getFullYear()} shopes. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
