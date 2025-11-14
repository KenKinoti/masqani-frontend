<template>
  <div id="app" :class="{ 'has-sidebar': authStore.isAuthenticated }">
    <!-- Sidebar Navigation -->
    <Sidebar v-if="authStore.isAuthenticated" />

    <!-- Main Content Area -->
    <main :class="{ 'main-with-sidebar': authStore.isAuthenticated, 'main-full': !authStore.isAuthenticated }">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from './stores/auth'
import Sidebar from './components/Sidebar.vue'

const authStore = useAuthStore()
</script>

<style>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f7fafc;
  color: #1a202c;
}

#app {
  min-height: 100vh;
}

/* Layout with Sidebar */
.main-with-sidebar {
  margin-left: 260px;
  padding: 2rem;
  min-height: 100vh;
  transition: margin-left 0.3s ease;
}

.main-full {
  min-height: 100vh;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .main-with-sidebar {
    margin-left: 0;
    margin-top: 60px;
    padding: 1rem;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Focus styles */
*:focus-visible {
  outline: 2px solid #3182ce;
  outline-offset: 2px;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: #f7fafc;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>
