import React, { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({
  product,
  onAddToWishlist,
  onAddToCart,
  onProductClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Handle wishlist button click
  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (onAddToWishlist) {
      onAddToWishlist(product);
    }
  };

  // Handle cart button click
  const handleCartClick = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  // Handle product card click
  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product.id);
    }
  };

  // Render star ratings (0-5 scale)
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        stars.push(<span key={i} className="star">★</span>);
      }
    }

    return stars;
  };

  // Format number with K/M suffixes
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Product Image with Hover Actions */}
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src = "/placeholder-image.png"; 
          }}
        />
        
        {/* Hover Action Buttons */}
        <div className={`hover-actions ${isHovered ? 'visible' : ''}`}>
          <button 
            className="action-btn wishlist-btn"
            onClick={handleWishlistClick}
            aria-label="Add to wishlist"
          >
            ♡
          </button>
          <button 
            className="action-btn cart-btn"
            onClick={handleCartClick}
            aria-label="Add to cart"
          >
            +
          </button>
        </div>

        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <div className="discount-badge">
            -{product.discountPercentage}%
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="product-info">
        {/* Category/Tags */}
        {product.category && (
          <div className="product-category">
            {product.category}
          </div>
        )}

        {/* Product Name */}
        <h3 className="product-name">{product.name}</h3>

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

        {/* Ratings and Reviews */}
        <div className="ratings-section">
          <div className="stars">
            {renderStars(product.rating || 0)}
          </div>
          <span className="reviews-count">
            ({product.reviewCount ? formatNumber(product.reviewCount) : '0'} reviews)
          </span>
        </div>

        {/* Sales/Orders Count */}
        {product.ordersCount > 0 && (
          <div className="orders-count">
            {formatNumber(product.ordersCount)}+ orders
          </div>
        )}

        {/* Shipping Information */}
        <div className="shipping-info">
          {product.freeShipping ? (
            <span className="free-shipping">Free Shipping</span>
          ) : (
            <span className="shipping-cost">
              Shipping: Rs. {product.shippingCost?.toLocaleString() || '0'}
            </span>
          )}
          {product.estimatedDelivery && (
            <span className="delivery-time">
              Est. delivery {product.estimatedDelivery}
            </span>
          )}
        </div>

        {/* Country/Region of Origin */}
        {product.originCountry && (
          <div className="origin-info">
            <span className="origin-flag">🇵🇰</span>
            <span className="origin-text">from {product.originCountry}</span>
          </div>
        )}
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
    image: '',
    category: '',
    rating: 0,
    reviewCount: 0,
    ordersCount: 0,
    freeShipping: false,
    shippingCost: 0,
    estimatedDelivery: '',
    originCountry: '',
    discountPercentage: 0,
    originalPrice: null
  },
  onAddToWishlist: () => {},
  onAddToCart: () => {},
  onProductClick: () => {}
};

export default ProductCard;
