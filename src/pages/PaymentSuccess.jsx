import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { useCart } from '../context/CartContext';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const paymentIntentId = searchParams.get('payment_intent');
    
    if (paymentIntentId) {
      verifyPayment(paymentIntentId);
    } else {
      showToast('Invalid payment confirmation', 'error');
      navigate('/shop');
    }
  }, [searchParams]);

  const verifyPayment = async (paymentIntentId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showToast('Please login to view your order', 'error');
        navigate('/signin');
        return;
      }

      // Verify payment with backend
      const response = await fetch(`http://localhost:5000/api/orders/payment/${paymentIntentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const orderData = await response.json();
        setOrder(orderData);
        clearCart();
        showToast('Payment successful! Your order has been confirmed.', 'success');
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      showToast('Failed to verify payment. Please contact support.', 'error');
      navigate('/shop');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="payment-success-container">
        <div className="payment-success-content">
          <h2>Verifying your payment...</h2>
          <p>Please wait while we confirm your payment details.</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="payment-success-container">
        <div className="payment-success-content">
          <h2>Payment Verification Failed</h2>
          <p>Unable to verify your payment. Please contact support.</p>
          <button onClick={() => navigate('/shop')} className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-success-container">
      <div className="payment-success-content">
        <div className="success-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#4CAF50"/>
          </svg>
        </div>
        
        <h1>Payment Successful!</h1>
        <p className="success-message">
          Thank you for your purchase. Your order has been confirmed and is being processed.
        </p>

        <div className="order-details">
          <h3>Order Details</h3>
          <div className="detail-item">
            <span>Order ID:</span>
            <span>{order._id}</span>
          </div>
          <div className="detail-item">
            <span>Total Amount:</span>
            <span>Rs. {order.total?.toLocaleString()}</span>
          </div>
          <div className="detail-item">
            <span>Payment Method:</span>
            <span>{order.paymentMethod}</span>
          </div>
          <div className="detail-item">
            <span>Status:</span>
            <span className="status-confirmed">Confirmed</span>
          </div>
        </div>

        <div className="shipping-details">
          <h3>Shipping Address</h3>
          <p>
            {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}<br />
            {order.shippingAddress?.address}<br />
            {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}<br />
            {order.shippingAddress?.country}
          </p>
        </div>

        <div className="action-buttons">
          <button onClick={() => navigate('/shop')} className="continue-shopping-btn">
            Continue Shopping
          </button>
          <button onClick={() => navigate('/orders')} className="view-orders-btn">
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
