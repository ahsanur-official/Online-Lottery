// =============================================
// MY TICKETS PAGE FUNCTIONALITY
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    loadMyTicketsPage();
});

function loadMyTicketsPage() {
    const user = getCurrentUser();
    if (!user) return;

    let tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    let userTickets = tickets.filter((t) => t.userId === user.id);
    
    // Sort tickets by purchase date (newest first)
    userTickets.sort((a, b) => {
        const dateA = new Date(a.purchaseDate + ' ' + (a.purchaseTime || '00:00'));
        const dateB = new Date(b.purchaseDate + ' ' + (b.purchaseTime || '00:00'));
        return dateB - dateA;
    });
    
    const container = document.getElementById('my-tickets-container');

    if (!container) return;

    if (userTickets.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <p style="font-size: 3rem; margin: 0;">🎫</p>
                <h2 style="color: var(--text-secondary); margin: 15px 0;">No Tickets Yet</h2>
                <p style="color: var(--text-secondary); margin-bottom: 20px;">You haven't purchased any lottery tickets yet.</p>
                <a href="#" data-page="buy-ticket" class="btn-primary" style="text-decoration: none; display: inline-block;">🎟️ Buy Your First Ticket</a>
            </div>
        `;
        return;
    }

    container.innerHTML = userTickets
        .map(
            (ticket, index) => `
            <div class="ticket-detailed-card" style="padding: 20px; background: var(--bg-secondary); border-radius: 12px; border-left: 5px solid ${ticket.status === 'won' ? '#4CAF50' : ticket.status === 'pending' ? 'var(--primary-color)' : '#ccc'}; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transition: transform 0.3s ease;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
                    <div>
                        <h3 style="margin: 0 0 5px 0; color: var(--primary-color); font-size: 1.2rem;">🎫 Ticket #${index + 1}</h3>
                        <p style="margin: 0; color: var(--text-secondary); font-size: 0.9rem;">ID: ${ticket.ticketNumber || 'N/A'}</p>
                    </div>
                    <span style="padding: 8px 16px; border-radius: 20px; font-weight: 600; color: white; ${ticket.status === 'won' ? 'background: linear-gradient(135deg, #4CAF50 0%, #388E3C 100%);' : ticket.status === 'pending' ? 'background: var(--primary-gradient);' : 'background: linear-gradient(135deg, #999 0%, #666 100%);'}">
                        ${ticket.status === 'won' ? '✅ WON' : ticket.status === 'pending' ? '⏳ PENDING' : '❌ NOT WON'}
                    </span>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div style="background: var(--bg-primary); padding: 12px; border-radius: 8px;">
                        <p style="margin: 0 0 5px 0; color: var(--text-secondary); font-size: 0.85rem;">Lottery Game</p>
                        <p style="margin: 0; color: var(--primary-color); font-weight: 600;">${ticket.lotteryName || 'N/A'}</p>
                    </div>
                    <div style="background: var(--bg-primary); padding: 12px; border-radius: 8px;">
                        <p style="margin: 0 0 5px 0; color: var(--text-secondary); font-size: 0.85rem;">Draw Date</p>
                        <p style="margin: 0; font-weight: 600;">${ticket.drawDate || 'N/A'}</p>
                    </div>
                    <div style="background: var(--bg-primary); padding: 12px; border-radius: 8px;">
                        <p style="margin: 0 0 5px 0; color: var(--text-secondary); font-size: 0.85rem;">Payment Method</p>
                        <p style="margin: 0; font-weight: 600;">${ticket.paymentMethod ? ticket.paymentMethod.toUpperCase() : 'N/A'}</p>
                    </div>
                    <div style="background: var(--bg-primary); padding: 12px; border-radius: 8px;">
                        <p style="margin: 0 0 5px 0; color: var(--text-secondary); font-size: 0.85rem;">Ticket Price</p>
                        <p style="margin: 0; font-weight: 600; color: var(--success-color);">${ticket.price || 1} BDT</p>
                    </div>
                </div>

                <div style="background: var(--bg-primary); padding: 12px; border-radius: 8px; border-left: 3px solid var(--primary-color);">
                    <p style="margin: 0 0 5px 0; color: var(--text-secondary); font-size: 0.85rem;">Purchase Details</p>
                    <p style="margin: 0; font-size: 0.9rem;">📅 ${ticket.purchaseDate || 'N/A'} at ${ticket.purchaseTime || 'N/A'}</p>
                </div>
            </div>
        `
        )
        .join('');
}

function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}
