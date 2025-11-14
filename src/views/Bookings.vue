<template>
  <div class="bookings-container">
    <div class="bookings-header">
      <div class="header-content">
        <div>
          <h1>{{ pageTitle }}</h1>
          <p class="subtitle">{{ pageSubtitle }}</p>
        </div>
      </div>
    </div>

    <!-- Search and Filter Controls -->
    <div v-if="!loading && !error && bookings.length > 0" class="search-controls">
      <!-- Search Bar -->
      <div class="search-bar">
        <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by property ID, dates, or price..."
          class="search-input"
        />
        <button v-if="searchQuery" @click="searchQuery = ''" class="clear-search">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Filter and Sort Controls -->
      <div class="filter-controls">
        <!-- Status Filter -->
        <div class="filter-dropdown">
          <select v-model="statusFilter" class="filter-select">
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="declined">Declined</option>
          </select>
          <svg class="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <!-- Price Range Filter -->
        <div class="filter-dropdown">
          <select v-model="priceFilter" class="filter-select">
            <option value="all">All Prices</option>
            <option value="under200">Under $200</option>
            <option value="200-500">$200-$500</option>
            <option value="500-1000">$500-$1000</option>
            <option value="over1000">Over $1000</option>
          </select>
          <svg class="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <!-- Date Filter -->
        <div class="filter-dropdown">
          <select v-model="dateFilter" class="filter-select">
            <option value="all">All Dates</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
            <option value="thisMonth">This Month</option>
          </select>
          <svg class="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <!-- Sort Options -->
        <div class="filter-dropdown">
          <select v-model="sortBy" class="filter-select">
            <option value="recent">Recent</option>
            <option value="checkin-earliest">Check-in: Earliest First</option>
            <option value="checkin-latest">Check-in: Latest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
          <svg class="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <!-- View Layout Toggle -->
        <div class="view-toggle">
          <button
            @click="viewLayout = 'grid'"
            :class="['toggle-btn', { active: viewLayout === 'grid' }]"
            title="Grid View"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            @click="viewLayout = 'list'"
            :class="['toggle-btn', { active: viewLayout === 'list' }]"
            title="List View"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Results Counter -->
    <div v-if="!loading && !error && bookings.length > 0" class="results-counter">
      <span class="counter-text">{{ filteredAndSortedBookings.length }} bookings found</span>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner-large"></div>
      <p>Loading your bookings...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p>{{ error }}</p>
      <button @click="fetchBookings" class="btn-retry">Try Again</button>
    </div>

    <!-- Empty State -->
    <div v-else-if="bookings.length === 0" class="empty-state">
      <div class="empty-icon">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <h3>No bookings yet</h3>
      <p>You haven't made any booking requests yet. Start exploring amazing properties!</p>
      <router-link to="/dashboard" class="btn-primary">
        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Browse Properties
      </router-link>
    </div>

    <!-- Bookings Grid/List -->
    <div v-else :class="['bookings-container-view', viewLayout === 'list' ? 'bookings-list' : 'bookings-grid']">
      <div v-for="booking in filteredAndSortedBookings" :key="booking.id" :class="['booking-card', viewLayout === 'list' ? 'list-card' : '']">
        <!-- Card Header with Status Badge -->
        <div class="booking-header">
          <div class="property-info">
            <svg class="property-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <h3>Property #{{ booking.property_id }}</h3>
          </div>
          <span :class="['status-badge', `status-${booking.status}`]">
            <svg v-if="booking.status === 'pending'" class="badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else-if="booking.status === 'accepted'" class="badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else class="badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ booking.status.charAt(0).toUpperCase() + booking.status.slice(1) }}
          </span>
        </div>

        <!-- Booking Details -->
        <div class="booking-details">
          <!-- Check-in Date -->
          <div class="detail-item">
            <div class="detail-label">
              <svg class="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Check-in</span>
            </div>
            <div class="detail-value">{{ formatDate(booking.check_in) }}</div>
          </div>

          <!-- Check-out Date -->
          <div class="detail-item">
            <div class="detail-label">
              <svg class="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Check-out</span>
            </div>
            <div class="detail-value">{{ formatDate(booking.check_out) }}</div>
          </div>

          <!-- Duration -->
          <div class="detail-item">
            <div class="detail-label">
              <svg class="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Duration</span>
            </div>
            <div class="detail-value">{{ calculateNights(booking.check_in, booking.check_out) }} nights</div>
          </div>

          <!-- Booking Date -->
          <div class="detail-item">
            <div class="detail-label">
              <svg class="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Booked on</span>
            </div>
            <div class="detail-value">{{ formatDateTime(booking.created_at) }}</div>
          </div>
        </div>

        <!-- Price Section -->
        <div class="price-section">
          <div class="price-label">Total Price</div>
          <div class="price-amount">A${{ parseFloat(booking.total_price).toFixed(2) }}</div>
        </div>

        <!-- Status Message -->
        <div :class="['status-message', `status-message-${booking.status}`]">
          <div class="status-icon-container">
            <svg v-if="booking.status === 'pending'" class="status-message-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else-if="booking.status === 'accepted'" class="status-message-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else class="status-message-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="status-text">
            <template v-if="booking.status === 'pending'">
              Waiting for host approval
            </template>
            <template v-else-if="booking.status === 'accepted'">
              Booking confirmed! Get ready for your stay
            </template>
            <template v-else>
              This booking request was declined
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { bookingAPI } from '@/services/api'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const bookings = ref([])
const loading = ref(true)
const error = ref('')

