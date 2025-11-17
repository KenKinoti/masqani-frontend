<template>
  <div class="dashboard">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            Welcome back, <span class="text-gradient">{{ userName }}</span>
          </h1>
          <p class="hero-subtitle">{{ heroSubtitle }}</p>
        </div>
        <div class="hero-actions" v-if="userRole !== 'admin'">
          <router-link v-if="userRole !== 'guest'" to="/properties/new" class="btn-hero btn-primary">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Add New Property
          </router-link>
          <router-link to="/properties" class="btn-hero btn-secondary">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            Browse Properties
          </router-link>
        </div>
      </div>
      <div class="hero-decoration">
        <div class="decoration-circle circle-1"></div>
        <div class="decoration-circle circle-2"></div>
        <div class="decoration-circle circle-3"></div>
      </div>
    </section>

    <!-- Quick Stats -->
    <section class="stats-section">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon stat-icon-blue">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-label">Total Properties</p>
            <p class="stat-value">{{ stats.properties }}</p>
            <p v-if="!statsLoading" class="stat-change positive">+{{ stats.newThisMonth }} this month</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon stat-icon-green">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-label">Active Bookings</p>
            <p class="stat-value">{{ stats.bookings }}</p>
            <p v-if="!statsLoading" class="stat-change positive">+{{ stats.newBookings }} new</p>
          </div>
        </div>

        <div class="stat-card" v-if="userRole === 'admin'">
          <div class="stat-icon stat-icon-warning">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-label">Pending Listings</p>
            <p class="stat-value">{{ adminMetrics.pendingListings || 0 }}</p>
            <p class="stat-change neutral">Awaiting approval</p>
          </div>
        </div>

        <div class="stat-card" v-if="userRole !== 'admin'">
          <div class="stat-icon stat-icon-purple">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-label">Total Views</p>
            <p class="stat-value">{{ stats.views }}</p>
            <p v-if="!statsLoading" class="stat-change neutral">This week</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon stat-icon-gold">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-label">Revenue</p>
            <p class="stat-value">A${{ stats.revenue.toLocaleString() }}</p>
            <p v-if="!statsLoading" class="stat-change positive">+{{ stats.revenueGrowth }}% growth</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Admin-Only Sections -->
    <template v-if="userRole === 'admin'">
      <!-- Revenue Chart -->
      <section class="revenue-section">
        <div class="section-header">
          <h2 class="section-title">Revenue per Week</h2>
          <select v-model="revenueFilter" @change="loadRevenueData" class="filter-select">
            <option value="4">Last 4 Weeks</option>
            <option value="8">Last 8 Weeks</option>
            <option value="12">Last 12 Weeks</option>
          </select>
        </div>
        <div class="revenue-chart">
          <div v-if="revenueData.length === 0" class="no-data">
            <p>No revenue data available</p>
          </div>
          <div v-else class="chart-container">
            <div v-for="(week, index) in revenueData" :key="index" class="bar-group">
              <div class="bar-wrapper">
                <div
                  class="bar"
                  :style="{ height: getBarHeight(week.totalRevenue) + '%' }"
                  :title="'A$' + formatCurrency(week.totalRevenue)"
                >
                  <span class="bar-label">A${{ formatCurrency(week.totalRevenue, true) }}</span>
                </div>
              </div>
              <div class="bar-info">
                <p class="week-label">Week {{ index + 1 }}</p>
                <p class="date-range">{{ formatDateRange(week.weekStart, week.weekEnd) }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Geographical Performance -->
      <section class="geographical-section">
        <div class="section-header">
          <h2 class="section-title">Geographical Performance</h2>
          <div class="view-toggle">
            <button
              @click="geoView = 'region'"
              :class="{ active: geoView === 'region' }"
              class="toggle-btn"
            >
              By Region
            </button>
            <button
              @click="geoView = 'suburb'"
              :class="{ active: geoView === 'suburb' }"
              class="toggle-btn"
            >
              By Suburb
            </button>
          </div>
        </div>
        <div class="geo-grid">
          <div v-for="area in displayedGeoData" :key="area.name" class="geo-card">
            <div class="geo-header">
              <h3 class="geo-name">{{ area.name }}</h3>
              <span class="geo-badge">{{ area.propertyCount }} properties</span>
            </div>
            <div class="geo-stats">
              <div class="geo-stat">
                <span class="stat-label">Bookings</span>
                <span class="stat-value">{{ area.bookingCount }}</span>
              </div>
              <div class="geo-stat">
                <span class="stat-label">Revenue</span>
                <span class="stat-value">A${{ formatCurrency(area.totalRevenue) }}</span>
              </div>
              <div class="geo-stat">
                <span class="stat-label">Avg. Price</span>
                <span class="stat-value">A${{ formatCurrency(area.avgPrice) }}</span>
              </div>
            </div>
            <div class="geo-trend">
              <svg v-if="area.trend > 0" class="trend-icon up" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
              <svg v-else class="trend-icon down" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"/>
              </svg>
              <span :class="area.trend > 0 ? 'trend-up' : 'trend-down'">
                {{ Math.abs(area.trend) }}% {{ area.trend > 0 ? 'growth' : 'decline' }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Pending Approvals -->
      <section class="pending-section">
        <h2 class="section-title">Pending Property Approvals</h2>
        <div v-if="pendingProperties.length === 0" class="no-pending">
          <svg class="no-pending-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p class="no-pending-text">All properties have been reviewed!</p>
          <p class="no-pending-subtext">No pending approvals at this time.</p>
        </div>
        <div v-else class="pending-list">
          <div v-for="property in pendingProperties" :key="property.id" class="pending-card">
            <div class="pending-info">
              <h3 class="property-title">{{ property.title }}</h3>
              <p class="property-location">{{ property.suburb }}, {{ property.region }}</p>
              <p class="property-host">Host: {{ property.hostName }}</p>
            </div>
            <div class="pending-actions">
              <button @click="approveProperty(property.id)" class="btn-approve">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                Approve
              </button>
              <button @click="showRejectModal(property)" class="btn-reject">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                Reject
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Reject Modal -->
      <div v-if="rejectModal.show" class="modal-overlay" @click.self="closeRejectModal">
        <div class="modal-content">
          <h3 class="modal-title">Reject Property</h3>
          <p class="modal-subtitle">{{ rejectModal.property?.title }}</p>
          <textarea
            v-model="rejectModal.reason"
            placeholder="Enter reason for rejection..."
            class="modal-textarea"
            rows="4"
          ></textarea>
          <div class="modal-actions">
            <button @click="closeRejectModal" class="btn-cancel">Cancel</button>
            <button @click="rejectProperty" class="btn-confirm-reject" :disabled="!rejectModal.reason">
              Reject Property
            </button>
          </div>
        </div>
      </div>
    </template>

    <!-- Quick Actions (Non-Admin) -->
    <section v-if="userRole !== 'admin'" class="actions-section">
      <h2 class="section-title">Quick Actions</h2>
      <div class="actions-grid">
        <router-link to="/properties" class="action-card">
          <div class="action-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
          </div>
          <h3 class="action-title">Browse Properties</h3>
          <p class="action-desc">Explore available properties and book your next stay</p>
          <div class="action-arrow">→</div>
        </router-link>

        <router-link to="/bookings" class="action-card">
          <div class="action-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <h3 class="action-title">My Bookings</h3>
          <p class="action-desc">View and manage your current and past bookings</p>
          <div class="action-arrow">→</div>
        </router-link>

        <router-link v-if="userRole !== 'guest'" to="/properties/new" class="action-card">
          <div class="action-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </div>
          <h3 class="action-title">Add Property</h3>
          <p class="action-desc">List a new property and start earning</p>
          <div class="action-arrow">→</div>
        </router-link>

        <router-link to="/profile" class="action-card">
          <div class="action-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <h3 class="action-title">My Profile</h3>
          <p class="action-desc">Update your account settings and preferences</p>
          <div class="action-arrow">→</div>
        </router-link>
      </div>
    </section>

    <!-- Recent Activity (Non-Admin) -->
    <section v-if="recentActivity.length > 0 && userRole !== 'admin'" class="activity-section">
      <h2 class="section-title">Recent Activity</h2>
      <div class="activity-list">
        <div v-for="(activity, index) in recentActivity" :key="index" class="activity-item">
          <div :class="['activity-icon', `activity-${activity.type}`]">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="activity.type === 'booking'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              <path v-else-if="activity.type === 'property'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <div class="activity-content">
            <p class="activity-text">{{ activity.text }}</p>
            <p class="activity-time">{{ activity.time }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { propertyAPI, bookingAPI } from '@/services/api'
import axios from 'axios'

const authStore = useAuthStore()
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const userName = computed(() => {
  const fullName = authStore.user?.full_name || 'Guest'
  return fullName.split(' ')[0]
})

const userRole = computed(() => authStore.user?.role || 'guest')

const heroSubtitle = computed(() => {
  if (userRole.value === 'admin') return 'Manage your platform from one place'
  if (userRole.value === 'host') return 'Track your properties and bookings'
  return 'Find your perfect stay'
})

const stats = ref({
  properties: 0,
  bookings: 0,
  views: 0,
  revenue: 0,
  newThisMonth: 0,
  newBookings: 0,
  revenueGrowth: 0
})

const statsLoading = ref(true)
const recentActivity = ref([])

// Admin-specific data
const adminMetrics = ref({})
const revenueData = ref([])
const geoData = ref([])
const pendingProperties = ref([])
const revenueFilter = ref('8')
const geoView = ref('region')

const rejectModal = ref({
  show: false,
  property: null,
  reason: ''
})

// Computed
const displayedGeoData = computed(() => {
  if (!geoData.value || geoData.value.length === 0) return []
  return geoData.value.filter(area => {
    if (geoView.value === 'region') {
      return area.type === 'region'
    }
    return area.type === 'suburb'
  })
})

// Methods
const formatCurrency = (value, short = false) => {
  if (!value) return '0'
  const num = parseFloat(value)
  if (short && num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

const formatDateRange = (start, end) => {
  if (!start || !end) return ''
  const startDate = new Date(start)
  const endDate = new Date(end)
  const options = { month: 'short', day: 'numeric' }
  const startStr = startDate.toLocaleDateString('en-US', options)
  const endStr = endDate.toLocaleDateString('en-US', options)
  return startStr + ' - ' + endStr
}

const getBarHeight = (revenue) => {
  if (!revenueData.value || revenueData.value.length === 0) return 0
  const maxRevenue = Math.max(...revenueData.value.map(w => w.totalRevenue))
  return maxRevenue > 0 ? (revenue / maxRevenue) * 100 : 0
}

const fetchStats = async () => {
  try {
    statsLoading.value = true

    // Fetch properties
    const propertiesResponse = await propertyAPI.getAll()
    stats.value.properties = propertiesResponse.data?.length || 0
    stats.value.newThisMonth = Math.floor(stats.value.properties * 0.15) // Mock data

    // Fetch bookings based on role
    let bookingsResponse
    if (userRole.value === 'admin') {
      bookingsResponse = await bookingAPI.getAllBookings()
    } else if (userRole.value === 'host') {
      bookingsResponse = await bookingAPI.getHostBookings()
    } else {
      bookingsResponse = await bookingAPI.getUserBookings()
    }

    stats.value.bookings = bookingsResponse.data?.length || 0
    stats.value.newBookings = Math.floor(stats.value.bookings * 0.3) // Mock data

    // Mock stats for views and revenue
    stats.value.views = stats.value.properties * 127 + Math.floor(Math.random() * 100)
    stats.value.revenue = stats.value.bookings * 350 + Math.floor(Math.random() * 1000)
    stats.value.revenueGrowth = Math.floor(Math.random() * 25) + 5

    // Generate recent activity
    if (bookingsResponse.data && bookingsResponse.data.length > 0 && userRole.value !== 'admin') {
      recentActivity.value = bookingsResponse.data.slice(0, 5).map((booking, index) => ({
        type: 'booking',
        text: `New booking for ${booking.property_title || 'Property'}`,
        time: `${index + 1} ${index === 0 ? 'hour' : 'hours'} ago`
      }))
    }
  } catch (error) {
    console.error('Failed to fetch stats:', error)
  } finally {
    statsLoading.value = false
  }
}

// Admin-specific methods
const loadAdminMetrics = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(API_URL + '/api/admin/dashboard/metrics', {
      headers: { Authorization: 'Bearer ' + token }
    })
    adminMetrics.value = response.data
  } catch (error) {
    console.error('Failed to load admin metrics:', error)
  }
}

const loadRevenueData = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(API_URL + '/api/admin/dashboard/revenue?weeks=' + revenueFilter.value, {
      headers: { Authorization: 'Bearer ' + token }
    })
    revenueData.value = response.data || []
  } catch (error) {
    console.error('Failed to load revenue data:', error)
    revenueData.value = []
  }
}

const loadGeographicalData = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(API_URL + '/api/admin/dashboard/geographical', {
      headers: { Authorization: 'Bearer ' + token }
    })
    geoData.value = response.data || []
  } catch (error) {
    console.error('Failed to load geographical data:', error)
    geoData.value = []
  }
}

