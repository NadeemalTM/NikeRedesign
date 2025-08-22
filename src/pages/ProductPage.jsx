import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductPage.css';
import './ProductPage-fixed.css';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState('black');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [imageError, setImageError] = useState(false);

  // Construct proper image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/placeholder.jpg';
    
    // If image is already a full URL, use it directly
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // If image starts with /uploads, construct full backend URL
    if (imagePath.startsWith('/uploads/')) {
      return `http://localhost:5000${imagePath}`;
    }
    
    // If it's just a filename, assume it's in uploads
    if (!imagePath.startsWith('/')) {
      return `http://localhost:5000/uploads/${imagePath}`;
    }
    
    return imagePath;
  };

  const handleImageError = (e) => {
    setImageError(true);
    e.target.onerror = null;
    e.target.src = '/placeholder.jpg';
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        
        if (response.ok) {
          const productData = await response.json();
          setProduct(productData);
        } else {
          throw new Error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="product-page">
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Loading product...</h2>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-page">
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The requested product could not be found.'}</p>
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
                  src={imageError ? '/placeholder.jpg' : getImageUrl(product.image)} 
                  alt={`${product.name} view ${index + 1}`} 
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              </div>
            ))}
          </div>
          <div className="main-image">
            <img 
              src={imageError ? '/placeholder.jpg' : getImageUrl(product.image)} 
              alt={product.name}
              onError={handleImageError}
            />
          </div>
        </div>
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">{product.price}</p>
          <div className="rating">
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
                <img 
                  src={imageError ? '/placeholder.jpg' : getImageUrl(product.image)} 
                  alt={product.name} 
                  className="product-detail-image"
                  onError={handleImageError}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
