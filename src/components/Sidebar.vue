<template>
  <div>
    <!-- Mobile Overlay -->
    <transition name="fade">
      <div
        v-if="isMobileMenuOpen"
        class="mobile-overlay"
        @click="closeMobileMenu"
      ></div>
    </transition>

    <!-- Sidebar -->
    <aside
      class="sidebar"
      :class="{ 'sidebar-mobile-open': isMobileMenuOpen }"
    >
      <!-- Logo -->
      <div class="sidebar-header">
        <router-link to="/dashboard" class="logo-link" @click="closeMobileMenu">
          <div class="logo-icon">
            <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
              <path d="M24 2L6 14V34C6 35.0609 6.42143 36.0783 7.17157 36.8284C7.92172 37.5786 8.93913 38 10 38H18V26H30V38H38C39.0609 38 40.0783 37.5786 40.8284 36.8284C41.5786 36.0783 42 35.0609 42 34V14L24 2Z"
                    stroke="url(#logo-gradient)"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"/>
              <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#1e3a5f"/>
                  <stop offset="100%" style="stop-color:#38b2ac"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span class="logo-text">MasQani</span>
        </router-link>
      </div>

      <!-- Navigation -->
      <nav class="sidebar-nav">
        <!-- Main Navigation -->
        <div class="nav-section">
          <p class="nav-section-title">Main</p>
          <router-link
            v-for="item in mainNavItems"
            :key="item.path"
            :to="item.path"
            class="nav-item"
            @click="closeMobileMenu"
          >
            <span class="nav-icon" v-html="item.icon"></span>
            <span class="nav-text">{{ item.label }}</span>
            <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
          </router-link>
        </div>

        <!-- Properties Section (Host/Admin only) -->
        <div v-if="userRole === 'host' || userRole === 'admin'" class="nav-section">
          <p class="nav-section-title">Properties</p>
          <router-link
            v-for="item in propertyNavItems"
            :key="item.path"
            :to="item.path"
            class="nav-item"
            @click="closeMobileMenu"
          >
            <span class="nav-icon" v-html="item.icon"></span>
            <span class="nav-text">{{ item.label }}</span>
          </router-link>
        </div>

        <!-- Admin Section -->
        <div v-if="userRole === 'admin'" class="nav-section">
          <p class="nav-section-title">Admin</p>
          <router-link
            v-for="item in adminNavItems"
            :key="item.path"
            :to="item.path"
            class="nav-item"
            @click="closeMobileMenu"
          >
            <span class="nav-icon" v-html="item.icon"></span>
            <span class="nav-text">{{ item.label }}</span>
          </router-link>
        </div>
      </nav>

      <!-- User Profile -->
      <div class="sidebar-footer">
        <div class="user-profile">
          <div class="user-avatar">
            {{ userInitials }}
          </div>
          <div class="user-info">
            <p class="user-name">{{ userName }}</p>
            <p class="user-role">{{ userRoleLabel }}</p>
          </div>
        </div>
        <button @click="handleLogout" class="logout-btn" title="Logout">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 3H16C16.5304 3 17.0391 3.21071 17.4142 3.58579C17.7893 3.96086 18 4.46957 18 5V15C18 15.5304 17.7893 16.0391 17.4142 16.4142C17.0391 16.7893 16.5304 17 16 17H13M7 14L3 10M3 10L7 6M3 10H13"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </aside>

    <!-- Mobile Header -->
    <header class="mobile-header">
      <button @click="toggleMobileMenu" class="hamburger-btn">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
      <div class="mobile-logo">
        <div class="logo-icon-small">
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
            <path d="M24 2L6 14V34C6 35.0609 6.42143 36.0783 7.17157 36.8284C7.92172 37.5786 8.93913 38 10 38H18V26H30V38H38C39.0609 38 40.0783 37.5786 40.8284 36.8284C41.5786 36.0783 42 35.0609 42 34V14L24 2Z"
                  stroke="url(#mobile-logo-gradient)"
                  stroke-width="2.5"/>
            <defs>
              <linearGradient id="mobile-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#1e3a5f"/>
                <stop offset="100%" style="stop-color:#38b2ac"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span class="mobile-logo-text">MasQani</span>
      </div>
      <div class="mobile-user-avatar">{{ userInitials }}</div>
    </header>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const isMobileMenuOpen = ref(false)

