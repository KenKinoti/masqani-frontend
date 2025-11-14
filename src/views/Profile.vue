<template>
  <div class="profile-container">
    <!-- Header -->
    <div class="profile-header">
      <div class="header-content">
        <div class="header-title-section">
          <h1>Profile & Settings</h1>
          <span class="role-badge" :class="`role-${userRole}`">
            {{ userRole?.toUpperCase() || 'GUEST' }}
          </span>
        </div>
        <p class="subtitle">Manage your account information and preferences</p>
      </div>
    </div>

    <!-- Profile Content -->
    <div class="profile-content">
      <!-- Admin Management Section (Admin Only) -->
      <div v-if="userRole === 'admin'" class="settings-card admin-card">
        <div class="card-header">
          <div class="header-icon admin-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h2>Admin Management</h2>
            <p class="card-subtitle">Platform administration and oversight</p>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon admin-gradient">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div class="stat-info">
              <p class="stat-label">Total Users</p>
              <h3 class="stat-value">4</h3>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon admin-gradient">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div class="stat-info">
              <p class="stat-label">Total Properties</p>
              <h3 class="stat-value">8</h3>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon admin-gradient">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="stat-info">
              <p class="stat-label">Total Bookings</p>
              <h3 class="stat-value">8</h3>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon admin-gradient">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="stat-info">
              <p class="stat-label">Total Revenue</p>
              <h3 class="stat-value">A$8.5K</h3>
            </div>
          </div>
        </div>

        <div class="admin-actions">
          <button class="admin-btn">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Manage Users
          </button>
          <button class="admin-btn">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Manage Properties
          </button>
          <button class="admin-btn">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Manage Bookings
          </button>
          <button class="admin-btn">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Platform Settings
          </button>
        </div>
      </div>

      <!-- Host Dashboard Section (Host Only) -->
      <div v-if="userRole === 'host'" class="settings-card host-card">
        <div class="card-header">
          <div class="header-icon host-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h2>Host Dashboard</h2>
            <p class="card-subtitle">Manage your properties and bookings</p>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon host-gradient">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div class="stat-info">
              <p class="stat-label">My Properties</p>
              <h3 class="stat-value">3</h3>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon host-gradient">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="stat-info">
              <p class="stat-label">Total Bookings</p>
              <h3 class="stat-value">12</h3>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon host-gradient">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="stat-info">
              <p class="stat-label">Pending Requests</p>
              <h3 class="stat-value">2</h3>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon host-gradient">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="stat-info">
              <p class="stat-label">This Month Revenue</p>
              <h3 class="stat-value">A$3.2K</h3>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Information Card -->
      <div class="settings-card">
        <div class="card-header">
          <div class="header-icon" :class="`${userRole}-icon`">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h2>Profile Information</h2>
            <p class="card-subtitle">Update your account details</p>
          </div>
        </div>

        <form @submit.prevent="updateProfile" class="settings-form">
          <div class="avatar-section">
            <div class="avatar-circle" :class="`${userRole}-avatar`">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <button type="button" class="btn-change-avatar" :class="`${userRole}-btn-outline`">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Change Avatar
            </button>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <div class="input-wrapper">
                <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input v-model="profileForm.fullName" type="text" class="form-input" placeholder="Enter your full name" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Email Address</label>
              <div class="input-wrapper">
                <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input v-model="profileForm.email" type="email" class="form-input" placeholder="your@email.com" />
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Phone Number</label>
              <div class="input-wrapper">
                <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <input v-model="profileForm.phone" type="tel" class="form-input" placeholder="+61 400 000 000" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Location</label>
              <div class="input-wrapper">
                <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input v-model="profileForm.location" type="text" class="form-input" placeholder="Sydney, Australia" />
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn-primary" :class="`${userRole}-btn-primary`" :disabled="profileLoading">
              <svg v-if="!profileLoading" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <div v-else class="spinner-small"></div>
              {{ profileLoading ? 'Saving...' : 'Save Changes' }}
            </button>
            <button type="button" @click="resetProfile" class="btn-secondary">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
          </div>
        </form>
      </div>

      <!-- Security Settings Card -->
      <div class="settings-card">
        <div class="card-header">
          <div class="header-icon" :class="`${userRole}-icon`">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h2>Security Settings</h2>
            <p class="card-subtitle">Manage your password and security</p>
          </div>
        </div>

        <form @submit.prevent="updatePassword" class="settings-form">
          <div class="form-group">
            <label class="form-label">Current Password</label>
            <div class="input-wrapper">
              <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input v-model="passwordForm.currentPassword" type="password" class="form-input" placeholder="Enter current password" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">New Password</label>
              <div class="input-wrapper">
                <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                <input v-model="passwordForm.newPassword" type="password" class="form-input" placeholder="Enter new password" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Confirm New Password</label>
              <div class="input-wrapper">
                <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <input v-model="passwordForm.confirmPassword" type="password" class="form-input" placeholder="Confirm new password" />
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn-primary" :class="`${userRole}-btn-primary`" :disabled="passwordLoading">
              <svg v-if="!passwordLoading" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              <div v-else class="spinner-small"></div>
              {{ passwordLoading ? 'Updating...' : 'Update Password' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Preferences Card -->
      <div class="settings-card">
        <div class="card-header">
          <div class="header-icon" :class="`${userRole}-icon`">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h2>Preferences</h2>
            <p class="card-subtitle">Customize your experience</p>
          </div>
        </div>

        <div class="preferences-list">
          <!-- Email Notifications (All Roles) -->
          <div class="preference-item">
            <div class="preference-info">
              <div class="preference-icon" :class="`${userRole}-preference-icon`">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4>Email Notifications</h4>
                <p>Receive booking updates and property alerts via email</p>
              </div>
            </div>
            <label class="toggle-switch" :class="`${userRole}-toggle`">
              <input type="checkbox" v-model="preferences.emailNotifications" />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <!-- SMS Notifications (All Roles) -->
          <div class="preference-item">
            <div class="preference-info">
              <div class="preference-icon" :class="`${userRole}-preference-icon`">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4>SMS Notifications</h4>
                <p>Get text messages for urgent booking updates</p>
              </div>
            </div>
            <label class="toggle-switch" :class="`${userRole}-toggle`">
              <input type="checkbox" v-model="preferences.smsNotifications" />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <!-- Marketing Emails (Guest Only) -->
          <div v-if="userRole === 'guest'" class="preference-item">
            <div class="preference-info">
              <div class="preference-icon guest-preference-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <div>
                <h4>Marketing Emails</h4>
                <p>Receive newsletters and promotional offers</p>
              </div>
            </div>
            <label class="toggle-switch guest-toggle">
              <input type="checkbox" v-model="preferences.marketingEmails" />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <!-- Auto-Accept Bookings (Host Only) -->
          <div v-if="userRole === 'host'" class="preference-item">
            <div class="preference-info">
              <div class="preference-icon host-preference-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4>Auto-Accept Bookings</h4>
                <p>Automatically accept all booking requests</p>
              </div>
            </div>
            <label class="toggle-switch host-toggle">
              <input type="checkbox" v-model="preferences.autoAcceptBookings" />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <!-- Currency Preference (Fixed to AUD - All Roles) -->
          <div class="preference-item">
            <div class="preference-info">
              <div class="preference-icon" :class="`${userRole}-preference-icon`">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4>Currency</h4>
                <p>Display prices in Australian Dollars</p>
              </div>
            </div>
            <div class="currency-badge" :class="`${userRole}-badge`">
              AUD (A$)
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button @click="savePreferences" class="btn-primary" :class="`${userRole}-btn-primary`" :disabled="preferencesLoading">
            <svg v-if="!preferencesLoading" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <div v-else class="spinner-small"></div>
            {{ preferencesLoading ? 'Saving...' : 'Save Preferences' }}
          </button>
        </div>
      </div>

      <!-- Danger Zone Card (Host and Guest Only - NOT Admin) -->
      <div v-if="userRole !== 'admin'" class="settings-card danger-card">
        <div class="card-header">
          <div class="header-icon danger">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h2>Danger Zone</h2>
            <p class="card-subtitle">Irreversible account actions</p>
          </div>
        </div>

        <div class="danger-actions">
          <button @click="deactivateAccount" class="btn-danger">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            Deactivate Account
          </button>
          <button @click="deleteAccount" class="btn-danger">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// User role - read from the authenticated user's data
const userRole = computed(() => authStore.user?.role || 'guest')

// Profile Form
const profileForm = ref({
  fullName: authStore.user?.full_name || 'John Doe',
  email: authStore.user?.email || 'john@example.com',
  phone: authStore.user?.phone || '+61 400 000 000',
  location: 'Sydney, Australia'
})

// Password Form
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Preferences
const preferences = ref({
  emailNotifications: true,
  smsNotifications: false,
  marketingEmails: true,
  autoAcceptBookings: false,
  currency: 'AUD'
})

// Loading States
const profileLoading = ref(false)
const passwordLoading = ref(false)
const preferencesLoading = ref(false)

// Profile Functions
const updateProfile = async () => {
  profileLoading.value = true
  // Simulate API call
  setTimeout(() => {
    profileLoading.value = false
    alert('Profile updated successfully!')
  }, 1500)
}

const resetProfile = () => {
  profileForm.value = {
    fullName: authStore.user?.full_name || 'John Doe',
    email: authStore.user?.email || 'john@example.com',
    phone: authStore.user?.phone || '+61 400 000 000',
    location: 'Sydney, Australia'
  }
}

// Password Functions
const updatePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert('Passwords do not match!')
    return
  }
  passwordLoading.value = true
  // Simulate API call
  setTimeout(() => {
    passwordLoading.value = false
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
    alert('Password updated successfully!')
  }, 1500)
}

