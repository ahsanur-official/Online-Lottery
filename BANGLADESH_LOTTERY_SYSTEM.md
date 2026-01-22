# 🎰 Golden Lottery BD - Complete System Guide

## Overview
A complete Bangladesh lottery ticketing system with unique 10-digit ticket numbers, 1 BDT pricing, 7 prize tiers, and multiple payment methods.

---

## ✨ Key Features Implemented

### 1. **Unique Ticket Generation**
- **10-digit ticket numbers**: Range from 1,000,000,000 to 9,999,999,999
- **Duplicate prevention**: System checks all existing tickets before generation
- **Automatic assignment**: Each ticket purchase gets a unique number
- **Format**: Plain 10-digit number (e.g., 5834729165)

### 2. **Ticket Pricing & Purchase**
- **Price**: 1 BDT per ticket (Bangladeshi Taka)
- **Quantity**: Can buy 1 to 100 tickets at once
- **Each ticket**: Gets its own unique 10-digit number
- **Purchase window**:
  - **Start**: Saturday 10:00 AM
  - **End**: Friday 6:00 PM
  - **Auto-closed**: Friday 6 PM to Saturday 10 AM

### 3. **Prize Structure (7 Winners Per Draw)**
```
🥇 1st Prize:  10,000 BDT (1 winner)
🥈 2nd Prize:   5,000 BDT (1 winner)
🥉 3rd Prize:   1,000 BDT (5 winners)
─────────────────────────────
Total Prizes:  22,000 BDT per draw
```

### 4. **Payment Methods**
- 📱 **bKash** - Mobile banking
- 📲 **Nagad** - Mobile money service
- 🚀 **Rocket** - Dutch-Bangla Bank service

### 5. **Draw Schedule**
- **Day**: Every Friday
- **Time**: 8:00 PM (20:00)
- **Announcement**: Winners announced by profile username
- **Distribution**: Prize money within 24 hours

### 6. **Ticket History & Management**
Shows three views:
- **All Tickets**: Complete history
- **Current/Pending**: Tickets awaiting draw
- **Past**: Completed draws (won/lost)

Each ticket displays:
- 10-digit ticket number
- Lottery name
- Purchase date & time
- Draw date
- Status (pending/won/lost)
- Prize amount (if won)
- Payment method used
- Transaction ID

### 7. **Winner Announcement**
- Winners displayed by **profile username**
- Prize amount shown next to each winner
- Draw date and time displayed
- Recent winners section shows all recent draws

---

## 📁 File Structure & Changes

### HTML Pages
```
HTML/
├── index.html
│   └── Updated with Bangladesh lottery info, prize structure, schedules
├── buy-ticket.html
│   └── Redesigned for 1 BDT system, payment methods, draw info
├── dashboard.html
│   └── (Unchanged - uses updated JS)
├── profile.html
│   └── (Unchanged - uses updated JS)
├── login.html
│   └── (Unchanged)
└── register.html
    └── (Unchanged)
```

### JavaScript Files
```
BACKEND/
├── script.js
│   └── Updated draws data for Bangladesh lottery
├── buy-ticket.js
│   └── Complete rewrite for new system:
│       - Unique 10-digit ticket generation
│       - 1 BDT pricing
│       - Payment methods (bKash, Nagad, Rocket)
│       - Purchase time validation
│       - Multiple ticket purchase
│       - Winner display
├── dashboard.js
│   └── Enhanced with:
│       - Ticket history filtering
│       - Winner information display
│       - Current/Past ticket views
└── profile.js
    └── (Unchanged)
```

### CSS
```
STYLES/
└── style.css
    └── (Already contains all needed styles)
```

---

## 🔧 Technical Implementation

### Unique Ticket Generation Algorithm
```javascript
function generateUniqueTicketNumber() {
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    let ticketNumber;
    let exists = true;
    
    while (exists) {
        // Generate random 10-digit number
        ticketNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
        
        // Check if it already exists
        exists = tickets.some(t => t.ticketNumber === ticketNumber);
    }
    
    return ticketNumber;
}
```

### Ticket Object Structure
```javascript
{
    id: Date.now() + i,
    userId: user.id,
    username: user.username,
    ticketNumber: 5834729165,           // 10-digit unique number
    lottery: 'mega',
    lotteryName: 'Mega Fortune',
    price: 1,                           // 1 BDT
    purchaseDate: 'Jan 23, 2026',
    purchaseTime: '2:30:45 PM',
    drawDate: 'Jan 24, 2026 at 8 PM',
    drawDay: 5,                         // Friday
    drawTime: '20:00',
    status: 'pending',                  // pending, won, lost
    prizeWon: null,                     // 10000, 5000, 1000, etc
    paymentMethod: 'bkash',             // bkash, nagad, rocket
    transactionId: 'TXN...'
}
```

### Purchase Time Validation
```javascript
function checkPurchaseAvailability() {
    const now = new Date();
    const day = now.getDay();           // 0=Sun, 5=Fri, 6=Sat
    const hour = now.getHours();
    
    // Saturday: 10 AM onwards
    // Mon-Thu: All day
    // Friday: Until 6 PM
    // Sunday: From 10 AM
}
```

