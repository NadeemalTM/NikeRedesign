// src/components/Footer.jsx
import "./Footer.css";
import { useEffect, useRef } from "react";

function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      const sections = footerRef.current.querySelectorAll('.footer-section, .newsletter-section');
      sections.forEach((section) => observer.observe(section));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          
          {/* Brand Section */}
          <div className="footer-section">
            <div className="brand-logo">
              <h3>NIKE</h3>
            </div>
            <p className="brand-description">
              Just Do It. Bringing inspiration and innovation to every athlete in the world.
            </p>
            <div className="trust-badges">
              <div className="badge">✓ Free Shipping</div>
              <div className="badge">✓ 30-Day Returns</div>
              <div className="badge">✓ Secure Payment</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Shop</h4>
            <ul>
              <li><a href="#" className="footer-link">New Arrivals</a></li>
              <li><a href="#" className="footer-link">Men's Shoes</a></li>
              <li><a href="#" className="footer-link">Women's Shoes</a></li>
              <li><a href="#" className="footer-link">Kids' Shoes</a></li>
              <li><a href="#" className="footer-link">Accessories</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#" className="footer-link">Contact Us</a></li>
              <li><a href="#" className="footer-link">FAQs</a></li>
              <li><a href="#" className="footer-link">Shipping Info</a></li>
              <li><a href="#" className="footer-link">Returns</a></li>
              <li><a href="#" className="footer-link">Order Tracking</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Careers</a></li>
              <li><a href="#" className="footer-link">Sustainability</a></li>
              <li><a href="#" className="footer-link">Press</a></li>
              <li><a href="#" className="footer-link">Investors</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="footer-section newsletter-section">
            <h4>Stay Updated</h4>
            <p>Get the latest updates on new products and exclusive offers</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="newsletter-input"
              />
              <button className="newsletter-btn">
                Subscribe
                <span className="arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Social & Payment Section */}
      <div className="footer-middle">
        <div className="footer-container">
          {/* Social Media */}
          <div className="social-section">
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Facebook">
                <span className="icon">📘</span>
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <span className="icon">📸</span>
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <span className="icon">🐦</span>
              </a>
              <a href="#" className="social-icon" aria-label="YouTube">
                <span className="icon">📺</span>
              </a>
              <a href="#" className="social-icon" aria-label="TikTok">
                <span className="icon">🎵</span>
              </a>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="payment-section">
            <h5>We Accept</h5>
            <div className="payment-methods">
              <span className="payment-icon">💳</span>
              <span className="payment-icon">🏦</span>
              <span className="payment-icon">📱</span>
              <span className="payment-icon">🔒</span>
              <span className="payment-icon">💰</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="copyright">
            <p>© 2025 NIKE, Inc. All Rights Reserved</p>
          </div>
          <div className="legal-links">
            <a href="#" className="legal-link">Privacy Policy</a>
            <a href="#" className="legal-link">Terms of Service</a>
            <a href="#" className="legal-link">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
