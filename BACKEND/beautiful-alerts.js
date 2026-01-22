/**
 * Beautiful Alert System
 * Modern, styled popups and notifications
 */

// Create alert container if it doesn't exist
function ensureAlertContainer() {
    if (!document.querySelector('.alert-container')) {
        const container = document.createElement('div');
        container.className = 'alert-container';
        document.body.appendChild(container);
    }
}

/**
 * Show Toast Notification (Bottom Right)
 * @param {string} message - Message to display
 * @param {string} type - 'success', 'error', 'warning', 'info' (default: 'info')
 * @param {number} duration - Duration in ms (default: 3000)
 */
function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast`;
    toast.style.background = {
        success: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
        error: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
        warning: 'linear-gradient(135deg, #FFC107 0%, #f57f17 100%)',
        info: 'linear-gradient(135deg, #2196F3 0%, #0d47a1 100%)'
    }[type] || 'rgba(0, 0, 0, 0.85)';
    
    toast.innerHTML = `${getIcon(type)} ${message}`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideInFromBottom 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

/**
 * Show Alert Notification (Top Right)
 * @param {string} title - Alert title
 * @param {string} message - Alert message
 * @param {string} type - 'success', 'error', 'warning', 'info'
 * @param {number} duration - Duration in ms (default: 4000, 0 = no auto-close)
 */
function showAlert(title, message, type = 'info', duration = 4000) {
    ensureAlertContainer();
    const container = document.querySelector('.alert-container');

    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <div class="alert-icon">${getIcon(type)}</div>
        <div class="alert-content">
            <div class="alert-title">${title}</div>
            <div class="alert-message">${message}</div>
        </div>
        <div class="alert-close" onclick="this.parentElement.remove()">✕</div>
        <div class="alert-progress"></div>
    `;

    container.appendChild(alert);

    if (duration > 0) {
        setTimeout(() => {
            alert.style.animation = 'slideInFromRight 0.3s ease reverse';
            setTimeout(() => alert.remove(), 300);
        }, duration);
    }

    return alert;
}

/**
 * Show Modal Alert (Full Screen)
 * @param {string} title - Modal title
 * @param {string} message - Modal message
 * @param {string} type - 'success', 'error', 'warning', 'info'
 * @param {object} options - Additional options {buttons: [{text: 'OK', onClick: function}]}
 */
function showModalAlert(title, message, type = 'info', options = {}) {
    const modal = document.createElement('div');
    modal.className = 'alert-modal';

    let buttonsHTML = '';
    if (options.buttons && Array.isArray(options.buttons)) {
        buttonsHTML = options.buttons.map((btn, idx) => `
            <button class="alert-modal-btn alert-modal-btn-${idx === 0 ? 'primary' : 'secondary'}" 
                    onclick="this.parentElement.parentElement.remove(); ${btn.onClick ? btn.onClick + '()' : ''}">
                ${btn.text}
            </button>
        `).join('');
    } else {
        buttonsHTML = `<button class="alert-modal-btn alert-modal-btn-primary" onclick="this.parentElement.parentElement.parentElement.remove()">OK</button>`;
    }

    modal.innerHTML = `
        <div class="alert-modal-content">
            <div class="alert-modal-icon">${getIcon(type)}</div>
            <div class="alert-modal-title">${title}</div>
            <div class="alert-modal-message">${message}</div>
            <div class="alert-modal-actions">
                ${buttonsHTML}
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });

    return modal;
}

/**
 * Show Confirmation Dialog
 * @param {string} title - Dialog title
 * @param {string} message - Dialog message
 * @param {function} onConfirm - Callback if user confirms
 * @param {function} onCancel - Callback if user cancels
 */
function showConfirm(title, message, onConfirm, onCancel) {
    showModalAlert(title, message, 'warning', {
        buttons: [
            { text: 'Confirm', onClick: onConfirm ? `() => { ${onConfirm.toString().match(/\{[\s\S]*\}/)[0]} }` : 'null' },
            { text: 'Cancel', onClick: onCancel ? `() => { ${onCancel.toString().match(/\{[\s\S]*\}/)[0]} }` : 'null' }
        ]
    });
}

/**
 * Show Success Alert
 * @param {string} title - Title
 * @param {string} message - Message
 * @param {number} duration - Duration in ms
 */
function showSuccess(title, message, duration = 4000) {
    return showAlert(title, message, 'success', duration);
}

/**
 * Show Error Alert
 * @param {string} title - Title
 * @param {string} message - Message
 * @param {number} duration - Duration in ms
 */
function showError(title, message, duration = 0) {
    return showAlert(title, message, 'error', duration);
}

/**
 * Show Warning Alert
 * @param {string} title - Title
 * @param {string} message - Message
 * @param {number} duration - Duration in ms
 */
function showWarning(title, message, duration = 4000) {
    return showAlert(title, message, 'warning', duration);
}

/**
 * Show Info Alert
 * @param {string} title - Title
 * @param {string} message - Message
 * @param {number} duration - Duration in ms
 */
function showInfo(title, message, duration = 4000) {
    return showAlert(title, message, 'info', duration);
}

/**
 * Show Loading Toast
 * @param {string} message - Loading message
 */
function showLoading(message = 'Loading...') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.id = 'loading-toast';
    toast.style.background = 'linear-gradient(135deg, #2196F3 0%, #0d47a1 100%)';
    toast.innerHTML = `<span style="animation: spin 1s linear infinite; display: inline-block;">⏳</span> ${message}`;
    document.body.appendChild(toast);
    return toast;
}

/**
 * Hide Loading Toast
 */
function hideLoading() {
    const toast = document.getElementById('loading-toast');
    if (toast) {
        toast.style.animation = 'slideInFromBottom 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }
}

/**
 * Get icon for alert type
 * @param {string} type - Alert type
 */
function getIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️',
        loading: '⏳'
    };
    return icons[type] || '📢';
}

/**
 * Replace default browser alerts with beautiful ones
 * Call this function at app startup
 */
function useBeautifulAlerts() {
    window.addEventListener('error', (event) => {
        showError('Error', event.message, 0);
    });

    // Optional: Override native alert()
    // window.alert = (message) => showToast(message, 'info', 5000);
}

/**
 * Clear all alerts
 */
function clearAllAlerts() {
    document.querySelectorAll('.alert').forEach(alert => alert.remove());
    document.querySelectorAll('.toast').forEach(toast => toast.remove());
    document.querySelectorAll('.alert-modal').forEach(modal => modal.remove());
}

// Add spin animation for loading
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Initialize on page load
ensureAlertContainer();