// User role
const userRole = computed(() => authStore.user?.role || 'guest')

// Page title based on role
const pageTitle = computed(() => {
  if (userRole.value === 'admin') return 'All Bookings'
  if (userRole.value === 'host') return 'Property Bookings'
  return 'My Bookings'
})

const pageSubtitle = computed(() => {
  if (userRole.value === 'admin') return 'View and manage all platform bookings'
  if (userRole.value === 'host') return 'View and manage booking requests for your properties'
  return 'Track your upcoming and past reservations'
})

// Search and Filter State
const searchQuery = ref('')
const statusFilter = ref('all')
const priceFilter = ref('all')
const dateFilter = ref('all')
const sortBy = ref('recent')
const viewLayout = ref('grid')

// Filtered and Sorted Bookings
const filteredAndSortedBookings = computed(() => {
  let filtered = [...bookings.value]

  // Apply search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(booking => {
      const propertyId = String(booking.property_id || '').toLowerCase()
      const checkIn = formatDate(booking.check_in).toLowerCase()
      const checkOut = formatDate(booking.check_out).toLowerCase()
      const price = String(booking.total_price || '').toLowerCase()

      return propertyId.includes(query) ||
             checkIn.includes(query) ||
             checkOut.includes(query) ||
             price.includes(query)
    })
  }

  // Apply status filter
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(booking => booking.status === statusFilter.value)
  }

  // Apply price filter
  if (priceFilter.value !== 'all') {
    filtered = filtered.filter(booking => {
      const price = parseFloat(booking.total_price) || 0
      switch (priceFilter.value) {
        case 'under200':
          return price < 200
        case '200-500':
          return price >= 200 && price <= 500
        case '500-1000':
          return price >= 500 && price <= 1000
        case 'over1000':
          return price > 1000
        default:
          return true
      }
    })
  }

  // Apply date filter
  if (dateFilter.value !== 'all') {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    filtered = filtered.filter(booking => {
      const checkInDate = new Date(booking.check_in)

      switch (dateFilter.value) {
        case 'upcoming':
          return checkInDate >= now
        case 'past':
          return checkInDate < now
        case 'thisMonth':
          return checkInDate.getMonth() === currentMonth &&
                 checkInDate.getFullYear() === currentYear
        default:
          return true
      }
    })
  }

  // Apply sorting
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'recent':
        // Assuming newer IDs or created_at are more recent
        return new Date(b.created_at) - new Date(a.created_at)
      case 'checkin-earliest':
        return new Date(a.check_in) - new Date(b.check_in)
      case 'checkin-latest':
        return new Date(b.check_in) - new Date(a.check_in)
      case 'price-low':
        return (parseFloat(a.total_price) || 0) - (parseFloat(b.total_price) || 0)
      case 'price-high':
        return (parseFloat(b.total_price) || 0) - (parseFloat(a.total_price) || 0)
      default:
        return 0
    }
  })

  return filtered
})

