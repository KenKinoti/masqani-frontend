<template>
  <div class="container">
    <div class="auth-wrapper">
      <div class="card auth-card">
        <h2>Join MasQani BnB</h2>
        <p class="subtitle">Create your account</p>

        <div v-if="error" class="error">{{ error }}</div>

        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="full_name">Full Name</label>
            <input
              id="full_name"
              v-model="form.full_name"
              type="text"
              placeholder="John Doe"
              required
            />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>

          <div class="form-group">
            <label for="phone">Phone (Optional)</label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              placeholder="+254 712 345 678"
            />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="Choose a strong password"
              required
              minlength="6"
            />
          </div>

          <button type="submit" class="btn btn-primary full-width" :disabled="loading">
            {{ loading ? 'Creating Account...' : 'Create Account' }}
          </button>
        </form>

        <p class="auth-link">
          Already have an account?
          <router-link to="/login">Sign in</router-link>
        </p>
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
  full_name: '',
  email: '',
  phone: '',
  password: '',
})

const loading = ref(false)
const error = ref('')

const handleRegister = async () => {
  loading.value = true
  error.value = ''

  try {
    await authStore.register(form.value)
    router.push('/dashboard')
  } catch (err) {
    error.value = err.response?.data?.error || 'Failed to create account. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 4rem);
}

.auth-card {
  max-width: 450px;
  width: 100%;
}

h2 {
  text-align: center;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.subtitle {
  text-align: center;
  color: #718096;
  margin-bottom: 2rem;
}

.full-width {
  width: 100%;
}

.auth-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #718096;
}

.auth-link a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.auth-link a:hover {
  text-decoration: underline;
}
</style>
