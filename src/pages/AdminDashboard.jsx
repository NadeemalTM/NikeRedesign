import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: '',
    brand: 'Nike'
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAuth();
    fetchProducts();
    fetchUsers();
    fetchContacts();
  }, []);

  const checkAdminAuth = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  };

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/dashboard/products', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/dashboard/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Users data:', data);
        setUsers(data.users);
      } else {
        console.error('Failed to fetch users:', response.status, response.statusText);
        const errorData = await response.json();
        console.error('Error details:', errorData);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/dashboard/contacts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setContacts(data.contacts);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });
    if (imageFile) {
      formDataToSend.append('image', imageFile);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/dashboard/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (response.ok) {
        const newProduct = await response.json();
        setProducts(prev => [newProduct, ...prev]);
        setShowAddModal(false);
        setFormData({
          name: '',
          description: '',
          price: '',
          category: '',
          stock: '',
          image: '',
          brand: 'Nike'
        });
        setImageFile(null);
        setSuccess('Product added successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Network error. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/dashboard/products/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          setProducts(prev => prev.filter(product => product._id !== id));
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'products':
        return (
          <div className="products-grid">
            {products.map(product => (
              <div key={product._id} className="product-card">
                <img 
                  src={product.image ? `http://localhost:5000${product.image}` : '/placeholder.jpg'} 
                  alt={product.name} 
                  className="product-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder.jpg';
                  }}
                />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p className="price">Rs. {product.price}</p>
                  <p className="stock">Stock: {product.stock}</p>
                  <div className="product-actions">
                    <button className="edit-btn">Edit</button>
                    <button 
                      className="delete-btn" 
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'users':
        return (
          <div className="users-section">
            <h2>User List ({users.length})</h2>
            <div className="users-grid">
              {users.map(user => (
                <div key={user._id} className="user-card">
                  <div className="user-header">
                    {user.profilePicture ? (
                      <img 
                        src={`http://localhost:5000${user.profilePicture}`} 
                        alt={user.username}
                        className="user-profile-pic"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/placeholder.jpg';
                        }}
                      />
                    ) : (
                      <div className="user-avatar">{user.username.charAt(0).toUpperCase()}</div>
                    )}
                    <h3>{user.username}</h3>
                  </div>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> <span className={`role-badge ${user.role}`}>{user.role}</span></p>
                  <p><strong>Name:</strong> {user.firstName || 'Not set'} {user.lastName || ''}</p>
                  {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
                  {user.gender && <p><strong>Gender:</strong> {user.gender}</p>}
                  {user.dateOfBirth && <p><strong>DOB:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}</p>}
                  {user.profilePicture && <p><strong>Profile Pic:</strong> {user.profilePicture}</p>}
                  <p><strong>Password:</strong> <span className="password-info">Hashed for security (cannot be displayed)</span></p>
                  <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                  <p><strong>Last Updated:</strong> {new Date(user.updatedAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'contacts':
        return (
          <div className="contacts-section">
            <h2>Contact Messages ({contacts.length})</h2>
            <div className="contacts-grid">
              {contacts.map(contact => (
                <div key={contact._id} className="contact-card">
                  <h3>{contact.subject}</h3>
                  <p><strong>From:</strong> {contact.firstName} {contact.lastName}</p>
                  <p><strong>Email:</strong> {contact.email}</p>
                  {contact.phone && <p><strong>Phone:</strong> {contact.phone}</p>}
                  <p><strong>Message:</strong> {contact.message}</p>
                  <p><strong>Received:</strong> {new Date(contact.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-actions">
          <button className="add-product-btn" onClick={() => setShowAddModal(true)}>
            Add New Product
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="tabs">
        <button 
          className={activeTab === 'products' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setActiveTab('products')}
        >
          Products ({products.length})
        </button>
        <button 
          className={activeTab === 'users' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setActiveTab('users')}
        >
          Users ({users.length})
        </button>
        <button 
          className={activeTab === 'contacts' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setActiveTab('contacts')}
        >
          Messages ({contacts.length})
        </button>
      </div>

      {renderTabContent()}

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Price:</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Category:</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="new">New Arrivals</option>
                  <option value="featured">Featured</option>
                  <option value="sale">Sale</option>
                  <option value="regular">Regular</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Stock:</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              
              <div className="modal-actions">
                <button type="submit" className="submit-btn">Add Product</button>
                <button type="button" className="cancel-btn" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