// Preferences Functions
const savePreferences = async () => {
  preferencesLoading.value = true
  // Simulate API call
  setTimeout(() => {
    preferencesLoading.value = false
    alert('Preferences saved successfully!')
  }, 1500)
}

// Danger Zone Functions
const deactivateAccount = () => {
  if (confirm('Are you sure you want to deactivate your account? You can reactivate it later.')) {
    alert('Account deactivation would happen here')
  }
}

const deleteAccount = () => {
  if (confirm('WARNING: This action is PERMANENT and cannot be undone. Are you absolutely sure you want to delete your account?')) {
    alert('Account deletion would happen here')
  }
}
</script>

<style scoped>
.profile-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

/* Header */
.profile-header {
  margin-bottom: 3rem;
}

.header-title-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.header-content h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.role-badge {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.role-badge.role-admin {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
}

.role-badge.role-host {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
}

.role-badge.role-guest {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.subtitle {
  color: #64748b;
  font-size: 1.1rem;
  margin: 0;
}

/* Settings Cards */
.settings-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  margin-bottom: 2rem;
}

.admin-card {
  border: 2px solid #fee2e2;
}

.host-card {
  border: 2px solid #dbeafe;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e2e8f0;
}

.header-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.admin-icon {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.host-icon {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.guest-icon {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.header-icon svg {
  width: 28px;
  height: 28px;
}

.card-header h2 {
  font-size: 1.5rem;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
}

.card-subtitle {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.admin-gradient {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.host-gradient {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.stat-icon svg {
  width: 24px;
  height: 24px;
}

.stat-info {
  flex: 1;
}

.stat-label {
  margin: 0 0 0.25rem 0;
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
}

.stat-value {
  margin: 0;
  color: #1e293b;
  font-size: 1.75rem;
  font-weight: 700;
}

/* Admin Actions */
.admin-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.admin-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: white;
  color: #ef4444;
  border: 2px solid #ef4444;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.admin-btn:hover {
  background: #ef4444;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
}

/* Avatar Section */
.avatar-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
}

.avatar-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.admin-avatar {
  background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%);
}

.host-avatar {
  background: linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%);
}

.guest-avatar {
  background: linear-gradient(135deg, #a7f3d0 0%, #6ee7b7 100%);
}

.avatar-circle svg {
  width: 50px;
  height: 50px;
  color: #64748b;
}

.btn-change-avatar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: white;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.admin-btn-outline {
  color: #ef4444;
  border: 2px solid #ef4444;
}

.admin-btn-outline:hover {
  background: #ef4444;
  color: white;
}

.host-btn-outline {
  color: #3b82f6;
  border: 2px solid #3b82f6;
}

.host-btn-outline:hover {
  background: #3b82f6;
  color: white;
}

.guest-btn-outline {
  color: #10b981;
  border: 2px solid #10b981;
}

.guest-btn-outline:hover {
  background: #10b981;
  color: white;
}

/* Forms */
.settings-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
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
  width: 20px;
  height: 20px;
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

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-primary,
.btn-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-primary {
  flex: 1;
  color: white;
}

.admin-btn-primary {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.admin-btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4);
}

.host-btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.host-btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
}

.guest-btn-primary {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.guest-btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-secondary {
  background: white;
  color: #64748b;
  border: 2px solid #e2e8f0;
}

.btn-secondary:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.icon {
  width: 20px;
  height: 20px;
}

.spinner-small {
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

/* Preferences */
.preferences-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.preference-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background: #f8fafc;
  border-radius: 12px;
  gap: 1.5rem;
}

.preference-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.preference-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.admin-preference-icon {
  color: #ef4444;
}

.host-preference-icon {
  color: #3b82f6;
}

.guest-preference-icon {
  color: #10b981;
}

.preference-icon svg {
  width: 22px;
  height: 22px;
}

.preference-item h4 {
  margin: 0 0 0.25rem 0;
  color: #1e293b;
  font-size: 1rem;
}

.preference-item p {
  margin: 0;
  color: #64748b;
  font-size: 0.875rem;
}

/* Toggle Switch */
.toggle-switch {
  position: relative;
  width: 56px;
  height: 32px;
  flex-shrink: 0;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background: #cbd5e1;
  border-radius: 32px;
  transition: 0.3s;
}

.toggle-slider:before {
  position: absolute;
  content: '';
  height: 24px;
  width: 24px;
  left: 4px;
  bottom: 4px;
  background: white;
  border-radius: 50%;
  transition: 0.3s;
}

.admin-toggle input:checked + .toggle-slider {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.host-toggle input:checked + .toggle-slider {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.guest-toggle input:checked + .toggle-slider {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

input:checked + .toggle-slider:before {
  transform: translateX(24px);
}

/* Currency Badge */
.currency-badge {
  padding: 0.75rem 1.25rem;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 700;
  color: white;
}

.admin-badge {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.host-badge {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.guest-badge {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

/* Danger Zone */
.danger-card {
  border: 2px solid #fee2e2;
}

.header-icon.danger {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.danger-actions {
  display: flex;
  gap: 1rem;
}

.btn-danger {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: white;
  color: #ef4444;
  border: 2px solid #ef4444;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-danger:hover {
  background: #ef4444;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .profile-container {
    padding: 1rem;
  }

  .header-content h1 {
    font-size: 2rem;
  }

  .header-title-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .avatar-section {
    flex-direction: column;
    text-align: center;
  }

  .form-actions,
  .danger-actions {
    flex-direction: column;
  }

  .preference-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .toggle-switch,
  .currency-badge {
    align-self: stretch;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .admin-actions {
    grid-template-columns: 1fr;
  }
}
</style>
