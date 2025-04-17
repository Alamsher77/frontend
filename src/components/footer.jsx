import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'; 
import {Link} from 'react-router-dom'
const Footer = () => {
  const handleScroll = ()=>{
    window.scrollTo({top:0,behavior:'smooth'})
  }
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 md:px-20">
      <div className="grid md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold mb-3">Easy Shope</h2>
          <p className="text-sm">
            Your one-stop destination for easy and secure shotog experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link onClick={handleScroll} to="/" className="hover:underline">Home</Link></li>
            <li><Link onClick={handleScroll} to="/shop" className="hover:underline">Shop</Link></li>
            <li><Link onClick={handleScroll} to="/about" className="hover:underline">About Us</Link></li>
            <li><Link onClick={handleScroll} to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><Link onClick={handleScroll} to="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link onClick={handleScroll} to="/returns" className="hover:underline">Returns</Link></li>
            <li><Link onClick={handleScroll} to="/shipping" className="hover:underline">Shipping Info</Link></li>
            <li><Link onClick={handleScroll} to="/privacy" className="hover:underline">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
          <p className="text-sm">Email: easyshope8252@gmail.com</p>
          <p className="text-sm">Phone: +91 8252637157</p>
          <p className="text-sm">Location: India / Jharkhand / Garhwa</p>
        </div>
      </div>

          <div style={styles.socialIcons}>
          <Link to="https://www.facebook.com/share/15T4yr3bJu/"  rel="noopener noreferrer" style={styles.icon}>
            <FaFacebook size={30} />
          </Link>
          <Link to="https://www.instagram.com/__alam_dev_637157/profilecard/?igsh=MWJmcnMxejBtdWNqZg=="  rel="noopener noreferrer" style={styles.icon}>
            <FaInstagram size={30} />
          </Link>
          <Link to="https://wa.me/8252637157" rel="noopener noreferrer" style={styles.icon}>
            <FaWhatsapp size={30} />
          </Link>
        </div>
         
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} Easy Shop. All rights reserved.
      </div>
    </footer>
  );
};

const styles = {
  socialIcons: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  icon: {
    color: '#fff',
    textDecoration: 'none',
  },

}

export default Footer;
