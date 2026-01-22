// =============================================
// BUY TICKET PAGE FUNCTIONALITY - BANGLADESH LOTTERY
// =============================================

const TICKET_PRICE = 1; // 1 BDT per ticket
const MAX_TICKETS = 100; // Can buy up to 100 tickets at once
const DRAW_DAY = 5; // Friday (0=Sunday, 5=Friday)
const DRAW_TIME = '20:00'; // 8 PM
const PURCHASE_START = 10; // Saturday 10 AM
const PURCHASE_END = 18; // Friday 6 PM

let selectedLottery = null;
let ticketQuantity = 1;

// Prize tiers: 7 prizes total
const PRIZE_TIERS = [
    { position: 1, amount: 10000, count: 1 },
    { position: 2, amount: 5000, count: 1 },
    { position: 3, amount: 1000, count: 5 }
];

// Payment methods (Bangladesh)
const PAYMENT_METHODS = [
    { id: 'bkash', name: 'bKash', icon: '📱' },
    { id: 'nagad', name: 'Nagad', icon: '📲' },
    { id: 'rocket', name: 'Rocket', icon: '🚀' }
];

document.addEventListener('DOMContentLoaded', function() {
    initializeBuyTicketPage();
    setupEventListeners();
    updatePaymentMethods();
    checkPurchaseAvailability();
});

function initializeBuyTicketPage() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    // Initialize with default lottery
    const firstCard = document.querySelector('.lottery-type-card');
    if (firstCard) {
        selectLottery(firstCard);
    }
}

function setupEventListeners() {
    // Lottery type selection
    const lotteryCards = document.querySelectorAll('.lottery-type-card');
    lotteryCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            selectLottery(this);
        });
    });
    
    // Quantity controls
    const qtyIncrease = document.getElementById('qty-increase');
    const qtyDecrease = document.getElementById('qty-decrease');
    const qtyInput = document.getElementById('ticket-quantity');
    
    if (qtyIncrease) {
        qtyIncrease.addEventListener('click', () => {
            if (ticketQuantity < MAX_TICKETS) {
                ticketQuantity++;
                if (qtyInput) qtyInput.value = ticketQuantity;
                updateOrderSummary();
            }
        });
    }
    
    if (qtyDecrease) {
        qtyDecrease.addEventListener('click', () => {
            if (ticketQuantity > 1) {
                ticketQuantity--;
                if (qtyInput) qtyInput.value = ticketQuantity;
                updateOrderSummary();
            }
        });
    }
    
    if (qtyInput) {
        qtyInput.addEventListener('change', () => {
            let value = parseInt(qtyInput.value) || 1;
            if (value > MAX_TICKETS) value = MAX_TICKETS;
            if (value < 1) value = 1;
            ticketQuantity = value;
            qtyInput.value = ticketQuantity;
            updateOrderSummary();
        });
    }
    
    // Payment method selection
    const paymentOptions = document.querySelectorAll('.payment-option input');
    paymentOptions.forEach(option => {
        option.addEventListener('change', updateOrderSummary);
    });
    
    // Purchase button
    const purchaseBtn = document.getElementById('purchase-btn');
    if (purchaseBtn) {
        purchaseBtn.addEventListener('click', purchaseTickets);
    }
}

function updatePaymentMethods() {
    const paymentOptionsDiv = document.querySelector('.payment-options');
    if (!paymentOptionsDiv) return;
    
    paymentOptionsDiv.innerHTML = '';
    PAYMENT_METHODS.forEach((method, index) => {
        const label = document.createElement('label');
        label.className = 'payment-option';
        label.innerHTML = `
            <input type="radio" name="payment-method" value="${method.id}" ${index === 0 ? 'checked' : ''}>
            <span>${method.icon} ${method.name}</span>
        `;
        paymentOptionsDiv.appendChild(label);
    });
}

function selectLottery(card) {
    // Remove previous selection
    document.querySelectorAll('.lottery-type-card').forEach(c => {
        c.classList.remove('selected');
    });
    
    // Add selection to current card
    card.classList.add('selected');
    
    // Extract lottery info
    selectedLottery = {
        type: card.getAttribute('data-type'),
        name: card.querySelector('.lottery-title')?.textContent || card.querySelector('h3')?.textContent || 'Lottery',
        prize: card.querySelector('.lottery-prize')?.textContent || '$1,000,000',
        date: getNextDrawDate(),
        icon: card.querySelector('.lottery-icon')?.textContent || '🎰'
    };
    
    // Show quantity selector
    const quantitySection = document.getElementById('ticket-quantity-section');
    if (quantitySection) {
        quantitySection.style.display = 'block';
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
    
    return drawDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
    }) + ' at 8 PM';
}

