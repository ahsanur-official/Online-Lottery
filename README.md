# 🎰 Golden Lottery BD - Bangladesh Lottery System

> A complete, professional lottery ticketing system built for Bangladesh with unique 10-digit ticket numbers, 1 BDT pricing, 7 prize tiers, and Bangladesh payment methods.

## ✨ Features

### 🎫 Ticket System
- ✅ **10-digit unique ticket numbers** - Auto-generated, no duplicates
- ✅ **1 BDT per ticket** - Affordable pricing
- ✅ **Bulk purchase** - Buy 1 to 100 tickets at once
- ✅ **Multiple unique numbers** - Each ticket gets different 10-digit number

### 💰 Pricing & Rewards
- ✅ **7 Prize Tiers** per draw:
  - 🥇 10,000 BDT (1 winner)
  - 🥈 5,000 BDT (1 winner)
  - 🥉 1,000 BDT (5 winners)
- ✅ **Total pool**: 22,000 BDT weekly

### 📅 Schedule
- ✅ **Draw Day**: Every Friday
- ✅ **Draw Time**: 8:00 PM (20:00)
- ✅ **Prize Distribution**: Within 24 hours
- ✅ **Purchase Window**: Saturday 10 AM - Friday 6 PM

### 💳 Payment Methods (Bangladesh)
- ✅ **bKash** 📱 - Mobile banking
- ✅ **Nagad** 📲 - Mobile money service
- ✅ **Rocket** 🚀 - Dutch-Bangla Bank service

### 📊 Ticket Management
- ✅ **Complete History** - All tickets displayed
- ✅ **Filter Views** - All / Current / Past tickets
- ✅ **Detailed Info** - Number, date, status, prize
- ✅ **Winner Display** - By username with prize amount

### 🎨 User Experience
- ✅ **Dark/Light Mode** - Professional theme switcher with animations
- ✅ **Responsive Design** - Mobile, tablet, desktop
- ✅ **Smooth Animations** - Beautiful page transitions
- ✅ **Real-time Validation** - Purchase window checks

## 🛠️ Technologies Used

- **HTML5** - Structure
- **CSS3** - Advanced animations, glassmorphism, gradients
- **JavaScript (Vanilla)** - Unique ticket generation, time validation
- **LocalStorage** - Data persistence
- **Google Fonts (Poppins)** - Typography

## 📂 Project Structure

```
Lottery/
├── HTML/
│   ├── index.html              # Home page (BD branding)
│   ├── buy-ticket.html         # Ticket purchase interface
│   ├── dashboard.html          # User dashboard
│   ├── profile.html            # Account management
│   ├── login.html              # Login page
│   └── register.html           # Registration
├── STYLES/
│   └── style.css               # Animations & styling (1400+ lines)
├── BACKEND/
│   ├── script.js               # Core functionality
│   ├── buy-ticket.js           # Unique ticket system (350+ lines)
│   ├── dashboard.js            # Dashboard features (272 lines)
│   └── profile.js              # Profile management
└── DOCUMENTATION/
    ├── README.md               # This file
    ├── IMPLEMENTATION_SUMMARY.md
    ├── BANGLADESH_LOTTERY_SYSTEM.md
    └── THEME_SWITCHER_GUIDE.md
```

## 🚀 Quick Start

### 1. Open Website
```
Open: HTML/index.html in browser
```

### 2. Register
- Click "Register Now"
- Enter name, email, password
- Account created instantly

### 3. Buy Tickets
- Click "Buy Tickets"
- Select lottery game
- Choose quantity (1-100)
- Pick payment method
- Confirm purchase
- Get unique ticket numbers

### 4. Check Dashboard
- View all your tickets
- See ticket history with filters
- Check recent winners
- Track winnings

## 💡 Key Numbers

| Item | Value |
|------|-------|
| Ticket Price | 1 BDT |
| Min Purchase | 1 ticket |
| Max Purchase | 100 tickets |
| Prize Pool | 22,000 BDT/week |
| Total Winners | 7 per draw |
| Ticket Format | 10-digit unique |
| Draw Day | Friday |
| Draw Time | 8:00 PM |
| Prize Distribution | 24 hours |

## 🏆 Prize System

Every Friday 8 PM draw awards:

```
🥇 MEGA PRIZE     10,000 BDT → 1 winner
🥈 MAJOR PRIZE     5,000 BDT → 1 winner  
🥉 MINI PRIZES     1,000 BDT → 5 winners
                  ─────────────
                  22,000 BDT total
```

**Winners announced by username** (e.g., @lucky_one won 10,000 BDT)

## 📱 Payment Methods

### bKash (📱)
- Mobile banking service
- Easy deposit/withdrawal
- Instant transactions

### Nagad (📲)
- Mobile money platform
- Wide merchant network
- Secure payments

### Rocket (🚀)
- Dutch-Bangla Bank service
- Bank-backed security
- Reliable transfers