const loadPendingProperties = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(API_URL + '/api/admin/properties/pending', {
      headers: { Authorization: 'Bearer ' + token }
    })
    pendingProperties.value = response.data || []
  } catch (error) {
    console.error('Failed to load pending properties:', error)
    pendingProperties.value = []
  }
}

const approveProperty = async (propertyId) => {
  try {
    const token = localStorage.getItem('token')
    await axios.put(API_URL + '/api/admin/properties/' + propertyId + '/approve', {}, {
      headers: { Authorization: 'Bearer ' + token }
    })
    await loadPendingProperties()
    await loadAdminMetrics()
  } catch (error) {
    console.error('Failed to approve property:', error)
    alert('Failed to approve property')
  }
}

const showRejectModal = (property) => {
  rejectModal.value = {
    show: true,
    property,
    reason: ''
  }
}

const closeRejectModal = () => {
  rejectModal.value = {
    show: false,
    property: null,
    reason: ''
  }
}

const rejectProperty = async () => {
  if (!rejectModal.value.reason) return

  try {
    const token = localStorage.getItem('token')
    await axios.put(
      API_URL + '/api/admin/properties/' + rejectModal.value.property.id + '/reject',
      { reason: rejectModal.value.reason },
      { headers: { Authorization: 'Bearer ' + token } }
    )
    await loadPendingProperties()
    await loadAdminMetrics()
    closeRejectModal()
  } catch (error) {
    console.error('Failed to reject property:', error)
    alert('Failed to reject property')
  }
}