function updateOrderSummary() {
    if (!selectedLottery) {
        alert('Please select a lottery first');
        return;
    }
    
    const totalPrice = TICKET_PRICE * ticketQuantity;
    const summaryDiv = document.querySelector('.order-summary-items');
    
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
    let message = '';
    
    if (day === 0) { // Sunday
        if (hour >= PURCHASE_START) available = true;
        else message = `Tickets available from Saturday ${PURCHASE_START}:00 AM`;
    } else if (day === 1 || day === 2 || day === 3 || day === 4) { // Mon-Thu
        available = true;
    } else if (day === 5) { // Friday
        if (hour < PURCHASE_END) available = true;
        else message = 'Tickets closed for today. Next purchase window: Saturday 10:00 AM';
    } else if (day === 6) { // Saturday
        if (hour >= PURCHASE_START) available = true;
        else message = `Tickets available from ${PURCHASE_START}:00 AM`;
    }
    
    const purchaseBtn = document.getElementById('purchase-btn');
    if (purchaseBtn) {
        purchaseBtn.disabled = !available;
        if (!available) {
            purchaseBtn.textContent = `⏰ ${message || 'Currently unavailable'}`;
        } else {
            purchaseBtn.textContent = '🎟️ Purchase Tickets';
        }
    }
    
    // Update every minute
    setTimeout(checkPurchaseAvailability, 60000);
}

function generateUniqueTicketNumber() {
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    let ticketNumber;
    let exists = true;
    
    while (exists) {
        // Generate random 10-digit number
        ticketNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
        
        // Check if it already exists
        exists = tickets.some(t => t.ticketNumber === ticketNumber);
    }
    
    return ticketNumber;
}

function purchaseTickets() {
    if (!selectedLottery) {
        alert('Please select a lottery');
        return;
    }
    
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
    if (!paymentMethod) {
        alert('Please select a payment method');
        return;
    }
    
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
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
            purchaseDate: new Date().toLocaleDateString('en-US'),
            purchaseTime: new Date().toLocaleTimeString('en-US'),
            drawDate: selectedLottery.date,
            drawDay: DRAW_DAY,
            drawTime: DRAW_TIME,
            status: 'pending', // pending, won, lost
            prizeWon: null,
            paymentMethod: paymentMethod.value,
            transactionId: `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        };
        newTickets.push(ticket);
    }
    
    // Save tickets to localStorage
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    tickets.push(...newTickets);
    localStorage.setItem('tickets', JSON.stringify(tickets));
    
    // Update user's wallet/balance (mock)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
        if (!users[userIndex].spent) users[userIndex].spent = 0;
        users[userIndex].spent += TICKET_PRICE * ticketQuantity;
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Show success modal
    showPurchaseSuccessModal(newTickets);
    
    // Reset form
    ticketQuantity = 1;
    selectedLottery = null;
}

function showPurchaseSuccessModal(tickets) {
    const successModal = document.getElementById('success-modal');
    if (!successModal) {
        console.error('Success modal not found');
        return;
    }
    
    const ticketsList = tickets.map(t => `
        <div class="ticket-receipt" style="margin: 10px 0; padding: 10px; background: var(--bg-secondary); border-radius: 8px; border-left: 3px solid var(--primary-color);">
            <div style="font-size: 0.9rem; color: var(--text-secondary);">Ticket #${t.ticketNumber}</div>
            <div style="font-weight: 600; color: var(--primary-color);">🎟️ ${t.lotteryName}</div>
            <div style="font-size: 0.85rem; margin-top: 5px;">
                <div>Purchase: ${t.purchaseDate} ${t.purchaseTime}</div>
                <div>Payment: ${t.paymentMethod.toUpperCase()}</div>
                <div>Status: Pending Draw (${t.drawDate})</div>
            </div>
        </div>
    `).join('');
    
    const modalContent = successModal.querySelector('.modal-content');
    modalContent.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 10px;">✅</div>
            <h2 style="color: var(--success-color); margin-bottom: 15px;">Purchase Successful!</h2>
            <p style="color: var(--text-secondary); margin-bottom: 20px;">
                ${tickets.length} ticket${tickets.length > 1 ? 's' : ''} purchased for ${TICKET_PRICE * tickets.length} BDT
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
    
    successModal.style.display = 'flex';
}

function closeSuccessModal() {
    const successModal = document.getElementById('success-modal');
    if (successModal) {
        successModal.style.display = 'none';
    }
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
}

function buyMoreTickets() {
    const successModal = document.getElementById('success-modal');
    if (successModal) {
        successModal.style.display = 'none';
    }
    // Reset the form and stay on page
    document.querySelectorAll('.lottery-type-card').forEach(c => c.classList.remove('selected'));
    selectedLottery = null;
    ticketQuantity = 1;
    const qtyInput = document.getElementById('ticket-quantity');
    if (qtyInput) qtyInput.value = 1;
}

// Helper function
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}
