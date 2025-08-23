import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import './ShopPage.css';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/products');
      
      if (response.ok) {
        const data = await response.json();
        // Use the actual image paths from the database
        setProducts(data);
      } else {
        throw new Error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="shop-container">
      {/* Hero Section */}
      <div className="shop-hero">
        <div className="hero-content">
          <h1 className="hero-title">Premium Collection</h1>
          <p className="hero-subtitle">
            Discover exclusive sneakers and limited edition releases from top brands
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="shop-main">
        {/* Product Controls */}
        <div className="shop-controls">
          <div className="controls-left">
            <p className="results-count">Showing {products.length} products</p>
          </div>
          <div className="controls-right">
            <div className="filter-group">
              <label htmlFor="sort" className="filter-label">Sort by</label>
              <select id="sort" className="filter-select">
                <option>Default</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Name: A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onProductClick={() => handleProductClick(product._id)}
              onAddToWishlist={(product) => console.log('Add to wishlist:', product)}
              onAddToCart={(product) => addToCart(product)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ShopPage;
