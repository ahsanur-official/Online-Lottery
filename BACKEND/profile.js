// =============================================
// PROFILE PAGE FUNCTIONALITY
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    loadProfile();
    setupProfileEventListeners();
});

function loadProfile() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    // Update avatar
    const avatarInitial = document.getElementById('avatar-initial');
    const userInitial = document.getElementById('user-initial');
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
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const fullUser = users.find(u => u.id === user.id);
    
    if (!fullUser) return;
    
    // Populate form fields
    const fields = {
        'full-name': fullUser.name || '',
        'email': fullUser.email || '',
        'phone': fullUser.phone || '',
        'dob': fullUser.dob || '',
        'address': fullUser.address || '',
        'city': fullUser.city || '',
        'country': fullUser.country || ''
    };
    
    Object.entries(fields).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.value = value;
        }
    });
    
    // Load preferences
    if (fullUser.preferences) {
        document.getElementById('email-notif').checked = fullUser.preferences.emailNotif !== false;
        document.getElementById('sms-notif').checked = fullUser.preferences.smsNotif === true;
        document.getElementById('promo-notif').checked = fullUser.preferences.promoNotif !== false;
    }
}

function loadAccountStats() {
    const user = getCurrentUser();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const fullUser = users.find(u => u.id === user.id);
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    const userTickets = tickets.filter(t => t.userId === user.id);
    
    // Calculate statistics
    const totalSpent = userTickets.reduce((sum, t) => sum + (t.price || 0), 0);
    const totalWon = userTickets
        .filter(t => t.status === 'won')
        .reduce((sum, t) => sum + (t.winAmount || 0), 0);
    
    // Update DOM
    document.getElementById('member-since').textContent = 
        new Date(fullUser.createdAt || Date.now()).toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
        });
    document.getElementById('total-spent').textContent = '$' + totalSpent.toFixed(2);
    document.getElementById('total-won').textContent = '$' + totalWon.toFixed(2);
}

function setupProfileEventListeners() {
    // Profile form submission
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProfileData();
        });
    }
    
    // Security form submission
    const securityForm = document.getElementById('security-form');
    if (securityForm) {
        securityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updatePassword();
        });
    }
    
    // Avatar change button
    const changeAvatarBtn = document.getElementById('change-avatar-btn');
    if (changeAvatarBtn) {
        changeAvatarBtn.addEventListener('click', function() {
            alert('🎨 Avatar customization coming soon!');
        });
    }
    
    // Preference toggles
    ['email-notif', 'sms-notif', 'promo-notif'].forEach(id => {
        const toggle = document.getElementById(id);
        if (toggle) {
            toggle.addEventListener('change', function() {
                savePreferences();
            });
        }
    });
}

function saveProfileData() {
    const user = getCurrentUser();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex === -1) return;
    
    // Get form data
    const formData = {
        name: document.getElementById('full-name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        dob: document.getElementById('dob').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        country: document.getElementById('country').value
    };
    
    // Update user data
    users[userIndex] = { ...users[userIndex], ...formData };
    localStorage.setItem('users', JSON.stringify(users));
    
    // Update current user session
    localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        name: formData.name,
        email: formData.email,
        username: user.username
    }));
    
    // Show success message
    showSuccessMessage('✅ Profile updated successfully!');
    
    // Reload page to reflect changes
    setTimeout(() => {
        window.location.reload();
    }, 1500);
}

function updatePassword() {
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
        alert('❌ Please fill in all password fields.');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        alert('❌ New passwords do not match!');
        return;
    }
    
    if (newPassword.length < 6) {
        alert('❌ New password must be at least 6 characters long!');
        return;
    }
    
    // Verify current password
    const user = getCurrentUser();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex === -1) return;
    
    if (users[userIndex].password !== currentPassword) {
        alert('❌ Current password is incorrect!');
        return;
    }
    
    // Update password
    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    
    // Clear form
    document.getElementById('security-form').reset();
    
    showSuccessMessage('✅ Password updated successfully!');
}

function savePreferences() {
    const user = getCurrentUser();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex === -1) return;
    
    // Get preferences
    const preferences = {
        emailNotif: document.getElementById('email-notif').checked,
        smsNotif: document.getElementById('sms-notif').checked,
        promoNotif: document.getElementById('promo-notif').checked
    };
    
    // Update user preferences
    users[userIndex].preferences = preferences;
    localStorage.setItem('users', JSON.stringify(users));
    
    showSuccessMessage('✅ Preferences saved!');
}

function showSuccessMessage(message) {
    const existingAlert = document.querySelector('.success-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alert = document.createElement('div');
    alert.className = 'success-alert';
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
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}
