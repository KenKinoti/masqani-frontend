<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <div class="header-content">
        <div>
          <h1>{{ pageTitle }}</h1>
          <p class="subtitle">{{ pageSubtitle }}</p>
        </div>
        <router-link v-if="canCreateProperty" to="/properties/new" class="btn-add">
          <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add New Property
        </router-link>
      </div>
    </div>

    <!-- Search and Filter Controls -->
    <div v-if="!loading && !error && properties.length > 0" class="search-controls">
      <!-- Search Bar -->
      <div class="search-bar">
        <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by title, address, or description..."
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
        <!-- Price Range Filter -->
        <div class="filter-dropdown">
          <select v-model="priceFilter" class="filter-select">
            <option value="all">All Prices</option>
            <option value="under100">Under $100</option>
            <option value="100-200">$100-$200</option>
            <option value="200-400">$200-$400</option>
            <option value="over400">Over $400</option>
          </select>
          <svg class="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <!-- Status Filter -->
        <div class="filter-dropdown">
          <select v-model="statusFilter" class="filter-select">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <svg class="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <!-- Sort Options -->
        <div class="filter-dropdown">
          <select v-model="sortBy" class="filter-select">
            <option value="recent">Recent</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="title-asc">Title: A-Z</option>
            <option value="title-desc">Title: Z-A</option>
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
    <div v-if="!loading && !error && properties.length > 0" class="results-counter">
      <span class="counter-text">{{ filteredAndSortedProperties.length }} properties found</span>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner-large"></div>
      <p>Loading your properties...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p>{{ error }}</p>
      <button @click="fetchProperties" class="btn-retry">Try Again</button>
    </div>

    <!-- Empty State -->
    <div v-else-if="properties.length === 0" class="empty-state">
      <div class="empty-icon">🏠</div>
      <h3>No properties yet</h3>
      <p>Start earning by adding your first property listing!</p>
      <router-link to="/properties/new" class="btn-primary">
        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add Your First Property
      </router-link>
    </div>

    <!-- Properties Grid/List -->
    <div v-else :class="['properties-container', viewLayout === 'list' ? 'properties-list' : 'properties-grid']">
      <div v-for="property in filteredAndSortedProperties" :key="property.id" :class="['property-card', viewLayout === 'list' ? 'list-card' : '']">
        <div class="property-image-container">
          <div v-if="property.images && property.images.length > 0" class="property-image" :style="{ backgroundImage: `url(${property.images[0]})` }">
            <div class="image-overlay"></div>
          </div>
          <div v-else class="property-image property-placeholder">
            <div class="placeholder-icon">🏠</div>
          </div>
          <div class="property-badge">
            <svg class="badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Active
          </div>
        </div>

        <div class="property-content">
          <div class="property-header">
            <h3 class="property-title">{{ property.title }}</h3>
            <div class="property-price">
              <span class="price-amount">A${{ property.price }}</span>
              <span class="price-unit">/night</span>
            </div>
          </div>

          <div class="property-location">
            <svg class="location-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{{ property.address }}</span>
          </div>

          <p class="property-description">{{ truncate(property.description, 120) }}</p>

          <div class="property-stats">
            <div class="stat">
              <svg class="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{{ property.bookings_count || 0 }} bookings</span>
            </div>
            <div class="stat">
              <svg class="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{{ property.views || 0 }} views</span>
            </div>
          </div>

          <div class="property-actions">
            <router-link :to="`/properties/${property.id}`" class="btn-action btn-view">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Details
            </router-link>

            <!-- Guest: Show Book Now button -->
            <button v-if="!canCreateProperty" @click="openBookingModal(property)" class="btn-action btn-book">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Now
            </button>

            <!-- Host/Admin: Show Edit and Delete -->
            <template v-if="canCreateProperty">
              <router-link :to="`/properties/${property.id}/edit`" class="btn-action btn-edit">
                <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </router-link>
              <button @click="confirmDelete(property)" class="btn-action btn-delete">
                <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay" @click="showDeleteModal = false">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>Delete Property</h3>
          <button @click="showDeleteModal = false" class="modal-close">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete <strong>{{ propertyToDelete?.title }}</strong>?</p>
          <p class="warning-text">This action cannot be undone.</p>
        </div>
        <div class="modal-footer">
          <button @click="showDeleteModal = false" class="btn-cancel">Cancel</button>
          <button @click="deleteProperty" class="btn-confirm-delete">Delete Property</button>
        </div>
      </div>
    </div>

    <!-- Booking Modal -->
    <div v-if="showBookingModal" class="modal-overlay" @click="closeBookingModal">
      <div class="modal booking-modal" @click.stop>
        <div class="modal-header">
          <h3>Book {{ propertyToBook?.title }}</h3>
          <button @click="closeBookingModal" class="modal-close">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="booking-property-info">
            <div class="booking-image" v-if="propertyToBook?.images && propertyToBook.images.length > 0" :style="{ backgroundImage: `url(${propertyToBook.images[0]})` }"></div>
            <div class="booking-details">
              <p class="booking-address">{{ propertyToBook?.address }}</p>
              <p class="booking-price"><strong>A${{ propertyToBook?.price }}</strong>/night</p>
            </div>
          </div>

          <form @submit.prevent="submitBooking" class="booking-form">
            <div class="form-group">
              <label>Check-in Date</label>
              <input type="date" v-model="bookingForm.check_in_date" required :min="minDate" class="form-input" />
            </div>
            <div class="form-group">
              <label>Check-out Date</label>
              <input type="date" v-model="bookingForm.check_out_date" required :min="bookingForm.check_in_date || minDate" class="form-input" />
            </div>
            <div class="form-group">
              <label>Number of Guests</label>
              <input type="number" v-model="bookingForm.guests" required min="1" placeholder="1" class="form-input" />
            </div>
            <div class="form-group">
              <label>Special Requests (Optional)</label>
              <textarea v-model="bookingForm.notes" rows="3" placeholder="Any special requirements or requests..." class="form-input"></textarea>
            </div>

            <div v-if="bookingError" class="error-message">{{ bookingError }}</div>

            <div class="total-price" v-if="totalNights > 0">
              <span>Total for {{ totalNights }} night(s):</span>
              <strong>A${{ totalPrice }}</strong>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button @click="closeBookingModal" class="btn-cancel">Cancel</button>
          <button @click="submitBooking" :disabled="bookingLoading" class="btn-confirm-book">
            {{ bookingLoading ? 'Booking...' : 'Confirm Booking' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { propertyAPI, bookingAPI } from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const properties = ref([])
const loading = ref(true)
const error = ref('')
const showDeleteModal = ref(false)
const propertyToDelete = ref(null)

// Booking modal state
const showBookingModal = ref(false)
const propertyToBook = ref(null)
const bookingLoading = ref(false)
const bookingError = ref('')
const bookingForm = ref({
  check_in_date: '',
  check_out_date: '',
  guests: 1,
  notes: ''
})

// Minimum date for booking (today)
const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

// Calculate total nights and price
const totalNights = computed(() => {
  if (!bookingForm.value.check_in_date || !bookingForm.value.check_out_date) return 0
  const checkIn = new Date(bookingForm.value.check_in_date)
  const checkOut = new Date(bookingForm.value.check_out_date)
  const diff = checkOut - checkIn
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
})

const totalPrice = computed(() => {
  if (!propertyToBook.value || totalNights.value <= 0) return 0
  return (parseFloat(propertyToBook.value.price) * totalNights.value).toFixed(2)
})

// User role
const userRole = computed(() => authStore.user?.role || 'guest')

// Role-based permissions
const canCreateProperty = computed(() => userRole.value === 'host' || userRole.value === 'admin')

// Page title based on role
const pageTitle = computed(() => {
  if (userRole.value === 'admin') return 'All Properties'
  if (userRole.value === 'host') return 'My Properties'
  return 'Browse Properties'
})

const pageSubtitle = computed(() => {
  if (userRole.value === 'admin') return 'Manage all platform properties'
  if (userRole.value === 'host') return 'Manage your property listings'
  return 'Discover your next stay'
})

// Search and Filter State
const searchQuery = ref('')
const priceFilter = ref('all')
const statusFilter = ref('all')
const sortBy = ref('recent')
const viewLayout = ref('grid')

// Filtered and Sorted Properties
const filteredAndSortedProperties = computed(() => {
  let filtered = [...properties.value]

  // Apply search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(property =>
      property.title?.toLowerCase().includes(query) ||
      property.address?.toLowerCase().includes(query) ||
      property.description?.toLowerCase().includes(query)
    )
  }

  // Apply price filter
  if (priceFilter.value !== 'all') {
    filtered = filtered.filter(property => {
      const price = parseFloat(property.price) || 0
      switch (priceFilter.value) {
        case 'under100':
          return price < 100
        case '100-200':
          return price >= 100 && price <= 200
        case '200-400':
          return price >= 200 && price <= 400
        case 'over400':
          return price > 400
        default:
          return true
      }
    })
  }

  // Apply status filter (for now all properties are active)
  if (statusFilter.value !== 'all') {
    // Future implementation when status field is available
    // filtered = filtered.filter(property => property.status === statusFilter.value)
  }

  // Apply sorting
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'recent':
        // Assuming newer IDs are more recent
        return b.id - a.id
      case 'price-low':
        return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0)
      case 'price-high':
        return (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0)
      case 'title-asc':
        return (a.title || '').localeCompare(b.title || '')
      case 'title-desc':
        return (b.title || '').localeCompare(a.title || '')
      default:
        return 0
    }
  })

  return filtered
})

