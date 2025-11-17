<template>
  <div class="admin-dashboard">
    <!-- Header -->
    <div class="admin-header">
      <div class="header-content">
        <h1 class="page-title">Admin Dashboard</h1>
        <p class="page-subtitle">Manage your BnB platform</p>
      </div>
      <div class="header-actions">
        <button @click="refreshData" class="btn-refresh" :disabled="loading">
          <svg class="icon-spin" :class="{ spinning: loading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Refresh
        </button>
      </div>
    </div>

    <!-- Dashboard Metrics -->
    <section class="metrics-section">
      <div class="metrics-grid">
        <div class="metric-card primary">
          <div class="metric-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
          </div>
          <div class="metric-content">
            <p class="metric-label">Total Properties</p>
            <p class="metric-value">{{ metrics.totalProperties || 0 }}</p>
            <p class="metric-subtext">{{ metrics.activeListings || 0 }} active</p>
          </div>
        </div>

        <div class="metric-card success">
          <div class="metric-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <div class="metric-content">
            <p class="metric-label">Active Bookings</p>
            <p class="metric-value">{{ metrics.activeBookings || 0 }}</p>
            <p class="metric-subtext">{{ metrics.pendingBookings || 0 }} pending</p>
          </div>
        </div>

        <div class="metric-card warning">
          <div class="metric-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="metric-content">
            <p class="metric-label">Pending Listings</p>
            <p class="metric-value">{{ metrics.pendingListings || 0 }}</p>
            <p class="metric-subtext">Awaiting approval</p>
          </div>
        </div>

        <div class="metric-card info">
          <div class="metric-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="metric-content">
            <p class="metric-label">Weekly Revenue</p>
            <p class="metric-value">R{{ formatCurrency(metrics.thisWeekRevenue) }}</p>
            <p class="metric-subtext">This week</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Actions -->
    <section class="quick-actions-section">
      <h2 class="section-title">Quick Actions</h2>
      <div class="actions-grid">
        <router-link to="/admin/calendar-sync" class="action-item">
          <div class="action-icon calendar">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <span>Sync Calendars</span>
        </router-link>

        <router-link to="/bookings" class="action-item">
          <div class="action-icon bookings">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
            </svg>
          </div>
          <span>My Bookings</span>
        </router-link>

        <router-link to="/admin/geographical" class="action-item">
          <div class="action-icon location">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <span>Browse by Location</span>
        </router-link>

        <router-link to="/admin/pricing" class="action-item">
          <div class="action-icon pricing">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
            </svg>
          </div>
          <span>Dynamic Pricing</span>
        </router-link>

        <router-link to="/admin/perks" class="action-item">
          <div class="action-icon perks">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
            </svg>
          </div>
          <span>Perks &amp; Extras</span>
        </router-link>

        <router-link to="/admin/cleaners" class="action-item">
          <div class="action-icon cleaners">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <span>Cleaners</span>
        </router-link>
      </div>
    </section>

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
                :title="'R' + formatCurrency(week.totalRevenue)"
              >
                <span class="bar-label">R{{ formatCurrency(week.totalRevenue, true) }}</span>
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

    <!-- Geographical Report -->
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
              <span class="stat-value">R{{ formatCurrency(area.totalRevenue) }}</span>
            </div>
            <div class="geo-stat">
              <span class="stat-label">Avg. Price</span>
              <span class="stat-value">R{{ formatCurrency(area.avgPrice) }}</span>
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
    <section v-if="pendingProperties.length > 0" class="pending-section">
      <h2 class="section-title">Pending Property Approvals</h2>
      <div class="pending-list">
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
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const loading = ref(false)
const metrics = ref({})
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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

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

const loadDashboardMetrics = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(API_URL + '/api/admin/dashboard/metrics', {
      headers: { Authorization: 'Bearer ' + token }
    })
    metrics.value = response.data
  } catch (error) {
    console.error('Failed to load metrics:', error)
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
    await loadDashboardMetrics()
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
    await loadDashboardMetrics()
    closeRejectModal()
  } catch (error) {
    console.error('Failed to reject property:', error)
    alert('Failed to reject property')
  }
}

const refreshData = async () => {
  loading.value = true
  try {
    await Promise.all([
      loadDashboardMetrics(),
      loadRevenueData(),
      loadGeographicalData(),
      loadPendingProperties()
    ])
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  refreshData()
})
</script>

<style scoped>
.admin-dashboard {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
}

.page-subtitle {
  color: #718096;
  margin: 0.25rem 0 0 0;
}

.btn-refresh {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #2c5282;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-refresh:hover:not(:disabled) {
  background: #2a4365;
  transform: translateY(-1px);
}

