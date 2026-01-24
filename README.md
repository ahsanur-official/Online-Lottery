# 🎰 Supreme Lottery - Complete React + Node.js Application

A fully functional lottery ticket management system built with **React 18**, **Vite**, **Node.js/Express**, and **localStorage** for data persistence.

## 📋 Features Overview

### ✨ Complete Feature Set
- 🔐 **User Authentication** - Registration, Login, and Session Management
- 📊 **Dashboard** - View statistics, wins, spent amount, and ticket history
- 🎫 **Ticket Purchase** - Select lottery type, pick 6 numbers from 1-49, choose payment method
- 📝 **My Tickets** - View all purchased tickets with filtering (All/Current/Past)
- 🏆 **Results** - Check lottery results and winners
- ⚙️ **Profile Management** - Update personal info, change password, set preferences
- 🌙 **Dark Mode** - Beautiful theme toggle with persistent storage
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile
- 🎨 **Beautiful Alerts** - Success, error, warning, and info notifications
- 💾 **Data Persistence** - All data stored in browser localStorage

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm (v6+)

### Installation & Setup

1. **Clone or extract the project:**
```bash
cd Lottery
```

2. **Install dependencies:**

**Frontend:**
```bash
cd client
npm install
```

**Backend:**
```bash
cd ../server
npm install
```

3. **Initialize Sample Data (Optional but Recommended):**
   - Open the app in browser at `http://localhost:3000`
   - Open Browser Console (F12 or Ctrl+Shift+I)
   - Paste and run:
     ```javascript
     initializeDefaultData()
     ```
   - Refresh the page

## 🎯 Quick Start

### Option 1: Start Both Servers (Recommended)

**Terminal 1 - Frontend:**
```bash
cd client
npm run dev
```
Opens at: http://localhost:3000

**Terminal 2 - Backend:**
```bash
cd server
node server.js
```
Runs at: http://localhost:5000

### Option 2: Start Only Frontend
```bash
cd client
npm run dev
```
The app works perfectly with just localStorage without the backend!

## 🔑 Demo Credentials

**After running `initializeDefaultData()` in console:**
- **Username:** demo
- **Password:** demo123

**Or create your own:**
1. Click "Register Now" on login page
2. Fill in the form
3. Click "Create Account"
4. Auto-logged in on success!

## 📖 User Workflows

### 1. New User Registration
```
Login Page → "Register Now" → Fill Form → Validate → Create Account → Auto-Login
```

### 2. Buy Lottery Tickets
```
Home → "Buy Tickets" → Select Lottery → Pick 6 Numbers → Set Quantity → 
Choose Payment → Review Order → Purchase → Get Receipt with Ticket Numbers
```

### 3. View My Tickets
```
Dashboard → "My Tickets" → Filter by Status (All/Current/Past) → 
View Ticket Details including Status and Prizes
```

### 4. Check Results
```
Dashboard → "Results" → View Draw Information and Winners List
```

### 5. Update Profile
```
Profile Icon → "Account Setup" → Update Personal Info / Change Password / 
Set Preferences → Save Changes
```

## 📁 Project Structure

```
Lottery/
├── client/
│   ├── src/
│   │   ├── App.jsx              # Main application component
│   │   ├── App.css              # All styles (animations, dark mode, responsive)
│   │   ├── pages.jsx            # All page components
│   │   ├── main.jsx             # React entry point
│   │   └── styles/
│   │       └── index.css        # Global styles
│   ├── index.html               # HTML template
│   ├── package.json             # Frontend dependencies
│   └── vite.config.js           # Vite configuration with API proxy
├── server/
│   ├── server.js                # Express backend
│   └── package.json             # Backend dependencies
├── IMAGES/                      # Logo images (unchanged)
├── DATA_INITIALIZATION.js       # localStorage setup script
├── IMPLEMENTATION_CHECKLIST.md  # Complete feature checklist
└── README.md                    # This file
```

## 💾 Data Storage (localStorage)

The app persists data in 6 localStorage keys:

| Key | Contents | Structure |
|-----|----------|-----------|
| `users` | Registered users | Array of user objects |
| `currentUser` | Logged-in user session | User object |
| `tickets` | All purchased tickets | Array of ticket objects |
| `draws` | Available lotteries | Array of lottery types |
| `results` | Past lottery results | Array of draw results |
| `updates` | News/announcements | Array of update objects |
| `theme` | Dark/Light mode | 'light' or 'dark' |

## 🎨 UI Components

### Pages (6 Total)
1. **Home** - Welcome page with lottery overview and results
2. **Dashboard** - Statistics and ticket history
3. **Buy Tickets** - Lottery ticket purchase workflow
4. **My Tickets** - View purchased tickets with filters
5. **Results** - Lottery draw results and winners
6. **Profile** - Account settings and preferences

### Reusable UI Elements
- Alert System (Success/Error/Warning/Info)
- Navigation Bar with Logo and Menu
- User Profile Dropdown
- Theme Toggle Switch
- Number Picker Grid (1-49)
- Quantity Counter (±/input)
- Status Badges
- Payment Method Selector
- Responsive Grid Layouts

## 🎨 Styling Features

### Design System
- **Colors:** Primary (purple), Secondary, Success, Error, Warning
- **Typography:** Clear hierarchy with 3 font sizes
- **Spacing:** Consistent padding/margin using CSS variables
- **Shadows:** Subtle shadows for depth

### Animations
- Fade-in on page load
- Slide-in header
- Hover effects on buttons
- Scale transforms on interactive elements
- Smooth transitions throughout
- Theme toggle animation

### Responsive Breakpoints
- **Desktop:** 1200px+
- **Tablet:** 768px - 1199px
- **Mobile:** < 768px

## 🔐 Authentication

