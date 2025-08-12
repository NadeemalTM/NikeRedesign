import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Handle navbar background change on scroll
  window.addEventListener('scroll', () => {
    window.scrollY > 50 ? setIsScrolled(true) : setIsScrolled(false);
  });

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>
        <Link to="/">
          <img src="/logo1.png" alt="Nike Logo" />
        </Link>
      </div>

      <ul className={styles.navLinks}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className={styles.actions}>
        <div className={styles.accountContainer}>
          
          
        </div>
        <div className={styles.searchContainer}>
          <button 
            aria-label="Search"
            onClick={toggleSearch}
            className={isSearchOpen ? styles.active : ''}
          >
            <i className="fas fa-search"></i>
          </button>
          <div className={`${styles.searchBar} ${isSearchOpen ? styles.open : ''}`}>
            <input 
              type="text" 
              placeholder="Search products..."
              aria-label="Search input"
            />
            <button className={styles.closeSearch} onClick={toggleSearch}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
        <button aria-label="Wishlist">
          <i className="fas fa-heart"></i>
        </button>
        <button aria-label="Shopping Cart">
          <i className="fas fa-shopping-cart"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;