## 🕒 Purchase Schedule

### When Can You Buy?

```
📅 SATURDAY: 10:00 AM onwards
📅 SUNDAY: All day (10 AM - Midnight)
📅 MONDAY: All day (10 AM - Midnight)
📅 TUESDAY: All day (10 AM - Midnight)
📅 WEDNESDAY: All day (10 AM - Midnight)
📅 THURSDAY: All day (10 AM - Midnight)
📅 FRIDAY: Until 6:00 PM

🔴 CLOSED: Friday 6 PM - Saturday 10 AM
```

## 🎯 Unique Ticket Generation

### How It Works

```javascript
// Each ticket gets unique 10-digit number
// Range: 1,000,000,000 to 9,999,999,999

// Example Purchase:
User buys 3 tickets
  ↓
System generates:
  • 5834729165
  • 9274618354
  • 1928374651
  ↓
All stored in localStorage
All unique (no duplicates possible)
```

## 📊 Dashboard Features

### Statistics
- Total tickets bought
- Total wins
- Total spent (BDT)
- Total won (BDT)
- Pending draws

### Ticket History Tabs
- **All** - Complete history
- **Current** - Pending draws
- **Past** - Completed draws

### Each Ticket Shows
- 10-digit unique number
- Lottery name
- Purchase date & time
- Draw date & time
- Status (pending/won/lost)
- Prize amount (if won)
- Payment method

### Recent Winners
- Username of winner
- Prize amount
- Draw date & time
- Multiple winners per draw

## 💾 Data Storage

All data persists in localStorage:
- **users** - User accounts and profiles
- **currentUser** - Active session
- **tickets** - All purchased tickets (with unique numbers)
- **draws** - Upcoming Friday 8 PM draws
- **results** - Past draw results and winners
- **updates** - Announcements
- **theme** - Dark/light mode preference

## 🎨 Design & Aesthetics

### Color Scheme
- Primary: Purple gradient (#667eea → #764ba2)
- Secondary: Pink gradient (#f093fb → #f5576c)
- Gold accents (#ffd89b)
- Bangladesh theme with national colors

### Animations
- Theme toggle 3D spin effect
- Page blur transitions
- Icon float animations
- Glassmorphism effects
- Smooth color transitions
- Professional hover states

### Responsive Design
- Desktop (1024px+): Full features
- Tablet (768px-1024px): Optimized layout
- Mobile (<768px): Touch-friendly
- Small mobile (<480px): Compact view

## 🔐 Security Features

- ✅ Unique tickets - No duplicates possible
- ✅ User isolation - Only see your tickets
- ✅ Time validation - Purchase window enforced
- ✅ Transaction tracking - Every purchase logged
- ✅ LocalStorage - Data secured locally
- ✅ Password confirmation - On registration
- ✅ Session management - Persistent login

## 📱 Pages

1. **index.html** - Landing page with BD branding
2. **buy-ticket.html** - Ticket purchase interface
3. **dashboard.html** - Ticket history and winners
4. **profile.html** - Account settings
5. **login.html** - User login
6. **register.html** - New account creation

## 🌟 Implemented Features

✅ Unique 10-digit ticket numbers  
✅ 1 BDT ticket pricing  
✅ Multiple ticket purchase (1-100)  
✅ 7 prize tiers (10K, 5K, 1K×5)  
✅ bKash, Nagad, Rocket payment  
✅ Friday 8 PM draws  
✅ Saturday 10 AM - Friday 6 PM purchase window  
✅ Winner announcement by username  
✅ Complete ticket history with filtering  
✅ Real-time purchase validation  
✅ Transaction tracking  
✅ Prize distribution info  
✅ Professional UI/UX  
✅ Dark/Light modes  
✅ Responsive design  
✅ Smooth animations  

## 📚 Documentation

- [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) - Complete verification checklist
- [BANGLADESH_LOTTERY_SYSTEM.md](BANGLADESH_LOTTERY_SYSTEM.md) - Technical system guide
- [THEME_SWITCHER_GUIDE.md](THEME_SWITCHER_GUIDE.md) - Dark mode documentation

## 📝 Important Information

- **Currency**: Bangladeshi Taka (BDT) 🇧🇩
- **Draw Schedule**: Every Friday 8 PM
- **Next Draw**: Check home page for exact time
- **Prize Distribution**: Within 24 hours of draw
- **Tickets Valid Until**: Draw time on Friday
- **Support**: In-app notifications

## 🎉 Ready to Play?

1. Open `HTML/index.html`
2. Register new account
3. Buy lottery tickets
4. Check dashboard
5. Win amazing prizes!

---

**Version**: 2.0 (Bangladesh Edition)  
**Status**: ✅ Fully Implemented  
**Last Updated**: 2025  
**System**: Golden Lottery BD  
**Location**: Bangladesh  

**Play Responsibly** ✨  
*Golden Lottery BD - Your Luck Awaits!* 🎰
