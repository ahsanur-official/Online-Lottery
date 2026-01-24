/**
 * Data Initialization for Supreme Lottery
 * This file contains the default/sample data structure for localStorage
 * 
 * Usage: 
 * - Copy and paste into browser console for quick initialization
 * - Or call initializeDefaultData() from your React component
 */

// Initialize default data in localStorage
function initializeDefaultData() {
  // Default Draws
  const defaultDraws = [
    { 
      id: 1, 
      name: 'Mega Fortune', 
      icon: '🏆', 
      prize: '10,000 BDT', 
      price: 1, 
      type: 'mega',
      poolSize: 49,
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Power Win', 
      icon: '⚡', 
      prize: '10,000 BDT', 
      price: 1, 
      type: 'power',
      poolSize: 49,
      status: 'active'
    },
    { 
      id: 3, 
      name: 'Daily Gold', 
      icon: '🌟', 
      prize: '10,000 BDT', 
      price: 1, 
      type: 'daily',
      poolSize: 49,
      status: 'active'
    },
    { 
      id: 4, 
      name: 'Diamond Draw', 
      icon: '💎', 
      prize: '10,000 BDT', 
      price: 1, 
      type: 'instant',
      poolSize: 49,
      status: 'active'
    }
  ];

  // Default Results
  const defaultResults = [
    {
      id: 1,
      lottery: 'Mega Fortune',
      drawDate: 'Jan 17, 2026',
      drawTime: '8:00 PM',
      winners: [
        { ticketNumber: '5834729165', prize: 10000, username: 'lucky_one' },
        { ticketNumber: '9274618354', prize: 5000, username: 'fortune_seeker' },
        { ticketNumber: '1928374651', prize: 1000, username: 'golden_player' },
        { ticketNumber: '4739284651', prize: 500, username: 'dreamer_soul' },
        { ticketNumber: '2938475618', prize: 250, username: 'hopeful_heart' }
      ]
    },
    {
      id: 2,
      lottery: 'Power Win',
      drawDate: 'Jan 10, 2026',
      drawTime: '8:00 PM',
      winners: [
        { ticketNumber: '4729183654', prize: 10000, username: 'dhaka_lucky' },
        { ticketNumber: '8374619283', prize: 5000, username: 'chittagong_star' },
        { ticketNumber: '6293847561', prize: 1000, username: 'sylhet_winner' }
      ]
    },
    {
      id: 3,
      lottery: 'Daily Gold',
      drawDate: 'Jan 23, 2026',
      drawTime: '8:00 PM',
      winners: [
        { ticketNumber: '3847562918', prize: 5000, username: 'daily_faithful' },
        { ticketNumber: '9182736455', prize: 2500, username: 'gold_digger' }
      ]
    }
  ];

  // Default Updates
  const defaultUpdates = [
    { 
      id: 1, 
      date: 'Jan 23, 2026', 
      title: '🎉 New Mega Jackpot Alert!', 
      content: 'The Mega Millions jackpot has reached ৳500 million! Don\'t miss your chance to win big. Buy your tickets now!' 
    },
    { 
      id: 2, 
      date: 'Jan 22, 2026', 
      title: '⚡ Flash Sale on Tickets', 
      content: 'Get 20% off on all PowerBall Plus tickets today only! Limited time offer.' 
    },
    { 
      id: 3, 
      date: 'Jan 21, 2026', 
      title: '🏆 Record Breaking Winner!', 
      content: 'Congratulations to our latest winner who won ৳50,000 in the Daily Gold lottery. Could you be next?' 
    }
  ];

  // Sample Users (for testing)
  const sampleUsers = [
    {
      id: 1,
      name: 'Demo User',
      email: 'demo@example.com',
      username: 'demo',
      password: 'demo123',
      createdAt: new Date().toLocaleDateString(),
      spent: 50,
      phone: '+880-1XXXXXXXXX',
      address: 'Dhaka, Bangladesh',
      preferences: { emailNotif: true, smsNotif: false, promoNotif: true }
    }
  ];

  // Sample Tickets (for demo)
  const sampleTickets = [
    {
      id: 1,
      userId: 1,
      username: 'demo',
      ticketNumber: 1234567890,
      lottery: 'mega',
      lotteryName: 'Mega Fortune',
      price: 1,
      purchaseDate: new Date().toLocaleDateString(),
      purchaseTime: new Date().toLocaleTimeString(),
      drawDate: 'Next Friday 8 PM',
      status: 'pending',
      prizeWon: null,
      paymentMethod: 'bkash',
      transactionId: 'TXN12345ABCDE'
    }
  ];

  // Set localStorage items
  if (!localStorage.getItem('draws')) {
    localStorage.setItem('draws', JSON.stringify(defaultDraws));
    console.log('✅ Initialized draws');
  }

  if (!localStorage.getItem('results')) {
    localStorage.setItem('results', JSON.stringify(defaultResults));
    console.log('✅ Initialized results');
  }

  if (!localStorage.getItem('updates')) {
    localStorage.setItem('updates', JSON.stringify(defaultUpdates));
    console.log('✅ Initialized updates');
  }

  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(sampleUsers));
    console.log('✅ Initialized sample users');
  }

  if (!localStorage.getItem('tickets')) {
    localStorage.setItem('tickets', JSON.stringify(sampleTickets));
    console.log('✅ Initialized sample tickets');
  }

  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'light');
    console.log('✅ Initialized theme setting');
  }

  console.log('🎉 All data initialized successfully!');
  console.log('📝 Sample credentials: demo / demo123');
}

