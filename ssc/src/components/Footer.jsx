import React from 'react';
import '../styles/footer.css'; 

function Footer() {
  return (
    <footer className="footer">
      <div className="links">
        <a href="/" className="link">Home</a>
        <a href="/about" className="link">About</a>
        <a href="/contact" className="link">Contact</a>
      </div>
      <p className="copyright">© 2023 Study Sessions. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
