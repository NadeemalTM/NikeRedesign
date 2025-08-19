import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductPage.css';
import './ProductPage-fixed.css';

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

const productImages = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10];

const products = [
  { id: 1, name: "New Balance Trenton Pink Retro Runner", price: "Rs. 25,000.00", category: "Sneakers", description: "A stylish retro runner with premium comfort and vintage-inspired design. Features premium materials and exceptional cushioning for all-day wear." },
  { id: 2, name: "Nike Air Max 90 Orange Rush", price: "Rs. 25,000.00", category: "Sneakers", description: "Iconic Air Max 90 with vibrant orange accents. Features visible Air unit, premium leather upper, and classic design elements that never go out of style." },
  { id: 3, name: "Nike Court Vision Low Duo Pack", price: "Rs. 25,000.00", category: "Sneakers", description: "Classic court-inspired design with modern comfort. Perfect for everyday wear with its clean lines and versatile styling options." },
  { id: 4, name: "Adidas Classic White Street Sneaker", price: "Rs. 25,000.00", category: "Sneakers", description: "Timeless white leather sneaker with signature Adidas details. Clean, minimalist design perfect for any casual outfit." },
  { id: 5, name: "Nike Air Max Plus Black Forest", price: "Rs. 15,000.00", category: "Sneakers", description: "Bold and distinctive Air Max Plus with black forest colorway. Features the iconic wavy design lines and exceptional comfort." },
  { id: 6, name: "Nike Air Force 1 'Yacht Blue Court Fury'", price: "Rs. 225,000.00", category: "Sneakers", description: "Premium Air Force 1 with yacht blue accents. Features premium leather construction and the classic AF1 silhouette with modern updates." },
  { id: 7, name: "Nike Zoom Freak 4 - Gray Fury", price: "Rs. 251,000.00", category: "Basketball", description: "Giannis Antetokounmpo's signature shoe with responsive Zoom Air cushioning. Designed for explosive performance on the court." },
  { id: 8, name: "Reebok Nana X3 - Training Core", price: "Rs. 25,200.00", category: "Training", description: "Versatile training shoe with excellent support and flexibility. Perfect for gym workouts and cross-training activities." },
  { id: 9, name: "Puma White Leather Classic", price: "Rs. 258,200.00", category: "Sneakers", description: "Classic Puma design with premium white leather upper. Features the iconic Puma formstrip and timeless styling." },
  { id: 10, name: "Nike Air Zoom 90s Grey/Green", price: "Rs. 20,000.00", category: "Sneakers", description: "Modern take on 90s running shoe aesthetics. Features Zoom Air unit for responsive cushioning and retro-inspired design." },
  { id: 11, name: "Nike Kobe Mamba Flyknit - Yellow Lime", price: "Rs. 200,000.00", category: "Basketball", description: "Kobe Bryant tribute shoe with Flyknit upper and responsive cushioning. Lightweight design for elite performance." },
  { id: 12, name: "Nike Air Zoom Bella 6 - VCR Edition", price: "Rs. 100,000.00", category: "Running", description: "Women's running shoe with Zoom Air unit and VCR-inspired colorway. Designed for comfort and style during runs." },
  { id: 13, name: "Converse Chuck 70 - Rust Orange High", price: "Rs. 258,800.00", category: "Casual", description: "Premium Chuck 70 with rust orange canvas upper. Features vintage details and enhanced comfort features." },
  { id: 14, name: "Jordan Jumpman Two Trey - White Ice", price: "Rs. 250,000.00", category: "Basketball", description: "Michael Jordan-inspired design with premium materials and iconic Jumpman branding. Perfect for on and off-court style." },
  { id: 15, name: "Cole Haan Wingtip Oxford - Urban Charcoal", price: "Rs. 115,000.00", category: "Dress", description: "Sophisticated wingtip oxford in urban charcoal. Perfect for formal occasions with premium leather construction." },
  { id: 16, name: "Nike Zoom Freak 4 - Thunderstorm", price: "Rs. 244,000.00", category: "Basketball", description: "Giannis signature shoe in thunderstorm colorway. Features responsive cushioning and support for explosive play." },
];

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState('black');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-page">
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <button 
            onClick={() => navigate('/shop')}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="breadcrumb">
<span>Home {'>'} Shop {'>'} {product ? product.name : 'Product Not Found'}</span>
      </div>

      <div className="product-details-container">
        <div className="image-gallery">
          <div className="thumbnails">
            {[0, 1, 2, 3].map((index) => (
              <div 
                key={index}
                className={`thumbnail ${index === 0 ? 'active' : ''}`}
              >
                <img 
                  src={productImages[parseInt(id) - 1] || productImages[0]} 
                  alt={`${product.name} view ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="main-image">
            <img src={productImages[parseInt(id) - 1] || productImages[0]} alt={product.name} />
          </div>
        </div>
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">{product.price}</p>
          <div className="rating">
            {/* Rating stars and review count */}
            <span className="stars">⭐ ⭐ ⭐ ⭐ ⭐</span>
            <span className="review-count">3 Customer Review</span>
          </div>
          <p className="product-description">
            {product.description}
          </p>
          <div className="options">
            <div className="size-selector">
              <span className="label">Size</span>
              <div className="size-buttons">
                {['L', 'XL', 'XS'].map(size => (
                  <button
                    key={size}
                    className={`size-button ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="color-selector">
              <span className="label">Color</span>
              <div className="color-options">
                {['black', 'purple', 'gold'].map(color => (
                  <div
                    key={color}
                    className={`color-dot ${color} ${selectedColor === color ? 'active' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          <div className="actions">
            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button className="add-to-cart">Add To Cart</button>
          </div>
          <div className="metadata">
            <p><strong>SKU</strong> : SS001</p>
            <p><strong>Category</strong> : {product.category}</p>
            <p><strong>Tags</strong> : {product.category}, Sneakers, Premium</p>
            <div className="share">
              <span>Share</span>
              <div className="social-icons">
                {/* Social media icons */}
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-linkedin"></i>
                <i className="fa-brands fa-twitter"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="product-tabs">
        <div className="tab-headers">
          <button className={`tab-header ${activeTab === 'description' ? 'active' : ''}`} onClick={() => setActiveTab('description')}>Description</button>
          <button className={`tab-header ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>Additional Information</button>
          <button className={`tab-header ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>Reviews [5]</button>
        </div>
        <div className="tab-content">
          {activeTab === 'description' && (
            <div className="description-content">
              <p>Embodying the raw, wayward spirit of rock 'n' roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.</p>
              <p>Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boosts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.</p>
              <div className="product-images-grid">
                <img src={product.image} alt={product.name} className="product-detail-image" />
              </div>
            </div>
          )}
          {/* Additional content for other tabs */}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
