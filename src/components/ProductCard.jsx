import React, { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({
  product,
  onAddToCart,
  onProductClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Handle product card click
  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product._id || product.id);
    }
  };

  // Handle buy now button click
  const handleBuyNow = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  // Construct proper image URL
  const getImageUrl = (image) => {
    if (!image) return '/placeholder.jpg';
    
    if (image.startsWith('http')) {
      return image;
    }
    
    if (image.startsWith('/uploads/')) {
      return `http://localhost:5000${image}`;
    }
    
    if (!image.startsWith('/')) {
      return `http://localhost:5000/uploads/${image}`;
    }
    
    return image;
  };

  const handleImageError = (e) => {
    setImageError(true);
    e.target.onerror = null;
    e.target.src = '/placeholder.jpg';
  };

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Product Images */}
      <div className="product-image-container">
        {product.images && product.images.length > 0 ? (
          <img 
            src={imageError ? '/placeholder.jpg' : getImageUrl(product.images[0])} 
            alt={product.name} 
            className="product-image"
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <img 
            src="/placeholder.jpg" 
            alt={product.name} 
            className="product-image"
            onError={handleImageError}
            loading="lazy"
          />
        )}
        
        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <div className="discount-badge">
            -{product.discountPercentage}%
          </div>
        )}

        {/* New Product Badge */}
        {product.isNew && (
          <div className="new-badge">
            NEW
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="product-info">
        {/* Price Section */}
        <div className="price-section">
          <div className="current-price">
            <span className="currency">Rs.</span>
            <span className="price-amount">{product.price.toLocaleString()}</span>
          </div>
          {product.originalPrice && product.originalPrice > product.price && (
            <div className="original-price">
              <span className="currency">Rs.</span>
              <span className="price-amount strikethrough">
                {product.originalPrice.toLocaleString()}
              </span>
            </div>
          )}
        </div>

        {/* Product Name */}
        <h3 className="product-name">{product.name}</h3>

        {/* Rating & Reviews */}
        <div className="ratings-section">
          <div className="stars">
            {/* Render star ratings */}
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} className={`star ${index < product.rating ? 'filled' : ''}`}>★</span>
            ))}
          </div>
          <span className="reviews-count">
            {product.reviewCount > 0 ? `(${product.reviewCount})` : 'No reviews'}
          </span>
        </div>

        {/* Short Description */}
        {product.description && (
          <p className="product-description">
            {product.description}
          </p>
        )}

        {/* Buy Now Button */}
        <button 
          className="buy-now-btn"
          onClick={handleBuyNow}
        >
          Buy now
        </button>

        {/* Store Availability */}
        <div className="store-availability">
          <p className="availability-text">Choose a store to see local availability</p>
          <div className="store-icons">
            <span className="store-icon" title="Main Store">🏪</span>
            <span className="store-icon" title="Mall Branch">🛍️</span>
            <span className="store-icon" title="Online Store">🌐</span>
          </div>
        </div>

        {/* Additional Icons */}
        <div className="feature-icons">
          {product.isVegan && <span className="feature-icon" title="Vegan">🌱</span>}
          {product.isGlutenFree && <span className="feature-icon" title="Gluten Free">🌾</span>}
          {product.freeShipping && <span className="feature-icon" title="Free Shipping">🚚</span>}
        </div>
      </div>
    </div>
  );
};

// Default props
ProductCard.defaultProps = {
  product: {
    id: 0,
    name: 'Product Name',
    price: 0,
    images: [],
    description: '',
    rating: 0,
    reviewCount: 0,
    discountPercentage: 0,
    originalPrice: null,
    isNew: false,
    isVegan: false,
    isGlutenFree: false,
    freeShipping: false
  },
  onAddToCart: () => {},
  onProductClick: () => {}
};

export default ProductCard;
