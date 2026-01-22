// =============================================
// GLOBAL VARIABLES & DATA STORAGE
// =============================================

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        const isDark = document.body.classList.contains('dark-mode');
        themeIcon.textContent = isDark ? '☀️' : '🌙';
    }
}

function toggleTheme() {
    const themeButtons = document.querySelectorAll('.theme-toggle, .auth-theme-toggle');
    
    // Add switching animation to all theme buttons
    themeButtons.forEach(btn => {
        btn.classList.add('switching');
        setTimeout(() => btn.classList.remove('switching'), 600);
    });
    
    // Add page transition effect
    document.body.classList.add('theme-transitioning');
    
    setTimeout(() => {
        document.body.classList.remove('theme-transitioning');
        document.body.classList.add('theme-transitioning-reverse');
        
        // Toggle the theme
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Update theme icon
        updateThemeIcon();
        
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning-reverse');
        }, 300);
    }, 150);
}

// Initialize theme on page load
initializeTheme();

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

// Get current user
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Initialize sample data if not exists
function initializeData() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('tickets')) {
        localStorage.setItem('tickets', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('draws')) {
        const sampleDraws = [
            {
                id: 1,
                name: 'Mega Fortune',
                prize: '🏆 10,000 to 1,000 BDT',
                date: 'Next Friday 8 PM',
                price: 1,
                type: 'mega',
                poolSize: 500000,
                status: 'upcoming',
                country: 'Bangladesh'
            },
            {
                id: 2,
                name: 'Power Win',
                prize: '⚡ 10,000 to 1,000 BDT',
                date: 'Next Friday 8 PM',
                price: 1,
                type: 'power',
                poolSize: 500000,
                status: 'upcoming',
                country: 'Bangladesh'
            },
            {
                id: 3,
                name: 'Daily Gold',
                prize: '🌟 10,000 to 1,000 BDT',
                date: 'Next Friday 8 PM',
                price: 1,
                type: 'daily',
                poolSize: 500000,
                status: 'upcoming',
                country: 'Bangladesh'
            },
            {
                id: 4,
                name: 'Diamond Draw',
                prize: '💎 10,000 to 1,000 BDT',
                date: 'Next Friday 8 PM',
                price: 1,
                type: 'instant',
                poolSize: 500000,
                status: 'upcoming',
                country: 'Bangladesh'
            }
        ];
        localStorage.setItem('draws', JSON.stringify(sampleDraws));
    }
    
    if (!localStorage.getItem('results')) {
        const sampleResults = [
            {
                id: 1,
                lottery: 'Mega Fortune',
                drawDate: 'Jan 17, 2026',
                drawTime: '8:00 PM',
                winningTickets: ['5834729165', '9274618354', '1928374651', '7462918354', '3847562918'],
                prizes: [10000, 5000, 1000, 1000, 1000, 1000, 1000],
                winners: [
                    { ticketNumber: '5834729165', prize: 10000, username: 'lucky_one' },
                    { ticketNumber: '9274618354', prize: 5000, username: 'fortune_seeker' },
                    { ticketNumber: '1928374651', prize: 1000, username: 'golden_player' },
                    { ticketNumber: '7462918354', prize: 1000, username: 'smart_gamer' },
                    { ticketNumber: '3847562918', prize: 1000, username: 'dream_winner' },
                    { ticketNumber: '2019384756', prize: 1000, username: 'lucky_bd' },
                    { ticketNumber: '6574829103', prize: 1000, username: 'future_rich' }
                ]
            },
            {
                id: 2,
                lottery: 'Power Win',
                drawDate: 'Jan 10, 2026',
                drawTime: '8:00 PM',
                winningTickets: ['4729183654', '8374619283', '2947183649'],
                prizes: [10000, 5000, 1000, 1000, 1000, 1000, 1000],
                winners: [
                    { ticketNumber: '4729183654', prize: 10000, username: 'dhaka_lucky' },
                    { ticketNumber: '8374619283', prize: 5000, username: 'chittagong_star' }
                ]
            }
        ];
        localStorage.setItem('results', JSON.stringify(sampleResults));
    }
    
    if (!localStorage.getItem('updates')) {
        const sampleUpdates = [
            {
                id: 1,
                date: 'Jan 23, 2026',
                title: '🎉 New Mega Jackpot Alert!',
                content: 'The Mega Millions jackpot has reached $50 million! Don\'t miss your chance to win big. Buy your tickets now!'
            },
            {
                id: 2,
                date: 'Jan 22, 2026',
                title: '⚡ Flash Sale on PowerBall Tickets',
                content: 'Get 20% off on all PowerBall Plus tickets today only! Limited time offer.'
            },
            {
                id: 3,
                date: 'Jan 21, 2026',
                title: '🏆 Record Breaking Winner!',
                content: 'Congratulations to our latest winner who won $5 million in the Daily Gold lottery. Could you be next?'
            }
        ];
        localStorage.setItem('updates', JSON.stringify(sampleUpdates));
    }
}

