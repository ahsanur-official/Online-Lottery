// =============================================
// GLOBAL VARIABLES & DATA STORAGE
// =============================================

// Theme Management
function initializeTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
  updateThemeIcon();
}

function updateThemeIcon() {
  const themeIcon = document.querySelector(".theme-icon");
  if (themeIcon) {
    const isDark = document.body.classList.contains("dark-mode");
    themeIcon.textContent = isDark ? "☀️" : "🌙";
  }
}

function toggleTheme() {
  const themeButtons = document.querySelectorAll(
    ".theme-toggle, .auth-theme-toggle",
  );

  // Add switching animation to all theme buttons
  themeButtons.forEach((btn) => {
    btn.classList.add("switching");
    setTimeout(() => btn.classList.remove("switching"), 600);
  });

  // Add page transition effect
  document.body.classList.add("theme-transitioning");

  setTimeout(() => {
    document.body.classList.remove("theme-transitioning");
    document.body.classList.add("theme-transitioning-reverse");

    // Toggle the theme
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    // Update theme icon
    updateThemeIcon();

    setTimeout(() => {
      document.body.classList.remove("theme-transitioning-reverse");
    }, 300);
  }, 150);
}

// Initialize theme on page load
initializeTheme();

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem("currentUser") !== null;
}

// Get current user
function getCurrentUser() {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
}

// Initialize sample data if not exists
function initializeData() {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([]));
  }

  if (!localStorage.getItem("tickets")) {
    localStorage.setItem("tickets", JSON.stringify([]));
  }

  if (!localStorage.getItem("draws")) {
    const sampleDraws = [
      {
        id: 1,
        name: "Mega Fortune",
        prize: "🏆 10,000 to 1,000 BDT",
        date: "Next Friday 8 PM",
        price: 1,
        type: "mega",
        poolSize: 500000,
        status: "upcoming",
        country: "Bangladesh",
      },
      {
        id: 2,
        name: "Power Win",
        prize: "⚡ 10,000 to 1,000 BDT",
        date: "Next Friday 8 PM",
        price: 1,
        type: "power",
        poolSize: 500000,
        status: "upcoming",
        country: "Bangladesh",
      },
      {
        id: 3,
        name: "Daily Gold",
        prize: "🌟 10,000 to 1,000 BDT",
        date: "Next Friday 8 PM",
        price: 1,
        type: "daily",
        poolSize: 500000,
        status: "upcoming",
        country: "Bangladesh",
      },
      {
        id: 4,
        name: "Diamond Draw",
        prize: "💎 10,000 to 1,000 BDT",
        date: "Next Friday 8 PM",
        price: 1,
        type: "instant",
        poolSize: 500000,
        status: "upcoming",
        country: "Bangladesh",
      },
    ];
    localStorage.setItem("draws", JSON.stringify(sampleDraws));
  }

  if (!localStorage.getItem("results")) {
    const sampleResults = [
      {
        id: 1,
        lottery: "Mega Fortune",
        drawDate: "Jan 17, 2026",
        drawTime: "8:00 PM",
        winningTickets: [
          "5834729165",
          "9274618354",
          "1928374651",
          "7462918354",
          "3847562918",
        ],
        prizes: [10000, 5000, 1000, 1000, 1000, 1000, 1000],
        winners: [
          { ticketNumber: "5834729165", prize: 10000, username: "lucky_one" },
          {
            ticketNumber: "9274618354",
            prize: 5000,
            username: "fortune_seeker",
          },
          {
            ticketNumber: "1928374651",
            prize: 1000,
            username: "golden_player",
          },
          { ticketNumber: "7462918354", prize: 1000, username: "smart_gamer" },
          { ticketNumber: "3847562918", prize: 1000, username: "dream_winner" },
          { ticketNumber: "2019384756", prize: 1000, username: "lucky_bd" },
          { ticketNumber: "6574829103", prize: 1000, username: "future_rich" },
        ],
      },
      {
        id: 2,
        lottery: "Power Win",
        drawDate: "Jan 10, 2026",
        drawTime: "8:00 PM",
        winningTickets: ["4729183654", "8374619283", "2947183649"],
        prizes: [10000, 5000, 1000, 1000, 1000, 1000, 1000],
        winners: [
          { ticketNumber: "4729183654", prize: 10000, username: "dhaka_lucky" },
          {
            ticketNumber: "8374619283",
            prize: 5000,
            username: "chittagong_star",
          },
        ],
      },
    ];
    localStorage.setItem("results", JSON.stringify(sampleResults));
  }

  if (!localStorage.getItem("updates")) {
    const sampleUpdates = [
      {
        id: 1,
        date: "Jan 23, 2026",
        title: "🎉 New Mega Jackpot Alert!",
        content:
          "The Mega Millions jackpot has reached $50 million! Don't miss your chance to win big. Buy your tickets now!",
      },
      {
        id: 2,
        date: "Jan 22, 2026",
        title: "⚡ Flash Sale on PowerBall Tickets",
        content:
          "Get 20% off on all PowerBall Plus tickets today only! Limited time offer.",
      },
      {
        id: 3,
        date: "Jan 21, 2026",
        title: "🏆 Record Breaking Winner!",
        content:
          "Congratulations to our latest winner who won $5 million in the Daily Gold lottery. Could you be next?",
      },
    ];
    localStorage.setItem("updates", JSON.stringify(sampleUpdates));
  }
}

// =============================================
// INDEX PAGE FUNCTIONALITY
// =============================================

