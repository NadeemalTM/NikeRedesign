import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ShopPage.css';


// Import product images
import image1 from '../assets/1.png';
import image2 from '../assets/2.png';
import image3 from '../assets/3.png';
import image4 from '../assets/4.png';
import image5 from '../assets/5.png';
import image6 from '../assets/6.png';
import image7 from '../assets/7.png';
import image8 from '../assets/8.png';
import image9 from '../assets/9.png';
import image10 from '../assets/10.png';
import placeholderImage from "../assets/shopbanner.png";

const productImages = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10];

const products = [
  { name: "New Balance Trenton Pink Retro Runner", price: "Rs. 25,000.00" },
  { name: "Nike Air Max 90 Orange Rush", price: "Rs. 25,000.00" },
  { name: "Nike Court Vision Low Duo Pack", price: "Rs. 25,000.00" },
  { name: "Adidas Classic White Street Sneaker", price: "Rs. 25,000.00" },
  { name: "Nike Air Max Plus Black Forest", price: "Rs. 15,000.00" },
  { name: "Nike Air Force 1 'Yacht Blue Court Fury'", price: "Rs. 225,000.00" },
  { name: "Nike Zoom Freak 4 - Gray Fury", price: "Rs. 251,000.00" },
  { name: "Reebok Nana X3 - Training Core", price: "Rs. 25,200.00" },
  { name: "Puma White Leather Classic", price: "Rs. 258,200.00" },
  { name: "Nike Air Zoom 90s Grey/Green", price: "Rs. 20,000.00" },
  { name: "Nike Kobe Mamba Flyknit - Yellow Lime", price: "Rs. 200,000.00" },
  { name: "Nike Air Zoom Bella 6 - VCR Edition", price: "Rs. 100,000.00" },
  { name: "Converse Chuck 70 - Rust Orange High", price: "Rs. 258,800.00" },
  { name: "Jordan Jumpman Two Trey - White Ice", price: "Rs. 250,000.00" },
  { name: "Cole Haan Wingtip Oxford - Urban Charcoal", price: "Rs. 115,000.00" },
  { name: "Nike Zoom Freak 4 - Thunderstorm", price: "Rs. 244,000.00" },
].map((product, index) => ({
  ...product,
  id: index + 1,
  image: productImages[index % productImages.length] || placeholderImage,
}));

const ShopPage = () => {
  const navigate = useNavigate();

    const handleProductClick = (productId) => {
        console.log(`Product clicked: ${productId} - function triggered`);
        navigate(`/product/${productId}`);
  };
  
  return (
    <div className="bg-white font-sans min-h-screen">
      {/* Enhanced Top Section with Animated Background */}
      <div className="animated-banner relative h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
        {/* Animated Background Elements */}
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        
        <div className="glowing-orb"></div>
        <div className="glowing-orb"></div>
        <div className="glowing-orb"></div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6">
              Welcome to Our Premium Collection
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 md:mb-8 max-w-2xl mx-auto">
              Discover exclusive sneakers and limited edition releases from top brands
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Shop Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300">
                View Collection
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8">
        {/* Product Controls / Filter Bar */}
        <div className="filter-controls">
          <div className="filter-left">
            <button className="filter-button">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              <span>Filter</span>
            </button>
            <div className="view-toggle-buttons">
              <button className="view-toggle-button active">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button className="view-toggle-button">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
            <p className="results-count">Showing 1-16 of 32 results</p>
          </div>
          <div className="filter-right">
            <div className="filter-select-group">
              <label htmlFor="show" className="filter-select-label">Show</label>
              <select id="show" className="filter-select">
                <option>16</option>
                <option>32</option>
                <option>64</option>
              </select>
            </div>
            <div className="filter-select-group">
              <label htmlFor="sort" className="filter-select-label">Sort by</label>
              <select id="sort" className="filter-select">
                <option>Default</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Name: A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {products.map((product, index) => (
            <div 
              key={index} 
              className="product-card cursor-pointer"
              onClick={() => {
                console.log(`Product clicked: ${product.id} - navigating to /product/${product.id}`);
                handleProductClick(product.id);
              }}
            >
              <img src={product.image} alt={product.name} onError={(e) => { e.target.onerror = null; e.target.src=placeholderImage; }}/>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.price}</p>
                <div className="flex justify-end gap-2 mt-4">
                  <button 
                    className="shop-now-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product.id);
                    }}
                  >
                    Shop Now
                  </button>
                  <button 
                    className="add-to-cart-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add to cart functionality here
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button className="pagination-button">1</button>
          <button className="pagination-button active">2</button>
          <button className="pagination-button">3</button>
          <button className="pagination-button next">Next</button>
        </div>
      </main>

      {/* Enhanced Newsletter Section */}
      <div className="bottom-section text-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
          <p className="text-lg text-gray-300 mb-8">Join our newsletter for exclusive drops and early access to new releases</p>
          <div className="newsletter-form-container">
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="newsletter-email-input"
                required
              />
              <button 
                type="submit"
                className="newsletter-subscribe-btn"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