onMounted(async () => {
  await fetchStats()

  // Load admin-specific data if admin
  if (userRole.value === 'admin') {
    await Promise.all([
      loadAdminMetrics(),
      loadRevenueData(),
      loadGeographicalData(),
      loadPendingProperties()
    ])
  }
})
</script>

<style scoped>
.dashboard {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

/* Hero Section */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 50%, #38b2ac 100%);
  border-radius: 24px;
  padding: 4rem 3rem;
  margin-bottom: 3rem;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(30, 58, 95, 0.3);
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin: 0 0 1rem 0;
  line-height: 1.2;
}

.text-gradient {
  background: linear-gradient(135deg, #38b2ac 0%, #4fd1c5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 2.5rem 0;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-hero {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.125rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.btn-primary {
  background: white;
  color: #1e3a5f;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
}

.icon {
  width: 22px;
  height: 22px;
}

/* Hero Decoration */
.hero-decoration {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  filter: blur(40px);
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: -100px;
  right: -50px;
  animation: float 20s ease-in-out infinite;
}

.circle-2 {
  width: 200px;
  height: 200px;
  bottom: -50px;
  left: 10%;
  animation: float 15s ease-in-out infinite reverse;
}

.circle-3 {
  width: 250px;
  height: 250px;
  top: 50%;
  right: 20%;
  animation: float 18s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(20px, -20px) scale(1.1);
  }
}