---

## 💾 LocalStorage Data Structure

### Draws Data
```json
{
    "id": 1,
    "name": "Mega Fortune",
    "prize": "🏆 10,000 to 1,000 BDT",
    "date": "Next Friday 8 PM",
    "price": 1,
    "type": "mega",
    "poolSize": 500000,
    "status": "upcoming",
    "country": "Bangladesh"
}
```

### Results Data
```json
{
    "id": 1,
    "lottery": "Mega Fortune",
    "drawDate": "Jan 17, 2026",
    "drawTime": "8:00 PM",
    "winners": [
        {
            "ticketNumber": "5834729165",
            "prize": 10000,
            "username": "lucky_one"
        }
    ]
}
```

### Tickets Data
Stored in localStorage under 'tickets' key (array of ticket objects)

---

## 🎯 User Journey

### 1. **Registration**
- User creates account with email, password, name
- Account stored in localStorage

### 2. **Browse Lottery**
- View home page with prize structure
- See upcoming draws and recent winners
- Check purchase window status

### 3. **Buy Tickets**
- Select lottery game (4 options)
- Choose quantity (1-100)
- Select payment method (bKash, Nagad, Rocket)
- Each ticket gets unique 10-digit number
- Purchase confirmed with receipt

### 4. **Track Tickets**
- Dashboard shows all tickets
- Filter by All/Current/Past
- View ticket details (number, date, status)
- See prize if won

### 5. **Check Winners**
- View recent draw winners
- See profile names of winners
- Check prize amounts
- Distribution status

---

## 📊 Statistics Tracked

### Per User
- Total tickets purchased
- Total amount spent (BDT)
- Total winnings
- Number of wins
- Pending draws

### System-wide
- Total tickets sold per draw
- Prize distribution records
- Winner announcements
- Draw history

---

## 🔒 Security Features

1. **Unique ticket validation** - No duplicates allowed
2. **User isolation** - Each user only sees their tickets
3. **LocalStorage persistence** - Data saved locally
4. **Transaction tracking** - Each purchase has unique ID
5. **Time-based validation** - Purchase window enforced

---

## 🎨 UI Elements

### Payment Method Buttons
- bKash (📱)
- Nagad (📲)
- Rocket (🚀)

### Prize Display
- Gradient background for visual appeal
- Clear prize tier information
- Winner names highlighted

### Ticket Cards
- Unique number prominently displayed
- Status indicator (pending/won/lost)
- Purchase and draw date information
- Prize amount if won

---

## 📱 Responsive Design

- **Desktop (1024px+)**: Full layout, all features visible
- **Tablet (768px-1024px)**: Optimized for touch
- **Mobile (<768px)**: Hamburger menu, stacked layout
- **Small Mobile (<480px)**: Compact view

---

## 🚀 How to Use

### For End Users
1. Open website
2. Register/Login
3. Go to "Buy Tickets"
4. Select a lottery game
5. Choose quantity (1-100)
6. Select payment method
7. Confirm purchase
8. Go to dashboard to view tickets
9. Check results on home page

### For Administrators
Access data from browser console:
```javascript
// View all tickets
JSON.parse(localStorage.getItem('tickets'))

// View results
JSON.parse(localStorage.getItem('results'))

// View users
JSON.parse(localStorage.getItem('users'))

// Clear data (reset)
localStorage.clear()
```

---

## 🧪 Test Scenarios

### Scenario 1: Buy Tickets
1. Login with test account
2. Buy 5 tickets from "Mega Fortune"
3. Verify each has unique 10-digit number
4. Check they appear in dashboard
5. Confirm payment method saved

### Scenario 2: Check Purchase Window
1. Test on different days/times
2. Saturday 10 AM - Should allow
3. Friday 6 PM - Should block
4. Sunday 5 AM - Should block
5. Monday - Should allow

### Scenario 3: View Winners
1. Check home page winners
2. Verify usernames displayed
3. Check prize amounts
4. Confirm draw dates

---

## 🎯 Future Enhancements

- [ ] Backend API integration
- [ ] Email notifications for draws
- [ ] SMS alerts via Rocket/Nagad
- [ ] Referral system
- [ ] Seasonal promotions
- [ ] Mobile app version
- [ ] Admin dashboard
- [ ] Real-time draw animations

---

## ⚙️ Configuration

All settings in `buy-ticket.js` constants:
```javascript
const TICKET_PRICE = 1;         // 1 BDT
const MAX_TICKETS = 100;        // Max buy at once
const DRAW_DAY = 5;             // Friday
const DRAW_TIME = '20:00';      // 8 PM
const PURCHASE_START = 10;      // 10 AM Saturday
const PURCHASE_END = 18;        // 6 PM Friday
```

---

## 📞 Support Information

**Draw Day**: Every Friday  
**Draw Time**: 8:00 PM  
**Prize Distribution**: Within 24 hours  
**Ticket Price**: 1 BDT  
**Payment Methods**: bKash, Nagad, Rocket  

---

**Version**: 1.0  
**Last Updated**: January 23, 2026  
**Currency**: Bangladeshi Taka (BDT)  
**Country**: Bangladesh 🇧🇩
