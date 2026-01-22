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
    window.location.href = "login.html";
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
                <a href="buy-ticket.html" class="btn-primary" style="text-decoration: none;">
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