// =============================================
// INDEX PAGE FUNCTIONALITY
// =============================================

if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
    document.addEventListener('DOMContentLoaded', function() {
        initializeData();
        
        const authModal = document.getElementById('auth-modal');
        const mainContent = document.getElementById('main-content');
        const loginBtn = document.getElementById('login-btn');
        const registerBtn = document.getElementById('register-btn');
        
        // Check if user is already logged in
        if (isLoggedIn()) {
            authModal.style.display = 'none';
            mainContent.style.display = 'block';
            loadHomePage();
        } else {
            authModal.style.display = 'flex';
            mainContent.style.display = 'none';
        }
        
        // Button event listeners
        if (loginBtn) {
            loginBtn.addEventListener('click', function() {
                window.location.href = 'login.html';
            });
        }
        
        if (registerBtn) {
            registerBtn.addEventListener('click', function() {
                window.location.href = 'register.html';
            });
        }
        
        // Logout functionality
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                window.location.reload();
            });
        }
    });
}

function loadHomePage() {
    const user = getCurrentUser();
    
    // Update user initial
    const userInitial = document.getElementById('user-initial');
    if (userInitial && user) {
        userInitial.textContent = user.name.charAt(0).toUpperCase();
    }
    
    // Load upcoming draws
    loadUpcomingDraws();
    
    // Load recent results
    loadRecentResults();
}

function loadUpcomingDraws() {
    const drawsContainer = document.getElementById('upcoming-draws');
    if (!drawsContainer) return;
    
    const draws = JSON.parse(localStorage.getItem('draws') || '[]');
    
    if (draws.length === 0) {
        drawsContainer.innerHTML = '<p>No upcoming draws at the moment.</p>';
        return;
    }
    
    drawsContainer.innerHTML = draws.map(draw => `
        <div class="draw-card">
            <div class="draw-badge">Upcoming</div>
            <h3 class="draw-title">${draw.name}</h3>
            <p class="draw-prize">${draw.prize}</p>
            <p class="draw-info">🕐 Draw Date: ${draw.date}</p>
            <p class="draw-info">💵 Ticket Price: $${draw.price}</p>
            <a href="buy-ticket.html" class="btn-primary" style="margin-top: 15px; text-decoration: none;">Buy Tickets</a>
        </div>
    `).join('');
}

function loadRecentResults() {
    const resultsContainer = document.getElementById('recent-results');
    if (!resultsContainer) return;
    
    const results = JSON.parse(localStorage.getItem('results') || '[]');
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No recent results available.</p>';
        return;
    }
    
    resultsContainer.innerHTML = results.map(result => `
        <div class="result-card">
            <h3 class="draw-title">${result.lottery}</h3>
            <p class="draw-info">📅 Draw Date: ${result.drawDate}</p>
            <p class="draw-info" style="font-weight: 600; color: var(--primary-color);">
                🎱 Winning Numbers: ${result.winningNumbers.join(', ')}
            </p>
            <p class="draw-info">⭐ Bonus: ${result.bonusNumber}</p>
            <p class="draw-prize" style="font-size: 1.5rem;">${result.prize}</p>
        </div>
    `).join('');
}

// =============================================
// LOGIN PAGE FUNCTIONALITY
// =============================================

if (window.location.pathname.includes('login.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const loginForm = document.getElementById('login-form');
        
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const user = users.find(u => 
                    (u.email === username || u.username === username) && u.password === password
                );
                
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        username: user.username
                    }));
                    alert('✅ Login successful!');
                    window.location.href = 'dashboard.html';
                } else {
                    alert('❌ Invalid credentials. Please try again or register a new account.');
                }
            });
        }
    });
}

// =============================================
// REGISTER PAGE FUNCTIONALITY
// =============================================

if (window.location.pathname.includes('register.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const registerForm = document.getElementById('register-form');
        
        if (registerForm) {
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const fullname = document.getElementById('fullname').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('reg-password').value;
                const confirmPassword = document.getElementById('confirm-password').value;
                
                // Validation
                if (password !== confirmPassword) {
                    alert('❌ Passwords do not match!');
                    return;
                }
                
                if (password.length < 6) {
                    alert('❌ Password must be at least 6 characters long!');
                    return;
                }
                
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                
                // Check if email already exists
                if (users.some(u => u.email === email)) {
                    alert('❌ Email already registered! Please login instead.');
                    return;
                }
                
                // Create new user
                const newUser = {
                    id: Date.now(),
                    name: fullname,
                    email: email,
                    username: email.split('@')[0],
                    password: password,
                    createdAt: new Date().toISOString()
                };
                
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                
                // Auto login
                localStorage.setItem('currentUser', JSON.stringify({
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    username: newUser.username
                }));
                
                alert('✅ Registration successful! Welcome to Golden Lottery!');
                window.location.href = 'dashboard.html';
            });
        }
    });
}