const fetchProperties = async () => {
  try {
    loading.value = true
    error.value = ''
    const response = await propertyAPI.getAll()
    properties.value = response.data
  } catch (err) {
    error.value = 'Failed to load properties. Please try again.'
  } finally {
    loading.value = false
  }
}

const confirmDelete = (property) => {
  propertyToDelete.value = property
  showDeleteModal.value = true
}

const deleteProperty = async () => {
  try {
    await propertyAPI.delete(propertyToDelete.value.id)
    properties.value = properties.value.filter(p => p.id !== propertyToDelete.value.id)
    showDeleteModal.value = false
    propertyToDelete.value = null
  } catch (err) {
    alert('Failed to delete property. Please try again.')
  }
}

// Booking functions
const openBookingModal = (property) => {
  propertyToBook.value = property
  bookingForm.value = {
    check_in_date: '',
    check_out_date: '',
    guests: 1,
    notes: ''
  }
  bookingError.value = ''
  showBookingModal.value = true
}

const closeBookingModal = () => {
  showBookingModal.value = false
  propertyToBook.value = null
  bookingError.value = ''
}

const submitBooking = async () => {
  try {
    bookingLoading.value = true
    bookingError.value = ''

    if (totalNights.value <= 0) {
      bookingError.value = 'Check-out date must be after check-in date'
      return
    }

    await bookingAPI.create(propertyToBook.value.id, bookingForm.value)

    closeBookingModal()
    alert('Booking request submitted successfully! The host will review your request.')
    router.push('/bookings')
  } catch (err) {
    bookingError.value = err.response?.data?.error || 'Failed to create booking. Please try again.'
  } finally {
    bookingLoading.value = false
  }
}

