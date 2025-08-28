import React, { useState } from 'react';
import './PaymentModal.css';

const PaymentModal = ({ isOpen, onClose, onConfirm, title }) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [suggestions, setSuggestions] = useState([]);

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Auto-format card number with spaces every 4 digits
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      
      // Auto-suggest test card numbers
      const cleanValue = value.replace(/\s/g, '');
      if (cleanValue.length >= 4) {
        const testCards = [
          { number: '4242424242424242', type: 'Visa' },
          { number: '5555555555554444', type: 'MasterCard' },
          { number: '378282246310005', type: 'American Express' },
          { number: '4000056655665556', type: 'Visa (debit)' },
          { number: '5200828282828210', type: 'MasterCard (debit)' }
        ];
        
        const suggestions = testCards.filter(card => 
          card.number.startsWith(cleanValue)
        );
        setSuggestions(suggestions);
      } else {
        setSuggestions([]);
      }
    }
    
    // Auto-format expiry date with slash
    if (name === 'expiryDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '$1/$2')
        .substring(0, 5);
    }
    
    // Validate CVV length (3-4 digits)
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }
    
    setCardDetails(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSuggestionClick = (cardNumber) => {
    const formattedNumber = cardNumber.replace(/(\d{4})/g, '$1 ').trim();
    setCardDetails(prev => ({
      ...prev,
      cardNumber: formattedNumber
    }));
    setSuggestions([]);
  };

  const handleCardIconClick = (cardType) => {
    let cardNumber = '';
    switch(cardType) {
      case 'visa':
        cardNumber = '4242424242424242';
        break;
      case 'mastercard':
        cardNumber = '5555555555554444';
        break;
      case 'amex':
        cardNumber = '378282246310005';
        break;
      default:
        return;
    }
    const formattedNumber = cardNumber.replace(/(\d{4})/g, '$1 ').trim();
    setCardDetails(prev => ({
      ...prev,
      cardNumber: formattedNumber
    }));
  };

  const handleConfirm = () => {
    // Validate card details
    if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv) {
      alert('Please fill in all fields.');
      return;
    }
    
    // Additional validation
    const cardNumber = cardDetails.cardNumber.replace(/\s/g, '');
    const expiryDate = cardDetails.expiryDate;
    const cvv = cardDetails.cvv;
    
    // Validate card number length (13-19 digits)
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      alert('Please enter a valid card number (13-19 digits).');
      return;
    }
    
    // Validate expiry date format (MM/YY)
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(expiryDate)) {
      alert('Please enter a valid expiry date (MM/YY).');
      return;
    }
    
    // Validate CVV length (3-4 digits)
    if (cvv.length < 3 || cvv.length > 4) {
      alert('Please enter a valid CVV (3-4 digits).');
      return;
    }
    
    // Here you can add logic to validate card details before confirming
    onConfirm(cardDetails);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-form-group">
            <label htmlFor="cardNumber">Card Number *</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.cardNumber}
              onChange={handleCardInputChange}
              required
            />
            <div className="card-icons">
              <div className="card-icon visa" title="Visa" onClick={() => handleCardIconClick('visa')}>
                <svg width="40" height="24" viewBox="0 0 40 24">
                  <rect width="40" height="24" fill="#1a1f71" rx="3"/>
                  <text x="20" y="15" fill="white" fontSize="12" textAnchor="middle" fontWeight="bold">VISA</text>
                </svg>
              </div>
              <div className="card-icon mastercard" title="MasterCard" onClick={() => handleCardIconClick('mastercard')}>
                <svg width="40" height="24" viewBox="0 0 40 24">
                  <rect width="40" height="24" fill="#ff5f00" rx="3"/>
                  <text x="20" y="15" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">MC</text>
                </svg>
              </div>
              <div className="card-icon amex" title="American Express" onClick={() => handleCardIconClick('amex')}>
                <svg width="40" height="24" viewBox="0 0 40 24">
                  <rect width="40" height="24" fill="#006fcf" rx="3"/>
                  <text x="20" y="15" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">AMEX</text>
                </svg>
              </div>
            </div>
            
            {suggestions.length > 0 && (
              <div className="suggestions-dropdown">
                {suggestions.map((card, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(card.number)}
                  >
                    {card.number.replace(/(\d{4})/g, '$1 ').trim()} - {card.type}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="modal-form-group">
            <label htmlFor="expiryDate">Expiry Date *</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              placeholder="MM/YY"
              value={cardDetails.expiryDate}
              onChange={handleCardInputChange}
              required
            />
          </div>
          <div className="modal-form-group">
            <label htmlFor="cvv">CVV *</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              placeholder="123"
              value={cardDetails.cvv}
              onChange={handleCardInputChange}
              required
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="modal-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-confirm-btn" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
