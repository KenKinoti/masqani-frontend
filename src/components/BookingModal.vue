<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-overlay" @click="closeModal">
        <div class="modal-container" @click.stop>
          <!-- Modal Header -->
          <div class="modal-header">
            <div class="header-content">
              <div class="header-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2>Create Booking</h2>
                <p class="modal-subtitle">Book {{ property.title }}</p>
              </div>
            </div>
            <button @click="closeModal" class="close-button">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">
            <!-- Property Info Summary -->
            <div class="property-summary">
              <div class="property-info">
                <h3>{{ property.title }}</h3>
                <div class="property-location">
                  <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {{ property.address }}
                </div>
              </div>
              <div class="price-display">
                <span class="price-amount">A${{ property.price }}</span>
                <span class="price-unit">/ night</span>
              </div>
            </div>

            <!-- Booking Form -->
            <form @submit.prevent="submitBooking" class="booking-form">
              <!-- Date Selection -->
              <div class="form-section">
                <h4 class="section-title">
                  <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Select Dates
                </h4>
                <div class="date-inputs">
                  <div class="form-group">
                    <label class="form-label">Check-in Date</label>
                    <div class="input-wrapper">
                      <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <input
                        v-model="bookingForm.checkIn"
                        type="date"
                        class="form-input"
                        :min="minDate"
                        required
                        @change="calculateTotal"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Check-out Date</label>
                    <div class="input-wrapper">
                      <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <input
                        v-model="bookingForm.checkOut"
                        type="date"
                        class="form-input"
                        :min="bookingForm.checkIn || minDate"
                        required
                        @change="calculateTotal"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Guest Information -->
              <div class="form-section">
                <h4 class="section-title">
                  <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Guest Details
                </h4>
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">Number of Guests</label>
                    <div class="input-wrapper">
                      <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <input
                        v-model.number="bookingForm.guests"
                        type="number"
                        min="1"
                        max="20"
                        class="form-input"
                        placeholder="Enter number of guests"
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Contact Phone</label>
                    <div class="input-wrapper">
                      <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <input
                        v-model="bookingForm.phone"
                        type="tel"
                        class="form-input"
                        placeholder="+61 400 000 000"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Special Requests -->
              <div class="form-section">
                <h4 class="section-title">
                  <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  Special Requests (Optional)
                </h4>
                <div class="form-group">
                  <textarea
                    v-model="bookingForm.specialRequests"
                    class="form-textarea"
                    rows="4"
                    placeholder="Any special requests or requirements? (e.g., early check-in, late check-out, accessibility needs)"
                  ></textarea>
                </div>
              </div>

              <!-- Booking Summary -->
              <div class="booking-summary">
                <h4 class="summary-title">Booking Summary</h4>
                <div class="summary-details">
                  <div class="summary-row">
                    <span class="summary-label">
                      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Duration
                    </span>
                    <span class="summary-value">{{ nights }} {{ nights === 1 ? 'night' : 'nights' }}</span>
                  </div>
                  <div class="summary-row">
                    <span class="summary-label">
                      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Guests
                    </span>
                    <span class="summary-value">{{ bookingForm.guests || 0 }}</span>
                  </div>
                  <div class="summary-row">
                    <span class="summary-label">
                      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Price per night
                    </span>
                    <span class="summary-value">A${{ property.price.toFixed(2) }}</span>
                  </div>
                  <div class="summary-row subtotal">
                    <span class="summary-label">Subtotal</span>
                    <span class="summary-value">A${{ subtotal.toFixed(2) }}</span>
                  </div>
                  <div class="summary-row">
                    <span class="summary-label">Service Fee (10%)</span>
                    <span class="summary-value">A${{ serviceFee.toFixed(2) }}</span>
                  </div>
                  <div class="summary-row total">
                    <span class="summary-label">Total Amount</span>
                    <span class="summary-value">A${{ totalPrice.toFixed(2) }}</span>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button @click="closeModal" type="button" class="btn-cancel">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </button>
            <button @click="submitBooking" type="submit" class="btn-submit" :disabled="loading || !isFormValid">
              <svg v-if="!loading" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <div v-else class="spinner"></div>
              {{ loading ? 'Creating...' : 'Confirm Booking' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { bookingAPI } from '@/services/api'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  property: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'created'])

const bookingForm = ref({
  checkIn: '',
  checkOut: '',
  guests: 1,
  phone: '',
  specialRequests: ''
})

const loading = ref(false)

// Computed values
const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const nights = computed(() => {
  if (!bookingForm.value.checkIn || !bookingForm.value.checkOut) return 0
  const start = new Date(bookingForm.value.checkIn)
  const end = new Date(bookingForm.value.checkOut)
  const diffTime = Math.abs(end - start)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
})