if (
  window.location.pathname.includes("index.html") ||
  window.location.pathname.endsWith("/")
) {
  document.addEventListener("DOMContentLoaded", function () {
    initializeData();

    const authModal = document.getElementById("auth-modal");
    const mainContent = document.getElementById("main-content");
    const loginBtn = document.getElementById("login-btn");
    const registerBtn = document.getElementById("register-btn");

    // Check if user is already logged in
    if (isLoggedIn()) {
      authModal.style.display = "none";
      mainContent.style.display = "block";
      loadHomePage();
    } else {
      authModal.style.display = "flex";
      mainContent.style.display = "none";
    }

    // Button event listeners - Navigation handled by index.html
    // Removed window.location.href redirects - use SPA navigation instead

    // Logout functionality - Handled by index.html SPA system
  });
}

function loadHomePage() {
  const user = getCurrentUser();

  // Update user initial
  const userInitial = document.getElementById("user-initial");
  if (userInitial && user) {
    userInitial.textContent = user.name.charAt(0).toUpperCase();
  }

  // Load upcoming draws
  loadUpcomingDraws();

  // Load recent results
  loadRecentResults();
}

function loadUpcomingDraws() {
  const drawsContainer = document.getElementById("upcoming-draws");
  if (!drawsContainer) return;

  const draws = JSON.parse(localStorage.getItem("draws") || "[]");

  if (draws.length === 0) {
    drawsContainer.innerHTML = "<p>No upcoming draws at the moment.</p>";
    return;
  }

  drawsContainer.innerHTML = draws
    .map(
      (draw) => `
        <div class="draw-card">
            <div class="draw-badge">Upcoming</div>
            <h3 class="draw-title">${draw.name}</h3>
            <p class="draw-prize">${draw.prize}</p>
            <p class="draw-info">🕐 Draw Date: ${draw.date}</p>
            <p class="draw-info">💵 Ticket Price: $${draw.price}</p>
            <a href="#" data-page="buy-ticket" class="btn-primary" style="margin-top: 15px; text-decoration: none;">Buy Tickets</a>
        </div>
    `,
    )
    .join("");
}

function loadRecentResults() {
  const resultsContainer = document.getElementById("recent-results");
  if (!resultsContainer) return;

  const results = JSON.parse(localStorage.getItem("results") || "[]");

  if (results.length === 0) {
    resultsContainer.innerHTML = "<p>No recent results available.</p>";
    return;
  }

  resultsContainer.innerHTML = results
    .map(
      (result) => `
        <div class="result-card">
            <h3 class="draw-title">${result.lottery}</h3>
            <p class="draw-info">📅 Draw Date: ${result.drawDate}</p>
            <p class="draw-info" style="font-weight: 600; color: var(--primary-color);">
                🎱 Winning Numbers: ${result.winningNumbers.join(", ")}
            </p>
            <p class="draw-info">⭐ Bonus: ${result.bonusNumber}</p>
            <p class="draw-prize" style="font-size: 1.5rem;">${result.prize}</p>
        </div>
    `,
    )
    .join("");
}

// =============================================
// LOGIN PAGE FUNCTIONALITY
// =============================================

if (window.location.pathname.includes("login.html")) {
  document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(
          (u) =>
            (u.email === username || u.username === username) &&
            u.password === password,
        );

        if (user) {
          localStorage.setItem(
            "currentUser",
            JSON.stringify({
              id: user.id,
              name: user.name,
              email: user.email,
              username: user.username,
            }),
          );
          showSuccess(
            "✅ Login Successful",
            "Welcome back! Redirecting to dashboard...",
          );
          if (typeof navigatePage === "function") navigatePage("dashboard");
        } else {
          showError(
            "❌ Login Failed",
            "Invalid credentials. Please try again or register a new account.",
          );
        }
      });
    }
  });
}

// =============================================
// REGISTER PAGE FUNCTIONALITY
// =============================================

// Page detection - Check if register page is active
if (document.getElementById("page-register")?.classList.contains("active")) {
  document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");

    if (registerForm) {
      registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const fullname = document.getElementById("fullname").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("reg-password").value;
        const confirmPassword =
          document.getElementById("confirm-password").value;

        // Validation
        if (password !== confirmPassword) {
          showError("❌ Password Mismatch", "Passwords do not match!");
          return;
        }

        if (password.length < 6) {
          showWarning(
            "⚠️ Weak Password",
            "Password must be at least 6 characters long!",
          );
          return;
        }

        const users = JSON.parse(localStorage.getItem("users") || "[]");

        // Check if email already exists
        if (users.some((u) => u.email === email)) {
          showWarning(
            "⚠️ Email Already Registered",
            "This email is already registered! Please login instead.",
          );
          return;
        }

        // Create new user
        const newUser = {
          id: Date.now(),
          name: fullname,
          email: email,
          username: email.split("@")[0],
          password: password,
          createdAt: new Date().toISOString(),
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        // Auto login
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            username: newUser.username,
          }),
        );

        showSuccess(
          "✅ Welcome Aboard!",
          "Registration successful! Welcome to Golden Lottery BD!",
        );
        window.location.href = "dashboard.html";
      });
    }
  });
}

// =============================================
// COMMON FUNCTIONS FOR ALL PAGES
// =============================================