// =============================================
// COMMON FUNCTIONS FOR ALL PAGES
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initializeTheme();
    
    // Setup theme toggle button (desktop)
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Set initial icon
        const isDark = document.body.classList.contains('dark-mode');
        const themeIcon = themeToggle.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = isDark ? '☀️' : '🌙';
        }
        
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Setup mobile theme toggle
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    if (mobileThemeToggle) {
        const isDark = document.body.classList.contains('dark-mode');
        const themeIcon = mobileThemeToggle.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = isDark ? '☀️' : '🌙';
        }
        
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const nav = document.getElementById('nav');
    if (mobileMenuToggle && nav) {
        // Show mobile-only elements
        const mobileMenuBottom = nav.querySelector('.mobile-menu-bottom');
        
        function updateMobileMenu() {
            if (window.innerWidth <= 768) {
                if (mobileMenuBottom) mobileMenuBottom.style.display = 'flex';
            } else {
                if (mobileMenuBottom) mobileMenuBottom.style.display = 'none';
                nav.classList.remove('active');
            }
        }
        
        updateMobileMenu();
        window.addEventListener('resize', updateMobileMenu);
        
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.textContent = nav.classList.contains('active') ? '✕' : '☰';
        });
        
        // Mobile profile dropdown toggle
        const mobileProfileTrigger = document.getElementById('mobile-profile-trigger');
        const mobileProfileDropdown = document.getElementById('mobile-profile-dropdown');
        
        if (mobileProfileTrigger && mobileProfileDropdown) {
            mobileProfileTrigger.addEventListener('click', function(e) {
                e.stopPropagation();
                this.classList.toggle('active');
                
                if (mobileProfileDropdown.style.display === 'none' || !mobileProfileDropdown.style.display) {
                    mobileProfileDropdown.style.display = 'block';
                } else {
                    mobileProfileDropdown.style.display = 'none';
                }
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.mobile-profile-section')) {
                    mobileProfileDropdown.style.display = 'none';
                    mobileProfileTrigger.classList.remove('active');
                }
            });
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.header')) {
                nav.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.textContent = '☰';
                }
                if (mobileProfileDropdown) {
                    mobileProfileDropdown.style.display = 'none';
                }
                if (mobileProfileTrigger) {
                    mobileProfileTrigger.classList.remove('active');
                }
            }
        });
        
        // Close menu when clicking a link
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                mobileMenuToggle.textContent = '☰';
            });
        });
        
        // Mobile logout button
        const mobileLogout = document.getElementById('mobile-logout-btn');
        if (mobileLogout) {
            mobileLogout.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                alert('✅ Logged out successfully!');
                window.location.href = 'login.html';
            });
        }
    }
    
    // Check authentication for protected pages
    const protectedPages = ['dashboard.html', 'profile.html', 'buy-ticket.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage) && !isLoggedIn()) {
        alert('⚠️ Please login to access this page.');
        window.location.href = 'login.html';
        return;
    }
    
    // Update user profile icon on all pages
    const userInitial = document.getElementById('user-initial');
    const mobileUserInitial = document.getElementById('mobile-user-initial');
    const user = getCurrentUser();
    if (userInitial && user) {
        userInitial.textContent = user.name.charAt(0).toUpperCase();
    }
    if (mobileUserInitial && user) {
        mobileUserInitial.textContent = user.name.charAt(0).toUpperCase();
    }
    
    // Update mobile user info
    const mobileUserName = document.getElementById('mobile-user-name');
    const mobileUserEmail = document.getElementById('mobile-user-email');
    if (mobileUserName && user) {
        mobileUserName.textContent = user.name;
    }
    if (mobileUserEmail && user) {
        mobileUserEmail.textContent = user.email;
    }
    
    // Logout functionality for all pages
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                localStorage.removeItem('currentUser');
                window.location.href = 'index.html';
            }
        });
    }
    
    // Profile dropdown toggle
    const profileIcon = document.getElementById('profile-icon');
    if (profileIcon) {
        profileIcon.addEventListener('click', function() {
            const dropdown = document.getElementById('dropdown');
            if (dropdown) {
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            }
        });
    }
});

// Initialize data on page load
initializeData();
