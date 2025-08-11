import React from "react";
import "./HomeBody.css";

function HomeBody() {
  return (
    <div className="home-body">
      {/* Featured Categories */}
      <section className="featured-categories">
        <div className="category-card">
          <img src="/src/assets/img/sampleshoe.png" alt="Class to Courts Fits" />
          <h3>Class to Courts Fits</h3>
          <button>View More</button>
        </div>
        <div className="category-card">
          <img src="/src/assets/img/sampleshoe.png" alt="Strength Starts Here" />
          <h3>Strength Starts Here</h3>
          <button>View More</button>
        </div>
      </section>

      {/* Top Picks Section */}
      <section className="top-picks">
        <h2>Top Picks For You</h2>
        <div className="products-grid">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="product-card">
              <img src={`/src/assets/img/sampleshoe.png`} alt="Product" />
              <div className="product-info">
                <h4>Nike Sport Shoe</h4>
                <p>Rs. 25,000.00</p>
              </div>
            </div>
          ))}
        </div>
        <button className="view-more">View More</button>
      </section>

      {/* Louis Shoe Banner */}
      <section className="louis-banner">
        <div className="banner-content">
          <div className="banner-text">
            <h2>LOUIS Shoe</h2>
            <button>Order Now</button>
          </div>
          <img src="/src/assets/img/sampleshoe.png" alt="Louis Shoe" />
        </div>
      </section>

      {/* Blog Section */}
      <section className="blog-section">
        <h2>Our Blogs</h2>
        <div className="blog-grid">
          {[1, 2, 3].map((item) => (
            <div key={item} className="blog-card">
              <img src={`/src/assets/img/sampleshoe.png`} alt="Blog" />
              <h4>Read More</h4>
              <div className="blog-meta">
                <span>🕒 5 min read</span>
                <span>👁 2.5k Views</span>
              </div>
            </div>
          ))}
        </div>
        <button className="view-all">View All Post</button>
      </section>
    </div>
  );
}

export default HomeBody;