// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import banner1 from '../assets/banner1.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg';

// Import all 10 images
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';
import img4 from '../assets/4.png';
import img5 from '../assets/5.png';
import img6 from '../assets/6.png';
import img7 from '../assets/7.png';
import img8 from '../assets/8.png';
import img9 from '../assets/9.png';
import img10 from '../assets/10.png';

const images = [banner1, banner2, banner3];
const heroText = "LEADERS OF THE\nPACK";

// Array of all 10 random images
const allRandomImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

// Function to get a random image
const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * allRandomImages.length);
  return allRandomImages[randomIndex];
};

const HeroBanner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [typingPhase, setTypingPhase] = useState('typing'); // 'typing' or 'pausing'

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typingPhase === 'typing') {
      let i = 0;
      setTypedText(''); // Reset text for new typing cycle
      const typingInterval = setInterval(() => {
        if (i < heroText.length) {
          setTypedText((prevText) => prevText + heroText.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
          setTypingPhase('pausing');
        }
      }, 100); // Typing speed (milliseconds per character)

      return () => clearInterval(typingInterval);
    } else if (typingPhase === 'pausing') {
      const pauseTimeout = setTimeout(() => {
        setTypingPhase('typing'); // Restart typing after pause
      }, 3000); // Pause for 3 seconds before re-typing

      return () => clearTimeout(pauseTimeout);
    }
  }, [typingPhase]);

  return (
    <div className="hero-banner" style={{ backgroundImage: `url(${images[currentImageIndex]})` }}>
      <div className="hero-content">
        <h1>{typedText.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < typedText.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}</h1>
        <a href="#" className="shop-now-btn">Shop Now</a>
      </div>
    </div>
  );
};

const FeatureGrids = () => {
  return (
    <div className="feature-grids">
      <div className="feature-grid-item">
        <h2>Class to Courts Fits</h2>
        <img src={getRandomImage()} alt="Class to Courts Fits" />
        <a href="#" className="view-more-link">View More</a>
      </div>
      <div className="feature-grid-item">
        <h2>Strength Starts Here</h2>
        <img src={getRandomImage()} alt="Strength Starts Here" />
        <a href="#" className="view-more-link">View More</a>
      </div>
    </div>
  );
};

const ProductCards = () => {
  const products = [
    {
      image: getRandomImage(),
      description: "Unisex canvas sneakers",
      price: "Rs. 25,000.00",
    },
    {
      image: getRandomImage(),
      description: "Running shoes with cushioning",
      price: "Rs. 25,000.00",
    },
    {
      image: getRandomImage(),
      description: "High-top basketball shoes",
      price: "Rs. 25,000.00",
    },
    {
      image: getRandomImage(),
      description: "Casual leather loafers",
      price: "Rs. 25,000.00",
    },
  ];

  return (
    <div className="product-cards-section">
      <h2>Top Picks For You</h2>
      <p className="product-cards-subheading">Find your fit. From bold sneakers to sleek activewear, we’ve got everything to fuel your next move.</p>
      <div className="product-cards-grid">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <img src={product.image} alt={product.description} />
            <h3>{product.description}</h3>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const HomePage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'admin') {
      setIsAdmin(true);
    }
  }, []);

  const handleAddProduct = () => {
    navigate('/admin-dashboard');
  };

  return (
    <div>
      <HeroBanner />
      
      {isAdmin && (
        <div className="admin-section">
          <button className="add-product-btn" onClick={handleAddProduct}>
            Add New Product
          </button>
        </div>
      )}
      
      <FeatureGrids />
      <ProductCards />
    </div>
  );
};

export default HomePage;