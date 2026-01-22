// =============================================
// SPA NAVIGATION & CORE FUNCTIONALITY
// =============================================

let currentUser = null;

/**
 * Navigate between pages
 * @param {string} pageName - Name of the page to navigate to
 */
function navigatePage(pageName) {
    // Remove active from all pages
    document.querySelectorAll('.page-section').forEach(el => {
        el.classList.remove('active');
    });
    
    // Activate target page
    const targetPage = document.getElementById('page-' + pageName);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Update nav-link active states
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.page === pageName);
        });
        
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        closeAllMenus();
    }
}

/**
 * Close all open menus
 */
function closeAllMenus() {
    document.querySelectorAll('.nav').forEach(nav => {
        nav.classList.remove('active');
    });
    // Also close mobile profile dropdowns
    document.querySelectorAll('.mobile-profile-section .dropdown').forEach(dd => {
        dd.classList.remove('show');
    });
}

/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
    // Mobile menu toggle
    document.addEventListener('click', (e) => {
        const menuBtn = e.target.closest('.mobile-menu-toggle');
        if (menuBtn) {
            e.stopPropagation();
            const nav = menuBtn.nextElementSibling;
            if (nav && nav.classList.contains('nav')) {
                nav.classList.toggle('active');
            }
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-menu-toggle') && !e.target.closest('.nav')) {
            closeAllMenus();
        }
    });

    // Page navigation with data-page
    document.addEventListener('click', (e) => {
        const link = e.target.closest('[data-page]');
        if (link) {
            e.preventDefault();
            navigatePage(link.dataset.page);
        }
    });

    // FAQ accordion toggle via event delegation
    document.addEventListener('click', (e) => {
        const faqBtn = e.target.closest('.faq-question');
        if (!faqBtn) return;
        e.preventDefault();
        const answer = faqBtn.nextElementSibling;
        if (!answer) return;
        // Close other answers
        document.querySelectorAll('.faq-answer').forEach((a) => {
            if (a !== answer) a.style.display = 'none';
        });
        // Toggle current answer
        const visible = answer.style.display === 'block';
        answer.style.display = visible ? 'none' : 'block';
    });

    // Logout handling
    document.addEventListener('click', (e) => {
        const logoutBtns = ['logout-btn', 'mobile-logout-btn', 'logout-btn-dash', 'logout-btn-buy', 'logout-btn-tickets', 'logout-btn-results', 'logout-btn-profile', 'logout-btn-contact', 'logout-btn-faq', 'logout-btn-about'];
        if (logoutBtns.includes(e.target.id)) {
            e.preventDefault();
            currentUser = null;
            localStorage.removeItem('currentUser');
            closeAllMenus();
            window.location.replace('login.html');
        }
    });

    // Theme toggle functionality
    document.addEventListener('click', (e) => {
        const themeBtn = e.target.closest('.theme-toggle');
        if (themeBtn) {
            e.preventDefault();
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            document.documentElement.style.colorScheme = newTheme;
            document.body.setAttribute('data-theme', newTheme);
            if (newTheme === 'dark') {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
            localStorage.setItem('theme', newTheme);
            updateThemeIcons();
        }
    });

    // Desktop Profile dropdown toggle
    document.addEventListener('click', (e) => {
        const profileIcon = e.target.closest('.user-profile .profile-icon');
        const userProfile = e.target.closest('.user-profile');
        const dropdown = document.getElementById('dropdown');
        
        if (profileIcon && dropdown) {
            e.stopPropagation();
            dropdown.style.display = dropdown.style.display === 'none' || dropdown.style.display === '' ? 'block' : 'none';
        } else if (!userProfile && dropdown) {
            dropdown.style.display = 'none';
        }
    });

    // Mobile profile dropdown toggle
    document.addEventListener('click', (e) => {
        const mobileProfileIcon = e.target.closest('.mobile-profile-section .profile-icon');
        if (mobileProfileIcon) {
            e.stopPropagation();
            const dropdown = mobileProfileIcon.nextElementSibling;
            if (dropdown && dropdown.classList.contains('dropdown')) {
                dropdown.classList.toggle('show');
            }
        } else if (!e.target.closest('.mobile-profile-section')) {
            // Close mobile profile dropdowns when clicking outside
            document.querySelectorAll('.mobile-profile-section .dropdown').forEach(dd => {
                dd.classList.remove('show');
            });
        }
    });
}

/**
 * Update theme icons across all pages
 */
function updateThemeIcons() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.querySelectorAll('.theme-icon').forEach(icon => {
        icon.textContent = isDark ? '☀️' : '🌙';
    });
}

/**
 * Update user displays across all pages
 * @param {string} username - Username to display
 */
function updateUserDisplay(username) {
    if (!username) return;
    const userInitial = username.charAt(0).toUpperCase();
    
    // Update all user name displays
    document.querySelectorAll('#user-name').forEach(el => {
        el.textContent = username;
    });
    
    // Update all user initials in profile icons
    document.querySelectorAll('.profile-icon span').forEach(el => {
        el.textContent = userInitial;
    });
    
    // Update avatar initial
    const avatarInitial = document.getElementById('avatar-initial');
    if (avatarInitial) {
        avatarInitial.textContent = userInitial;
    }
}

// =============================================
// PAGE INITIALIZATION
// =============================================

/**
 * Initialize app on page load
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Restore theme preference
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        document.documentElement.style.colorScheme = savedTheme;
        document.body.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }
        updateThemeIcons();
        
        // Initialize event listeners
        initializeEventListeners();
        
        // Restore user session
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            try {
                currentUser = JSON.parse(savedUser);
                const mainAppElement = document.getElementById('main-app');
                if (mainAppElement) {
                    mainAppElement.style.display = 'block';
                }
                
                // Show home page
                const homePage = document.getElementById('page-home');
                if (homePage) {
                    homePage.classList.add('active');
                }
                
                updateUserDisplay(currentUser.name || currentUser.username);
            } catch (parseError) {
                console.error('Error parsing user session:', parseError);
                localStorage.removeItem('currentUser');
                window.location.href = 'login.html';
            }
        } else {
            // Check if this is index.html and user is not logged in - redirect to login
            if (!window.location.pathname.includes('login.html') && !window.location.pathname.includes('register.html')) {
                window.location.href = 'login.html';
            }
        }
    } catch (error) {
        console.error('Error initializing app:', error);
    }
});
