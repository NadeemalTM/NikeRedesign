// src/components/Footer.jsx
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Column 1 */}
        <div className="footer-section">
          <h3>My Website</h3>
          <p>Your go-to place for amazing content.</p>
        </div>

        {/* Column 2 */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#">🌐</a>
            <a href="#">📘</a>
            <a href="#">📸</a>
            <a href="#">🐦</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 My Website. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
