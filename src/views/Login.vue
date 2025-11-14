<template>
  <div class="login-page">
    <!-- Animated Background -->
    <div class="login-background">
      <div class="gradient-overlay"></div>
      <div class="animated-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
    </div>

    <!-- Login Content -->
    <div class="login-content">
      <div class="login-card glass-card">
        <!-- Brand Header -->
        <div class="brand-header">
          <div class="brand-logo">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="12" fill="url(#logo-gradient)"/>
              <path d="M24 14L32 20V30C32 31.1046 31.1046 32 30 32H18C16.8954 32 16 31.1046 16 30V20L24 14Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20 32V24C20 22.8954 20.8954 22 22 22H26C27.1046 22 28 22.8954 28 24V32" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <defs>
                <linearGradient id="logo-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#2c5282"/>
                  <stop offset="1" stop-color="#1e3a5f"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 class="brand-title text-gradient">MasQani</h1>
          <p class="brand-subtitle">Your Premium BnB Experience</p>
        </div>

        <!-- Error Alert -->
        <transition name="shake">
          <div v-if="error" class="alert-error">
            <svg class="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>{{ error }}</span>
          </div>
        </transition>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email" class="form-label">Email Address</label>
            <div class="input-container">
              <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="your@email.com"
                class="form-input"
                required
                :disabled="loading"
                autocomplete="email"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <div class="input-container">
              <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              <input
                id="password"
                v-model="form.password"
                type="password"
                placeholder="Enter your password"
                class="form-input"
                required
                :disabled="loading"
                autocomplete="current-password"
              />
            </div>
          </div>

          <button type="submit" class="btn-submit" :disabled="loading">
            <span v-if="!loading" class="btn-content">
              <span>Sign In</span>
              <svg class="btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </span>
            <span v-else class="btn-loading">
              <svg class="spinner" viewBox="0 0 24 24">
                <circle class="spinner-track" cx="12" cy="12" r="10"/>
                <circle class="spinner-circle" cx="12" cy="12" r="10"/>
              </svg>
              <span>Signing in...</span>
            </span>
          </button>
        </form>

        <!-- Divider -->
        <div class="divider">
          <span class="divider-text">Demo Accounts</span>
        </div>

        <!-- Quick Access Cards -->
        <div class="quick-access">
          <button
            type="button"
            @click="fillCredentials('test2@masqani.com', 'Test123')"
            class="access-card guest-card"
            :disabled="loading"
          >
            <div class="access-icon guest-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <div class="access-info">
              <h3 class="access-title">Guest Access</h3>
              <p class="access-desc">Browse & Book Properties</p>
            </div>
            <div class="access-badge guest-badge">Guest</div>
          </button>

          <button
            type="button"
            @click="fillCredentials('host@masqani.com', 'Test123')"
            class="access-card host-card"
            :disabled="loading"
          >
            <div class="access-icon host-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
            </div>
            <div class="access-info">
              <h3 class="access-title">Host Access</h3>
              <p class="access-desc">Manage Your Properties</p>
            </div>
            <div class="access-badge host-badge">Host</div>
          </button>

          <button
            type="button"
            @click="fillCredentials('admin2@masqani.com', 'Test123')"
            class="access-card admin-card"
            :disabled="loading"
          >
            <div class="access-icon admin-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <div class="access-info">
              <h3 class="access-title">Admin Access</h3>
              <p class="access-desc">Full System Control</p>
            </div>
            <div class="access-badge admin-badge">Admin</div>
          </button>
        </div>

        <!-- Footer -->
        <div class="login-footer">
          <p>Don't have an account? <router-link to="/register" class="footer-link">Create Account</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: '',
})

const loading = ref(false)
const error = ref('')

const fillCredentials = (email, password) => {
  form.value.email = email
  form.value.password = password
  error.value = ''
}

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    await authStore.login(form.value)
    router.push('/dashboard')
  } catch (err) {
    error.value = err.response?.data?.error || 'Failed to login. Please check your credentials.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Page Layout */
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* Animated Background */
.login-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 50%, #3182ce 100%);
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 20%, rgba(56, 178, 172, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(246, 173, 85, 0.1) 0%, transparent 50%);
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.animated-shapes {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.shape {
  position: absolute;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  filter: blur(40px);
}

.shape-1 {
  width: 400px;
  height: 400px;
  top: -200px;
  left: -100px;
  animation: float 20s ease-in-out infinite;
}

.shape-2 {
  width: 300px;
  height: 300px;
  bottom: -150px;
  right: -50px;
  animation: float 15s ease-in-out infinite reverse;
}

.shape-3 {
  width: 250px;
  height: 250px;
  top: 50%;
  right: 10%;
  animation: float 18s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(30px, -30px) scale(1.1);
  }
}

/* Login Content */
.login-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 480px;
  padding: 2rem;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 3rem 2.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3),
              0 0 100px rgba(44, 82, 130, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Brand Header */
.brand-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.brand-logo {
  display: inline-block;
  margin-bottom: 1rem;
  animation: logoFloat 3s ease-in-out infinite;
}

@keyframes logoFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.brand-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}