document.addEventListener("DOMContentLoaded", function () {
  // Initialize theme
  initializeTheme();

  // Setup theme toggle button (desktop)
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    // Set initial icon
    const isDark = document.body.classList.contains("dark-mode");
    const themeIcon = themeToggle.querySelector(".theme-icon");
    if (themeIcon) {
      themeIcon.textContent = isDark ? "☀️" : "🌙";
    }

    themeToggle.addEventListener("click", toggleTheme);
  }

  // Setup mobile theme toggle
  const mobileThemeToggle = document.getElementById("mobile-theme-toggle");
  if (mobileThemeToggle) {
    const isDark = document.body.classList.contains("dark-mode");
    const themeIcon = mobileThemeToggle.querySelector(".theme-icon");
    if (themeIcon) {
      themeIcon.textContent = isDark ? "☀️" : "🌙";
    }

    mobileThemeToggle.addEventListener("click", toggleTheme);
  }

  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const nav = document.getElementById("nav");
  if (mobileMenuToggle && nav) {
    // Show mobile-only elements
    const mobileMenuBottom = nav.querySelector(".mobile-menu-bottom");

    function updateMobileMenu() {
      if (window.innerWidth <= 768) {
        if (mobileMenuBottom) mobileMenuBottom.style.display = "flex";
      } else {
        if (mobileMenuBottom) mobileMenuBottom.style.display = "none";
        nav.classList.remove("active");
      }
    }

    updateMobileMenu();
    window.addEventListener("resize", updateMobileMenu);

    mobileMenuToggle.addEventListener("click", function () {
      nav.classList.toggle("active");
      this.textContent = nav.classList.contains("active") ? "✕" : "☰";
    });

    // Mobile profile dropdown toggle
    const mobileProfileTrigger = document.getElementById(
      "mobile-profile-trigger",
    );
    const mobileProfileDropdown = document.getElementById(
      "mobile-profile-dropdown",
    );

    if (mobileProfileTrigger && mobileProfileDropdown) {
      mobileProfileTrigger.addEventListener("click", function (e) {
        e.stopPropagation();
        this.classList.toggle("active");

        if (
          mobileProfileDropdown.style.display === "none" ||
          !mobileProfileDropdown.style.display
        ) {
          mobileProfileDropdown.style.display = "block";
        } else {
          mobileProfileDropdown.style.display = "none";
        }
      });

      // Close dropdown when clicking outside
      document.addEventListener("click", function (e) {
        if (!e.target.closest(".mobile-profile-section")) {
          mobileProfileDropdown.style.display = "none";
          mobileProfileTrigger.classList.remove("active");
        }
      });
    }

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".header")) {
        nav.classList.remove("active");
        if (mobileMenuToggle) {
          mobileMenuToggle.textContent = "☰";
        }
        if (mobileProfileDropdown) {
          mobileProfileDropdown.style.display = "none";
        }
        if (mobileProfileTrigger) {
          mobileProfileTrigger.classList.remove("active");
        }
      }
    });

    // Close menu when clicking a link
    const navLinks = nav.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        nav.classList.remove("active");
        mobileMenuToggle.textContent = "☰";
      });
    });

    // Mobile logout button
    const mobileLogout = document.getElementById("mobile-logout-btn");
    if (mobileLogout) {
      mobileLogout.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("currentUser");
        showSuccess("👋 Logged Out", "You have been logged out successfully!", 1500);
        setTimeout(() => {
          window.location.replace("login.html");
        }, 1500);
      });
    }
  }

  // NOTE: Authentication checks are handled by index.html and auth pages only
  // Do not add conflicting auth logic here to prevent redirect loops

  // Update user profile icon on all pages
  const userInitial = document.getElementById("user-initial");
  const mobileUserInitial = document.getElementById("mobile-user-initial");
  const user = getCurrentUser();
  if (userInitial && user) {
    userInitial.textContent = user.name.charAt(0).toUpperCase();
  }
  if (mobileUserInitial && user) {
    mobileUserInitial.textContent = user.name.charAt(0).toUpperCase();
  }

  // Update mobile user info
  const mobileUserName = document.getElementById("mobile-user-name");
  const mobileUserEmail = document.getElementById("mobile-user-email");
  if (mobileUserName && user) {
    mobileUserName.textContent = user.name;
  }
  if (mobileUserEmail && user) {
    mobileUserEmail.textContent = user.email;
  }

  // Logout functionality for all pages
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("currentUser");
        window.location.href = "index.html";
      }
    });
  }

  // Profile dropdown toggle
  const profileIcon = document.getElementById("profile-icon");
  if (profileIcon) {
    profileIcon.addEventListener("click", function () {
      const dropdown = document.getElementById("dropdown");
      if (dropdown) {
        dropdown.style.display =
          dropdown.style.display === "block" ? "none" : "block";
      }
    });
  }
});

// =============================================
// PROFILE PAGE FUNCTIONALITY
// =============================================

document.addEventListener("DOMContentLoaded", function () {
  loadProfile();
  setupProfileEventListeners();
});

function loadProfile() {
  const user = getCurrentUser();
  if (!user) {
    if (typeof navigatePage === "function") navigatePage("login");
    return;
  }

  // Update avatar
  const avatarInitial = document.getElementById("avatar-initial");
  const userInitial = document.getElementById("user-initial");
  if (avatarInitial && user) {
    avatarInitial.textContent = user.name.charAt(0).toUpperCase();
  }
  if (userInitial && user) {
    userInitial.textContent = user.name.charAt(0).toUpperCase();
  }

  // Load user profile data
  loadUserData();

  // Load account statistics
  loadAccountStats();
}

function loadUserData() {
  const user = getCurrentUser();
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const fullUser = users.find((u) => u.id === user.id);

  if (!fullUser) return;

  // Populate form fields
  const fields = {
    "full-name": fullUser.name || "",
    email: fullUser.email || "",
    phone: fullUser.phone || "",
    dob: fullUser.dob || "",
    address: fullUser.address || "",
    city: fullUser.city || "",
    country: fullUser.country || "",
  };

  Object.entries(fields).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) {
      element.value = value;
    }
  });

  // Load preferences
  if (fullUser.preferences) {
    document.getElementById("email-notif").checked =
      fullUser.preferences.emailNotif !== false;
    document.getElementById("sms-notif").checked =
      fullUser.preferences.smsNotif === true;
    document.getElementById("promo-notif").checked =
      fullUser.preferences.promoNotif !== false;
  }
}

