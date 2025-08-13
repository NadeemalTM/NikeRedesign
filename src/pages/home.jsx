// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import "./home.css";
import shoe1 from '../assets/shoe1.png';
import shoe2 from '../assets/shoe2.png';
import sampleshoe from '../assets/sampleshoe.png';

const images = [shoe1, shoe2, sampleshoe];

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <div className="background-slideshow">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentImageIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
      </div>
      <div className="home-section">
        <div className="left-section">
          <h1>NIKE AIR JORDAN</h1>
          <p>
            Step up your game with the latest Nike Air Jordan sneakers. Designed for comfort, performance, and style.
          </p>
          <button className="shop-now-btn">Shop Now</button>
        </div>
        <div className="middle-section">
          <div className="item-card">
            <img src={shoe1} alt="Item 1" />
            <h3>Nike Air Max</h3>
            <p>$120</p>
          </div>
          <div className="item-card">
            <img src={shoe2} alt="Item 2" />
            <h3>Nike React</h3>
            <p>$150</p>
          </div>
          <div className="item-card">
            <img src={sampleshoe} alt="Item 3" />
            <h3>Nike Free Run</h3>
            <p>$100</p>
          </div>
        </div>
        <div className="right-section">
          <img src={images[currentImageIndex]} alt="Nike Air Jordan" className="shoe-image" />
        </div>
      </div>
    </div>
  );
}

export default Home;