.brand-subtitle {
  color: var(--text-secondary);
  font-size: 0.95rem;
  font-weight: 500;
}

/* Error Alert */
.alert-error {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  border: 1px solid #fca5a5;
  border-radius: 12px;
  color: #991b1b;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.alert-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.shake-enter-active {
  animation: shake 0.5s;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  50% { transform: translateX(8px); }
  75% { transform: translateX(-8px); }
}

/* Form Styles */
.login-form {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  letter-spacing: 0.01em;
}

.input-container {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1.125rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--text-muted);
  pointer-events: none;
  transition: color 0.3s;
}

.input-container:focus-within .input-icon {
  color: var(--primary);
}

.form-input {
  width: 100%;
  padding: 1rem 1.125rem 1rem 3.25rem;
  font-size: 0.95rem;
  background: white;
  border: 2px solid var(--border-light);
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
}

.form-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(44, 82, 130, 0.1);
  transform: translateY(-1px);
}

.form-input:disabled {
  background: var(--bg-secondary);
  cursor: not-allowed;
  opacity: 0.6;
}

.form-input::placeholder {
  color: var(--text-muted);
}

/* Submit Button */
.btn-submit {
  width: 100%;
  padding: 1.125rem 2rem;
  background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 14px 0 rgba(30, 58, 95, 0.4);
}

.btn-submit::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn-submit:hover:not(:disabled)::before {
  left: 100%;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px 0 rgba(30, 58, 95, 0.5);
}

.btn-submit:active:not(:disabled) {
  transform: translateY(0);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-arrow {
  width: 20px;
  height: 20px;
  transition: transform 0.3s;
}

.btn-submit:hover:not(:disabled) .btn-arrow {
  transform: translateX(4px);
}

.btn-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.spinner {
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

.spinner-track {
  fill: none;
  stroke: rgba(255, 255, 255, 0.3);
  stroke-width: 3;
}

.spinner-circle {
  fill: none;
  stroke: white;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 60;
  stroke-dashoffset: 45;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Divider */
.divider {
  position: relative;
  text-align: center;
  margin: 2rem 0 1.5rem;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-light), transparent);
}

.divider-text {
  position: relative;
  display: inline-block;
  padding: 0 1rem;
  background: rgba(255, 255, 255, 0.95);
  color: var(--text-muted);
  font-size: 0.875rem;
  font-weight: 500;
}

/* Quick Access Cards */
.quick-access {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.access-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: white;
  border: 2px solid var(--border-light);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
  width: 100%;
}

.access-card:hover:not(:disabled) {
  transform: translateX(4px);
  border-color: var(--primary-light);
  box-shadow: 0 4px 12px rgba(44, 82, 130, 0.15);
}

.access-card:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.access-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.access-icon svg {
  width: 24px;
  height: 24px;
  stroke-width: 2;
}

.guest-icon {
  background: linear-gradient(135deg, #3182ce 0%, #2563eb 100%);
  color: white;
}

.host-icon {
  background: linear-gradient(135deg, #38b2ac 0%, #319795 100%);
  color: white;
}

.admin-icon {
  background: linear-gradient(135deg, #f6ad55 0%, #ed8936 100%);
  color: white;
}

.access-info {
  flex: 1;
}

.access-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.access-desc {
  font-size: 0.825rem;
  color: var(--text-muted);
}

.access-badge {
  padding: 0.375rem 0.875rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.guest-badge {
  background: #dbeafe;
  color: #1e40af;
}

.host-badge {
  background: #d1fae5;
  color: #065f46;
}

.admin-badge {
  background: #fed7aa;
  color: #92400e;
}

/* Footer */
.login-footer {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-light);
}

.login-footer p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.footer-link {
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.footer-link:hover {
  color: var(--primary-hover);
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 640px) {
  .login-content {
    padding: 1rem;
  }

  .login-card {
    padding: 2rem 1.5rem;
    border-radius: 20px;
  }

  .brand-title {
    font-size: 1.875rem;
  }

  .access-card {
    padding: 0.875rem 1rem;
  }

  .access-icon {
    width: 40px;
    height: 40px;
  }

  .access-icon svg {
    width: 20px;
    height: 20px;
  }
}
</style>