function loadAccountStats() {
  const user = getCurrentUser();
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const fullUser = users.find((u) => u.id === user.id);
  const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
  const userTickets = tickets.filter((t) => t.userId === user.id);

  // Calculate statistics
  const totalSpent = userTickets.reduce((sum, t) => sum + (t.price || 0), 0);
  const totalWon = userTickets
    .filter((t) => t.status === "won")
    .reduce((sum, t) => sum + (t.winAmount || 0), 0);

  // Update DOM
  document.getElementById("member-since").textContent = new Date(
    fullUser.createdAt || Date.now(),
  ).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  document.getElementById("total-spent").textContent =
    "$" + totalSpent.toFixed(2);
  document.getElementById("total-won").textContent = "$" + totalWon.toFixed(2);
}

function setupProfileEventListeners() {
  // Profile form submission
  const profileForm = document.getElementById("profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", function (e) {
      e.preventDefault();
      saveProfileData();
    });
  }

  // Security form submission
  const securityForm = document.getElementById("security-form");
  if (securityForm) {
    securityForm.addEventListener("submit", function (e) {
      e.preventDefault();
      updatePassword();
    });
  }

  // Avatar change button
  const changeAvatarBtn = document.getElementById("change-avatar-btn");
  if (changeAvatarBtn) {
    changeAvatarBtn.addEventListener("click", function () {
      showInfo(
        "🎨 Coming Soon",
        "Avatar customization feature will be available very soon!",
      );
    });
  }

  // Preference toggles
  ["email-notif", "sms-notif", "promo-notif"].forEach((id) => {
    const toggle = document.getElementById(id);
    if (toggle) {
      toggle.addEventListener("change", function () {
        savePreferences();
      });
    }
  });
}

function saveProfileData() {
  const user = getCurrentUser();
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const userIndex = users.findIndex((u) => u.id === user.id);

  if (userIndex === -1) return;

  // Get form data
  const formData = {
    name: document.getElementById("full-name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    dob: document.getElementById("dob").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    country: document.getElementById("country").value,
  };

  // Update user data
  users[userIndex] = { ...users[userIndex], ...formData };
  localStorage.setItem("users", JSON.stringify(users));

  // Update current user session
  localStorage.setItem(
    "currentUser",
    JSON.stringify({
      id: user.id,
      name: formData.name,
      email: formData.email,
      username: user.username,
    }),
  );

  // Show success message
  showSuccessMessage("✅ Profile updated successfully!");

  // Reload page to reflect changes
  setTimeout(() => {
    window.location.reload();
  }, 1500);
}

function updatePassword() {
  const currentPassword = document.getElementById("current-password").value;
  const newPassword = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Validation
  if (!currentPassword || !newPassword || !confirmPassword) {
    showError("❌ Incomplete Form", "Please fill in all password fields.");
    return;
  }

  if (newPassword !== confirmPassword) {
    showError("❌ Password Mismatch", "New passwords do not match!");
    return;
  }

  if (newPassword.length < 6) {
    showWarning(
      "⚠️ Weak Password",
      "New password must be at least 6 characters long!",
    );
    return;
  }

  // Verify current password
  const user = getCurrentUser();
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const userIndex = users.findIndex((u) => u.id === user.id);

  if (userIndex === -1) return;

  if (users[userIndex].password !== currentPassword) {
    showError("🔐 Wrong Password", "Current password is incorrect!");
    return;
  }

  // Update password
  users[userIndex].password = newPassword;
  localStorage.setItem("users", JSON.stringify(users));

  // Clear form
  document.getElementById("security-form").reset();

  showSuccessMessage("✅ Password updated successfully!");
}

function savePreferences() {
  const user = getCurrentUser();
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const userIndex = users.findIndex((u) => u.id === user.id);

  if (userIndex === -1) return;

  // Get preferences
  const preferences = {
    emailNotif: document.getElementById("email-notif").checked,
    smsNotif: document.getElementById("sms-notif").checked,
    promoNotif: document.getElementById("promo-notif").checked,
  };

  // Update user preferences
  users[userIndex].preferences = preferences;
  localStorage.setItem("users", JSON.stringify(users));

  showSuccessMessage("✅ Preferences saved!");
}

function showSuccessMessage(message) {
  const existingAlert = document.querySelector(".success-alert");
  if (existingAlert) {
    existingAlert.remove();
  }

  const alert = document.createElement("div");
  alert.className = "success-alert";
  alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success-gradient);
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
  alert.textContent = message;
  document.body.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 3000);
}

// Helper function
function getCurrentUser() {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
}

// =============================================
// DASHBOARD PAGE FUNCTIONALITY - BANGLADESH LOTTERY
// =============================================

document.addEventListener("DOMContentLoaded", function () {
  loadDashboard();
  setupEventListeners();
});

function loadDashboard() {
  const user = getCurrentUser();
  if (!user) {
    // User not logged in - should not happen as index.html checks this
    return;
  }

  // Update user name
  const userName = document.getElementById("user-name");
  if (userName) {
    userName.textContent = user.name || user.username;
  }

  // Load statistics
  loadStatistics();

  // Load user tickets
  loadMyTickets();

  // Load lottery history with filtering
  loadTicketHistory();

  // Load winners information
  loadWinnersInfo();

  // Load updates
  loadUpdates();
}