const truncate = (text, length) => {
  if (!text) return ''
  return text.length > length ? text.substring(0, length) + '...' : text
}

onMounted(() => {
  fetchProperties()
})
</script>

<style scoped>
.dashboard-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

/* Header */
.dashboard-header {
  margin-bottom: 3rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.dashboard-header h1 {
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

.btn-add {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(30, 58, 95, 0.3);
  white-space: nowrap;
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(30, 58, 95, 0.4);
}

.icon {
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
  border-color: #2c5282;
  box-shadow: 0 0 0 4px rgba(44, 82, 130, 0.1);
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
  border-color: #2c5282;
  background: white;
  box-shadow: 0 0 0 4px rgba(44, 82, 130, 0.1);
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
  background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(30, 58, 95, 0.3);
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
  border-top-color: #2c5282;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
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

.btn-retry {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #2c5282;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  max-width: 500px;
  margin: 0 auto;
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 1.5rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #64748b;
  margin-bottom: 2rem;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

/* Properties Grid */
.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 2rem;
}

/* Properties List */
.properties-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.property-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.property-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

/* List View Card Layout */
.property-card.list-card {
  display: flex;
  flex-direction: row;
  overflow: visible;
}

.list-card .property-image-container {
  flex-shrink: 0;
  width: 320px;
}

.list-card .property-image {
  height: 100%;
  min-height: 280px;
}

.list-card .property-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
}

.list-card .property-header {
  margin-bottom: 1rem;
}

.list-card .property-title {
  font-size: 1.5rem;
}

.list-card .property-description {
  flex: 1;
  margin-bottom: 1.5rem;
}

.list-card .property-stats {
  margin-bottom: 1.5rem;
}

.list-card .property-actions {
  margin-top: auto;
  max-width: 500px;
}

/* Property Image */
.property-image-container {
  position: relative;
}

.property-image {
  width: 100%;
  height: 240px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 100%);
}

.property-placeholder {
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-icon {
  font-size: 4rem;
  opacity: 0.3;
}

.property-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(34, 197, 94, 0.95);
  color: white;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.badge-icon {
  width: 16px;
  height: 16px;
}

/* Property Content */
.property-content {
  padding: 1.5rem;
}

.property-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.property-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  flex: 1;
}

.property-price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.price-amount {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.price-unit {
  font-size: 0.875rem;
  color: #64748b;
}

.property-location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #64748b;
  font-size: 0.95rem;
}

.location-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.property-description {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

/* Property Stats */
.property-stats {
  display: flex;
  gap: 1.5rem;
  padding: 1rem 0;
  margin-bottom: 1rem;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.875rem;
}

.stat-icon {
  width: 18px;
  height: 18px;
}

/* Property Actions */
.property-actions {
  display: flex;
  gap: 0.75rem;
}

.btn-action {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-view {
  color: #2c5282;
  background: #e6f3ff;
}

.btn-view:hover {
  background: #2c5282;
  color: white;
  border-color: #2c5282;
}

.btn-edit {
  color: #0ea5e9;
  background: #f0f9ff;
}

.btn-edit:hover {
  background: #0ea5e9;
  color: white;
  border-color: #0ea5e9;
}

.btn-delete {
  color: #ef4444;
  background: #fef2f2;
}

.btn-delete:hover {
  background: #ef4444;
  color: white;
  border-color: #ef4444;
}

.btn-book {
  color: white;
  background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%);
  border-color: #2c5282;
  font-weight: 600;
}

.btn-book:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(44, 82, 130, 0.3);
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  animation: fadeIn 0.2s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal {
  background: white;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #1e293b;
}

.modal-close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #f1f5f9;
}

.modal-close svg {
  width: 20px;
  height: 20px;
}

.modal-body {
  padding: 1.5rem;
}

.modal-body p {
  margin: 0 0 1rem 0;
  color: #475569;
}

.warning-text {
  color: #dc2626;
  font-size: 0.9rem;
  font-weight: 600;
}

.modal-footer {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.btn-cancel {
  flex: 1;
  padding: 0.875rem;
  background: white;
  color: #64748b;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.btn-confirm-delete {
  flex: 1;
  padding: 0.875rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-confirm-delete:hover {
  background: #dc2626;
}

.btn-confirm-book {
  flex: 1;
  padding: 0.875rem;
  background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-confirm-book:hover:not(:disabled) {
  box-shadow: 0 8px 20px rgba(44, 82, 130, 0.3);
  transform: translateY(-2px);
}

.btn-confirm-book:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Booking Modal Specific Styles */
.booking-modal {
  max-width: 600px;
}

.booking-property-info {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.booking-image {
  width: 120px;
  height: 90px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
}

.booking-details {
  flex: 1;
}

.booking-address {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
}

.booking-price {
  color: #1e3a5f;
  font-size: 1.25rem;
  margin: 0;
}

.booking-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: #334155;
  font-weight: 600;
  font-size: 0.9rem;
}

.form-input {
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #2c5282;
  box-shadow: 0 0 0 4px rgba(44, 82, 130, 0.1);
}

.form-input:disabled {
  background: #f1f5f9;
  cursor: not-allowed;
}

.total-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(135deg, #e6f3ff 0%, #f0f9ff 100%);
  border-radius: 8px;
  margin-top: 0.5rem;
}

.total-price span {
  color: #64748b;
}

.total-price strong {
  color: #1e3a5f;
  font-size: 1.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard-container {
    padding: 1rem;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .btn-add {
    width: 100%;
    justify-content: center;
  }

  .dashboard-header h1 {
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
  .properties-grid {
    grid-template-columns: 1fr;
  }

  .list-card {
    flex-direction: column;
  }

  .list-card .property-image-container {
    width: 100%;
  }

  .list-card .property-image {
    height: 240px;
    min-height: 240px;
  }

  .list-card .property-content {
    padding: 1.5rem;
  }

  .list-card .property-title {
    font-size: 1.25rem;
  }

  .list-card .property-actions {
    max-width: 100%;
  }
}
</style>
