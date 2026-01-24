import { useState, useEffect } from 'react'

// Dashboard Page with full features
export function DashboardPage() {
  const [statistics, setStatistics] = useState({
    totalTickets: 0,
    totalWins: 0,
    totalSpent: 0,
    totalWinnings: 0,
    pendingDraws: 0
  })
  const [userTickets, setUserTickets] = useState([])
  const [winners, setWinners] = useState([])
  const [updates, setUpdates] = useState([])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]')
    const results = JSON.parse(localStorage.getItem('results') || '[]')
    const updatesData = JSON.parse(localStorage.getItem('updates') || '[]')
    
    const userTicketsList = tickets.filter(t => t.userId === user.id)
    const wonTickets = userTicketsList.filter(t => t.status === 'won')
    const totalSpent = userTicketsList.length * 1 // 1 BDT per ticket
    const totalWinnings = wonTickets.reduce((sum, t) => sum + (t.prizeWon || 0), 0)
    const pendingDraws = userTicketsList.filter(t => t.status === 'pending').length

    setStatistics({
      totalTickets: userTicketsList.length,
      totalWins: wonTickets.length,
      totalSpent: totalSpent,
      totalWinnings: totalWinnings,
      pendingDraws: pendingDraws
    })

    setUserTickets(userTicketsList.slice(0, 5))
    
    // Collect all winners
    const allWinners = results.flatMap(r => r.winners || []).slice(0, 10)
    setWinners(allWinners)

    if (updatesData.length === 0) {
      const defaultUpdates = [
        { id: 1, date: 'Jan 23, 2026', title: '🎉 New Mega Jackpot Alert!', content: 'The Mega Millions jackpot has reached ৳500 million! Don\'t miss your chance to win big. Buy your tickets now!' },
        { id: 2, date: 'Jan 22, 2026', title: '⚡ Flash Sale on Tickets', content: 'Get 20% off on all PowerBall Plus tickets today only! Limited time offer.' },
        { id: 3, date: 'Jan 21, 2026', title: '🏆 Record Breaking Winner!', content: 'Congratulations to our latest winner who won ৳50,000 in the Daily Gold lottery. Could you be next?' }
      ]
      localStorage.setItem('updates', JSON.stringify(defaultUpdates))
      setUpdates(defaultUpdates)
    } else {
      setUpdates(updatesData)
    }
  }, [])

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <img src="/IMAGES/Supreme Lottery.png" alt="Supreme Lottery" className="page-logo" />
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="welcome-text">Welcome back! Here's your lottery overview</p>
        </div>
      </div>

      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-icon">🎫</div>
            <div className="stat-info">
              <h3>{statistics.totalTickets}</h3>
              <p>Total Tickets</p>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">🏆</div>
            <div className="stat-info">
              <h3>{statistics.totalWins}</h3>
              <p>Total Wins</p>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>৳ {statistics.totalSpent}</h3>
              <p>Total Spent</p>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">🎁</div>
            <div className="stat-info">
              <h3>৳ {statistics.totalWinnings}</h3>
              <p>Total Winnings</p>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <h3>{statistics.pendingDraws}</h3>
              <p>Pending Draws</p>
            </div>
          </div>
        </div>
      </section>

      {userTickets.length > 0 && (
        <section className="tickets-section">
          <h2 className="section-title">📋 Recent Tickets</h2>
          <div className="tickets-container">
            {userTickets.map(ticket => (
              <div key={ticket.id} className="ticket-card">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
                  <strong style={{color: 'var(--primary-color)'}}>🎫 Ticket #{ticket.ticketNumber}</strong>
                  <span className={`ticket-status status-${ticket.status}`} style={{
                    padding: '4px 10px', borderRadius: '20px', fontSize: '0.85rem',
                    background: ticket.status === 'won' ? 'var(--success-gradient)' : ticket.status === 'pending' ? 'var(--primary-gradient)' : 'var(--danger-gradient)',
                    color: 'white'
                  }}>
                    {ticket.status === 'won' ? `✅ WON - ৳${ticket.prizeWon || 0}` : ticket.status === 'pending' ? '⏳ PENDING' : '❌ NOT WON'}
                  </span>
                </div>
                <div style={{fontSize: '0.9rem', color: 'var(--text-secondary)'}}>
                  <div>🎰 {ticket.lotteryName}</div>
                  <div>📅 Draw: {ticket.drawDate}</div>
                  <div>💳 Payment: {ticket.paymentMethod.toUpperCase()}</div>
                  <div>🔢 Ticket ID: {ticket.transactionId}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {winners.length > 0 && (
        <section style={{marginBottom: '50px'}}>
          <h2 className="section-title">🏆 Recent Winners</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px'}}>
            {winners.map((w, idx) => (
              <div key={idx} style={{padding: '15px', background: 'var(--gold-gradient)', borderRadius: '8px', color: 'white'}}>
                <div style={{fontSize: '1rem', marginBottom: '10px'}}>
                  <strong>🏅 @{w.username}</strong>
                </div>
                <div style={{fontSize: '0.9rem'}}>
                  <div>Prize: <strong>৳{w.prize}</strong></div>
                  <div style={{marginTop: '8px', fontSize: '0.85rem', opacity: 0.9}}>Congratulations!</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {updates.length > 0 && (
        <section style={{marginBottom: '50px'}}>
          <h2 className="section-title">📰 Latest Updates</h2>
          <div style={{display: 'grid', gap: '15px'}}>
            {updates.map(update => (
              <div key={update.id} style={{padding: '15px', background: 'var(--bg-secondary)', borderRadius: '8px', borderLeft: '4px solid var(--primary-color)'}}>
                <div style={{fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '5px'}}>📅 {update.date}</div>
                <h4 style={{margin: '5px 0', color: 'var(--primary-color)'}}>{update.title}</h4>
                <p style={{margin: '10px 0 0 0', color: 'var(--text-secondary)'}}>{update.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

// Buy Ticket Page
export function BuyTicketPage({ user, showAlert }) {
  const [selectedLottery, setSelectedLottery] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedNumbers, setSelectedNumbers] = useState([])
  const [paymentMethod, setPaymentMethod] = useState('bkash')
  const [showSuccess, setShowSuccess] = useState(false)
  const [successTickets, setSuccessTickets] = useState([])

  const LOTTERIES = [
    { id: 1, name: 'Mega Fortune', icon: '🏆', prize: '10,000 BDT', price: 1, type: 'mega' },
    { id: 2, name: 'Power Win', icon: '⚡', prize: '10,000 BDT', price: 1, type: 'power' },
    { id: 3, name: 'Daily Gold', icon: '🌟', prize: '10,000 BDT', price: 1, type: 'daily' },
    { id: 4, name: 'Diamond Draw', icon: '💎', prize: '10,000 BDT', price: 1, type: 'instant' }
  ]

  const toggleNumber = (num) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== num))
    } else if (selectedNumbers.length < 6) {
      setSelectedNumbers([...selectedNumbers, num])
    } else {
      showAlert('warning', '⚠️ Maximum Numbers', 'You can only select 6 numbers!', 0)
    }
  }

  const handlePurchase = () => {
    if (!selectedLottery) {
      showAlert('error', '❌ No Lottery Selected', 'Please select a lottery first!', 0)
      return
    }

    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]')
    const newTickets = []

    for (let i = 0; i < quantity; i++) {
      const ticketNumber = Math.floor(Math.random() * 9000000000) + 1000000000
      const ticket = {
        id: Date.now() + i,
        userId: user.id,
        username: user.username,
        ticketNumber: ticketNumber,
        lottery: selectedLottery.type,
        lotteryName: selectedLottery.name,
        price: selectedLottery.price,
        purchaseDate: new Date().toLocaleDateString('en-US'),
        purchaseTime: new Date().toLocaleTimeString('en-US'),
        drawDate: 'Next Friday 8 PM',
        status: 'pending',
        prizeWon: null,
        paymentMethod: paymentMethod,
        transactionId: `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      }
      newTickets.push(ticket)
      tickets.push(ticket)
    }

    localStorage.setItem('tickets', JSON.stringify(tickets))
    setSuccessTickets(newTickets)
    setShowSuccess(true)
    showAlert('success', '✅ Purchase Successful!', `${quantity} ticket(s) purchased for ৳${selectedLottery.price * quantity}`, 2000)

    // Reset form
    setSelectedLottery(null)
    setQuantity(1)
    setSelectedNumbers([])
  }

  if (showSuccess) {
    return (
      <div className="buy-ticket-container">
        <div style={{textAlign: 'center', padding: '60px 20px'}}>
          <div style={{fontSize: '4rem', marginBottom: '20px'}}>✅</div>
          <h2 style={{color: 'var(--success-color)', marginBottom: '15px'}}>Purchase Successful!</h2>
          <p style={{color: 'var(--text-secondary)', marginBottom: '40px'}}>
            {successTickets.length} ticket{successTickets.length > 1 ? 's' : ''} purchased for ৳{selectedLottery.price * successTickets.length}
          </p>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px', marginBottom: '30px', maxWidth: '800px', margin: '0 auto 30px'}}>
            {successTickets.map(t => (
              <div key={t.id} style={{padding: '15px', background: 'var(--bg-secondary)', borderRadius: '8px', borderLeft: '3px solid var(--primary-color)', textAlign: 'left'}}>
                <div style={{fontWeight: '600', color: 'var(--primary-color)', marginBottom: '10px'}}>🎟️ Ticket #{t.ticketNumber}</div>
                <div style={{fontSize: '0.85rem', color: 'var(--text-secondary)'}}>
                  <div>Lottery: {t.lotteryName}</div>
                  <div>Purchase: {t.purchaseDate} {t.purchaseTime}</div>
                  <div>Payment: {t.paymentMethod.toUpperCase()}</div>
                  <div>Status: Pending Draw ({t.drawDate})</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{background: 'var(--gold-gradient)', padding: '15px', borderRadius: '8px', marginBottom: '30px', color: 'white', maxWidth: '600px', margin: '0 auto 30px'}}>
            <div><strong>📅 Draw Schedule:</strong> Every Friday at 8:00 PM</div>
            <div><strong>💰 Prize Distribution:</strong> Within 24 hours of draw</div>
          </div>

          <button onClick={() => setShowSuccess(false)} className="btn-primary" style={{marginRight: '10px'}}>Buy More Tickets</button>
          <button onClick={() => setShowSuccess(false)} className="btn-secondary">Back to Home</button>
        </div>
      </div>
    )
  }

  return (
    <div className="buy-ticket-container">
      <div className="page-header">
        <img src="/IMAGES/Supreme Lottery.png" alt="Supreme Lottery" className="page-logo" />
        <h1 className="page-title">🎫 Buy Lottery Tickets</h1>
      </div>

      <section className="lottery-selection">
        <h2 className="section-title">Select Lottery Type</h2>
        <div className="lottery-types-grid">
          {LOTTERIES.map(lottery => (
            <div 
              key={lottery.id}
              className={`lottery-type-card ${selectedLottery?.id === lottery.id ? 'selected' : ''}`}
              onClick={() => setSelectedLottery(lottery)}
            >
              <h3>{lottery.icon} {lottery.name}</h3>
              <div className="lottery-prize">{lottery.prize}</div>
              <p className="ticket-price">Ticket: ৳ {lottery.price}</p>
              <button className="btn-select">Select</button>
            </div>
          ))}
        </div>
      </section>

      {selectedLottery && (
        <>
          <section className="number-selection">
            <h2 className="section-title">🎰 Pick Your Numbers</h2>
            <p>Select 6 numbers from 1 to 49</p>
            <div className="numbers-grid">
              {Array.from({length: 49}, (_, i) => i + 1).map(num => (
                <button
                  key={num}
                  className={`number-btn ${selectedNumbers.includes(num) ? 'selected' : ''}`}
                  onClick={() => toggleNumber(num)}
                >
                  {num}
                </button>
              ))}
            </div>
            <div className="selected-display">
              {selectedNumbers.length === 0 ? (
                <p className="empty-selection">No numbers selected</p>
              ) : (
                selectedNumbers.sort((a, b) => a - b).map(num => (
                  <div key={num} className="selected-number">{num}</div>
                ))
              )}
            </div>
          </section>

          <section className="number-selection">
            <h2 className="section-title">📊 Ticket Quantity</h2>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '15px'}}>
              <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))} style={{width: '100px', textAlign: 'center', fontSize: '2rem', fontWeight: '700', border: '3px solid var(--primary-color)', borderRadius: 'var(--border-radius)', padding: '10px'}} />
              <button className="qty-btn" onClick={() => setQuantity(Math.min(100, quantity + 1))}>+</button>
            </div>
            <p style={{textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem'}}>You can purchase up to 100 tickets at once</p>
          </section>

          <section className="number-selection">
            <h2 className="section-title">💳 Payment Method</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              {[
                { id: 'bkash', name: 'bKash', icon: '📱' },
                { id: 'nagad', name: 'Nagad', icon: '📲' },
                { id: 'rocket', name: 'Rocket', icon: '🚀' }
              ].map(method => (
                <label key={method.id} style={{display: 'flex', alignItems: 'center', padding: '15px', background: 'var(--bg-primary)', borderRadius: 'var(--border-radius)', cursor: 'pointer'}}>
                  <input type="radio" name="payment" value={method.id} checked={paymentMethod === method.id} onChange={(e) => setPaymentMethod(e.target.value)} />
                  <span style={{marginLeft: '12px'}}>{method.icon} {method.name}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="number-selection">
            <h2 className="section-title">📋 Order Summary</h2>
            <div style={{background: 'var(--bg-primary)', padding: '20px', borderRadius: 'var(--border-radius)'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(0,0,0,0.1)'}}>
                <span>Lottery:</span>
                <strong>{selectedLottery.name}</strong>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(0,0,0,0.1)'}}>
                <span>Tickets:</span>
                <strong>{quantity} × ৳{selectedLottery.price}</strong>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(0,0,0,0.1)'}}>
                <span>Payment Method:</span>
                <strong>{paymentMethod.toUpperCase()}</strong>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '15px 0', marginTop: '10px', fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary-color)', borderTop: '2px solid var(--primary-color)'}}>
                <span>Total:</span>
                <strong>৳ {selectedLottery.price * quantity}</strong>
              </div>
            </div>
          </section>

          <section style={{textAlign: 'center', marginBottom: '50px'}}>
            <button onClick={handlePurchase} className="btn-primary btn-large" style={{width: '100%', maxWidth: '300px'}}>🎟️ Purchase Tickets Now</button>
          </section>
        </>
      )}
    </div>
  )
}

// My Tickets Page
export function MyTicketsPage() {
  const [userTickets, setUserTickets] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]')
    const userTicketsList = tickets.filter(t => t.userId === user.id)
    setUserTickets(userTicketsList)
  }, [])

  const filteredTickets = filter === 'all' ? userTickets : filter === 'current' ? userTickets.filter(t => t.status === 'pending') : userTickets.filter(t => t.status !== 'pending')

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <img src="/IMAGES/Supreme Lottery.png" alt="Supreme Lottery" className="page-logo" />
        <div>
          <h1 className="page-title">🎟️ My Tickets</h1>
          <p className="welcome-text">Your purchased lottery tickets</p>
        </div>
      </div>

      {userTickets.length > 0 ? (
        <>
          <div style={{display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap'}}>
            {[
              { key: 'all', label: '📊 All Tickets', count: userTickets.length },
              { key: 'current', label: '⏳ Current', count: userTickets.filter(t => t.status === 'pending').length },
              { key: 'past', label: '✅ Past', count: userTickets.filter(t => t.status !== 'pending').length }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className="tab-btn"
                style={{
                  padding: '10px 20px',
                  background: filter === tab.key ? 'var(--primary-gradient)' : 'var(--bg-primary)',
                  color: filter === tab.key ? 'white' : 'var(--text-primary)',
                  border: 'none',
                  borderRadius: 'var(--border-radius)',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px'}}>
            {filteredTickets.map(ticket => (
              <div key={ticket.id} className="ticket-card" style={{padding: '15px', background: 'var(--bg-secondary)', borderRadius: '8px', border: `2px solid ${ticket.status === 'won' ? 'var(--success-color)' : ticket.status === 'pending' ? 'var(--primary-color)' : '#ccc'}`}}>
                <div style={{fontWeight: '600', color: 'var(--primary-color)', marginBottom: '10px'}}>
                  Ticket #{ticket.ticketNumber}
                </div>
                <div style={{fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '10px'}}>
                  <div>🎰 {ticket.lotteryName}</div>
                  <div>📅 Purchase: {ticket.purchaseDate} {ticket.purchaseTime}</div>
                  <div>🎯 Draw: {ticket.drawDate}</div>
                  <div>💰 Price: ৳{ticket.price}</div>
                </div>
                <div style={{paddingTop: '10px', borderTop: '1px solid var(--primary-color)'}}>
                  {ticket.status === 'won' ? (
                    <div style={{color: 'var(--success-color)', fontWeight: '600'}}>🎉 WON: ৳{ticket.prizeWon}!</div>
                  ) : ticket.status === 'pending' ? (
                    <div style={{color: 'var(--primary-color)'}}>⏳ Awaiting Draw</div>
                  ) : (
                    <div style={{color: '#999'}}>❌ No Prize</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={{textAlign: 'center', padding: '40px'}}>
          <p style={{fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '20px'}}>
            🎟️ You don't have any tickets yet.
          </p>
        </div>
      )}
    </div>
  )
}

// Results Page
export function ResultsPage() {
  const [results, setResults] = useState([])

  useEffect(() => {
    const resultsData = JSON.parse(localStorage.getItem('results') || '[]')
    if (resultsData.length === 0) {
      const defaultResults = [
        {
          id: 1, lottery: 'Mega Fortune', drawDate: 'Jan 17, 2026', drawTime: '8:00 PM',
          winners: [
            { ticketNumber: '5834729165', prize: 10000, username: 'lucky_one' },
            { ticketNumber: '9274618354', prize: 5000, username: 'fortune_seeker' },
            { ticketNumber: '1928374651', prize: 1000, username: 'golden_player' }
          ]
        },
        {
          id: 2, lottery: 'Power Win', drawDate: 'Jan 10, 2026', drawTime: '8:00 PM',
          winners: [
            { ticketNumber: '4729183654', prize: 10000, username: 'dhaka_lucky' },
            { ticketNumber: '8374619283', prize: 5000, username: 'chittagong_star' }
          ]
        }
      ]
      localStorage.setItem('results', JSON.stringify(defaultResults))
      setResults(defaultResults)
    } else {
      setResults(resultsData)
    }
  }, [])

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <img src="/IMAGES/Supreme Lottery.png" alt="Supreme Lottery" className="page-logo" />
        <div>
          <h1 className="page-title">📊 Latest Results</h1>
          <p className="welcome-text">Check the winning numbers and winners</p>
        </div>
      </div>

      {results.length > 0 ? (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px'}}>
          {results.map(result => (
            <div key={result.id} style={{padding: '20px', background: 'var(--bg-secondary)', borderRadius: '12px', boxShadow: 'var(--shadow-sm)'}}>
              <h3 style={{marginBottom: '10px', color: 'var(--primary-color)'}}>{result.lottery}</h3>
              <div style={{fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '15px'}}>
                <div>📅 Draw Date: {result.drawDate}</div>
                <div>⏰ Time: {result.drawTime}</div>
              </div>
              
              <div style={{background: 'var(--bg-primary)', padding: '15px', borderRadius: '8px', marginBottom: '15px'}}>
                <div style={{fontWeight: '600', marginBottom: '10px', color: 'var(--primary-color)'}}>🏆 Prize Winners:</div>
                {result.winners.map((w, idx) => (
                  <div key={idx} style={{padding: '8px 0', fontSize: '0.9rem', borderBottom: idx < result.winners.length - 1 ? '1px solid rgba(0,0,0,0.1)' : 'none'}}>
                    <div>🥇 @{w.username}</div>
                    <div style={{color: 'var(--primary-color)', fontWeight: '600'}}>Prize: ৳{w.prize}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{textAlign: 'center', padding: '40px', color: 'var(--text-secondary)'}}>
          <p>No results available yet</p>
        </div>
      )}
    </div>
  )
}

// Profile Page
export function ProfilePage({ user, setUser, showAlert }) {
  const [fullname, setFullname] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [emailNotif, setEmailNotif] = useState(true)
  const [smsNotif, setSmsNotif] = useState(false)
  const [promoNotif, setPromoNotif] = useState(true)

  // Load profile data on mount
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const currentUserData = users.find(u => u.id === user?.id)
    if (currentUserData) {
      setFullname(currentUserData.name || '')
      setEmail(currentUserData.email || '')
      setPhone(currentUserData.phone || '')
      setAddress(currentUserData.address || '')
      setProfilePic(currentUserData.profilePic || '')
      if (currentUserData.preferences) {
        setEmailNotif(currentUserData.preferences.emailNotif !== false)
        setSmsNotif(currentUserData.preferences.smsNotif !== false)
        setPromoNotif(currentUserData.preferences.promoNotif !== false)
      }
    }
  }, [user?.id])

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64String = event.target.result
        setProfilePic(base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = () => {
    if (!fullname.trim()) {
      showAlert('error', '❌ Incomplete Form', 'Full name is required!', 0)
      return
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const userIndex = users.findIndex(u => u.id === user.id)

    if (userIndex === -1) return

    users[userIndex] = { ...users[userIndex], name: fullname, email: email, phone, address, profilePic }
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('currentUser', JSON.stringify({ ...user, name: fullname, email: email, profilePic }))
    setUser({ ...user, name: fullname, email: email, profilePic })
    showAlert('success', '✅ Profile updated', 'Your profile has been saved successfully!', 2000)
  }

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showAlert('error', '❌ Incomplete Form', 'Please fill in all password fields!', 0)
      return
    }

    if (newPassword !== confirmPassword) {
      showAlert('error', '❌ Password Mismatch', 'New passwords do not match!', 0)
      return
    }

    if (newPassword.length < 6) {
      showAlert('warning', '⚠️ Weak Password', 'New password must be at least 6 characters long!', 0)
      return
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const userIndex = users.findIndex(u => u.id === user.id)

    if (userIndex === -1) return

    if (users[userIndex].password !== currentPassword) {
      showAlert('error', '🔐 Wrong Password', 'Current password is incorrect!', 0)
      return
    }

    users[userIndex].password = newPassword
    localStorage.setItem('users', JSON.stringify(users))
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    showAlert('success', '✅ Password updated', 'Your password has been changed successfully!', 2000)
  }

  const handleSavePreferences = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const userIndex = users.findIndex(u => u.id === user.id)

    if (userIndex === -1) return

    users[userIndex].preferences = { emailNotif, smsNotif, promoNotif }
    localStorage.setItem('users', JSON.stringify(users))
    showAlert('success', '✅ Preferences saved!', 'Your preferences have been updated!', 2000)
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src="/IMAGES/Supreme Lottery.png" alt="Supreme Lottery" className="page-logo" />
        <h1 className="page-title">⚙️ Account Setup</h1>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h2>Profile Picture</h2>
          <div className="profile-pic-container">
            <div className="profile-pic-display">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="profile-pic" />
              ) : (
                <img src="/IMAGES/Supreme Lottery.png" alt="Default Profile" className="profile-pic default" />
              )}
            </div>
            <div className="profile-pic-upload">
              <label className="upload-btn">
                📷 Choose Photo
                <input type="file" accept="image/*" onChange={handleProfilePicChange} style={{display: 'none'}} />
              </label>
              <p className="upload-info">JPG, PNG, GIF (Max 5MB)</p>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Personal Information</h2>
          <div className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
            </div>
            <button onClick={handleSaveProfile} className="btn-primary btn-save">Save Changes</button>
          </div>
        </div>

        <div className="profile-section">
          <h2>Change Password</h2>
          <div className="profile-form">
            <div className="form-row">
              <div className="form-group full-width">
                <label>Current Password</label>
                <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>New Password</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
            </div>
            <button onClick={handlePasswordChange} className="btn-primary btn-save">Update Password</button>
          </div>
        </div>

        <div className="profile-section">
          <h2>Notification Preferences</h2>
          <div className="preferences-grid">
            <label className="preference-item">
              <div className="preference-info">
                <h4>Email Notifications</h4>
                <p>Receive updates via email</p>
              </div>
              <input type="checkbox" checked={emailNotif} onChange={(e) => setEmailNotif(e.target.checked)} />
            </label>
            <label className="preference-item">
              <div className="preference-info">
                <h4>SMS Notifications</h4>
                <p>Receive updates via SMS</p>
              </div>
              <input type="checkbox" checked={smsNotif} onChange={(e) => setSmsNotif(e.target.checked)} />
            </label>
            <label className="preference-item">
              <div className="preference-info">
                <h4>Promotional Offers</h4>
                <p>Receive special promotions</p>
              </div>
              <input type="checkbox" checked={promoNotif} onChange={(e) => setPromoNotif(e.target.checked)} />
            </label>
          </div>
          <button onClick={handleSavePreferences} className="btn-primary btn-save">Save Preferences</button>
        </div>
      </div>
    </div>
  )
}

export default { DashboardPage, BuyTicketPage, MyTicketsPage, ResultsPage, ProfilePage }
