# MasQani BnB - Frontend

Vue.js 3 single-page application for the MasQani BnB platform.

## 🏗️ Architecture

```
frontend/
├── src/
│   ├── assets/             # Static assets
│   │   └── styles/
│   │       └── main.css    # Global styles
│   ├── components/         # Reusable Vue components
│   ├── router/             # Vue Router configuration
│   │   └── index.js        # Route definitions
│   ├── services/           # API service layer
│   │   └── api.js          # Axios instance and API methods
│   ├── stores/             # Pinia state management
│   │   └── auth.js         # Authentication store
│   ├── views/              # Page components
│   │   ├── Login.vue       # Login page
│   │   ├── Register.vue    # Registration page
│   │   ├── Dashboard.vue   # Property dashboard
│   │   ├── PropertyForm.vue    # Create/Edit property
│   │   ├── PropertyDetails.vue # Property details + bookings
│   │   └── Bookings.vue    # User bookings
│   ├── App.vue             # Root component
│   └── main.js             # Application entry point
├── index.html              # HTML template
├── package.json            # Dependencies
└── vite.config.js          # Vite configuration
```

## 🚀 Running the Application

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Dependencies

### Core
- **Vue 3** - Progressive JavaScript framework
- **Vue Router 4** - Official router for Vue.js
- **Pinia** - State management for Vue 3
- **Axios** - HTTP client for API requests

### Dev Dependencies
- **Vite** - Fast build tool and dev server
- **@vitejs/plugin-vue** - Vue 3 plugin for Vite

## 🎨 Styling

Custom CSS with:
- CSS Grid for layouts
- Flexbox for components
- CSS variables for theming
- Responsive design
- Smooth transitions
- Modern card-based UI

## 🔐 Authentication Flow

1. User visits site → redirected to `/login`
2. User registers or logs in
3. JWT token received and stored in localStorage
4. Token automatically added to all API requests
5. Token validated on each protected route
6. On 401 response, user logged out and redirected to login

## 🗺️ Routes

### Public Routes
- `/login` - User login
- `/register` - User registration

### Protected Routes (Require Authentication)
- `/` - Redirects to dashboard
- `/dashboard` - User's property listings
- `/properties/new` - Create new property
- `/properties/:id` - View property details
- `/properties/:id/edit` - Edit property
- `/bookings` - User's booking requests

## 🔌 API Integration

### API Service (`services/api.js`)

Axios instance configured with:
- Base URL: `/api`
- Automatic JWT token injection
- Response interceptor for 401 handling
- JSON content-type headers

### API Methods

#### Auth API
```javascript
authAPI.register(data)    // Register new user
authAPI.login(data)       // Login user
authAPI.getProfile()      // Get current user
```

#### Property API
```javascript
propertyAPI.getAll()           // Get all properties
propertyAPI.getOne(id)         // Get single property
propertyAPI.create(data)       // Create property
propertyAPI.update(id, data)   // Update property
propertyAPI.delete(id)         // Delete property
propertyAPI.addImage(id, url)  // Add image to property
```

#### Booking API
```javascript
bookingAPI.getUserBookings()              // Get user's bookings
bookingAPI.getPropertyBookings(id)        // Get property bookings
bookingAPI.create(propertyId, data)       // Create booking
bookingAPI.updateStatus(id, status)       // Accept/decline booking
```

#### Upload API
```javascript
uploadAPI.uploadFile(file)    // Upload image file
```

## 🗄️ State Management (Pinia)

### Auth Store (`stores/auth.js`)

**State:**
- `user` - Current user object
- `token` - JWT authentication token

**Getters:**
- `isAuthenticated` - Boolean authentication status

**Actions:**
- `register(credentials)` - Register new user
- `login(credentials)` - Login user
- `setAuth(data)` - Set user and token
- `logout()` - Clear user and token

## 🎯 Component Structure

### Views (Pages)

#### Login.vue
- Email/password form
- Error handling
- Link to registration

#### Register.vue
- Registration form (name, email, phone, password)
- Error handling
- Link to login

#### Dashboard.vue
- Grid of property cards
- Create new property button
- Edit/delete actions
- Empty state for no properties