.btn-refresh:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.icon-spin {
  width: 1.25rem;
  height: 1.25rem;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Metrics Grid */
.metrics-section {
  margin-bottom: 2rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.metric-card {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 1rem;
  transition: all 0.2s;
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.metric-icon {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.metric-icon svg {
  width: 1.75rem;
  height: 1.75rem;
  color: white;
}

.metric-card.primary .metric-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.metric-card.success .metric-icon {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
}

.metric-card.warning .metric-icon {
  background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
}

.metric-card.info .metric-icon {
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
}

.metric-content {
  flex: 1;
}

.metric-label {
  color: #718096;
  font-size: 0.875rem;
  margin: 0;
}

.metric-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0.25rem 0;
}

.metric-subtext {
  color: #a0aec0;
  font-size: 0.875rem;
  margin: 0;
}

/* Quick Actions */
.quick-actions-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 1rem 0;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.action-item {
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: #4a5568;
  transition: all 0.2s;
}

.action-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #2c5282;
}

.action-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-icon svg {
  width: 1.5rem;
  height: 1.5rem;
  color: white;
}

.action-icon.calendar { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.action-icon.bookings { background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); }
.action-icon.location { background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%); }
.action-icon.pricing { background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%); }
.action-icon.perks { background: linear-gradient(135deg, #f687b3 0%, #ed64a6 100%); }
.action-icon.cleaners { background: linear-gradient(135deg, #9f7aea 0%, #805ad5 100%); }

/* Revenue Chart */
.revenue-section {
  margin-bottom: 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.filter-select {
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #4a5568;
}

.chart-container {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  height: 300px;
  padding: 1rem 0;
}

.bar-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.bar-wrapper {
  width: 100%;
  height: 250px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.bar {
  width: 100%;
  max-width: 60px;
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  border-radius: 0.5rem 0.5rem 0 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 0.5rem;
  position: relative;
  cursor: pointer;
  transition: all 0.2s;
}

.bar:hover {
  opacity: 0.8;
  transform: scaleY(1.02);
}

.bar-label {
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
}

.bar-info {
  text-align: center;
}

.week-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #4a5568;
  margin: 0;
}

.date-range {
  font-size: 0.75rem;
  color: #a0aec0;
  margin: 0.25rem 0 0 0;
}

.no-data {
  text-align: center;
  padding: 3rem;
  color: #a0aec0;
}

/* Geographical Section */
.geographical-section {
  margin-bottom: 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.view-toggle {
  display: flex;
  gap: 0.5rem;
}

.toggle-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  background: white;
  color: #4a5568;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.toggle-btn.active {
  background: #2c5282;
  color: white;
  border-color: #2c5282;
}

.geo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.geo-card {
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1.25rem;
  transition: all 0.2s;
}

.geo-card:hover {
  border-color: #cbd5e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.geo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.geo-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
}

.geo-badge {
  background: #edf2f7;
  color: #4a5568;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.geo-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.geo-stat {
  display: flex;
  flex-direction: column;
}

.geo-stat .stat-label {
  font-size: 0.75rem;
  color: #a0aec0;
  margin-bottom: 0.25rem;
}

.geo-stat .stat-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1a202c;
}

.geo-trend {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid #f7fafc;
}

.trend-icon {
  width: 1rem;
  height: 1rem;
}

.trend-icon.up {
  color: #48bb78;
}

.trend-icon.down {
  color: #f56565;
}

.trend-up {
  color: #48bb78;
  font-size: 0.875rem;
  font-weight: 500;
}

.trend-down {
  color: #f56565;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Pending Properties */
.pending-section {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.pending-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pending-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  transition: all 0.2s;
}

.pending-card:hover {
  border-color: #cbd5e0;
  background: #f7fafc;
}

.property-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.25rem 0;
}

.property-location {
  color: #718096;
  font-size: 0.875rem;
  margin: 0 0 0.25rem 0;
}

.property-host {
  color: #a0aec0;
  font-size: 0.875rem;
  margin: 0;
}

.pending-actions {
  display: flex;
  gap: 0.75rem;
}

.btn-approve,
.btn-reject {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-approve {
  background: #48bb78;
  color: white;
}

.btn-approve:hover {
  background: #38a169;
}

.btn-reject {
  background: #f56565;
  color: white;
}

.btn-reject:hover {
  background: #e53e3e;
}

.btn-approve svg,
.btn-reject svg {
  width: 1rem;
  height: 1rem;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 500px;
  width: 90%;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
}

.modal-subtitle {
  color: #718096;
  margin: 0 0 1.5rem 0;
}

.modal-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-family: inherit;
  font-size: 0.9375rem;
  margin-bottom: 1.5rem;
  resize: vertical;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.btn-cancel,
.btn-confirm-reject {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-cancel {
  background: #edf2f7;
  color: #4a5568;
}

.btn-cancel:hover {
  background: #e2e8f0;
}

.btn-confirm-reject {
  background: #f56565;
  color: white;
}

.btn-confirm-reject:hover:not(:disabled) {
  background: #e53e3e;
}

.btn-confirm-reject:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .admin-dashboard {
    padding: 1rem;
  }

  .admin-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .metrics-grid {
    grid-template-columns: 1fr;
  }

  .actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .chart-container {
    overflow-x: auto;
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