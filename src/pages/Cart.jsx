import React from 'react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { items, total, loading, removeFromCart, updateQuantity } = useCart();

  // Construct proper image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/placeholder.jpg';
    
    // If image is already a full URL, use it directly
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // If image starts with /uploads, construct full backend URL
    if (imagePath.startsWith('/uploads/')) {
      return `http://localhost:5000${imagePath}`;
    }
    
    // If it's just a filename, assume it's in uploads
    if (!imagePath.startsWith('/')) {
      return `http://localhost:5000/uploads/${imagePath}`;
    }
    
    return imagePath;
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    await updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = async (itemId) => {
    await removeFromCart(itemId);
  };

  const handleCheckout = () => {
    // Redirect to checkout page (to be implemented)
    console.log('Proceeding to checkout');
  };

  if (loading) {
    return (
      <div className="cart-container">
        <div className="cart-loading">
          <div className="loading-spinner"></div>
          <p>Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <a href="/shop" className="shop-button">
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <span className="item-count">{items.length} item{items.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="item-image">
                <img 
                  src={item.product?.image ? getImageUrl(item.product.image) : '/placeholder.jpg'} 
                  alt={item.product?.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder.jpg';
                  }}
                />
              </div>

              <div className="item-details">
                <h3 className="item-name">{item.product?.name}</h3>
                <p className="item-category">{item.product?.category}</p>
                
                {item.size && (
                  <p className="item-variant">Size: {item.size}</p>
                )}
                {item.color && (
                  <p className="item-variant">Color: {item.color}</p>
                )}
                
                <p className="item-price">Rs. {item.price?.toLocaleString()}</p>
              </div>

              <div className="item-controls">
                <div className="quantity-controls">
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="remove-btn"
                  aria-label="Remove item"
                >
                  Remove
                </button>
              </div>

              <div className="item-total">
                Rs. {(item.price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-card">
            <h3>Order Summary</h3>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping</span>
              <span>{total > 5000 ? 'Free' : 'Rs. 200'}</span>
            </div>
            
            <div className="summary-row">
              <span>Tax (13%)</span>
              <span>Rs. {(total * 0.13).toLocaleString()}</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row total">
              <span>Total</span>
              <span>
                Rs. {(total + (total > 5000 ? 0 : 200) + (total * 0.13)).toLocaleString()}
              </span>
            </div>

            <button 
              onClick={handleCheckout}
              className="checkout-button"
            >
              Proceed to Checkout
            </button>

            <p className="shipping-note">
              {total > 5000 
                ? '🎉 You qualify for free shipping!'
                : 'Add Rs. ' + (5000 - total).toLocaleString() + ' more for free shipping'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
