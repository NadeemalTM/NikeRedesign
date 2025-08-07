import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        {/* Replace with your logo SVG or image */}
        <span className="logo-icon">∞</span>
      </div>
      <nav className="header__nav">
        <a href="#">Home</a>
        <a href="#">Shop</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>
      <div className="header__icons">
        <span title="Account">👤</span>
        <span title="Search">🔍</span>
        <span title="Wishlist">♡</span>
        <span title="Cart">🛒</span>
      </div>
    </header>
  );
}

export default Header;