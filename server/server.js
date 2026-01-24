import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (for IMAGES, etc.)
app.use('/images', express.static(path.join(__dirname, '../IMAGES')));

// Initialize data storage (in-memory for now, can be replaced with DB)
let users = [];
let tickets = [];
let draws = [];

// Helper functions for data
function initializeData() {
  if (users.length === 0) {
    users = [
      { id: 1, username: 'test', email: 'test@example.com', password: 'test123', name: 'Test User' }
    ];
  }
  
  if (draws.length === 0) {
    draws = [
      {
        id: 1,
        name: 'National Lottery',
        drawDate: '2024-02-01',
        prize: 500000,
        ticketPrice: 100,
        drawTime: '18:00'
      },
      {
        id: 2,
        name: 'Mega Jackpot',
        drawDate: '2024-02-05',
        prize: 1000000,
        ticketPrice: 200,
        drawTime: '20:00'
      }
    ];
  }
}

// Routes

// GET all draws
app.get('/api/draws', (req, res) => {
  initializeData();
  res.json(draws);
});

// GET all users (for testing)
app.get('/api/users', (req, res) => {
  initializeData();
  res.json(users);
});

// POST - Create new user
app.post('/api/auth/register', (req, res) => {
  const { username, email, password, name } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }
  
  if (users.find(u => u.username === username || u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  const newUser = {
    id: users.length + 1,
    username,
    email,
    password, // In production, hash this!
    name: name || username
  };
  
  users.push(newUser);
  res.status(201).json({ message: 'User created', user: newUser });
});

// POST - Login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => (u.username === username || u.email === username) && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  res.json({ message: 'Login successful', user });
});

// POST - Buy ticket
app.post('/api/tickets/buy', (req, res) => {
  const { userId, drawId, numbers, bonusNumber, quantity } = req.body;
  
  if (!userId || !drawId || !numbers) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  const draw = draws.find(d => d.id === drawId);
  if (!draw) {
    return res.status(404).json({ message: 'Draw not found' });
  }
  
  const newTickets = [];
  for (let i = 0; i < (quantity || 1); i++) {
    newTickets.push({
      id: tickets.length + 1,
      userId,
      drawId,
      numbers,
      bonusNumber,
      purchaseDate: new Date().toISOString(),
      status: 'pending'
    });
    tickets.push(newTickets[i]);
  }
  
  res.status(201).json({ message: 'Tickets purchased', tickets: newTickets });
});

// GET user tickets
app.get('/api/tickets/:userId', (req, res) => {
  const { userId } = req.params;
  const userTickets = tickets.filter(t => t.userId === parseInt(userId));
  res.json(userTickets);
});

// GET all tickets
app.get('/api/tickets', (req, res) => {
  res.json(tickets);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  initializeData();
});