function loadStatistics() {
  const user = getCurrentUser();
  const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
  const userTickets = tickets.filter((t) => t.userId === user.id);

  // Calculate statistics
  const totalTickets = userTickets.length;
  const wonTickets = userTickets.filter((t) => t.status === "won").length;
  const totalSpent = userTickets.length * 1; // 1 BDT per ticket
  const totalWinnings = userTickets
    .filter((t) => t.status === "won")
    .reduce((sum, t) => sum + (t.prizeWon || 0), 0);
  const pendingDraws = userTickets.filter((t) => t.status === "pending").length;

  // Update DOM
  document.getElementById("total-tickets").textContent = totalTickets;
  document.getElementById("total-wins").textContent = wonTickets;
  document.getElementById("total-spent").textContent = totalSpent + " BDT";
  document.getElementById("total-winnings").textContent =
    totalWinnings.toLocaleString() + " BDT";
  document.getElementById("pending-draws").textContent = pendingDraws;
}

function loadMyTickets() {
  const user = getCurrentUser();
  const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
  const userTickets = tickets.filter((t) => t.userId === user.id).slice(0, 5);
  const container = document.getElementById("my-tickets");

  if (!container) return;

  if (userTickets.length === 0) {
    container.innerHTML = `
            <div style="text-align: center; padding: 40px; grid-column: 1 / -1;">
                <p style="font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 20px;">
                    🎟️ You don't have any tickets yet.
                </p>
                <a href="#" data-page="buy-ticket" class="btn-primary" style="text-decoration: none;">
                    🛒 Buy Your First Ticket
                </a>
            </div>
        `;
    return;
  }

  container.innerHTML = userTickets
    .map(
      (ticket) => `
        <div class="ticket-card" style="padding: 15px; background: var(--bg-secondary); border-radius: 8px; border-left: 4px solid var(--primary-color);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <strong style="color: var(--primary-color);">🎫 Ticket #${ticket.ticketNumber}</strong>
                <span class="ticket-status status-${ticket.status}" style="padding: 4px 10px; border-radius: 20px; font-size: 0.85rem; ${ticket.status === "won" ? "background: var(--success-gradient);" : ticket.status === "pending" ? "background: var(--primary-gradient);" : "background: var(--danger-gradient);"} color: white;">
                    ${ticket.status === "won" ? "✅ WON - " + (ticket.prizeWon || 0) + " BDT" : ticket.status === "pending" ? "⏳ PENDING" : "❌ NOT WON"}
                </span>
            </div>
            <div style="font-size: 0.9rem; color: var(--text-secondary);">
                <div>🎰 ${ticket.lotteryName}</div>
                <div>📅 Draw: ${ticket.drawDate}</div>
                <div>💳 Payment: ${ticket.paymentMethod.toUpperCase()}</div>
                <div>🔢 Ticket ID: ${ticket.transactionId}</div>
            </div>
        </div>
    `,
    )
    .join("");
}

function loadTicketHistory() {
  const user = getCurrentUser();
  const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
  const userTickets = tickets.filter((t) => t.userId === user.id);
  const container = document.getElementById("ticket-history");

  if (!container) return;

  const allTickets = userTickets.length;
  const currentTickets = userTickets.filter(
    (t) => t.status === "pending",
  ).length;
  const pastTickets = userTickets.filter((t) => t.status !== "pending").length;

  let html = `
        <div style="display: flex; gap: 15px; margin-bottom: 20px; flex-wrap: wrap;">
            <button onclick="filterTickets('all')" class="tab-btn" data-filter="all" style="background: var(--primary-gradient); color: white;">
                📊 All Tickets (${allTickets})
            </button>
            <button onclick="filterTickets('current')" class="tab-btn" data-filter="current">
                ⏳ Current (${currentTickets})
            </button>
            <button onclick="filterTickets('past')" class="tab-btn" data-filter="past">
                ✅ Past (${pastTickets})
            </button>
        </div>
        <div id="tickets-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px;">
    `;

  // Show all tickets by default
  html += userTickets
    .map(
      (ticket) => `
        <div class="ticket-history-card" data-status="${ticket.status}" style="padding: 15px; background: var(--bg-secondary); border-radius: 8px; border: 2px solid ${ticket.status === "won" ? "var(--success-color)" : ticket.status === "pending" ? "var(--primary-color)" : "#ccc"};">
            <div style="font-weight: 600; color: var(--primary-color); margin-bottom: 10px;">
                Ticket #${ticket.ticketNumber}
            </div>
            <div style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 10px;">
                <div>🎰 ${ticket.lotteryName}</div>
                <div>📅 Purchase: ${ticket.purchaseDate} ${ticket.purchaseTime}</div>
                <div>🎯 Draw: ${ticket.drawDate}</div>
                <div>💰 Price: 1 BDT</div>
            </div>
            <div style="padding-top: 10px; border-top: 1px solid var(--primary-color);">
                ${
                  ticket.status === "won"
                    ? `<div style="color: var(--success-color); font-weight: 600;">🎉 WON: ${ticket.prizeWon} BDT!</div>`
                    : ticket.status === "pending"
                      ? '<div style="color: var(--primary-color);">⏳ Awaiting Draw</div>'
                      : '<div style="color: #999;">❌ No Prize</div>'
                }
            </div>
        </div>
    `,
    )
    .join("");

  html += `</div>`;
  container.innerHTML = html;
}
function loadWinnersInfo() {
  const results = JSON.parse(localStorage.getItem("results") || "[]");
  const winnersContainer = document.getElementById("winners-info");

  if (!winnersContainer) return;

  if (results.length === 0) {
    winnersContainer.innerHTML =
      '<p style="text-align: center;">No winners announced yet.</p>';
    return;
  }

  let html =
    '<h3 style="margin-bottom: 20px; color: var(--primary-color);">🏆 Recent Winners</h3>';
  html +=
    '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px;">';

  results.forEach((result) => {
    html += `
            <div style="padding: 15px; background: var(--gold-gradient); border-radius: 8px; color: white;">
                <h4 style="margin: 0 0 10px 0;">🎰 ${result.lottery}</h4>
                <div style="font-size: 0.9rem; margin-bottom: 10px;">
                    <div>📅 Draw Date: ${result.drawDate}</div>
                    <div>⏰ Time: ${result.drawTime}</div>
                </div>
                <div style="background: rgba(255,255,255,0.2); padding: 10px; border-radius: 5px;">
                    <strong>🎁 Prize Winners:</strong>
                    ${result.winners
                      .slice(0, 3)
                      .map(
                        (w) => `
                        <div style="font-size: 0.85rem; margin-top: 5px;">
                            🏅 @${w.username}: <strong>${w.prize} BDT</strong>
                        </div>
                    `,
                      )
                      .join("")}
                    ${result.winners.length > 3 ? `<div style="font-size: 0.85rem; margin-top: 5px; font-style: italic;">+ ${result.winners.length - 3} more winners</div>` : ""}
                </div>
            </div>
        `;
  });

  html += "</div>";
  winnersContainer.innerHTML = html;
}

