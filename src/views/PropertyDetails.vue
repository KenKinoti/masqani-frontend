<template>
  <div class="property-details-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner-large"></div>
      <p>Loading property details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p>{{ error }}</p>
      <router-link to="/dashboard" class="btn-back">Back to Dashboard</router-link>
    </div>

    <!-- Property Details -->
    <div v-else>
      <!-- Header with Back Button -->
      <div class="page-header">
        <router-link to="/dashboard" class="btn-back-nav">
          <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </router-link>
      </div>

      <!-- Property Info Card -->
      <div class="property-card">
        <div class="property-header">
          <div class="header-left">
            <h1>{{ property.title }}</h1>
            <div class="property-meta">
              <div class="meta-item">
                <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ property.address }}
              </div>
            </div>
          </div>
          <div class="header-right">
            <div class="price-badge">
              <span class="price-amount">A${{ property.price }}</span>
              <span class="price-unit">/night</span>
            </div>
          </div>
        </div>

        <!-- Images Gallery -->
        <div v-if="property.images && property.images.length > 0" class="image-gallery">
          <div
            v-for="(image, index) in property.images"
            :key="index"
            class="gallery-image"
            :style="{ backgroundImage: `url(${image})` }"
          ></div>
        </div>
        <div v-else class="no-images">
          <div class="no-images-icon">🏠</div>
          <p>No images available</p>
        </div>

        <!-- Description -->
        <div class="property-section">
          <h3>
            <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Description
          </h3>
          <p class="description-text">{{ property.description || 'No description provided' }}</p>
        </div>

        <!-- Book Now Button (All Users) -->
        <div class="booking-action">
          <button @click="showBookingModal = true" class="btn-book-now">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book This Property
          </button>
        </div>
      </div>

      <!-- Booking Requests Section (Host & Admin Only) -->
      <div v-if="userRole === 'host' || userRole === 'admin'" class="bookings-section">
        <div class="section-header">
          <div>
            <h2>Booking Requests</h2>
            <p class="section-subtitle">Manage incoming reservation requests</p>
          </div>
          <div class="bookings-stats">
            <div class="stat-badge pending">
              <span class="stat-count">{{ pendingCount }}</span>
              <span class="stat-label">Pending</span>
            </div>
            <div class="stat-badge accepted">
              <span class="stat-count">{{ acceptedCount }}</span>
              <span class="stat-label">Accepted</span>
            </div>
            <div class="stat-badge declined">
              <span class="stat-count">{{ declinedCount }}</span>
              <span class="stat-label">Declined</span>
            </div>
          </div>
        </div>

        <!-- Loading Bookings -->
        <div v-if="bookingsLoading" class="loading-bookings">
          <div class="spinner"></div>
          <p>Loading bookings...</p>
        </div>

        <!-- No Bookings -->
        <div v-else-if="bookings.length === 0" class="empty-bookings">
          <div class="empty-icon">📅</div>
          <h3>No booking requests yet</h3>
          <p>When guests request to book this property, they'll appear here.</p>
        </div>

        <!-- Bookings List -->
        <div v-else class="bookings-list">
          <div
            v-for="booking in bookings"
            :key="booking.id"
            :class="['booking-card', `status-${booking.status}`]"
          >
            <div class="booking-header">
              <div class="guest-info">
                <div class="guest-avatar">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div class="guest-details">
                  <h4>Guest #{{ booking.guest_id }}</h4>
                  <span class="booking-date">Requested {{ formatDateTime(booking.created_at) }}</span>
                </div>
              </div>
              <div :class="['status-badge', `badge-${booking.status}`]">
                <svg v-if="booking.status === 'pending'" class="badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <svg v-else-if="booking.status === 'accepted'" class="badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <svg v-else class="badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ booking.status.toUpperCase() }}
              </div>
            </div>

            <div class="booking-details">
              <div class="detail-row">
                <div class="detail-item">
                  <svg class="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <span class="detail-label">Check-in</span>
                    <span class="detail-value">{{ formatDate(booking.check_in) }}</span>
                  </div>
                </div>
                <div class="detail-item">
                  <svg class="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <span class="detail-label">Check-out</span>
                    <span class="detail-value">{{ formatDate(booking.check_out) }}</span>
                  </div>
                </div>
              </div>
              <div class="detail-row">
                <div class="detail-item">
                  <svg class="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <span class="detail-label">Duration</span>
                    <span class="detail-value">{{ calculateNights(booking.check_in, booking.check_out) }} nights</span>
                  </div>
                </div>
                <div class="detail-item price-item">
                  <svg class="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <span class="detail-label">Total Price</span>
                    <span class="detail-value price">A${{ parseFloat(booking.total_price).toFixed(2) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="booking-actions">
              <div v-if="booking.status === 'pending'" class="action-buttons">
                <button @click="updateBookingStatus(booking.id, 'accepted')" class="btn-action btn-accept">
                  <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Accept Booking
                </button>
                <button @click="updateBookingStatus(booking.id, 'declined')" class="btn-action btn-decline">
                  <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Decline
                </button>
              </div>
              <div v-else class="status-message" :class="`message-${booking.status}`">
                <template v-if="booking.status === 'accepted'">
                  ✅ You accepted this booking
                </template>
                <template v-else>
                  ❌ You declined this booking
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Booking Modal (All Users) -->
    <BookingModal
      :show="showBookingModal"
      :property="property"
      @close="showBookingModal = false"
      @created="handleBookingCreated"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { propertyAPI, bookingAPI } from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import BookingModal from '@/components/BookingModal.vue'

const route = useRoute()
const authStore = useAuthStore()

// Get user role
const userRole = computed(() => authStore.user?.role || 'guest')

const property = ref({})
const bookings = ref([])
const loading = ref(true)
const bookingsLoading = ref(true)
const error = ref('')
const showBookingModal = ref(false)

const pendingCount = computed(() => bookings.value.filter(b => b.status === 'pending').length)
const acceptedCount = computed(() => bookings.value.filter(b => b.status === 'accepted').length)
const declinedCount = computed(() => bookings.value.filter(b => b.status === 'declined').length)

const fetchProperty = async () => {
  try {
    loading.value = true
    const response = await propertyAPI.getOne(route.params.id)
    property.value = response.data
  } catch (err) {
    error.value = 'Failed to load property details'
  } finally {
    loading.value = false
  }
}

const fetchBookings = async () => {
  // Only fetch bookings for hosts and admins (they can manage requests)
  if (userRole.value === 'guest') return

  try {
    bookingsLoading.value = true
    const response = await bookingAPI.getPropertyBookings(route.params.id)
    bookings.value = response.data || []
  } catch (err) {
    console.error('Failed to load bookings:', err)
    bookings.value = []
  } finally {
    bookingsLoading.value = false
  }
}

const updateBookingStatus = async (bookingId, status) => {
  try {
    await bookingAPI.updateStatus(bookingId, status)
    const index = bookings.value.findIndex(b => b.id === bookingId)
    if (index !== -1) {
      bookings.value[index].status = status
    }
  } catch (err) {
    alert('Failed to update booking status. Please try again.')
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
}

const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })
}

