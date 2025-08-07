import React from "react";
import "./HeroCarousel.css";
import shoe1 from "../assets/img/shoe1.png";

function HeroCarousel() {
  return (
    <section className="hero-carousel">
      <div className="hero-bg"></div>
      <div className="hero-content">
        <h1>
          <span>LEADERS OF THE</span>
          <br />
          <span>PACK</span>
        </h1>
        <button className="shop-now-btn">Shop Now</button>
      </div>
      <div className="hero-shoes">
        <img src={shoe1} alt="Shoe 1" className="shoe shoe-1" />
    
      </div>
    </section>
  );
}

export default HeroCarousel;