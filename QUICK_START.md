# 🚀 Quick Start Guide - Supreme Lottery

## File Organization

### HTML Files (Clean & Separated)
- **login.html** → Login page only
- **register.html** → Register page only  
- **index.html** → Main app (4 pages after login)

### CSS Files (No Inline)
- **STYLES/style.css** → Main styling
- **STYLES/spa-navigation.css** → Navigation styling

### JavaScript Files (No Inline)
- **BACKEND/spa-navigation.js** → Core logic & navigation
- **BACKEND/script.js** → General functionality
- **BACKEND/dashboard.js** → Dashboard page
- **BACKEND/buy-ticket.js** → Ticket purchase
- **BACKEND/profile.js** → Profile management

## 🔐 User Journey

```
Visit login.html
    ↓
New user? → register.html → Fill form → index.html ✓
    ↓
Existing user? → login.html → Enter credentials → index.html ✓
    ↓
Inside App → Navigate 4 pages → Logout → login.html
```

## 📱 What Each Page Does

### Login Page (`login.html`)
```html
✅ Form: Username/Email + Password
✅ Button: Login
✅ Link: Register Now
✅ Feature: Theme toggle
✅ Redirect: To index.html on success
```

### Register Page (`register.html`)
```html
✅ Form: Full Name + Email + Password + Confirm Password
✅ Button: Register
✅ Link: Already have account? Login
✅ Feature: Theme toggle
✅ Feature: Password validation
✅ Redirect: To index.html on success
```

### Main App (`index.html`) - 4 Pages

1. **Home Page**
   - Hero section
   - Quick actions
   - Prize structure
   - Information

2. **Dashboard**
   - Statistics
   - My tickets
   - Upcoming draws
   - Draw results

3. **Buy Tickets**
   - Select lottery
   - Choose quantity
   - Payment method
   - Purchase button

4. **Profile**
   - Personal info
   - Security settings
   - Preferences
   - Account stats

## 🎨 Features

✅ **Clean Code**
- No inline CSS
- No inline JavaScript
- Separated concerns
- Easy to maintain

✅ **User Management**
- Login/Register
- Session persistence
- User profile display
- Logout functionality

✅ **Navigation**
- Between 4 main pages
- Mobile menu support
- Active page highlighting
- Smooth transitions

✅ **Theming**
- Light/Dark mode toggle
- Persistence across sessions
- Works on all pages

✅ **Responsive**
- Mobile friendly
- Tablet optimized
- Desktop ready

## 🧪 Quick Test

1. Open `login.html`
2. Click "Register Now"
3. Fill registration form
4. Submit
5. See all 4 pages in main app
6. Toggle theme
7. Click Logout
8. Back to login page

## 📂 File Paths

```
c:\Users\msi\OneDrive\Desktop\Websites\Lottery\
├── login.html ← Start here for login
├── register.html ← Start here for registration
├── index.html ← Main app (needs login)
├── STYLES/
│   ├── style.css
│   └── spa-navigation.css
├── BACKEND/
│   ├── spa-navigation.js
│   ├── script.js
│   ├── dashboard.js
│   ├── buy-ticket.js
│   └── profile.js
└── IMAGES/
    └── Supreme Lottery.png
```

## 🔗 Direct Links

- **Login**: `file:///C:/Users/msi/OneDrive/Desktop/Websites/Lottery/login.html`
- **Register**: `file:///C:/Users/msi/OneDrive/Desktop/Websites/Lottery/register.html`
- **Main App**: `file:///C:/Users/msi/OneDrive/Desktop/Websites/Lottery/index.html`

## ⚡ Key Functions

### Navigation
```javascript
navigatePage('home')        // Go to home
navigatePage('dashboard')   // Go to dashboard
navigatePage('buy-ticket')  // Go to buy tickets
navigatePage('profile')     // Go to profile
```

### User Management
```javascript
localStorage.getItem('currentUser')     // Get logged-in user
localStorage.setItem('currentUser', data) // Save user on login
localStorage.removeItem('currentUser')   // Clear on logout
```

### Theme
```javascript
document.documentElement.setAttribute('data-theme', 'dark')   // Dark mode
document.documentElement.setAttribute('data-theme', 'light')  // Light mode
localStorage.getItem('theme')  // Get saved theme
```

## ✅ Status

- ✅ HTML pages separated (login, register, index)
- ✅ CSS in separate files (no inline)
- ✅ JavaScript in separate files (no inline)
- ✅ All pages accessible after login
- ✅ User session management working
- ✅ Theme toggle working
- ✅ Navigation working
- ✅ Error handling in place
- ✅ Mobile responsive
- ✅ Ready for API integration

---

**Everything is working perfectly! 🎉**