function filterTickets(filter) {
  const cards = document.querySelectorAll(".ticket-history-card");
  const tabs = document.querySelectorAll(".tab-btn");

  // Update active tab
  tabs.forEach((tab) => (tab.style.background = "transparent"));
  event.target.style.background = "var(--primary-gradient)";
  event.target.style.color = "white";

  // Filter cards
  cards.forEach((card) => {
    const status = card.getAttribute("data-status");

    if (filter === "all") {
      card.style.display = "block";
    } else if (filter === "current") {
      card.style.display = status === "pending" ? "block" : "none";
    } else if (filter === "past") {
      card.style.display = status !== "pending" ? "block" : "none";
    }
  });
}
tab.addEventListener("click", function () {
  const filter = this.getAttribute("data-filter");

  // Update active tab
  tabs.forEach((t) => t.classList.remove("active"));
  this.classList.add("active");

  // Filter rows

  function loadUpdates() {
    const updates = JSON.parse(localStorage.getItem("updates") || "[]");
    const container = document.getElementById("updates-container");

    if (!container) return;

    let html =
      '<h3 style="margin-bottom: 20px; color: var(--primary-color);">📰 Latest Announcements</h3>';
    html += '<div style="display: grid; gap: 15px;">';

    if (updates.length === 0) {
      html += "<p>No announcements yet.</p>";
    } else {
      html += updates
        .map(
          (update) => `
            <div style="padding: 15px; background: var(--bg-secondary); border-radius: 8px; border-left: 4px solid var(--primary-color);">
                <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 5px;">📅 ${update.date}</div>
                <h4 style="margin: 5px 0; color: var(--primary-color);">${update.title}</h4>
                <p style="margin: 10px 0 0 0; color: var(--text-secondary);">${update.content}</p>
            </div>
        `,
        )
        .join("");
    }

    html += "</div>";
    container.innerHTML = html;
  }

  function setupEventListeners() {
    // Setup filter buttons
    const filterButtons = document.querySelectorAll(
      '[onclick^="filterTickets"]',
    );
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
      });
    });
  }

  // Helper function - get current user
  function getCurrentUser() {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  }
});

// =============================================
// BUY TICKET PAGE FUNCTIONALITY - BANGLADESH LOTTERY
// =============================================

const TICKET_PRICE = 1; // 1 BDT per ticket
const MAX_TICKETS = 100; // Can buy up to 100 tickets at once
const DRAW_DAY = 5; // Friday (0=Sunday, 5=Friday)
const DRAW_TIME = "20:00"; // 8 PM
const PURCHASE_START = 10; // Saturday 10 AM
const PURCHASE_END = 18; // Friday 6 PM

let selectedLottery = null;
let ticketQuantity = 1;

// Prize tiers: 7 prizes total
const PRIZE_TIERS = [
  { position: 1, amount: 10000, count: 1 },
  { position: 2, amount: 5000, count: 1 },
  { position: 3, amount: 1000, count: 5 },
];

// Payment methods (Bangladesh)
const PAYMENT_METHODS = [
  { id: "bkash", name: "bKash", icon: "📱" },
  { id: "nagad", name: "Nagad", icon: "📲" },
  { id: "rocket", name: "Rocket", icon: "🚀" },
];

document.addEventListener("DOMContentLoaded", function () {
  initializeBuyTicketPage();
  setupEventListeners();
  updatePaymentMethods();
  checkPurchaseAvailability();
});

function initializeBuyTicketPage() {
  const user = getCurrentUser();
  if (!user) {
    if (typeof navigatePage === "function") navigatePage("login");
    return;
  }

  // Initialize with default lottery
  const firstCard = document.querySelector(".lottery-type-card");
  if (firstCard) {
    selectLottery(firstCard);
  }
}

