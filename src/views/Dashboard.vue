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

        <div class="stat-card">
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

    <!-- Quick Actions -->
    <section class="actions-section">
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

    <!-- Recent Activity -->
    <section v-if="recentActivity.length > 0" class="activity-section">
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

const authStore = useAuthStore()

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
    if (bookingsResponse.data && bookingsResponse.data.length > 0) {
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

onMounted(() => {
  fetchStats()
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
}
</style>
