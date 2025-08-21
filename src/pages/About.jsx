import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-wrapper">
        <div className="about-content-container">
          <h1 className="about-title">About Nike</h1>
          <p className="about-subtitle">Innovation, Inspiration, and Athletic Excellence</p>
          
          <div className="about-content">
            <section className="about-section">
              <h2>Our Mission</h2>
              <p>
                At Nike, we believe in the power of sport to move the world. Our mission is to bring 
                inspiration and innovation to every athlete* in the world. (*If you have a body, you are an athlete.)
              </p>
            </section>

            <section className="about-section">
              <h2>Our Story</h2>
              <p>
                Founded in 1964 as Blue Ribbon Sports, Nike has grown from a small distributor of running 
                shoes to the world's leading athletic brand. Named after the Greek goddess of victory, Nike 
                has been at the forefront of athletic innovation for over 50 years.
              </p>
            </section>

            <section className="about-section">
              <h2>Innovation & Technology</h2>
              <p>
                From Air Max cushioning to Flyknit technology, Nike continuously pushes the boundaries of 
                what's possible in athletic performance. Our commitment to innovation extends beyond products 
                to digital experiences and sustainable manufacturing.
              </p>
            </section>

            <section className="about-section">
              <h2>Sustainability</h2>
              <p>
                We're committed to protecting the future of sport. Through our Move to Zero campaign, we're 
                working toward zero carbon and zero waste to help protect the planet where we live and play.
              </p>
            </section>

            <section className="about-section">
              <h2>Community Impact</h2>
              <p>
                Nike invests in communities through the Nike Community Impact Fund, supporting organizations 
                that use sport to address social issues and create positive change in underserved communities.
              </p>
            </section>
          </div>

          <div className="about-stats">
            <div className="stat-item">
              <h3>50+</h3>
              <p>Years of Innovation</p>
            </div>
            <div className="stat-item">
              <h3>170+</h3>
              <p>Countries Served</p>
            </div>
            <div className="stat-item">
              <h3>75,000+</h3>
              <p>Employees Worldwide</p>
            </div>
          </div>
        </div>

        <div className="about-image-container">
          <div className="image-overlay">
            <h2>Just Do It</h2>
            <p>More than a slogan - it's a mindset that drives us to push boundaries and achieve the impossible</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