const calculateNights = (checkIn, checkOut) => {
  const start = new Date(checkIn)
  const end = new Date(checkOut)
  const diffTime = Math.abs(end - start)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

const handleBookingCreated = () => {
  fetchBookings()
  alert('Booking created successfully! The host will review your request.')
}

onMounted(() => {
  fetchProperty()
  fetchBookings()
})
</script>

<style scoped>
.property-details-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Loading & Error States */
.loading-container,
.error-container {
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

.error-icon {
  width: 60px;
  height: 60px;
  color: #dc2626;
  margin-bottom: 1rem;
}

/* Page Header */
.page-header {
  margin-bottom: 2rem;
}

.btn-back-nav {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: white;
  color: #64748b;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-back-nav:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  color: #475569;
}

.btn-back {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
}

.icon {
  width: 20px;
  height: 20px;
}

/* Property Card */
.property-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  margin-bottom: 2rem;
}

.property-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 2rem;
}

.header-left h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.75rem 0;
}

.property-meta {
  display: flex;
  gap: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
}

.price-badge {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
}

.price-amount {
  font-size: 2rem;
  font-weight: 700;
}

.price-unit {
  font-size: 0.875rem;
  opacity: 0.9;
}

/* Image Gallery */
.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.gallery-image {
  height: 250px;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.no-images {
  text-align: center;
  padding: 3rem;
  background: #f8fafc;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.no-images-icon {
  font-size: 4rem;
  opacity: 0.3;
  margin-bottom: 1rem;
}

/* Property Section */
.property-section {
  margin-bottom: 2rem;
}

.property-section h3 {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  color: #1e293b;
  margin-bottom: 1rem;
}

.section-icon {
  width: 24px;
  height: 24px;
  color: #667eea;
}

.description-text {
  color: #64748b;
  line-height: 1.8;
  font-size: 1.05rem;
}

/* Booking Action */
.booking-action {
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
}

.btn-book-now {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.25rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-book-now:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.5);
}

