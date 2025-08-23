import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import ShopPage from '../pages/ShopPage';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    // Handle navbar background change on scroll
    const handleScroll = () => {
      window.scrollY > 50 ? setIsScrolled(true) : setIsScrolled(false);
    };

    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }

    // Check if user is admin
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'admin') {
      setIsAdmin(true);
    }

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
        {isAdmin && (
          <li><Link to="/admin-dashboard" className={styles.adminLink}>Dashboard</Link></li>
        )}
      </ul>

      <div className={styles.actions}>
        <div className={styles.accountContainer}>
          {!isAuthenticated ? (
            <Link to="/signin" className={styles.signinLink}>
              <i className="fas fa-user"></i>
              Sign In
            </Link>
          ) : (
            <Link to="/profile" className={styles.signinLink}>
              <i className="fas fa-user"></i>
              Profile
            </Link>
          )}
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
        <Link to="/cart" className={styles.cartButton} aria-label="Shopping Cart">
          <i className="fas fa-shopping-cart"></i>
          {itemCount > 0 && (
            <span className={styles.cartBadge}>{itemCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
