// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// File upload limits
const MAX_FILE_SIZE = parseInt(import.meta.env.VITE_MAX_FILE_SIZE) || 5242880; // 5MB
const ALLOWED_IMAGE_TYPES = import.meta.env.VITE_ALLOWED_IMAGE_TYPES?.split(',') || [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/gif',
  'image/webp'
];

// API client with error handling
class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  // Get authorization headers
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  // Generic request method with error handling
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // Handle specific error codes
        if (response.status === 401) {
          // Token expired or invalid
          if (data.code === 'TOKEN_EXPIRED' || data.code === 'INVALID_TOKEN') {
            this.handleTokenExpiry();
          }
        }
        
        throw new ApiError(data.message || 'Request failed', response.status, data.code);
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Network or other errors
      throw new ApiError('Network error. Please check your connection.', 0, 'NETWORK_ERROR');
    }
  }

  // Handle token expiry
  handleTokenExpiry() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Show notification to user
    if (window.showError) {
      window.showError('Your session has expired. Please login again.');
    }
    
    // Redirect to login page
    setTimeout(() => {
      window.location.href = '/signin';
    }, 2000);
  }

  // Convenience methods
  async get(endpoint, options = {}) {
    return this.request(endpoint, { method: 'GET', ...options });
  }

  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  }

  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, { method: 'DELETE', ...options });
  }

  // File upload method
  async uploadFile(endpoint, formData, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        ...this.getAuthHeaders(),
        // Don't set Content-Type for FormData, let browser set it
        ...options.headers,
      },
    });
  }
}

// Custom API Error class
class ApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

// File validation utilities
export const validateFile = (file) => {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds ${Math.round(MAX_FILE_SIZE / 1024 / 1024)}MB limit`);
  }

  // Check file type
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    const allowedExtensions = ALLOWED_IMAGE_TYPES.map(type => type.split('/')[1]).join(', ');
    throw new Error(`Invalid file type. Allowed types: ${allowedExtensions}`);
  }

  return true;
};

// Convert file to base64 with validation
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    try {
      validateFile(file);
      
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    } catch (error) {
      reject(error);
    }
  });
};

// Create singleton instance
const apiClient = new ApiClient();

export { apiClient, ApiError, API_BASE_URL, MAX_FILE_SIZE, ALLOWED_IMAGE_TYPES };
export default apiClient;