function setupEventListeners() {
  // Lottery type selection
  const lotteryCards = document.querySelectorAll(".lottery-type-card");
  lotteryCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      e.preventDefault();
      selectLottery(this);
    });
  });

  // Quantity controls
  const qtyIncrease = document.getElementById("qty-increase");
  const qtyDecrease = document.getElementById("qty-decrease");
  const qtyInput = document.getElementById("ticket-quantity");

  if (qtyIncrease) {
    qtyIncrease.addEventListener("click", () => {
      if (ticketQuantity < MAX_TICKETS) {
        ticketQuantity++;
        if (qtyInput) qtyInput.value = ticketQuantity;
        updateOrderSummary();
      }
    });
  }

  if (qtyDecrease) {
    qtyDecrease.addEventListener("click", () => {
      if (ticketQuantity > 1) {
        ticketQuantity--;
        if (qtyInput) qtyInput.value = ticketQuantity;
        updateOrderSummary();
      }
    });
  }

  if (qtyInput) {
    qtyInput.addEventListener("change", () => {
      let value = parseInt(qtyInput.value) || 1;
      if (value > MAX_TICKETS) value = MAX_TICKETS;
      if (value < 1) value = 1;
      ticketQuantity = value;
      qtyInput.value = ticketQuantity;
      updateOrderSummary();
    });
  }

  // Payment method selection
  const paymentOptions = document.querySelectorAll(".payment-option input");
  paymentOptions.forEach((option) => {
    option.addEventListener("change", updateOrderSummary);
  });

  // Purchase button
  const purchaseBtn = document.getElementById("purchase-btn");
  if (purchaseBtn) {
    purchaseBtn.addEventListener("click", purchaseTickets);
  }
}

function updatePaymentMethods() {
  const paymentOptionsDiv = document.querySelector(".payment-options");
  if (!paymentOptionsDiv) return;

  paymentOptionsDiv.innerHTML = "";
  PAYMENT_METHODS.forEach((method, index) => {
    const label = document.createElement("label");
    label.className = "payment-option";
    label.innerHTML = `
            <input type="radio" name="payment-method" value="${method.id}" ${index === 0 ? "checked" : ""}>
            <span>${method.icon} ${method.name}</span>
        `;
    paymentOptionsDiv.appendChild(label);
  });
}

function selectLottery(card) {
  // Remove previous selection
  document.querySelectorAll(".lottery-type-card").forEach((c) => {
    c.classList.remove("selected");
  });

  // Add selection to current card
  card.classList.add("selected");

  // Extract lottery info
  selectedLottery = {
    type: card.getAttribute("data-type"),
    name:
      card.querySelector(".lottery-title")?.textContent ||
      card.querySelector("h3")?.textContent ||
      "Lottery",
    prize: card.querySelector(".lottery-prize")?.textContent || "$1,000,000",
    date: getNextDrawDate(),
    icon: card.querySelector(".lottery-icon")?.textContent || "🎰",
  };

  // Show quantity selector
  const quantitySection = document.getElementById("ticket-quantity-section");
  if (quantitySection) {
    quantitySection.style.display = "block";
  }

  updateOrderSummary();
}

function getNextDrawDate() {
  const now = new Date();
  const currentDay = now.getDay();
  let daysUntilFriday;

  if (currentDay <= DRAW_DAY) {
    daysUntilFriday = DRAW_DAY - currentDay;
  } else {
    daysUntilFriday = 7 - currentDay + DRAW_DAY;
  }

  if (daysUntilFriday === 0) {
    const drawTime = new Date();
    drawTime.setHours(20, 0, 0, 0);
    if (now > drawTime) {
      daysUntilFriday = 7;
    }
  }

  const drawDate = new Date(now);
  drawDate.setDate(drawDate.getDate() + daysUntilFriday);
  drawDate.setHours(20, 0, 0, 0);

  return (
    drawDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }) + " at 8 PM"
  );
}

function updateOrderSummary() {
  if (!selectedLottery) {
    showWarning(
      "⚠️ No Lottery Selected",
      "Please select a lottery first to continue",
    );
    return;
  }

  const totalPrice = TICKET_PRICE * ticketQuantity;
  const summaryDiv = document.querySelector(".order-summary-items");

  if (summaryDiv) {
    summaryDiv.innerHTML = `
            <div class="summary-row">
                <span>Lottery:</span>
                <strong>${selectedLottery.name}</strong>
            </div>
            <div class="summary-row">
                <span>Tickets:</span>
                <strong>${ticketQuantity} × ${TICKET_PRICE} BDT</strong>
            </div>
            <div class="summary-row">
                <span>Prize Pool:</span>
                <strong>${selectedLottery.prize}</strong>
            </div>
            <div class="summary-row">
                <span>Draw Date:</span>
                <strong>${selectedLottery.date}</strong>
            </div>
            <hr style="margin: 15px 0; border: 1px solid var(--primary-color);">
            <div class="summary-row" style="font-size: 1.2rem; font-weight: 700;">
                <span>Total Price:</span>
                <strong>${totalPrice} BDT</strong>
            </div>
        `;
  }
}

function checkPurchaseAvailability() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  let available = false;
  let message = "";

  if (day === 0) {
    // Sunday
    if (hour >= PURCHASE_START) available = true;
    else message = `Tickets available from Saturday ${PURCHASE_START}:00 AM`;
  } else if (day === 1 || day === 2 || day === 3 || day === 4) {
    // Mon-Thu
    available = true;
  } else if (day === 5) {
    // Friday
    if (hour < PURCHASE_END) available = true;
    else
      message =
        "Tickets closed for today. Next purchase window: Saturday 10:00 AM";
  } else if (day === 6) {
    // Saturday
    if (hour >= PURCHASE_START) available = true;
    else message = `Tickets available from ${PURCHASE_START}:00 AM`;
  }

  const purchaseBtn = document.getElementById("purchase-btn");
  if (purchaseBtn) {
    purchaseBtn.disabled = !available;
    if (!available) {
      purchaseBtn.textContent = `⏰ ${message || "Currently unavailable"}`;
    } else {
      purchaseBtn.textContent = "🎟️ Purchase Tickets";
    }
  }

  // Update every minute
  setTimeout(checkPurchaseAvailability, 60000);
}

function generateUniqueTicketNumber() {
  const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
  let ticketNumber;
  let exists = true;

  while (exists) {
    // Generate random 10-digit number
    ticketNumber = Math.floor(Math.random() * 9000000000) + 1000000000;

    // Check if it already exists
    exists = tickets.some((t) => t.ticketNumber === ticketNumber);
  }

  return ticketNumber;
}