#### PropertyForm.vue
- Form for creating/editing properties
- Image upload with preview
- Form validation
- Cancel button

#### PropertyDetails.vue
- Property information display
- Image gallery
- Booking requests list
- Accept/decline booking actions

#### Bookings.vue
- List of user's booking requests
- Status badges
- Date formatting
- Empty state

### Components (Reusable)

Currently, components are co-located in views. Future enhancements could extract:
- PropertyCard component
- BookingCard component
- ImageUpload component
- StatusBadge component

## 🎨 Styling Guidelines

### Color Palette
- Primary: `#667eea` (purple)
- Secondary: `#764ba2` (darker purple)
- Success: `#48bb78` (green)
- Danger: `#f56565` (red)
- Text: `#2d3748` (dark gray)
- Muted: `#718096` (gray)

### Component Classes
- `.card` - White card with shadow
- `.btn` - Base button styles
- `.btn-primary`, `.btn-secondary`, etc. - Button variants
- `.form-group` - Form field container
- `.badge` - Status badge
- `.property-card` - Property listing card

## 📱 Responsive Design

The application is responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

Grid layouts automatically adjust columns based on screen size.

## 🛠️ Development

### Adding New Views

1. Create component in `src/views/`
2. Add route in `src/router/index.js`
3. Add navigation link if needed
4. Apply `meta: { requiresAuth: true }` for protected routes

### Adding New API Methods

1. Add method to appropriate API object in `src/services/api.js`
2. Use in components with try/catch
3. Handle errors appropriately

### Creating Reusable Components

1. Create component in `src/components/`
2. Define props and emits
3. Import and use in views
4. Document usage

## 🔧 Configuration

### Vite Config (`vite.config.js`)

- Dev server port: 5173
- Proxy to backend: `/api` → `http://localhost:3000`
- Path alias: `@` → `./src`

### Router Config (`router/index.js`)

- Navigation guards for authentication
- Guest-only routes (login, register)
- Protected routes (dashboard, properties, bookings)

## 🧪 Testing

### Manual Testing Checklist

- [ ] Register new user
- [ ] Login with credentials
- [ ] Create property with images
- [ ] Edit property
- [ ] Delete property
- [ ] View property details
- [ ] Create booking request
- [ ] View booking status
- [ ] Accept/decline booking (as host)
- [ ] Logout

### Future Testing

Consider adding:
- Unit tests with Vitest
- Component tests with Vue Test Utils
- E2E tests with Playwright or Cypress

## 🚀 Production Build

```bash
# Build for production
npm run build

# Output in dist/ folder
# Upload to static hosting (Vercel, Netlify, etc.)
```

### Environment Variables

For production, update API base URL:
```javascript
// In services/api.js
const api = axios.create({
  baseURL: process.env.VITE_API_URL || '/api',
})
```

Create `.env.production`:
```env
VITE_API_URL=https://api.masqani.com/api
```

## 📦 Deployment

### Vercel / Netlify

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables
5. Deploy

### Manual Deployment

1. Build: `npm run build`
2. Upload `dist/` folder to web server
3. Configure server to serve `index.html` for all routes (SPA mode)

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name masqani.com;
    root /var/www/masqani/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
    }
}
```

## 🐛 Troubleshooting

### CORS Issues
- Check backend CORS configuration
- Verify API URL is correct
- Check browser console for errors

### Authentication Issues
- Clear localStorage
- Check token expiration
- Verify backend is running

### Build Issues
```bash
# Clear node modules
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

## 🎯 Future Enhancements

- Image cropping/resizing before upload
- Drag-and-drop image upload
- Date picker for bookings
- Calendar view of bookings
- Real-time notifications
- Image gallery lightbox
- Skeleton loading states
- Toast notifications
- Form validation library
- Internationalization (i18n)

## 📝 Code Style

- Use Composition API (setup script)
- Use `ref` for primitive values
- Use `reactive` for objects
- Destructure props in template
- Use descriptive variable names
- Add comments for complex logic

## 📞 Support

For frontend-specific issues, check:
1. Browser console for errors
2. Network tab for API failures
3. Vue DevTools for state inspection
4. Node/npm versions

---

**Built with Vue.js 3 + Vite** ⚡
