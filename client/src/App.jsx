import { useState, useEffect } from 'react'
import './App.css'
import { DashboardPage, BuyTicketPage, MyTicketsPage, ResultsPage, ProfilePage } from './pages'

// Alert system
function showAlert(type, title, message, duration = 3500) {
  const alerts = document.querySelector('.alert-container') || (() => {
    const container = document.createElement('div')
    container.className = 'alert-container'
    document.body.appendChild(container)
    return container
  })()
  
  const alert = document.createElement('div')
  alert.className = `alert alert-${type}`
  alert.innerHTML = `
    <div class="alert-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️'}</div>
    <div class="alert-content">
      <div class="alert-title">${title}</div>
      <div class="alert-message">${message}</div>
    </div>
    <div class="alert-close" onclick="this.parentElement.remove()">✕</div>
    <div class="alert-progress"></div>
  `
  alerts.appendChild(alert)
  
  if (duration > 0) {
    setTimeout(() => alert.remove(), duration)
  }
}

const LOTTERIES = [
  { id: 1, name: 'Mega Fortune', icon: '🏆', prize: '10,000 BDT', price: 1, type: 'mega' },
  { id: 2, name: 'Power Win', icon: '⚡', prize: '10,000 BDT', price: 1, type: 'power' },
  { id: 3, name: 'Daily Gold', icon: '🌟', prize: '10,000 BDT', price: 1, type: 'daily' },
  { id: 4, name: 'Diamond Draw', icon: '💎', prize: '10,000 BDT', price: 1, type: 'instant' }
]

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [darkMode, setDarkMode] = useState(false)
  const [user, setUser] = useState(null)
  const [alerts, setAlerts] = useState([])

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setDarkMode(true)
      document.body.classList.add('dark-mode')
    }
  }, [])

  // Toggle theme
  const toggleTheme = () => {
    setDarkMode(!darkMode)
    document.body.classList.toggle('dark-mode')
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light')
  }

  // Check if user is logged in
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      setUser(JSON.parse(currentUser))
    }
  }, [])

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    setUser(null)
    setCurrentPage('home')
    showAlert('success', '👋 Logged Out', 'You have been logged out successfully!', 2000)
  }

  return (
    <div className="app">
      {user ? (
        <div className="app-layout">
          <header className="header">
            <div className="logo">
              <img src="/IMAGES/Supreme Lottery.png" alt="Supreme Lottery" />
              <h1 className="gradient-text">Supreme Lottery</h1>
            </div>
            <nav className="nav">
              <ul>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home') }} className={currentPage === 'home' ? 'nav-link active' : 'nav-link'}>Home</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('dashboard') }} className={currentPage === 'dashboard' ? 'nav-link active' : 'nav-link'}>Dashboard</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('buy-ticket') }} className={currentPage === 'buy-ticket' ? 'nav-link active' : 'nav-link'}>Buy Tickets</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('my-tickets') }} className={currentPage === 'my-tickets' ? 'nav-link active' : 'nav-link'}>My Tickets</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('results') }} className={currentPage === 'results' ? 'nav-link active' : 'nav-link'}>Results</a></li>
              </ul>
            </nav>
            <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
              <span className="theme-icon">{darkMode ? '☀️' : '🌙'}</span>
            </button>
            <div className="user-profile">
              <div className="profile-icon">{user?.name?.charAt(0).toUpperCase() || 'U'}</div>
              <div className="dropdown">
                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('profile') }}>⚙️ Account Setup</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleLogout() }}>🚪 Logout</a>
              </div>
            </div>
          </header>

          <main className="main-content">
            {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
            {currentPage === 'dashboard' && <DashboardPage />}
            {currentPage === 'buy-ticket' && <BuyTicketPage user={user} showAlert={showAlert} />}
            {currentPage === 'my-tickets' && <MyTicketsPage />}
            {currentPage === 'results' && <ResultsPage />}
            {currentPage === 'profile' && <ProfilePage user={user} setUser={setUser} showAlert={showAlert} />}
          </main>

          <footer className="footer">
            <p>&copy; 2024 Supreme Lottery. All rights reserved.</p>
          </footer>
        </div>
      ) : (
        <LoginPage setUser={setUser} setCurrentPage={setCurrentPage} toggleTheme={toggleTheme} darkMode={darkMode} showAlert={showAlert} />
      )}
    </div>
  )
}

