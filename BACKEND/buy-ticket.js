// =============================================
// BUY TICKET PAGE FUNCTIONALITY
// =============================================

const TICKET_PRICE = 1; // 1 BDT per ticket
let selectedLottery = null;
let ticketQuantity = 1;

document.addEventListener('DOMContentLoaded', function() {
    initializeBuyTicketPage();
    setupBuyTicketEventListeners();
});

function initializeBuyTicketPage() {
    const user = getCurrentUser();
    if (!user) return;

    // Initialize payment methods
    initializePaymentMethods();

    // Initialize with first lottery by default
    const firstCard = document.querySelector('.lottery-type-card');
    if (firstCard) {
        selectLotteryCard(firstCard);
    }
}

function initializePaymentMethods() {
    const paymentContainer = document.querySelector('.payment-options');
    if (!paymentContainer) return;

    const paymentMethods = [
        { id: 'bkash', name: '📱 bKash', description: 'Mobile Wallet' },
        { id: 'nagad', name: '📞 Nagad', description: 'Mobile Wallet' },
        { id: 'rocket', name: '🚀 Rocket', description: 'Mobile Wallet' },
        { id: 'card', name: '💳 Debit Card', description: 'Visa/MasterCard' },
        { id: 'bank', name: '🏦 Bank Transfer', description: 'Direct Transfer' }
    ];

    paymentContainer.innerHTML = paymentMethods
        .map(
            (method) => `
        <label class="payment-option" style="display: flex; align-items: center; padding: 12px; margin: 8px 0; border: 2px solid #ddd; border-radius: 8px; cursor: pointer; transition: all 0.3s ease;">
            <input type="radio" name="payment-method" value="${method.id}" style="margin-right: 12px; cursor: pointer;" />
            <div>
                <div style="font-weight: 600; font-size: 0.95rem;">${method.name}</div>
                <div style="font-size: 0.85rem; color: var(--text-secondary);">${method.description}</div>
            </div>
        </label>
    `
        )
        .join('');

    // Add styling to payment labels
    document.querySelectorAll('.payment-option').forEach((label) => {
        label.addEventListener('change', function() {
            document.querySelectorAll('.payment-option').forEach(l => {
                l.style.borderColor = '#ddd';
                l.style.backgroundColor = 'transparent';
            });
            this.style.borderColor = 'var(--primary-color)';
            this.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
        });
    });
}

function setupBuyTicketEventListeners() {
    // Lottery selection
    const lotteryCards = document.querySelectorAll('.lottery-type-card');
    lotteryCards.forEach((card) => {
        card.addEventListener('click', function () {
            selectLotteryCard(this);
        });
    });

    // Quantity controls
    const qtyIncrease = document.getElementById('qty-increase');
    const qtyDecrease = document.getElementById('qty-decrease');
    const qtyInput = document.getElementById('ticket-quantity');

    if (qtyIncrease) {
        qtyIncrease.addEventListener('click', function () {
            if (ticketQuantity < 100) {
                ticketQuantity++;
                if (qtyInput) qtyInput.value = ticketQuantity;
                updateOrderSummary();
            }
        });
    }

    if (qtyDecrease) {
        qtyDecrease.addEventListener('click', function () {
            if (ticketQuantity > 1) {
                ticketQuantity--;
                if (qtyInput) qtyInput.value = ticketQuantity;
                updateOrderSummary();
            }
        });
    }

    if (qtyInput) {
        qtyInput.addEventListener('change', function () {
            let value = parseInt(this.value) || 1;
            if (value < 1) value = 1;
            if (value > 100) value = 100;
            ticketQuantity = value;
            this.value = ticketQuantity;
            updateOrderSummary();
        });
    }

    // Purchase button
    const purchaseBtn = document.getElementById('purchase-btn');
    if (purchaseBtn) {
        purchaseBtn.addEventListener('click', purchaseTickets);
    }
}

function selectLotteryCard(card) {
    // Remove selection from all cards
    document.querySelectorAll('.lottery-type-card').forEach((c) => {
        c.style.borderColor = 'transparent';
        c.style.backgroundColor = 'transparent';
    });

    // Add selection to current card
    card.style.borderColor = 'var(--primary-color)';
    card.style.backgroundColor = 'var(--primary-gradient)';
    card.style.color = 'white';

    // Extract lottery info
    selectedLottery = {
        type: card.textContent,
        name: card.querySelector('h3') ? card.querySelector('h3').textContent : 'Lottery',
        date: 'Next Friday 8 PM'
    };

    // Show quantity selector
    const quantitySection = document.getElementById('ticket-quantity-section');
    if (quantitySection) {
        quantitySection.style.display = 'block';
    }

    ticketQuantity = 1;
    updateOrderSummary();
}

