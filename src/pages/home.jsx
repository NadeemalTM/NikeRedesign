import React, { useState, useEffect, useRef } from 'react';
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
  const [typingPhase, setTypingPhase] = useState('typing');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typingPhase === 'typing') {
      let i = 0;
      setTypedText('');
      const typingInterval = setInterval(() => {
        if (i < heroText.length) {
          setTypedText((prevText) => prevText + heroText.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
          setTypingPhase('pausing');
        }
      }, 100);
      return () => clearInterval(typingInterval);
    } else if (typingPhase === 'pausing') {
      const pauseTimeout = setTimeout(() => {
        setTypingPhase('typing');
      }, 4000);
      return () => clearTimeout(pauseTimeout);
    }
  }, [typingPhase]);

  if (isLoading) {
    return (
      <div className="hero-banner skeleton">
        <div className="hero-content skeleton-content">
          <div className="skeleton-title"></div>
          <div className="skeleton-button"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="hero-banner" 
      style={{ backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.3) 100%), url(${images[currentImageIndex]})` }}
    >
      <div className="hero-content">
        <h1 className="hero-title">
          {typedText.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < typedText.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </h1>
        <p className="hero-subtitle">Discover the latest in athletic innovation</p>
        <button className="hero-button" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
          Shop Now
        </button>
      </div>
      <div className="hero-scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
    </div>
  );
};

const FeatureGrids = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const features = [
    {
      title: "Class to Courts Fits",
      description: "Seamlessly transition from classroom to court with versatile athletic wear",
      image: getRandomImage()
    },
    {
      title: "Strength Starts Here",
      description: "Build your foundation with performance gear designed for power and endurance",
      image: getRandomImage()
    }
  ];

  return (
    <section className="feature-grids-section" ref={sectionRef}>
      <div className={`feature-grids-container ${isVisible ? 'visible' : ''}`}>
        <div className="section-header">
          <h2 className="section-title">Featured Collections</h2>
          <p className="section-subtitle">Curated selections for every athlete</p>
        </div>
        <div className="feature-grids">
          {features.map((feature, index) => (
            <div key={index} className="feature-grid-card">
              <div className="feature-image-container">
                <img src={feature.image} alt={feature.title} className="feature-image" />
                <div className="feature-overlay">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <button className="feature-button">Explore Collection</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductCards = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Simulate loading products
    setTimeout(() => {
      const mockProducts = [
        {
          id: 1,
          image: getRandomImage(),
          name: "Air Max Pulse",
          description: "Unisex canvas sneakers with modern comfort",
          price: "Rs. 25,000.00",
          category: "Lifestyle"
        },
        {
          id: 2,
          image: getRandomImage(),
          name: "React Infinity",
          description: "Running shoes with advanced cushioning technology",
          price: "Rs. 28,500.00",
          category: "Running"
        },
        {
          id: 3,
          image: getRandomImage(),
          name: "Jordan 1 High",
          description: "High-top basketball shoes with iconic style",
          price: "Rs. 32,000.00",
          category: "Basketball"
        },
        {
          id: 4,
          image: getRandomImage(),
          name: "Air Force 1",
          description: "Casual leather sneakers for everyday wear",
          price: "Rs. 22,500.00",
          category: "Casual"
        }
      ];
      setProducts(mockProducts);
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <section className="product-cards-section" ref={sectionRef}>
      <div className={`product-cards-container ${isVisible ? 'visible' : ''}`}>
        <div className="section-header">
          <h2 className="section-title">Top Picks For You</h2>
          <p className="section-subtitle">
            Find your fit. From bold sneakers to sleek activewear, we've got everything to fuel your next move.
          </p>
        </div>
        
        {isLoading ? (
          <div className="product-skeleton-grid">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="product-skeleton-card">
                <div className="skeleton-image"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-price"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="product-cards-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-badge">{product.category}</div>
                  <div className="product-overlay">
                    <button className="quick-view-btn">Quick View</button>
                    <button className="add-to-cart-btn">Add to Cart</button>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="section-cta">
          <button className="view-all-button">View All Products</button>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const stats = [
    { number: "10M+", label: "Happy Customers" },
    { number: "50+", label: "Countries" },
    { number: "1000+", label: "Products" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className={`stats-container ${isVisible ? 'visible' : ''}`}>
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <h3 className="stat-number">{stat.number}</h3>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
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

  const handleDashboard = () => {
    navigate('/admin-dashboard');
  };

  return (
    <div className="home-container">
      <HeroBanner />
      
      {isAdmin && (
        <div className="admin-section">
          <button className="admin-button" onClick={handleDashboard}>
            Dashboard
          </button>
        </div>
      )}
      
      <FeatureGrids />
      <StatsSection />
      <ProductCards />
    </div>
  );
};

export default HomePage;
