import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';  // Import the icons
const Footer = () => { 
   return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Company Name */}
        <div style={styles.companyName}>
          <p>EasyShops</p>
        </div>

        {/* Social Media Icons */}
        <div style={styles.socialIcons}>
          <a href="https://www.facebook.com/share/15T4yr3bJu/"  rel="noopener noreferrer" style={styles.icon}>
            <FaFacebook size={30} />
          </a>
          <a href="https://www.instagram.com/__alam_dev_637157/profilecard/?igsh=MWJmcnMxejBtdWNqZg=="  rel="noopener noreferrer" style={styles.icon}>
            <FaInstagram size={30} />
          </a>
          <a href="https://wa.me/8252637157" rel="noopener noreferrer" style={styles.icon}>
            <FaWhatsapp size={30} />
          </a>
        </div>
        <div className="text-sm mt-4 text-slate-500"> <p>© { new Date().getFullYear() } easyshopsmart. All rights reserved.</p></div>
      </div>
    </footer>
  );
};
const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px 0',
    textAlign: 'center',
    position: 'rilative',
    width: '100%',
    marginTop:"30px",
    paddingBottom:"80px",
    userSelect:"none"
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  companyName: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
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
};

export default Footer;
