import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import './Buy.css';

const Buy = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Pakistan',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    
    // Auto-format card number (add spaces every 4 digits)
    if (name === 'cardNumber') {
      const cleanedValue = value.replace(/\s+/g, '');
      if (/^\d*$/.test(cleanedValue)) {
        formattedValue = cleanedValue.replace(/(\d{4})/g, '$1 ').trim();
      }
    }
    
    // Auto-format expiry date (add slash after 2 digits)
    if (name === 'expiryDate') {
      const cleanedValue = value.replace(/\D/g, '');
      if (/^\d*$/.test(cleanedValue)) {
        if (cleanedValue.length <= 2) {
          formattedValue = cleanedValue;
        } else {
          formattedValue = cleanedValue.slice(0, 2) + '/' + cleanedValue.slice(2, 4);
        }
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const calculateTotals = () => {
    const subtotal = total;
    const shippingCost = subtotal > 5000 ? 0 : 200;
    const tax = subtotal * 0.13;
    const totalAmount = subtotal + shippingCost + tax;
    
    return { subtotal, shippingCost, tax, totalAmount };
  };


  const validateCardDetails = () => {
    const { cardNumber, expiryDate, cvv } = formData;
    
    // Basic validation
    if (!cardNumber || !expiryDate || !cvv) {
      showToast('Please fill in all card details', 'error');
      return false;
    }
    
    // Validate card number (16 digits, Luhn algorithm)
    const cleanedCardNumber = cardNumber.replace(/\s+/g, '');
    if (cleanedCardNumber.length !== 16 || !/^\d+$/.test(cleanedCardNumber)) {
      showToast('Card number must be 16 digits', 'error');
      return false;
    }
    
    // Luhn algorithm validation
    let sum = 0;
    let isEven = false;
    for (let i = cleanedCardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanedCardNumber.charAt(i), 10);
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      isEven = !isEven;
    }
    
    if (sum % 10 !== 0) {
      showToast('Invalid card number', 'error');
      return false;
    }
    
    // Validate expiry date (MM/YY format)
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(expiryDate)) {
      showToast('Expiry date must be in MM/YY format', 'error');
      return false;
    }
    
    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    if (parseInt(year) < currentYear || 
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
      showToast('Card has expired', 'error');
      return false;
    }
    
    // Validate CVV (3-4 digits)
    if (!/^\d{3,4}$/.test(cvv)) {
      showToast('CVV must be 3 or 4 digits', 'error');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate card details
    if (!validateCardDetails()) {
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showToast('Please login to complete your purchase', 'error');
        navigate('/signin');
        return;
      }

      const { subtotal, shippingCost, tax, totalAmount } = calculateTotals();

      const orderData = {
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        paymentMethod: 'credit_card',
        cardDetails: {
          cardNumber: formData.cardNumber,
          expiryDate: formData.expiryDate,
          cvv: formData.cvv
        },
        notes: formData.notes,
        subtotal,
        shippingCost,
        tax,
        total: totalAmount
      };

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const order = await response.json();
        showToast('Order placed successfully!', 'success');
        clearCart();
        navigate('/order-success', { state: { order } });
      } else {
        const errorData = await response.json();
        showToast(errorData.message || 'Failed to place order', 'error');
      }
    } catch (error) {
      console.error('Order placement error:', error);
      showToast('Network error. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const { subtotal, shippingCost, tax, totalAmount } = calculateTotals();

  if (items.length === 0) {
    return (
      <div className="buy-container">
        <div className="buy-empty">
          <h2>Your cart is empty</h2>
          <p>Add some products to proceed with checkout</p>
          <button onClick={() => navigate('/shop')} className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="buy-container">
      <div className="buy-header">
        <h1>Checkout</h1>
        <p>Complete your purchase by filling the details below</p>
      </div>

      <div className="buy-content">
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-section">
            <h3>Shipping Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="state">State *</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="zipCode">ZIP Code *</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="country">Country *</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Payment Method</h3>
            <div className="payment-details">
              <h4>Credit/Debit Card</h4>
              
              <div className="card-icons">
                <span className="card-icon">Visa</span>
                <span className="card-icon">MC</span>
                <span className="card-icon">Amex</span>
                <span className="card-icon">Discover</span>
              </div>

              <div className="form-group">
                <label htmlFor="cardNumber">Card Number *</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date *</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="cvv">CVV *</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    maxLength="4"
                    required
                  />
                </div>
              </div>

              <div className="security-note">
                Your payment information is encrypted and secure. We do not store your card details.
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Additional Notes</h3>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Any special instructions for delivery..."
              rows="3"
            />
          </div>

          <button 
            type="submit" 
            className="buy-now-btn"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Buy Now'}
          </button>
        </form>
        
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-item">
            <span>Subtotal:</span>
            <span>Rs. {subtotal.toLocaleString()}</span>
          </div>
          <div className="summary-item">
            <span>Shipping:</span>
            <span>{shippingCost === 0 ? 'Free' : `Rs. ${shippingCost.toLocaleString()}`}</span>
          </div>
          <div className="summary-item">
            <span>Tax (13%):</span>
            <span>Rs. {tax.toLocaleString()}</span>
          </div>
          <div className="summary-item total">
            <span>Total:</span>
            <span>Rs. {totalAmount.toLocaleString()}</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Buy;
