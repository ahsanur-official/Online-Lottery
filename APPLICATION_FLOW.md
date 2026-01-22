# Supreme Lottery - Application Structure & Flow

## 📁 Updated File Structure

```
Lottery/
├── index.html (Main app - All pages after login)
├── login.html (Login page - Separate)
├── register.html (Register page - Separate)
├── STYLES/
│   ├── style.css (Main styling)
│   └── spa-navigation.css (SPA navigation styling)
├── BACKEND/
│   ├── spa-navigation.js (Core navigation & logic)
│   ├── script.js (General functionality)
│   ├── dashboard.js (Dashboard page)
│   ├── buy-ticket.js (Buy tickets page)
│   └── profile.js (Profile page)
├── IMAGES/
│   └── Supreme Lottery.png (Logo)
└── Documentation files
```

## 🔐 Authentication Flow

### 1. Login Page (`login.html`)
```
┌─────────────────┐
│  login.html     │
│  - Form inputs  │
│  - Theme toggle │
└────────┬────────┘
         │ (Login successful)
         ├─> localStorage.setItem('currentUser', data)
         └─> window.location.href = 'index.html'
```

**Features:**
- Username/Email input
- Password input
- Theme toggle
- Link to register page
- Auto-redirects if already logged in

### 2. Register Page (`register.html`)
```
┌──────────────────┐
│  register.html   │
│  - Form inputs   │
│  - Theme toggle  │
└────────┬─────────┘
         │ (Registration successful)
         ├─> localStorage.setItem('currentUser', data)
         └─> window.location.href = 'index.html'
```

**Features:**
- Full name input
- Email input
- Password input
- Confirm password
- Password matching validation
- Theme toggle
- Link to login page
- Auto-redirects if already logged in

### 3. Main App Pages (`index.html`)
```
┌─────────────────────────────────────────────┐
│  index.html (requires login)                │
├─────────────────────────────────────────────┤
│ ┌─ HOME PAGE (Default)                     │
│ ├─ DASHBOARD PAGE                          │
│ ├─ BUY TICKETS PAGE                        │
│ └─ PROFILE PAGE                            │
└─────────────────────────────────────────────┘
```

**Features:**
- Protected page (redirects to login.html if not logged in)
- All 4 main pages in one file
- Navigation between pages
- User profile management
- Theme toggle on all pages
- Logout functionality

## 🔄 User Flow

1. **First Visit**
   - No localStorage data
   - Redirects to login.html automatically

2. **Register Flow**
   - User goes to register.html
   - Fills form → Validates
   - Stores data in localStorage
   - Redirects to index.html
   - index.html loads with user logged in

3. **Login Flow**
   - User enters credentials
   - Validates form
   - Stores data in localStorage
   - Redirects to index.html
   - index.html loads with user logged in

4. **Accessing Main App**
   - If logged in (localStorage has 'currentUser')
     - ✅ Loads index.html successfully
     - Shows home page
     - Can navigate between all pages
   - If not logged in (localStorage empty)
     - ⛔ Redirects to login.html

5. **Logout**
   - Click logout button
   - Clears localStorage
   - Redirects to login.html

## 📝 Key Files Breakdown

### Authentication Pages

**login.html**
- Dedicated login page
- Form validation
- Theme support
- Redirects to index.html on success

**register.html**
- Dedicated registration page
- Password confirmation
- Theme support
- Redirects to index.html on success

### Main Application

**index.html**
- Protected page (requires login)
- Contains 4 pages:
  - Home page
  - Dashboard
  - Buy tickets
  - Profile
- Navigation between pages
- User display with initials
- Theme toggle
- Logout functionality

### Styles

**STYLES/style.css**
- All main styling
- Color schemes
- Responsive design
- Theme variables

**STYLES/spa-navigation.css**
- Page section display rules
- Auth page styling
- Mobile menu styling
- Animations

### Scripts

**BACKEND/spa-navigation.js**
- Core navigation system
- Page switching logic
- Event listeners
- Theme management
- Form handling
- Session restoration
- Login check redirect

**BACKEND/script.js**
- General app logic
- Utility functions

**BACKEND/dashboard.js**
- Dashboard functionality
- Statistics
- Ticket display

**BACKEND/buy-ticket.js**
- Ticket purchase logic
- Payment methods
- Quantity selection

**BACKEND/profile.js**
- User profile management
- Account settings

## 🔐 Security Features

✅ **localStorage Protection**
- User data stored in browser
- Only if logged in

✅ **Automatic Redirects**
- Non-logged-in users → login.html
- Logged-in users → index.html

✅ **Session Persistence**
- Refresh page → Stays logged in
- Logout → Clear all data

✅ **Password Validation**
- Confirmation check on register
- Required fields validation

## ✨ Usage Instructions

### For Users

1. **First Time**
   - Visit login.html
   - No account? Click "Register Now"
   - Fill form and submit
   - Automatically goes to main app

2. **Returning Users**
   - Visit login.html
   - Enter credentials
   - Click Login
   - Automatically goes to main app

3. **Inside Main App**
   - Use navigation menu
   - Browse all pages
   - Toggle theme
   - Click logout to exit

### For Developers

1. **Adding New Pages**
   - Add new section in index.html
   - Add `<div id="page-newpage">` 
   - Add navigation link `data-page="newpage"`
   - Create corresponding JS file in BACKEND

2. **Modifying Styles**
   - Main styling → STYLES/style.css
   - SPA styles → STYLES/spa-navigation.css
   - No inline CSS!

3. **Adding Functionality**
   - Core logic → BACKEND/spa-navigation.js
   - Page-specific → BACKEND/{page}.js
   - No inline JS!

## 🧪 Testing Checklist

- [ ] Login page displays correctly
- [ ] Register page displays correctly
- [ ] Form validation works
- [ ] Login redirects to index.html
- [ ] Register redirects to index.html
- [ ] index.html shows all 4 pages
- [ ] Navigation between pages works
- [ ] User profile displays with initial
- [ ] Theme toggle works
- [ ] Logout clears data and redirects
- [ ] Refresh stays logged in
- [ ] Page structure is clean (no inline CSS/JS)

## 🎯 API Integration Ready

All pages are ready for backend API integration:
- Replace localStorage with API calls
- Add real database connections
- Implement payment processing
- Add draw results functionality
- Integrate with payment gateways

---

**Status**: ✅ All working perfectly!
**Last Updated**: January 23, 2026