const fetchBookings = async () => {
  try {
    loading.value = true
    error.value = ''
    // Fetch bookings based on user role
    let response
    if (userRole.value === 'host') {
      console.log('Fetching host bookings...')
      response = await bookingAPI.getHostBookings()
    } else if (userRole.value === 'admin') {
      console.log('Fetching all bookings (admin)...')
      response = await bookingAPI.getAllBookings()
    } else {
      console.log('Fetching user bookings (guest)...')
      response = await bookingAPI.getUserBookings()
    }
    // The API returns the bookings array directly in response.data
    bookings.value = response.data || []
    console.log('Bookings loaded:', bookings.value)
  } catch (err) {
    console.error('Error loading bookings:', err)
    error.value = 'Failed to load bookings. Please try again.'
    bookings.value = []
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

const formatDateTime = (dateString) => {
  const options = { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

const calculateNights = (checkIn, checkOut) => {
  const start = new Date(checkIn)
  const end = new Date(checkOut)
  const diffTime = Math.abs(end - start)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

onMounted(() => {
  fetchBookings()
})
</script>

<style scoped>
.bookings-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

/* Header */
.bookings-header {
  margin-bottom: 3rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.bookings-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.subtitle {
  color: #64748b;
  font-size: 1.1rem;
  margin: 0;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: #64748b;
}

.spinner-large {
  width: 60px;
  height: 60px;
  border: 4px solid #e2e8f0;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-container p {
  font-size: 1.1rem;
  font-weight: 500;
}

/* Error State */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: #dc2626;
}

.error-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 1rem;
}

.error-container p {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
}

.btn-retry {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-retry:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  max-width: 500px;
  margin: 0 auto;
}

.empty-icon {
  width: 100px;
  height: 100px;
  margin: 0 auto 1.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f0f4ff 0%, #e9ddff 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-icon svg {
  width: 60px;
  height: 60px;
  color: #667eea;
}

.empty-state h3 {
  font-size: 1.75rem;
  color: #1e293b;
  margin-bottom: 0.75rem;
  font-weight: 700;
}

.empty-state p {
  color: #64748b;
  margin-bottom: 2rem;
  font-size: 1.05rem;
  line-height: 1.6;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.btn-primary .icon {
  width: 20px;
  height: 20px;
}

/* Search and Filter Controls */
.search-controls {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.search-bar {
  position: relative;
  margin-bottom: 1rem;
}

.search-icon {
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  color: #94a3b8;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 1rem 3.5rem 1rem 3.5rem;
  font-size: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  outline: none;
  transition: all 0.3s;
}

.search-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.search-input::placeholder {
  color: #94a3b8;
}

.clear-search {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s;
}

.clear-search:hover {
  background: #e2e8f0;
  color: #1e293b;
}

.clear-search svg {
  width: 18px;
  height: 18px;
}

/* Filter Controls */
.filter-controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.filter-dropdown {
  position: relative;
  flex: 1;
  min-width: 150px;
}

.filter-select {
  width: 100%;
  padding: 0.875rem 2.5rem 0.875rem 1rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: #475569;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  appearance: none;
  transition: all 0.2s;
}

.filter-select:hover {
  border-color: #cbd5e1;
  background: #f1f5f9;
}

.filter-select:focus {
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.dropdown-icon {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #94a3b8;
  pointer-events: none;
}

/* View Toggle */
.view-toggle {
  display: flex;
  gap: 0.5rem;
  padding: 0.25rem;
  background: #f1f5f9;
  border-radius: 10px;
}

.toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s;
}

.toggle-btn svg {
  width: 22px;
  height: 22px;
}

.toggle-btn:hover {
  background: #e2e8f0;
  color: #475569;
}

.toggle-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* Results Counter */
.results-counter {
  margin-bottom: 1.5rem;
  padding: 0 0.5rem;
}

.counter-text {
  font-size: 0.95rem;
  color: #64748b;
  font-weight: 500;
}

/* Bookings Grid */
.bookings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
  animation: fadeIn 0.5s ease-in;
}

/* Bookings List */
.bookings-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Booking Card */
.booking-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #f1f5f9;
}

.booking-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border-color: #e2e8f0;
}

/* List View Card Layout */
.booking-card.list-card {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto 1fr;
  gap: 0;
  overflow: visible;
}

.list-card .booking-header {
  grid-column: 1 / -1;
  border-bottom: 1px solid #e2e8f0;
}

.list-card .booking-details {
  grid-column: 1 / 2;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 1.5rem;
  border-right: 1px solid #e2e8f0;
}

.list-card .detail-item {
  flex: 1;
  min-width: 0;
  background: transparent;
  padding: 0;
}

.list-card .detail-item:hover {
  background: #f8fafc;
  padding: 0.5rem;
  border-radius: 8px;
}

.list-card .detail-label {
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  margin-bottom: 0.25rem;
}

.list-card .detail-value {
  font-size: 0.9rem;
}

.list-card .price-section {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  margin: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 200px;
}

.list-card .status-message {
  grid-column: 3 / 4;
  grid-row: 2 / 3;
  margin: 1.5rem 1.5rem 1.5rem 0;
  min-width: 250px;
  max-width: 350px;
}

/* Booking Header */
.booking-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-bottom: 1px solid #e2e8f0;
}

.property-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.property-icon {
  width: 24px;
  height: 24px;
  color: #667eea;
}

.booking-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
}

/* Status Badge */
.status-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-icon {
  width: 18px;
  height: 18px;
}

.status-pending {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  color: #92400e;
  box-shadow: 0 2px 8px rgba(251, 191, 36, 0.3);
}

.status-accepted {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #065f46;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.status-declined {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #991b1b;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
}

/* Booking Details */
.booking-details {
  padding: 1.5rem;
  display: grid;
  gap: 1rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 10px;
  transition: all 0.2s;
}

.detail-item:hover {
  background: #f1f5f9;
}

.detail-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-weight: 500;
  font-size: 0.95rem;
}

