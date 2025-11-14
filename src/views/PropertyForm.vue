<template>
  <div class="container">
    <div class="card">
      <h2>{{ isEditing ? 'Edit Property' : 'Add New Property' }}</h2>

      <div v-if="error" class="error">{{ error }}</div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="title">Property Title *</label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            placeholder="Beautiful 2BR apartment in Nairobi"
            required
          />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="form.description"
            placeholder="Describe your property, amenities, and what makes it special..."
          ></textarea>
        </div>

        <div class="form-group">
          <label for="address">Address *</label>
          <input
            id="address"
            v-model="form.address"
            type="text"
            placeholder="123 Main St, Nairobi, Kenya"
            required
          />
        </div>

        <div class="form-group">
          <label for="price">Price per Night (USD) *</label>
          <input
            id="price"
            v-model.number="form.price"
            type="number"
            step="0.01"
            min="0"
            placeholder="50.00"
            required
          />
        </div>

        <div class="form-group">
          <label>Property Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            @change="handleFileSelect"
          />
          <p class="help-text">Upload images of your property (max 5MB each)</p>

          <div v-if="uploadedImages.length > 0" class="image-preview-grid">
            <div v-for="(image, index) in uploadedImages" :key="index" class="image-preview">
              <img :src="image" :alt="`Property image ${index + 1}`" />
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Saving...' : isEditing ? 'Update Property' : 'Create Property' }}
          </button>
          <router-link to="/dashboard" class="btn btn-secondary">Cancel</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { propertyAPI, uploadAPI } from '@/services/api'

const router = useRouter()
const route = useRoute()

const isEditing = ref(false)
const propertyId = ref(null)

const form = ref({
  title: '',
  description: '',
  address: '',
  price: 0,
})

const uploadedImages = ref([])
const loading = ref(false)
const error = ref('')

const handleFileSelect = async (event) => {
  const files = Array.from(event.target.files)

  for (const file of files) {
    try {
      const response = await uploadAPI.uploadFile(file)
      const imageUrl = response.data.url
      uploadedImages.value.push(imageUrl)

      // If editing, add image to property immediately
      if (isEditing.value) {
        await propertyAPI.addImage(propertyId.value, imageUrl)
      }
    } catch (err) {
      alert(`Failed to upload ${file.name}`)
    }
  }
}

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  try {
    let response
    if (isEditing.value) {
      response = await propertyAPI.update(propertyId.value, form.value)
    } else {
      response = await propertyAPI.create(form.value)

      // Add images to newly created property
      if (uploadedImages.value.length > 0) {
        const newPropertyId = response.data.id
        for (const imageUrl of uploadedImages.value) {
          await propertyAPI.addImage(newPropertyId, imageUrl)
        }
      }
    }

    router.push('/dashboard')
  } catch (err) {
    error.value = err.response?.data?.error || 'Failed to save property'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  if (route.params.id) {
    isEditing.value = true
    propertyId.value = parseInt(route.params.id)

    try {
      const response = await propertyAPI.getOne(propertyId.value)
      const property = response.data
      form.value = {
        title: property.title,
        description: property.description,
        address: property.address,
        price: property.price,
      }
      uploadedImages.value = property.images || []
    } catch (err) {
      error.value = 'Failed to load property'
    }
  }
})
</script>

<style scoped>
.card {
  max-width: 700px;
  margin: 0 auto;
}

h2 {
  margin-bottom: 1.5rem;
  color: #2d3748;
}

.help-text {
  font-size: 0.85rem;
  color: #718096;
  margin-top: 0.5rem;
}

.image-preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.image-preview {
  position: relative;
  padding-top: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.image-preview img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}
</style>