const userRole = computed(() => authStore.user?.role || 'guest')
const userName = computed(() => authStore.user?.full_name || 'Guest User')
const userInitials = computed(() => {
  const name = authStore.user?.full_name || 'G U'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
})
const userRoleLabel = computed(() => {
  const roles = { guest: 'Guest', host: 'Host', admin: 'Administrator' }
  return roles[userRole.value] || 'Guest'
})

const mainNavItems = computed(() => [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/></svg>'
  },
  {
    path: '/properties',
    label: 'Properties',
    icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19H7V12H13V19H15C15.5304 19 16.0391 18.7893 16.4142 18.4142C16.7893 18.0391 17 17.5304 17 17V7L10 2Z" stroke="currentColor" stroke-width="1.5"/></svg>'
  },
  {
    path: '/bookings',
    label: 'Bookings',
    icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M7 2V6M13 2V6M3 8H17" stroke="currentColor" stroke-width="1.5"/></svg>'
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M15 15C15 13 13 11 10 11C7 11 5 13 5 15V18H15V15Z" stroke="currentColor" stroke-width="1.5"/></svg>'
  }
])

const propertyNavItems = [
  {
    path: '/properties/new',
    label: 'Add Property',
    icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M10 7V13M7 10H13" stroke="currentColor" stroke-width="1.5"/></svg>'
  }
]

const adminNavItems = [
  {
    path: '/admin/users',
    label: 'Manage Users',
    icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="7" cy="6" r="2.5" stroke="currentColor" stroke-width="1.5"/><circle cx="13" cy="6" r="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M11 11C11 10 10 9 7 9C4 9 3 10 3 11V14H11V11Z" stroke="currentColor" stroke-width="1.5"/><path d="M17 11C17 10 16 9 13 9C12 9 11.5 9.5 11 10" stroke="currentColor" stroke-width="1.5"/></svg>'
  }
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
  closeMobileMenu()
}
</script>

<style scoped>
/* Sidebar */
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 260px;
  background: linear-gradient(180deg, #1e3a5f 0%, #1a2f4d 100%);
  color: white;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

/* Sidebar Header */
.sidebar-header {
  padding: 1.5rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: white;
  transition: opacity 0.2s;
}

.logo-link:hover {
  opacity: 0.9;
}

.logo-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

/* Navigation */
.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
}

.nav-section {
  margin-bottom: 1.5rem;
}

.nav-section-title {
  padding: 0.5rem 1.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.25rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.75rem 1.25rem;
  margin: 0 0.75rem;
  border-radius: 0.5rem;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.2s;
  position: relative;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-item.router-link-active {
  background: rgba(56, 178, 172, 0.15);
  color: #4fd1c5;
}

.nav-item.router-link-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 60%;
  background: #4fd1c5;
  border-radius: 0 2px 2px 0;
}

.nav-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-text {
  font-size: 0.95rem;
  font-weight: 500;
  flex: 1;
}

.nav-badge {
  padding: 0.125rem 0.5rem;
  background: #fc8181;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 12px;
}

/* Sidebar Footer */
.sidebar-footer {
  padding: 1rem 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 0;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #38b2ac, #3182ce);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.logout-btn {
  width: 36px;
  height: 36px;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.logout-btn:hover {
  background: rgba(252, 129, 129, 0.2);
  color: #fc8181;
}

/* Mobile Header */
.mobile-header {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  align-items: center;
  padding: 0 1rem;
  gap: 1rem;
  z-index: 999;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.hamburger-btn {
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
  padding: 0;
}

.hamburger-line {
  width: 24px;
  height: 2px;
  background: #1a202c;
  border-radius: 2px;
  transition: all 0.3s;
}

.mobile-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

.logo-icon-small {
  width: 24px;
  height: 24px;
}

.mobile-logo-text {
  font-size: 1.125rem;
  font-weight: 700;
  background: linear-gradient(135deg, #1e3a5f 0%, #38b2ac 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.mobile-user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #38b2ac, #3182ce);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.75rem;
  color: white;
}

/* Mobile Overlay */
.mobile-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  backdrop-filter: blur(4px);
}

/* Mobile Styles */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar-mobile-open {
    transform: translateX(0);
  }

  .mobile-header {
    display: flex;
  }

  .mobile-overlay {
    display: block;
  }
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Scrollbar */
.sidebar-nav::-webkit-scrollbar {
  width: 6px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>