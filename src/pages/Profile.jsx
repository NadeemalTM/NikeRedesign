import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import './Profile.css';

const Profile = () => {
  const { success, error: showError } = useToast();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: ''
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const userFromStorage = localStorage.getItem('user');
      
      // Check if user is authenticated
      if (!token || !userFromStorage) {
        showError('Please sign in to view your profile');
        setIsLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setFormData({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          phone: userData.phone || '',
          dateOfBirth: userData.dateOfBirth ? new Date(userData.dateOfBirth).toISOString().split('T')[0] : '',
          gender: userData.gender || ''
        });
        if (userData.profilePicture) {
          setPreviewImage(userData.profilePicture);
        }
      } else {
        const errorData = await response.json();
        showError(errorData.message || 'Failed to fetch profile data');
        
        // If authentication fails, try to use stored user data as fallback
        try {
          const storedUser = JSON.parse(userFromStorage);
          setUser(storedUser);
        } catch (parseError) {
          console.error('Error parsing stored user data:', parseError);
        }
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
      showError('Network error. Please try again.');
      
      // Try to use stored user data as fallback
      try {
        const userFromStorage = localStorage.getItem('user');
        if (userFromStorage) {
          const storedUser = JSON.parse(userFromStorage);
          setUser(storedUser);
        }
      } catch (parseError) {
        console.error('Error parsing stored user data:', parseError);
      }
    } finally {
      setIsLoading(false);
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
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsEditing(false);
        success('Profile updated successfully!');
        
        // Update localStorage user data
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          localStorage.setItem('user', JSON.stringify({
            ...storedUser,
            firstName: data.user.firstName,
            lastName: data.user.lastName
          }));
        }
      } else {
        showError('Failed to update profile');
      }
    } catch (error) {
      showError('Network error. Please try again.');
    }
  };

  const handleImageUpload = async () => {
    if (!profilePicture) return;

    try {
      // Convert image to base64 for now (in real app, you'd upload to server)
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Image = e.target.result;
        
        // Check if the image is too large (more than 1MB)
        if (base64Image.length > 1000000) { // ~1MB in base64
          showError('Image is too large. Please choose a smaller image (max 1MB).');
          return;
        }
        
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/auth/profile/picture', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ profilePicture: base64Image })
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setProfilePicture(null); // Clear the selected file after successful upload
          success('Profile picture updated successfully!');
        } else {
          const errorData = await response.json();
          showError(errorData.message || 'Failed to update profile picture');
        }
      };
      reader.readAsDataURL(profilePicture);
    } catch (error) {
      console.error('Image upload error:', error);
      showError('Network error. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="profile-container">
        <div className="profile-loading">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-error">Please sign in to view your profile</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="profile-form-container">
          <h1 className="profile-title">Your Profile</h1>
          
          <div className="profile-header">
            <div className="profile-image-section">
              <div className="profile-image-container">
                <img 
                  src={previewImage || '/placeholder.jpg'} 
                  alt="Profile" 
                  className="profile-image"
                />
                <div className="profile-role-badge">
                  {user.role === 'admin' ? 'Admin' : 'User'}
                </div>
              </div>
              <div className="image-upload-section">
                <input
                  type="file"
                  id="profile-picture"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input"
                />
                <label htmlFor="profile-picture" className="upload-button">
                  Choose Image
                </label>
                {profilePicture && (
                  <button 
                    onClick={handleImageUpload}
                    className="save-image-button"
                  >
                    Save Picture
                  </button>
                )}
              </div>
            </div>
          </div>

          {!isEditing ? (
            <div className="profile-details">
              <div className="detail-row">
                <span className="detail-label">Name:</span>
                <span className="detail-value">
                  {user.firstName && user.lastName 
                    ? `${user.firstName} ${user.lastName}`
                    : 'Not set'
                  }
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{user.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{user.phone || 'Not set'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Date of Birth:</span>
                <span className="detail-value">
                  {user.dateOfBirth 
                    ? new Date(user.dateOfBirth).toLocaleDateString()
                    : 'Not set'
                  }
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Gender:</span>
                <span className="detail-value">
                  {user.gender 
                    ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
                    : 'Not set'
                  }
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Member Since:</span>
                <span className="detail-value">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>

              <button 
                onClick={() => setIsEditing(true)}
                className="edit-profile-button"
              >
                Edit Profile
              </button>
              <button onClick={handleLogout} className="signout-button">
                <i className="fas fa-sign-out-alt"></i>
                Sign Out
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your first name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your email"
                  disabled
                />
                <small className="form-note">Email cannot be changed</small>
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="gender" className="form-label">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="save-button"
                >
                  Save Changes
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="profile-image-container-side">
          <div className="image-overlay">
            <h2>Your Nike Journey</h2>
            <p>Manage your profile and personalize your experience with exclusive member benefits</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