// Clear all app data
function clearAllData() {
  const keys = ['draws', 'results', 'updates', 'users', 'tickets', 'currentUser', 'theme'];
  keys.forEach(key => localStorage.removeItem(key));
  console.log('🧹 All app data cleared');
}

// View all app data
function viewAllData() {
  console.log('📊 Current App Data:');
  console.log('Users:', JSON.parse(localStorage.getItem('users') || '[]'));
  console.log('Tickets:', JSON.parse(localStorage.getItem('tickets') || '[]'));
  console.log('Draws:', JSON.parse(localStorage.getItem('draws') || '[]'));
  console.log('Results:', JSON.parse(localStorage.getItem('results') || '[]'));
  console.log('Updates:', JSON.parse(localStorage.getItem('updates') || '[]'));
  console.log('Current User:', JSON.parse(localStorage.getItem('currentUser') || 'null'));
}

// Add sample won ticket
function addSampleWonTicket() {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.length === 0) {
    console.log('❌ No users found. Create a user first.');
    return;
  }

  const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
  const newTicket = {
    id: Date.now(),
    userId: users[0].id,
    username: users[0].username,
    ticketNumber: 9876543210,
    lottery: 'power',
    lotteryName: 'Power Win',
    price: 1,
    purchaseDate: '01/17/2026',
    purchaseTime: '3:45 PM',
    drawDate: '01/17/2026',
    status: 'won',
    prizeWon: 10000,
    paymentMethod: 'nagad',
    transactionId: 'TXN98765ZYXWV'
  };

  tickets.push(newTicket);
  localStorage.setItem('tickets', JSON.stringify(tickets));
  console.log('✅ Sample won ticket added:', newTicket);
}

// Quick start guide
function quickStart() {
  console.log(`
  ╔════════════════════════════════════════════════════════════╗
  ║     🎰 SUPREME LOTTERY - QUICK START GUIDE 🎰              ║
  ╚════════════════════════════════════════════════════════════╝

  📝 AVAILABLE COMMANDS:

  1. Initialize all default data:
     initializeDefaultData()

  2. View all app data:
     viewAllData()

  3. Add a sample won ticket:
     addSampleWonTicket()

  4. Clear all data:
     clearAllData()

  5. Show this help again:
     quickStart()

  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  🔓 DEMO CREDENTIALS:
    Username: demo
    Password: demo123

  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  🚀 GETTING STARTED:

  1. Open Browser Console (F12 or Ctrl+Shift+I)
  2. Run: initializeDefaultData()
  3. Refresh the page
  4. Login with demo credentials
  5. Explore all features!

  ╚════════════════════════════════════════════════════════════╝
  `);
}

// Run quick start on load
console.log('\n🎰 Supreme Lottery Console Tools Available\n');
quickStart();