.btn-book-now .icon {
  width: 24px;
  height: 24px;
}

/* Host/Admin Info */
.host-info {
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
}

.info-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border-radius: 12px;
  border: 2px solid #3b82f6;
}

.info-icon {
  width: 48px;
  height: 48px;
  color: #3b82f6;
  flex-shrink: 0;
}

.info-card h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: #1e293b;
  font-weight: 700;
}

.info-card p {
  margin: 0;
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.5;
}

/* Bookings Section */
.bookings-section {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 2rem;
}

.section-header h2 {
  font-size: 1.75rem;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.section-subtitle {
  color: #64748b;
  margin: 0;
}

.bookings-stats {
  display: flex;
  gap: 1rem;
}

.stat-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem 1.25rem;
  border-radius: 10px;
  min-width: 80px;
}

.stat-badge.pending {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  color: #92400e;
}

.stat-badge.accepted {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #065f46;
}

.stat-badge.declined {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #991b1b;
}

.stat-count {
  font-size: 1.5rem;
  font-weight: 700;
}

.stat-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 0.25rem;
}

/* Loading Bookings */
.loading-bookings {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  color: #64748b;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e2e8f0;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

/* Empty Bookings */
.empty-bookings {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  font-size: 4rem;
  opacity: 0.3;
  margin-bottom: 1rem;
}

.empty-bookings h3 {
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.empty-bookings p {
  color: #64748b;
}

/* Bookings List */
.bookings-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.booking-card {
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s;
}

.booking-card:hover {
  border-color: #cbd5e1;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.booking-card.status-pending {
  border-left: 4px solid #fbbf24;
}

.booking-card.status-accepted {
  border-left: 4px solid #10b981;
}

.booking-card.status-declined {
  border-left: 4px solid #ef4444;
}

.booking-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.guest-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.guest-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.guest-avatar svg {
  width: 28px;
  height: 28px;
  color: #64748b;
}

.guest-details h4 {
  margin: 0 0 0.25rem 0;
  color: #1e293b;
  font-size: 1.1rem;
}

.booking-date {
  color: #64748b;
  font-size: 0.875rem;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.badge-pending {
  background: #fef3c7;
  color: #92400e;
}

.badge-accepted {
  background: #d1fae5;
  color: #065f46;
}

.badge-declined {
  background: #fee2e2;
  color: #991b1b;
}

.badge-icon {
  width: 18px;
  height: 18px;
}

/* Booking Details */
.booking-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.detail-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 10px;
}

.detail-icon {
  width: 24px;
  height: 24px;
  color: #667eea;
  flex-shrink: 0;
}

.detail-label {
  display: block;
  font-size: 0.75rem;
  color: #64748b;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.detail-value {
  display: block;
  font-size: 1rem;
  color: #1e293b;
  font-weight: 600;
}

.detail-value.price {
  font-size: 1.25rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Booking Actions */
.booking-actions {
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.action-buttons {
  display: flex;
  gap: 1rem;
}

.btn-action {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-accept {
  background: #10b981;
  color: white;
}

.btn-accept:hover {
  background: #059669;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.btn-decline {
  background: #ef4444;
  color: white;
}

.btn-decline:hover {
  background: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
}

.status-message {
  text-align: center;
  padding: 1rem;
  border-radius: 10px;
  font-weight: 600;
}

.message-accepted {
  background: #d1fae5;
  color: #065f46;
}

.message-declined {
  background: #fee2e2;
  color: #991b1b;
}

/* Responsive */
@media (max-width: 768px) {
  .property-details-container {
    padding: 1rem;
  }

  .property-header {
    flex-direction: column;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .bookings-stats {
    width: 100%;
    justify-content: space-between;
  }

  .detail-row {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style>
