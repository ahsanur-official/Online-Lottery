// =============================================
// PROFILE PAGE FUNCTIONALITY
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    loadProfilePage();
    setupProfileEventListeners();
});

function loadProfilePage() {
    const user = getCurrentUser();
    if (!user) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const fullUser = users.find((u) => u.id === user.id);

    if (!fullUser) return;

    // Update avatar initial
    const avatarInitial = document.getElementById('avatar-initial');
    if (avatarInitial) {
        avatarInitial.textContent = user.name.charAt(0).toUpperCase();
    }

    // Load user profile data
    loadUserProfileData(fullUser);

    // Load account statistics
    loadAccountStatistics(user);
}

function loadUserProfileData(user) {
    // Populate form fields
    const fields = {
        'full-name': user.name || '',
        'email': user.email || '',
        'phone': user.phone || '',
        'dob': user.dob || '',
        'address': user.address || '',
        'city': user.city || '',
        'country': user.country || ''
    };

    Object.entries(fields).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.value = value;
        }
    });

    // Load preferences
    if (user.preferences) {
        const prefs = ['email-notif', 'sms-notif', 'promo-notif'];
        prefs.forEach((pref) => {
            const el = document.getElementById(pref);
            if (el) {
                el.checked = user.preferences[pref.replace('-', '')] !== false;
            }
        });
    }
}

function loadAccountStatistics(user) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const fullUser = users.find((u) => u.id === user.id);
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    const userTickets = tickets.filter((t) => t.userId === user.id);

    // Calculate statistics
    const totalSpent = userTickets.reduce((sum, t) => sum + (t.price || 0), 0);
    const totalWon = userTickets
        .filter((t) => t.status === 'won')
        .reduce((sum, t) => sum + (t.winAmount || 0), 0);

    // Update DOM
    const memberSince = document.getElementById('member-since');
    if (memberSince) {
        memberSince.textContent = new Date(fullUser.createdAt || Date.now()).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });
    }

    const totalSpentEl = document.getElementById('total-spent');
    if (totalSpentEl) {
        totalSpentEl.textContent = '$' + totalSpent.toFixed(2);
    }

    const totalWonEl = document.getElementById('total-won');
    if (totalWonEl) {
        totalWonEl.textContent = '$' + totalWon.toFixed(2);
    }
}

function setupProfileEventListeners() {
    // Profile form submission
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function (e) {
            e.preventDefault();
            saveProfileData();
        });
    }

    // Security form submission
    const securityForm = document.getElementById('security-form');
    if (securityForm) {
        securityForm.addEventListener('submit', function (e) {
            e.preventDefault();
            updatePassword();
        });
    }

    // Avatar change button
    const changeAvatarBtn = document.getElementById('change-avatar-btn');
    if (changeAvatarBtn) {
        changeAvatarBtn.addEventListener('click', function () {
            showInfo('🎨 Coming Soon', 'Avatar customization feature will be available very soon!');
        });
    }

    // Preference toggles
    ['email-notif', 'sms-notif', 'promo-notif'].forEach((id) => {
        const toggle = document.getElementById(id);
        if (toggle) {
            toggle.addEventListener('change', function () {
                savePreferences();
            });
        }
    });
}

function saveProfileData() {
    const user = getCurrentUser();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u) => u.id === user.id);

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
    localStorage.setItem(
        'currentUser',
        JSON.stringify({
            id: user.id,
            name: formData.name,
            email: formData.email,
            username: user.username
        })
    );

    showSuccess('✅ Profile updated successfully!', '', 2000);
}

function updatePassword() {
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
        showError('❌ Incomplete Form', 'Please fill in all password fields');
        return;
    }

    if (newPassword !== confirmPassword) {
        showError('❌ Password Mismatch', 'New passwords do not match');
        return;
    }

    if (newPassword.length < 6) {
        showWarning('⚠️ Weak Password', 'Password must be at least 6 characters');
        return;
    }

    // Verify current password
    const user = getCurrentUser();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u) => u.id === user.id);

    if (userIndex === -1) return;

    if (users[userIndex].password !== currentPassword) {
        showError('❌ Wrong Password', 'Current password is incorrect');
        return;
    }

    // Update password
    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));

    // Clear form
    document.getElementById('security-form').reset();

    showSuccess('🔐 Password updated successfully!', '', 2000);
}

function savePreferences() {
    const user = getCurrentUser();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u) => u.id === user.id);

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

    showSuccess('✅ Preferences saved!', '', 1500);
}

function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}