const subtotal = computed(() => {
  return nights.value * props.property.price
})

const serviceFee = computed(() => {
  return Math.round(subtotal.value * 0.1 * 100) / 100
})

const totalPrice = computed(() => {
  return subtotal.value + serviceFee.value
})

const isFormValid = computed(() => {
  return bookingForm.value.checkIn &&
         bookingForm.value.checkOut &&
         bookingForm.value.guests > 0 &&
         bookingForm.value.phone &&
         nights.value > 0
})

// Methods
const calculateTotal = () => {
  // Force recomputation
}

const closeModal = () => {
  emit('close')
  resetForm()
}

const resetForm = () => {
  bookingForm.value = {
    checkIn: '',
    checkOut: '',
    guests: 1,
    phone: '',
    specialRequests: ''
  }
}

const submitBooking = async () => {
  if (!isFormValid.value) return

  loading.value = true
  try {
    const bookingData = {
      property_id: props.property.id,
      check_in: bookingForm.value.checkIn,
      check_out: bookingForm.value.checkOut,
      total_price: totalPrice.value,
      guests: bookingForm.value.guests,
      phone: bookingForm.value.phone,
      special_requests: bookingForm.value.specialRequests
    }

    await bookingAPI.create(props.property.id, bookingData)
    emit('created')
    closeModal()
  } catch (error) {
    alert('Failed to create booking. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Modal Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
  overflow-y: auto;
}

.modal-container {
  background: white;
  border-radius: 16px;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

/* Modal Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 2px solid #e2e8f0;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.header-icon svg {
  width: 28px;
  height: 28px;
}

.modal-header h2 {
  margin: 0 0 0.25rem 0;
  font-size: 1.5rem;
  color: #1e293b;
}

.modal-subtitle {
  margin: 0;
  color: #64748b;
  font-size: 0.9rem;
}

.close-button {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  background: #f1f5f9;
}

.close-button svg {
  width: 24px;
  height: 24px;
}

/* Modal Body */
.modal-body {
  padding: 2rem;
  overflow-y: auto;
  flex: 1;
}

/* Property Summary */
.property-summary {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
  border-radius: 12px;
  margin-bottom: 2rem;
  gap: 1rem;
}

.property-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: #1e293b;
}

.property-location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.9rem;
}

.property-location .icon {
  width: 16px;
  height: 16px;
}

.price-display {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.price-amount {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.price-unit {
  font-size: 0.875rem;
  color: #64748b;
}

/* Form Sections */
.form-section {
  margin-bottom: 2rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.1rem;
  color: #1e293b;
  margin: 0 0 1rem 0;
}

.section-icon {
  width: 22px;
  height: 22px;
  color: #667eea;
}

.date-inputs,
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.5rem;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: #94a3b8;
  pointer-events: none;
}

.form-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.95rem;
  transition: all 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.95rem;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s;
}

.form-textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Booking Summary */
.booking-summary {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid #e2e8f0;
}

.summary-title {
  font-size: 1.1rem;
  color: #1e293b;
  margin: 0 0 1rem 0;
}

.summary-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.summary-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.95rem;
}

.summary-label .icon {
  width: 16px;
  height: 16px;
}

.summary-value {
  font-weight: 600;
  color: #1e293b;
  font-size: 1rem;
}

.summary-row.subtotal {
  padding-top: 0.75rem;
  border-top: 1px solid #e2e8f0;
}

.summary-row.total {
  padding-top: 0.75rem;
  margin-top: 0.75rem;
  border-top: 2px solid #e2e8f0;
}

.summary-row.total .summary-label,
.summary-row.total .summary-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
}

.summary-row.total .summary-value {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Modal Footer */
.modal-footer {
  display: flex;
  gap: 1rem;
  padding: 1.5rem 2rem;
  border-top: 2px solid #e2e8f0;
}

.btn-cancel,
.btn-submit {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-cancel {
  background: white;
  color: #64748b;
  border: 2px solid #e2e8f0;
}

.btn-cancel:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.btn-submit {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.icon {
  width: 20px;
  height: 20px;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container {
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

/* Responsive */
@media (max-width: 768px) {
  .modal-container {
    max-height: 95vh;
  }

  .modal-header {
    padding: 1.25rem 1.5rem;
  }

  .modal-body {
    padding: 1.5rem;
  }

  .property-summary {
    flex-direction: column;
  }

  .date-inputs,
  .form-row {
    grid-template-columns: 1fr;
  }

  .modal-footer {
    flex-direction: column;
    padding: 1.25rem 1.5rem;
  }
}
</style>