/* Stats Section */
.stats-section {
  margin-bottom: 3rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  gap: 1.5rem;
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon svg {
  width: 28px;
  height: 28px;
  stroke-width: 2;
}

.stat-icon-blue {
  background: linear-gradient(135deg, #3182ce 0%, #2563eb 100%);
  color: white;
}

.stat-icon-green {
  background: linear-gradient(135deg, #38b2ac 0%, #319795 100%);
  color: white;
}

.stat-icon-purple {
  background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%);
  color: white;
}

.stat-icon-warning {
  background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
  color: white;
}

.stat-icon-gold {
  background: linear-gradient(135deg, #f6ad55 0%, #ed8936 100%);
  color: white;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0 0 0.5rem 0;
  font-weight: 500;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.stat-change {
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0;
}

.stat-change.positive {
  color: #10b981;
}

.stat-change.neutral {
  color: #64748b;
}

/* Section Title */
.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 1.5rem 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

/* Revenue Chart */
.revenue-section {
  margin-bottom: 3rem;
}

.revenue-chart {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.chart-container {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  justify-content: space-between;
  height: 300px;
  padding-top: 2rem;
}

.bar-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.bar-wrapper {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.bar {
  width: 100%;
  max-width: 60px;
  background: linear-gradient(180deg, #38b2ac 0%, #2c5282 100%);
  border-radius: 8px 8px 0 0;
  position: relative;
  transition: all 0.3s;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 0.5rem;
}

.bar:hover {
  background: linear-gradient(180deg, #4fd1c5 0%, #3182ce 100%);
  transform: translateY(-4px);
}

.bar-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
}

.bar-info {
  text-align: center;
}

.week-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
}

.date-range {
  font-size: 0.75rem;
  color: #64748b;
  margin: 0;
}

.filter-select {
  padding: 0.5rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #1e293b;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-select:hover {
  border-color: #38b2ac;
}

.filter-select:focus {
  outline: none;
  border-color: #38b2ac;
  box-shadow: 0 0 0 3px rgba(56, 178, 172, 0.1);
}

.no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #a0aec0;
  font-size: 1rem;
}

/* Geographical Section */
.geographical-section {
  margin-bottom: 3rem;
}

.view-toggle {
  display: flex;
  gap: 0.5rem;
  background: #f7fafc;
  padding: 0.25rem;
  border-radius: 8px;
}

.toggle-btn {
  padding: 0.5rem 1rem;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-btn.active {
  background: white;
  color: #38b2ac;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.geo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.geo-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.geo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.geo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.geo-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.geo-badge {
  padding: 0.25rem 0.75rem;
  background: #e0f2fe;
  color: #0369a1;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 12px;
}

.geo-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}

.geo-stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.geo-stat .stat-label {
  font-size: 0.75rem;
  color: #64748b;
  margin: 0;
}

.geo-stat .stat-value {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.geo-trend {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.trend-icon {
  width: 20px;
  height: 20px;
}

.trend-icon.up {
  color: #10b981;
}

.trend-icon.down {
  color: #ef4444;
}

.trend-up {
  color: #10b981;
  font-size: 0.875rem;
  font-weight: 600;
}

.trend-down {
  color: #ef4444;
  font-size: 0.875rem;
  font-weight: 600;
}

/* Pending Section */
.pending-section {
  margin-bottom: 3rem;
}

.pending-list {
  display: grid;
  gap: 1rem;
}

.pending-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s;
}

.pending-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.pending-info {
  flex: 1;
}

.property-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.property-location {
  font-size: 0.95rem;
  color: #64748b;
  margin: 0 0 0.25rem 0;
}

.property-host {
  font-size: 0.875rem;
  color: #a0aec0;
  margin: 0;
}

.pending-actions {
  display: flex;
  gap: 0.75rem;
}

.btn-approve,
.btn-reject {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-approve {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
}

.btn-approve:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(72, 187, 120, 0.4);
}

.btn-reject {
  background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
  color: white;
}

.btn-reject:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(245, 101, 101, 0.4);
}

.btn-approve svg,
.btn-reject svg {
  width: 18px;
  height: 18px;
}

.no-pending {
  text-align: center;
  padding: 3rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.no-pending-icon {
  width: 4rem;
  height: 4rem;
  color: #48bb78;
  margin: 0 auto 1rem auto;
}

.no-pending-text {
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 0.5rem 0;
}

.no-pending-subtext {
  color: #a0aec0;
  margin: 0;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.modal-subtitle {
  font-size: 1rem;
  color: #64748b;
  margin: 0 0 1.5rem 0;
}

.modal-textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: inherit;
  resize: vertical;
  transition: all 0.2s;
}

.modal-textarea:focus {
  outline: none;
  border-color: #38b2ac;
  box-shadow: 0 0 0 3px rgba(56, 178, 172, 0.1);
}

.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  justify-content: flex-end;
}

.btn-cancel,
.btn-confirm-reject {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel {
  background: #f7fafc;
  color: #64748b;
}

.btn-cancel:hover {
  background: #e2e8f0;
}

.btn-confirm-reject {
  background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
  color: white;
}

.btn-confirm-reject:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(245, 101, 101, 0.4);
}

.btn-confirm-reject:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Actions Section */
.actions-section {
  margin-bottom: 3rem;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.action-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-decoration: none;
  transition: all 0.3s;
  position: relative;
  border: 2px solid transparent;
}

.action-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(30, 58, 95, 0.15);
  border-color: #38b2ac;
}

.action-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.action-icon svg {
  width: 24px;
  height: 24px;
}

.action-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.75rem 0;
}

.action-desc {
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

.action-arrow {
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: 1.5rem;
  color: #cbd5e1;
  transition: all 0.3s;
}

.action-card:hover .action-arrow {
  color: #38b2ac;
  transform: translateX(4px);
}

/* Activity Section */
.activity-section {
  margin-bottom: 3rem;
}

.activity-list {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.activity-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  transition: background 0.2s;
}

.activity-item:hover {
  background: #f8fafc;
}

.activity-item:not(:last-child) {
  border-bottom: 1px solid #e2e8f0;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-icon svg {
  width: 20px;
  height: 20px;
}

.activity-booking {
  background: #e0f2fe;
  color: #0369a1;
}

.activity-property {
  background: #d1fae5;
  color: #065f46;
}

.activity-content {
  flex: 1;
}

.activity-text {
  font-size: 0.95rem;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
  font-weight: 500;
}

.activity-time {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard {
    padding: 1rem;
  }

  .hero-section {
    padding: 3rem 2rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-actions {
    flex-direction: column;
  }

  .btn-hero {
    width: 100%;
    justify-content: center;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .actions-grid {
    grid-template-columns: 1fr;
  }

  .chart-container {
    height: 250px;
  }

  .geo-grid {
    grid-template-columns: 1fr;
  }

  .pending-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>