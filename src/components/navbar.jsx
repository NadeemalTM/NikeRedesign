import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './navbar.module.css';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { itemCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'admin') {
      setIsAdmin(true);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <nav 
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
    >
      <div className={styles.navContainer}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link to="/">
            <img src="/logo1.png" alt="Nike Logo" className={styles.logoImage} />
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className={styles.navLinks}>
          <li><Link to="/" className={styles.navLink}>Home</Link></li>
          <li><Link to="/shop" className={styles.navLink}>Shop</Link></li>
          <li><Link to="/about" className={styles.navLink}>About</Link></li>
          <li><Link to="/contact" className={styles.navLink}>Contact</Link></li>
          {isAdmin && (
            <li><Link to="/admin-dashboard" className={styles.adminLink}>Dashboard</Link></li>
          )}
        </ul>

        {/* Search and Actions */}
        <div className={styles.actions}>
          {/* Search */}
          <div className={styles.searchContainer}>
            <button 
              onClick={toggleSearch}
              className={`${styles.searchToggle} ${isSearchOpen ? styles.active : ''}`}
              aria-label="Search"
            >
              <i className="fas fa-search"></i>
            </button>
            <div className={`${styles.searchBar} ${isSearchOpen ? styles.open : ''}`}>
              <input 
                type="text" 
                placeholder="Search products..."
                className={styles.searchInput}
              />
              <button onClick={toggleSearch} className={styles.closeSearch}>
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>

          {/* User Account */}
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

          {/* Wishlist */}
          <button className={styles.actionButton} aria-label="Wishlist">
            <i className="fas fa-heart"></i>
          </button>

          {/* Shopping Cart */}
          <Link to="/cart" className={styles.cartButton} aria-label="Shopping Cart">
            <i className="fas fa-shopping-cart"></i>
            {itemCount > 0 && (
              <span className={styles.cartBadge}>{itemCount}</span>
            )}
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
