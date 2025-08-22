import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
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

// Enhanced product data with all new fields
const products = [
  { 
    name: "New Balance Trenton Pink Retro Runner", 
    price: 25000, 
    category: "Running Shoes",
    rating: 4.5,
    reviewCount: 128,
    ordersCount: 1500,
    freeShipping: true,
    estimatedDelivery: "Aug 22",
    originCountry: "USA",
    discountPercentage: 15,
    originalPrice: 29500
  },
  { 
    name: "Nike Air Max 90 Orange Rush", 
    price: 25000, 
    category: "Lifestyle",
    rating: 4.2,
    reviewCount: 89,
    ordersCount: 850,
    freeShipping: false,
    shippingCost: 500,
    estimatedDelivery: "Aug 20",
    originCountry: "Vietnam"
  },
  { 
    name: "Nike Court Vision Low Duo Pack", 
    price: 25000, 
    category: "Basketball",
    rating: 4.7,
    reviewCount: 215,
    ordersCount: 2100,
    freeShipping: true,
    estimatedDelivery: "Aug 18",
    originCountry: "China",
    discountPercentage: 20,
    originalPrice: 31250
  },
  { 
    name: "Adidas Classic White Street Sneaker", 
    price: 25000, 
    category: "Casual",
    rating: 4.0,
    reviewCount: 67,
    ordersCount: 720,
    freeShipping: true,
    estimatedDelivery: "Aug 25",
    originCountry: "Indonesia"
  },
  { 
    name: "Nike Air Max Plus Black Forest", 
    price: 15000, 
    category: "Running",
    rating: 4.3,
    reviewCount: 142,
    ordersCount: 1800,
    freeShipping: false,
    shippingCost: 300,
    estimatedDelivery: "Aug 22",
    originCountry: "Vietnam",
    discountPercentage: 25,
    originalPrice: 20000
  },
  { 
    name: "Nike Air Force 1 'Yacht Blue Court Fury'", 
    price: 225000, 
    category: "Limited Edition",
    rating: 4.8,
    reviewCount: 45,
    ordersCount: 120,
    freeShipping: true,
    estimatedDelivery: "Aug 30",
    originCountry: "USA"
  },
  { 
    name: "Nike Zoom Freak 4 - Gray Fury", 
    price: 251000, 
    category: "Basketball",
    rating: 4.6,
    reviewCount: 78,
    ordersCount: 95,
    freeShipping: true,
    estimatedDelivery: "Aug 28",
    originCountry: "China"
  },
  { 
    name: "Reebok Nana X3 - Training Core", 
    price: 25200, 
    category: "Training",
    rating: 4.1,
    reviewCount: 56,
    ordersCount: 680,
    freeShipping: false,
    shippingCost: 400,
    estimatedDelivery: "Aug 23",
    originCountry: "Pakistan"
  },
  { 
    name: "Puma White Leather Classic", 
    price: 258200, 
    category: "Lifestyle",
    rating: 4.4,
    reviewCount: 92,
    ordersCount: 150,
    freeShipping: true,
    estimatedDelivery: "Aug 26",
    originCountry: "Germany"
  },
  { 
    name: "Nike Air Zoom 90s Grey/Green", 
    price: 20000, 
    category: "Running",
    rating: 3.9,
    reviewCount: 34,
    ordersCount: 420,
    freeShipping: true,
    estimatedDelivery: "Aug 19",
    originCountry: "Vietnam"
  },
  { 
    name: "Nike Kobe Mamba Flyknit - Yellow Lime", 
    price: 200000, 
    category: "Basketball",
    rating: 4.9,
    reviewCount: 156,
    ordersCount: 210,
    freeShipping: true,
    estimatedDelivery: "Sep 01",
    originCountry: "USA"
  },
  { 
    name: "Nike Air Zoom Bella 6 - VCR Edition", 
    price: 100000, 
    category: "Tennis",
    rating: 4.2,
    reviewCount: 67,
    ordersCount: 180,
    freeShipping: false,
    shippingCost: 600,
    estimatedDelivery: "Aug 27",
    originCountry: "China"
  },
  { 
    name: "Converse Chuck 70 - Rust Orange High", 
    price: 258800, 
    category: "Casual",
    rating: 4.5,
    reviewCount: 123,
    ordersCount: 250,
    freeShipping: true,
    estimatedDelivery: "Aug 24",
    originCountry: "USA"
  },
  { 
    name: "Jordan Jumpman Two Trey - White Ice", 
    price: 250000, 
    category: "Basketball",
    rating: 4.7,
    reviewCount: 189,
    ordersCount: 320,
    freeShipping: true,
    estimatedDelivery: "Sep 02",
    originCountry: "China"
  },
  { 
    name: "Cole Haan Wingtip Oxford - Urban Charcoal", 
    price: 115000, 
    category: "Formal",
    rating: 4.0,
    reviewCount: 45,
    ordersCount: 95,
    freeShipping: false,
    shippingCost: 800,
    estimatedDelivery: "Aug 29",
    originCountry: "USA"
  },
  { 
    name: "Nike Zoom Freak 4 - Thunderstorm", 
    price: 244000, 
    category: "Basketball",
    rating: 4.6,
    reviewCount: 112,
    ordersCount: 180,
    freeShipping: true,
    estimatedDelivery: "Aug 31",
    originCountry: "Vietnam"
  },
].map((product, index) => ({
  ...product,
  id: index + 1,
  image: productImages[index % productImages.length] || placeholderImage,
}));

const ShopPage = () => {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="shop-container">
      {/* Hero Section */}
      <div className="shop-hero">
        <div className="hero-content">
          <h1 className="hero-title">Premium Collection</h1>
          <p className="hero-subtitle">
            Discover exclusive sneakers and limited edition releases from top brands
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="shop-main">
        {/* Product Controls */}
        <div className="shop-controls">
          <div className="controls-left">
            <p className="results-count">Showing {products.length} products</p>
          </div>
          <div className="controls-right">
            <div className="filter-group">
              <label htmlFor="sort" className="filter-label">Sort by</label>
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
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={handleProductClick}
              onAddToWishlist={(product) => console.log('Add to wishlist:', product)}
              onAddToCart={(product) => console.log('Add to cart:', product)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ShopPage;