.detail-icon {
  width: 18px;
  height: 18px;
  color: #667eea;
}

.detail-value {
  color: #1e293b;
  font-weight: 600;
  font-size: 0.95rem;
}

/* Price Section */
.price-section {
  margin: 0 1.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.price-label {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
}

.price-amount {
  color: white;
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: -1px;
}

/* Status Message */
.status-message {
  padding: 1.5rem;
  margin: 1.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 500;
}

.status-icon-container {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-message-icon {
  width: 24px;
  height: 24px;
}

.status-text {
  flex: 1;
  font-size: 0.95rem;
  line-height: 1.5;
}

.status-message-pending {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  color: #92400e;
  border: 1px solid #fbbf24;
}

.status-message-pending .status-icon-container {
  background: rgba(251, 191, 36, 0.2);
}

.status-message-pending .status-message-icon {
  color: #d97706;
}

.status-message-accepted {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #065f46;
  border: 1px solid #10b981;
}

.status-message-accepted .status-icon-container {
  background: rgba(16, 185, 129, 0.2);
}

.status-message-accepted .status-message-icon {
  color: #059669;
}

.status-message-declined {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #991b1b;
  border: 1px solid #ef4444;
}

.status-message-declined .status-icon-container {
  background: rgba(239, 68, 68, 0.2);
}

.status-message-declined .status-message-icon {
  color: #dc2626;
}

/* Responsive Design */
@media (max-width: 768px) {
  .bookings-container {
    padding: 1rem;
  }

  .bookings-header h1 {
    font-size: 2rem;
  }

  /* Search Controls Responsive */
  .search-controls {
    padding: 1rem;
  }

  .filter-controls {
    flex-direction: column;
    gap: 0.75rem;
  }

  .filter-dropdown {
    width: 100%;
    min-width: unset;
  }

  .view-toggle {
    width: 100%;
    justify-content: center;
  }

  /* Grid and List Responsive */
  .bookings-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .bookings-list {
    gap: 1.5rem;
  }

  .list-card {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
  }

  .list-card .booking-header {
    grid-column: 1;
    grid-row: 1;
  }

  .list-card .booking-details {
    grid-column: 1;
    grid-row: 2;
    flex-direction: column;
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
  }

  .list-card .price-section {
    grid-column: 1;
    grid-row: 3;
    min-width: auto;
    margin: 1.5rem;
  }

  .list-card .status-message {
    grid-column: 1;
    grid-row: 4;
    min-width: auto;
    max-width: 100%;
    margin: 0 1.5rem 1.5rem 1.5rem;
  }

  .booking-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .price-amount {
    font-size: 1.75rem;
  }

  .status-message {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .bookings-container {
    padding: 0.75rem;
  }

  .bookings-header h1 {
    font-size: 1.75rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .booking-card {
    border-radius: 12px;
  }

  .booking-header,
  .booking-details,
  .price-section,
  .status-message {
    padding: 1rem;
  }

  .price-amount {
    font-size: 1.5rem;
  }
}
</style>