function purchaseTickets() {
  if (!selectedLottery) {
    showError(
      "❌ Selection Required",
      "Please select a lottery to continue with purchase",
    );
    return;
  }

  const paymentMethod = document.querySelector(
    'input[name="payment-method"]:checked',
  );
  if (!paymentMethod) {
    showError(
      "❌ Payment Method Required",
      "Please select a payment method to complete purchase",
    );
    return;
  }

  const user = getCurrentUser();
  if (!user) {
    if (typeof navigatePage === "function") navigatePage("login");
    return;
  }

  // Generate tickets with unique numbers
  const newTickets = [];
  for (let i = 0; i < ticketQuantity; i++) {
    const ticket = {
      id: Date.now() + i,
      userId: user.id,
      username: user.username,
      ticketNumber: generateUniqueTicketNumber(),
      lottery: selectedLottery.type,
      lotteryName: selectedLottery.name,
      price: TICKET_PRICE,
      purchaseDate: new Date().toLocaleDateString("en-US"),
      purchaseTime: new Date().toLocaleTimeString("en-US"),
      drawDate: selectedLottery.date,
      drawDay: DRAW_DAY,
      drawTime: DRAW_TIME,
      status: "pending", // pending, won, lost
      prizeWon: null,
      paymentMethod: paymentMethod.value,
      transactionId: `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    };
    newTickets.push(ticket);
  }

  // Save tickets to localStorage
  const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
  tickets.push(...newTickets);
  localStorage.setItem("tickets", JSON.stringify(tickets));

  // Update user's wallet/balance (mock)
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const userIndex = users.findIndex((u) => u.id === user.id);
  if (userIndex !== -1) {
    if (!users[userIndex].spent) users[userIndex].spent = 0;
    users[userIndex].spent += TICKET_PRICE * ticketQuantity;
    localStorage.setItem("users", JSON.stringify(users));
  }

  // Show success modal
  showPurchaseSuccessModal(newTickets);

  // Reset form
  ticketQuantity = 1;
  selectedLottery = null;
}

function showPurchaseSuccessModal(tickets) {
  const successModal = document.getElementById("success-modal");
  if (!successModal) {
    console.error("Success modal not found");
    return;
  }

  const ticketsList = tickets
    .map(
      (t) => `
        <div class="ticket-receipt" style="margin: 10px 0; padding: 10px; background: var(--bg-secondary); border-radius: 8px; border-left: 3px solid var(--primary-color);">
            <div style="font-size: 0.9rem; color: var(--text-secondary);">Ticket #${t.ticketNumber}</div>
            <div style="font-weight: 600; color: var(--primary-color);">🎟️ ${t.lotteryName}</div>
            <div style="font-size: 0.85rem; margin-top: 5px;">
                <div>Purchase: ${t.purchaseDate} ${t.purchaseTime}</div>
                <div>Payment: ${t.paymentMethod.toUpperCase()}</div>
                <div>Status: Pending Draw (${t.drawDate})</div>
            </div>
        </div>
    `,
    )
    .join("");

  const modalContent = successModal.querySelector(".modal-content");
  modalContent.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 10px;">✅</div>
            <h2 style="color: var(--success-color); margin-bottom: 15px;">Purchase Successful!</h2>
            <p style="color: var(--text-secondary); margin-bottom: 20px;">
                ${tickets.length} ticket${tickets.length > 1 ? "s" : ""} purchased for ${TICKET_PRICE * tickets.length} BDT
            </p>
            
            <div style="text-align: left; max-height: 300px; overflow-y: auto; margin: 20px 0;">
                ${ticketsList}
            </div>
            
            <div style="background: var(--gold-gradient); padding: 15px; border-radius: 8px; margin: 20px 0; color: white;">
                <strong>📅 Draw Schedule:</strong>
                <div>Every Friday at 8:00 PM</div>
                <strong>💰 Prize Distribution:</strong>
                <div>Within 24 hours of draw</div>
            </div>
            
            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button onclick="closeSuccessModal()" class="btn-primary" style="flex: 1;">
                    Check My Tickets
                </button>
                <button onclick="buyMoreTickets()" class="btn-secondary" style="flex: 1;">
                    Buy More
                </button>
            </div>
        </div>
    `;

  successModal.style.display = "flex";
}

function closeSuccessModal() {
  const successModal = document.getElementById("success-modal");
  if (successModal) {
    successModal.style.display = "none";
  }
  // Navigate to dashboard
  if (typeof navigatePage === "function") navigatePage("dashboard");
}

function buyMoreTickets() {
  const successModal = document.getElementById("success-modal");
  if (successModal) {
    successModal.style.display = "none";
  }
  // Reset the form and stay on page
  document
    .querySelectorAll(".lottery-type-card")
    .forEach((c) => c.classList.remove("selected"));
  selectedLottery = null;
  ticketQuantity = 1;
  const qtyInput = document.getElementById("ticket-quantity");
  if (qtyInput) qtyInput.value = 1;
}

// Helper function
function getCurrentUser() {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
}

// =============================================
// CONTACT US & FAQ PAGES
// =============================================

function initializeFAQPage() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      const isVisible = answer.style.display === 'block';
      
      // Close all other answers
      document.querySelectorAll('.faq-answer').forEach(a => {
        a.style.display = 'none';
      });
      
      // Toggle current answer
      answer.style.display = isVisible ? 'none' : 'block';
    });
  });
}

function initializeContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      showAlert('✅ Success', 'আপনার বার্তা সফলভাবে পাঠানো হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।', 'success');
      this.reset();
    });
  }
}

// Initialize data on page load
initializeData();