### User Registration
```javascript
// Validation Rules
✓ Password: Minimum 6 characters
✓ Confirm Password: Must match new password
✓ Email: Must be unique (no duplicates)
✓ Username: Can be any string
```

### User Login
```javascript
// Login attempts
✓ Find user by username OR email
✓ Match password exactly
✓ Create session in currentUser
✓ Persist across page refresh
```

### Logout
```javascript
// Logout removes
✗ currentUser from localStorage
✗ User state from React
→ Redirect to login page
```

## 💳 Ticket Purchase System

### Workflow
1. Select lottery type (4 available)
2. Pick exactly 6 numbers from 1-49
3. Set quantity (1-100 tickets)
4. Choose payment method (bKash/Nagad/Rocket)
5. Review order summary
6. Purchase generates unique ticket numbers
7. Receipt shown with all details

### Ticket Properties
```javascript
{
  id: Date.now(),                        // Unique ID
  userId: currentUser.id,                // Owner reference
  username: currentUser.username,        // Owner name
  ticketNumber: 10_digit_random,        // Unique ticket #
  lottery: 'mega' | 'power' | etc,      // Lottery type
  price: 1,                              // Cost in BDT
  purchaseDate: 'MM/DD/YYYY',           // When purchased
  status: 'pending' | 'won' | 'lost',   // Current status
  prizeWon: number | null,               // Prize amount
  paymentMethod: 'bkash' | 'nagad' | 'rocket',
  transactionId: 'TXN' + timestamp      // Transaction reference
}
```

## 📊 Statistics Calculation

### Dashboard Metrics
```javascript
totalTickets        = All tickets owned by user
totalWins          = Tickets with status === 'won'
totalSpent         = Total tickets × 1 BDT each
totalWinnings      = Sum of all prizeWon amounts
pendingDraws       = Tickets with status === 'pending'
```

## ⚠️ Form Validation

### Registration/Login
- ✓ Email must be unique
- ✓ Email must not be empty
- ✓ Password must be ≥ 6 characters
- ✓ Confirm password must match
- ✓ Username must not be empty

### Profile Update
- ✓ Current password must match
- ✓ New password must be ≥ 6 characters
- ✓ Confirm password must match

### Ticket Purchase
- ✓ Lottery must be selected
- ✓ Must pick exactly 6 numbers
- ✓ Quantity must be 1-100

## 🎯 Console Commands

### Initialize Data
```javascript
initializeDefaultData()     // Setup all sample data
viewAllData()              // Display all stored data
addSampleWonTicket()       // Add a winning ticket
clearAllData()             // Remove all app data
quickStart()               // Show help guide
```

## 🌙 Dark Mode

### How It Works
1. Click moon/sun icon in header
2. CSS classes toggle on `<body>`
3. All colors automatically update
4. Theme preference saved to localStorage
5. Persists across browser sessions

### CSS Variables Used
```css
--primary-color
--bg-primary
--bg-secondary
--text-primary
--text-secondary
--success-color
--error-color
--warning-color
```

## 📱 Mobile Optimization

- Touch-friendly button sizes (44px minimum)
- Single-column layouts on mobile
- Flexible grids that stack
- Optimized number picker for small screens
- Mobile-friendly forms
- Portrait and landscape support

## 🧪 Testing the App

### Test Scenarios
1. **Registration**
   - Create new account
   - Verify duplicate email rejected
   - Check weak password warning

2. **Login**
   - Login with correct credentials
   - Test wrong password error
   - Verify session persists

3. **Buy Tickets**
   - Select each lottery type
   - Purchase single and multiple tickets
   - Verify receipt displays all tickets

4. **My Tickets**
   - View all tickets
   - Filter by status
   - Verify counts update

5. **Profile**
   - Update personal info
   - Change password
   - Toggle preferences

6. **Dark Mode**
   - Toggle theme multiple times
   - Refresh page - theme persists
   - Check all pages in both themes

## 🐛 Troubleshooting

### App won't start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Port 3000 already in use
```bash
# Kill process on port 3000
# Windows: taskkill /PID <pid> /F
# Mac/Linux: lsof -i :3000 | kill -9
```

### localStorage not persisting
- Check browser allows cookies/storage
- Try incognito/private window
- Check browser storage settings

### Tickets not showing
- Run `initializeDefaultData()` in console
- Check localStorage in DevTools (F12 → Application)
- Verify tickets have correct userId

## 📝 API Endpoints (Node.js Backend)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/draws` | Get all lotteries |
| GET | `/api/tickets/:userId` | Get user's tickets |
| GET | `/api/tickets` | Get all tickets |
| POST | `/api/tickets/buy` | Purchase tickets |
| GET | `/api/health` | Health check |

## 🎓 Learning Resources

### Technologies Used
- **React** - UI library
- **Vite** - Fast build tool
- **Node.js** - Backend runtime
- **Express** - Web framework
- **CSS3** - Styling with animations
- **localStorage** - Client-side storage

### Key Concepts
- React Hooks (useState, useEffect)
- Component composition
- State management
- SPA (Single Page Application)
- localStorage API
- RESTful routing
- Form validation
- Responsive design

## 📄 License

Open source - feel free to use and modify!

## 🙏 Credits

Built with ❤️ for the Supreme Lottery platform.

---

## 📞 Support

For issues or questions:
1. Check the IMPLEMENTATION_CHECKLIST.md
2. Review DATA_INITIALIZATION.js for setup help
3. Open browser console to use provided commands
4. Verify localhost servers are running

## 🎉 Enjoy!

Welcome to **Supreme Lottery** - Your complete lottery ticket management system!

**Happy Lottery! 🍀**

---

*Last Updated: January 2026*
*Version: 1.0.0 (Production Ready)*