function updateOrderSummary() {
    if (!selectedLottery) {
        const summaryDiv = document.querySelector('.order-summary-items');
        if (summaryDiv) {
            summaryDiv.innerHTML = '<div class="summary-row"><span>Select a lottery to begin</span></div>';
        }
        return;
    }

    const totalPrice = TICKET_PRICE * ticketQuantity;
    const summaryDiv = document.querySelector('.order-summary-items');

    if (summaryDiv) {
        summaryDiv.innerHTML = `
            <div class="summary-row">
                <span>Lottery Game:</span>
                <strong>${selectedLottery.name}</strong>
            </div>
            <div class="summary-row">
                <span>Draw Date:</span>
                <strong>${selectedLottery.date}</strong>
            </div>
            <div class="summary-row">
                <span>Unit Price:</span>
                <strong>${TICKET_PRICE} BDT</strong>
            </div>
            <div class="summary-row">
                <span>Quantity:</span>
                <strong>${ticketQuantity} Ticket${ticketQuantity > 1 ? 's' : ''}</strong>
            </div>
            <div class="summary-row" style="border-top: 2px solid var(--primary-color); padding-top: 10px; margin-top: 10px; font-weight: 600; font-size: 1.1rem;">
                <span>Total Amount:</span>
                <strong style="color: var(--primary-color);">${totalPrice} BDT</strong>
            </div>
        `;
    }
}

function purchaseTickets() {
    if (!selectedLottery) {
        showWarning('⚠️ No Lottery Selected', 'Please select a lottery first');
        return;
    }

    const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
    if (!paymentMethod) {
        showError('❌ Payment Method Required', 'Please select a payment method');
        return;
    }

    const user = getCurrentUser();
    if (!user) {
        showError('❌ Not Logged In', 'Please login first');
        return;
    }

    // Generate tickets
    const newTickets = [];
    for (let i = 0; i < ticketQuantity; i++) {
        newTickets.push({
            id: Date.now() + i,
            userId: user.id,
            lotteryName: selectedLottery.name,
            ticketNumber: Math.floor(Math.random() * 9000000000) + 1000000000,
            drawDate: selectedLottery.date,
            paymentMethod: paymentMethod.value,
            price: TICKET_PRICE,
            status: 'pending',
            purchaseDate: new Date().toLocaleDateString(),
            purchaseTime: new Date().toLocaleTimeString()
        });
    }

    // Save tickets
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    tickets.push(...newTickets);
    localStorage.setItem('tickets', JSON.stringify(tickets));

    // Show purchase confirmation popup
    showPurchaseConfirmation(newTickets[0], ticketQuantity);

    // Reset form
    setTimeout(() => {
        ticketQuantity = 1;
        selectedLottery = null;
        document.querySelectorAll('.lottery-type-card').forEach((c) => {
            c.style.borderColor = 'transparent';
            c.style.backgroundColor = 'transparent';
        });
        const quantitySection = document.getElementById('ticket-quantity-section');
        if (quantitySection) {
            quantitySection.style.display = 'none';
        }
        updateOrderSummary();
    }, 5000);
}

function showPurchaseConfirmation(ticket, quantity) {
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    const totalAmount = TICKET_PRICE * quantity;
    
    // Create popup HTML
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    popup.innerHTML = `
        <div style="background: var(--bg-secondary); border-radius: 16px; padding: 30px; max-width: 450px; width: 90%; box-shadow: 0 10px 40px rgba(0,0,0,0.3); animation: slideUp 0.3s ease;">
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="font-size: 3rem; margin-bottom: 10px;">🎉</div>
                <h2 style="margin: 0; color: var(--primary-color);">Purchase Successful!</h2>
                <p style="margin: 5px 0; color: var(--text-secondary);">Your ticket has been confirmed</p>
            </div>
            
            <div style="background: var(--bg-primary); padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid var(--primary-color);">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <p style="margin: 0 0 5px 0; color: var(--text-secondary); font-size: 0.85rem;">Lottery Game</p>
                        <p style="margin: 0; font-weight: 600; color: var(--primary-color);">${ticket.lotteryName}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 5px 0; color: var(--text-secondary); font-size: 0.85rem;">Quantity</p>
                        <p style="margin: 0; font-weight: 600;">${quantity} Ticket${quantity > 1 ? 's' : ''}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 5px 0; color: var(--text-secondary); font-size: 0.85rem;">Draw Date</p>
                        <p style="margin: 0; font-weight: 600;">${ticket.drawDate}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 5px 0; color: var(--text-secondary); font-size: 0.85rem;">Total Cost</p>
                        <p style="margin: 0; font-weight: 600; color: var(--success-color);">${totalAmount} BDT</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 5px 0; color: var(--text-secondary); font-size: 0.85rem;">Payment Method</p>
                        <p style="margin: 0; font-weight: 600; text-transform: uppercase;">${paymentMethod}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 5px 0; color: var(--text-secondary); font-size: 0.85rem;">Ticket ID</p>
                        <p style="margin: 0; font-weight: 600; font-family: monospace; font-size: 0.9rem;">${ticket.ticketNumber}</p>
                    </div>
                </div>
            </div>
            
            <div style="background: linear-gradient(135deg, #FFE082 0%, #FFB74D 100%); color: #333; padding: 15px; border-radius: 8px; text-align: center; margin-bottom: 20px; font-weight: 600;">
                💡 Save your ticket! You'll need it to claim your prize.
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <button onclick="this.closest('[style*=position]').remove()" style="padding: 12px; background: var(--bg-primary); color: var(--text-primary); border: 2px solid var(--primary-color); border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">
                    Close
                </button>
                <button onclick="navigatePage('my-tickets'); this.closest('[style*=position]').remove();" style="padding: 12px; background: var(--primary-gradient); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">
                    View My Tickets
                </button>
            </div>
        </div>
    `;
    
    // Add animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { 
                opacity: 0;
                transform: translateY(30px);
            }
            to { 
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(popup);
}

function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