// Page Components
function LoginPage({ setUser, setCurrentPage, toggleTheme, darkMode, showAlert }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [fullname, setFullname] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (isRegister) {
      // Register
      if (password !== confirmPassword) {
        showAlert('error', '❌ Password Mismatch', 'Passwords do not match!', 0)
        return
      }
      if (password.length < 6) {
        showAlert('warning', '⚠️ Weak Password', 'Password must be at least 6 characters long!', 0)
        return
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]')
      if (users.some(u => u.email === email)) {
        showAlert('warning', '⚠️ Email Already Registered', 'This email is already registered! Please login instead.', 0)
        return
      }

      const newUser = {
        id: Date.now(),
        name: fullname,
        email: email,
        username: email.split('@')[0],
        password: password,
        createdAt: new Date().toISOString(),
        spent: 0
      }

      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))
      localStorage.setItem('currentUser', JSON.stringify({ id: newUser.id, name: newUser.name, email: newUser.email, username: newUser.username }))
      setUser(newUser)
      showAlert('success', '✅ Welcome Aboard!', 'Registration successful! Welcome to Golden Lottery BD!', 2000)
      setTimeout(() => setCurrentPage('home'), 2000)
    } else {
      // Login
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find(u => (u.username === username || u.email === username) && u.password === password)

      if (user) {
        localStorage.setItem('currentUser', JSON.stringify({ id: user.id, name: user.name, email: user.email, username: user.username }))
        setUser(user)
        showAlert('success', '✅ Login Successful', 'Welcome back! Redirecting to dashboard...', 2000)
        setTimeout(() => setCurrentPage('home'), 2000)
      } else {
        showAlert('error', '❌ Login Failed', 'Invalid credentials. Please try again or register a new account.', 0)
      }
    }
  }

  return (
    <div className="auth-form-container">
      <button className="auth-theme-toggle" onClick={toggleTheme} title="Toggle Theme">
        <span className="theme-icon">{darkMode ? '☀️' : '🌙'}</span>
      </button>
      <div className="auth-form-content">
        <img src="/IMAGES/Supreme Lottery.png" alt="Supreme Lottery" className="auth-logo" />
        <h2>{isRegister ? '🎟️ Create Account' : '🔐 Welcome Back!'}</h2>
        <p>{isRegister ? 'Join our community' : 'Login to continue your winning streak'}</p>
        
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input 
              type="text" 
              placeholder="Full Name" 
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          )}
          <input 
            type="text" 
            placeholder={isRegister ? "Username or Email" : "Username or Email"} 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {isRegister && (
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {isRegister && (
            <input 
              type="password" 
              placeholder="Confirm Password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
          <button type="submit" className="btn-primary">{isRegister ? 'Register' : 'Login'}</button>
        </form>
        
        <p>
          {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          <a href="#" onClick={(e) => { e.preventDefault(); setIsRegister(!isRegister); setUsername(''); setPassword(''); setEmail(''); setFullname(''); setConfirmPassword('') }} style={{color: 'var(--primary-color)'}}>
            {isRegister ? 'Login' : 'Register Now'}
          </a>
        </p>
      </div>
    </div>
  )
}

function HomePage({ setCurrentPage }) {
  const [draws, setDraws] = useState([])
  const [results, setResults] = useState([])

  useEffect(() => {
    // Load draws
    const drawsData = JSON.parse(localStorage.getItem('draws') || '[]')
    if (drawsData.length === 0) {
      const defaultDraws = [
        { id: 1, name: 'Mega Fortune', prize: '🏆 10,000 BDT', date: 'Next Friday 8 PM', price: 1, type: 'mega', poolSize: 500000, status: 'upcoming', country: 'Bangladesh' },
        { id: 2, name: 'Power Win', prize: '⚡ 10,000 BDT', date: 'Next Friday 8 PM', price: 1, type: 'power', poolSize: 500000, status: 'upcoming', country: 'Bangladesh' },
        { id: 3, name: 'Daily Gold', prize: '🌟 10,000 BDT', date: 'Next Friday 8 PM', price: 1, type: 'daily', poolSize: 500000, status: 'upcoming', country: 'Bangladesh' },
        { id: 4, name: 'Diamond Draw', prize: '💎 10,000 BDT', date: 'Next Friday 8 PM', price: 1, type: 'instant', poolSize: 500000, status: 'upcoming', country: 'Bangladesh' }
      ]
      localStorage.setItem('draws', JSON.stringify(defaultDraws))
      setDraws(defaultDraws)
    } else {
      setDraws(drawsData)
    }

    // Load results
    const resultsData = JSON.parse(localStorage.getItem('results') || '[]')
    setResults(resultsData)
  }, [])

  return (
    <div className="main-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">🎰 Welcome to Supreme Lottery</h1>
          <p className="hero-subtitle">Your chance to win big in Bangladesh!</p>
        </div>
      </div>

      <section className="quick-actions">
        <h2 className="section-title">Quick Actions</h2>
        <div className="action-grid">
          <div className="action-card" onClick={() => setCurrentPage('buy-ticket')}>
            <span className="action-icon">🎫</span>
            <h3>Buy Tickets</h3>
            <p>Select your lucky numbers and purchase tickets</p>
          </div>
          <div className="action-card" onClick={() => setCurrentPage('results')}>
            <span className="action-icon">📊</span>
            <h3>Check Results</h3>
            <p>View latest lottery draw results</p>
          </div>
          <div className="action-card" onClick={() => setCurrentPage('my-tickets')}>
            <span className="action-icon">👤</span>
            <h3>My Tickets</h3>
            <p>Track your purchased tickets and wins</p>
          </div>
        </div>
      </section>

      <section className="draws-section">
        <h2 className="section-title">🎪 Upcoming Draws</h2>
        <div className="draws-grid">
          {draws.map(draw => (
            <div key={draw.id} className="draw-card">
              <div className="draw-badge">Upcoming</div>
              <h3 className="draw-title">{draw.name}</h3>
              <p className="draw-prize">{draw.prize}</p>
              <p className="draw-info">🕐 Draw Date: {draw.date}</p>
              <p className="draw-info">💵 Ticket Price: ৳{draw.price}</p>
              <button onClick={() => setCurrentPage('buy-ticket')} className="btn-primary" style={{marginTop: '15px', width: '100%'}}>Buy Tickets</button>
            </div>
          ))}
        </div>
      </section>

      {results.length > 0 && (
        <section className="results-section">
          <h2 className="section-title">📊 Recent Results</h2>
          <div className="results-grid">
            {results.map(result => (
              <div key={result.id} className="result-card">
                <h3 className="draw-title">{result.lottery}</h3>
                <p className="draw-info">📅 Draw Date: {result.drawDate}</p>
                <p className="draw-info">⏰ Time: {result.drawTime}</p>
                <p className="draw-info" style={{fontWeight: '600', color: 'var(--primary-color)'}}>🎱 Winners: {result.winners.length}</p>
                <div style={{marginTop: '15px', padding: '10px', background: 'var(--bg-primary)', borderRadius: '8px'}}>
                  {result.winners.slice(0, 3).map((w, idx) => (
                    <div key={idx} style={{fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '5px 0'}}>
                      🏅 @{w.username}: <strong>৳{w.prize}</strong>
                    </div>
                  ))}
                  {result.winners.length > 3 && <div style={{fontSize: '0.85rem', margin: '5px 0', fontStyle: 'italic'}}>+ {result.winners.length - 3} more winners</div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default App
