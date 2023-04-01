import React from 'react';
import "../styles/Footer.css";

export const Footer = () => {
  
  
  return (
    <footer className="footer-container">
      <div className="social-icons-container">
        <a href="https://github.com/">
          <img
            src="https://img.icons8.com/ios/50/000000/github--v1.png"
            alt="Github"
            className="social-icon"
          />
        </a>
        <a href="https://www.linkedin.com/">
          <img
            src="https://img.icons8.com/ios/50/000000/linkedin.png"
            alt="LinkedIn"
            className="social-icon"
          />
        </a>
        <a href="https://twitter.com/">
          <img
            src="https://img.icons8.com/ios/50/000000/twitter--v1.png"
            alt="Twitter"
            className="social-icon"
          />
        </a>
      </div>
      <div className="text-container">
        <span className="text">&copy; 2023 Tu Empresa</span>
      </div>
    </footer>
  );
}