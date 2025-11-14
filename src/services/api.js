import axios from 'axios'

// Use environment variable for API URL, fallback to Cloud Run URL in production
const API_URL = import.meta.env.VITE_API_URL || 'https://masqani-api-567187485284.us-central1.run.app'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
  getProfile: () => api.get('/api/profile'),
}

export const propertyAPI = {
  getAll: () => api.get('/api/properties'),
  getOne: (id) => api.get(`/api/properties/${id}`),
  create: (data) => api.post('/api/properties', data),
  update: (id, data) => api.put(`/api/properties/${id}`, data),
  delete: (id) => api.delete(`/api/properties/${id}`),
  getImages: (id) => api.get(`/api/properties/${id}/images`),
  addImage: (id, imageUrl) => api.post(`/api/properties/${id}/images`, { image_url: imageUrl }),
}

export const bookingAPI = {
  getUserBookings: () => api.get('/api/bookings'),
  getHostBookings: () => api.get('/api/bookings/host'),
  getAllBookings: () => api.get('/api/bookings/all'),
  getPropertyBookings: (propertyId) => api.get(`/api/properties/${propertyId}/bookings`),
  create: (propertyId, data) => api.post(`/api/properties/${propertyId}/bookings`, data),
  updateStatus: (id, status) => api.put(`/api/bookings/${id}/status`, { status }),
}

export const uploadAPI = {
  uploadFile: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}

export default api
