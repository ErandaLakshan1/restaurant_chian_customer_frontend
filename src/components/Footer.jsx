import React from "react";
import "../assets/styles/components/footer.css";
import "../assets/styles/index.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="copyright">
          &copy; {new Date().getFullYear()} Quick Eat. All rights reserved.
        </p>
        <div className="footer-links">
          <a href="/terms" className="footer-link">
            Terms of Service
          </a>
          <a href="/privacy" className="footer-link">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
