import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  return (
    <div className="order-success-container">
      <div className="order-success-card">
        <div className="success-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase. Your order has been confirmed.</p>
        
        {order && (
          <div className="order-details">
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total Amount:</strong> Rs. {order.total?.toLocaleString()}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          </div>
        )}

        <div className="success-actions">
          <button 
            onClick={() => navigate('/shop')}
            className="continue-shopping-btn"
          >
            Continue Shopping
          </button>
          <button 
            onClick={() => navigate('/')}
            className="home-btn"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
