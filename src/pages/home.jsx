// src/pages/Home.jsx
import React from 'react';
import './home.css';
import shoe1 from '../assets/shoe1.png';
import shoe2 from '../assets/shoe2.png';
import sampleshoe from '../assets/sampleshoe.png';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-column">
        <img src={shoe1} alt="Class to Courts Fits" />
        <h2>Class to Courts Fits</h2>
        <a href="#">View More</a>
      </div>
      <div className="hero-column">
        <img src={shoe2} alt="Strength Starts Here" />
        <h2>Strength Starts Here</h2>
        <a href="#">View More</a>
      </div>
    </div>
  );
};

const ProductGrid = () => {
  const products = [
    {
      image: shoe1,
      description: 'Nike Air Force 1 \'07',
      price: 'Rs. 25,000.00',
    },
    {
      image: shoe2,
      description: 'Nike Dunk Low Retro',
      price: 'Rs. 25,000.00',
    },
    {
      image: sampleshoe,
      description: 'Nike Air Max 90',
      price: 'Rs. 25,000.00',
    },
    {
      image: shoe1, // Reusing an image
      description: 'Nike Blazer Mid \'77',
      price: 'Rs. 25,000.00',
    },
  ];

  return (
    <div className="product-grid">
      <h2>Top Picks For You.</h2>
      <p>Find your fit. From bold sneakers to sleek activewear, we’ve got everything to fuel your next move.</p>
      <div className="product-cards">
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
  return (
    <div>
      <HeroSection />
      <ProductGrid />
    </div>
  );
};

export default HomePage;
