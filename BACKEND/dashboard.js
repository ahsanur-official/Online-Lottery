// =============================================
// DASHBOARD PAGE FUNCTIONALITY
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    loadDashboard();
    setupDashboardEventListeners();
});

function loadDashboard() {
    const user = getCurrentUser();
    if (!user) return;

    // Update user name
    const userName = document.getElementById('user-name');
    if (userName) {
        userName.textContent = user.name || user.username;
    }

    // Load statistics
    loadDashboardStatistics();

    // Load user tickets
    loadDashboardTickets();

    // Load ticket history
    loadDashboardHistory();

    // Load updates
    loadDashboardUpdates();
}

function loadDashboardStatistics() {
    const user = getCurrentUser();
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    const userTickets = tickets.filter((t) => t.userId === user.id);

    // Calculate statistics
    const totalTickets = userTickets.length;
    const wonTickets = userTickets.filter((t) => t.status === 'won').length;
    const totalSpent = userTickets.reduce((sum, t) => sum + (t.price || 1), 0);
    const totalWon = userTickets
        .filter((t) => t.status === 'won')
        .reduce((sum, t) => sum + (t.prizeWon || 0), 0);
    const winRate = totalTickets > 0 ? ((wonTickets / totalTickets) * 100).toFixed(1) : 0;

    // Update DOM
    const elements = {
        'total-tickets': totalTickets,
        'total-spent': totalSpent + ' BDT',
        'total-winnings': totalWon + ' BDT',
        'win-rate': winRate + '%'
    };

    Object.entries(elements).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    });
}

function loadDashboardTickets() {
    const user = getCurrentUser();
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    const userTickets = tickets.filter((t) => t.userId === user.id).slice(0, 5);
    const container = document.getElementById('my-tickets');

    if (!container) return;

    if (userTickets.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No tickets purchased yet. <a href="#" data-page="buy-ticket" style="color: var(--primary-color);">Buy one now!</a></p>';
        return;
    }

    container.innerHTML = userTickets
        .map(
            (ticket) => `
            <div class="ticket-card" style="padding: 15px; background: var(--bg-secondary); border-radius: 8px; border-left: 4px solid var(--primary-color); margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <strong style="color: var(--primary-color);">🎫 Ticket #${ticket.ticketNumber || 'N/A'}</strong>
                    <span class="ticket-status" style="padding: 4px 10px; border-radius: 20px; font-size: 0.85rem; color: white; ${ticket.status === 'won' ? 'background: var(--success-gradient);' : ticket.status === 'pending' ? 'background: var(--primary-gradient);' : 'background: var(--danger-gradient);'}">
                        ${ticket.status === 'won' ? '✅ WON' : ticket.status === 'pending' ? '⏳ PENDING' : '❌ NOT WON'}
                    </span>
                </div>
                <div style="font-size: 0.9rem; color: var(--text-secondary);">
                    <div>📅 Draw: ${ticket.drawDate || 'N/A'}</div>
                    <div>💳 Payment: ${ticket.paymentMethod ? ticket.paymentMethod.toUpperCase() : 'N/A'}</div>
                </div>
            </div>
        `
        )
        .join('');
}

function loadDashboardHistory() {
    const results = JSON.parse(localStorage.getItem('results') || '[]');
    const tbody = document.getElementById('results-tbody');

    if (!tbody) return;

    if (results.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px; color: var(--text-secondary);">No draw results yet</td></tr>';
        return;
    }

    tbody.innerHTML = results
        .map(
            (result) => `
            <tr>
                <td>Sample</td>
                <td>${result.drawDate || 'N/A'}</td>
                <td>-</td>
                <td>${result.winningNumbers ? result.winningNumbers.slice(0, 3).join(', ') : 'N/A'}</td>
                <td>${result.prize || 'N/A'}</td>
                <td>Pending</td>
            </tr>
        `
        )
        .join('');
}

function loadDashboardUpdates() {
    const updates = JSON.parse(localStorage.getItem('updates') || '[]');
    const container = document.getElementById('updates-container');

    if (!container) return;

    if (updates.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No updates available</p>';
        return;
    }

    container.innerHTML = updates
        .slice(0, 3)
        .map(
            (update) => `
            <div class="update-card" style="padding: 15px; background: var(--bg-secondary); border-radius: 8px; border-left: 4px solid var(--primary-color);">
                <h4 style="margin: 0 0 8px 0; color: var(--primary-color);">${update.title}</h4>
                <p style="margin: 0 0 8px 0; color: var(--text-secondary); font-size: 0.9rem;">${update.content}</p>
                <small style="color: #999;">${update.date}</small>
            </div>
        `
        )
        .join('');
}

function setupDashboardEventListeners() {
    // Filter buttons for results
    const filterBtns = document.querySelectorAll('.tab-btn');
    filterBtns.forEach((btn) => {
        btn.addEventListener('click', function () {
            filterBtns.forEach((b) => b.classList.remove('active'));
            this.classList.add('active');
            // Filter logic can be added here
        });
    });
}

function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}
