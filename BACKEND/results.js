// =============================================
// RESULTS PAGE FUNCTIONALITY
// =============================================

let allResults = [];

document.addEventListener('DOMContentLoaded', function() {
    loadResultsPage();
    setupResultsEventListeners();
});

function loadResultsPage() {
    // Initialize sample results if not exist
    if (!localStorage.getItem('lotteryResults')) {
        initializeDefaultResults();
    }

    allResults = JSON.parse(localStorage.getItem('lotteryResults') || '[]');
    displayResults(allResults);
}

function initializeDefaultResults() {
    const defaultResults = [
        {
            id: 1,
            lotteryName: 'Powerball Draw',
            drawDate: '2024-01-15',
            winningNumbers: [12, 25, 38, 42, 55, 7],
            jackpot: 10000000,
            winners: 3,
            prizeDistribution: {
                jackpot: 10000000,
                secondPrize: 500000,
                thirdPrize: 50000
            }
        },
        {
            id: 2,
            lotteryName: 'Mega Fortune',
            drawDate: '2024-01-10',
            winningNumbers: [5, 18, 24, 33, 47, 2],
            jackpot: 5000000,
            winners: 1,
            prizeDistribution: {
                jackpot: 5000000,
                secondPrize: 250000,
                thirdPrize: 25000
            }
        },
        {
            id: 3,
            lotteryName: 'Lucky Numbers',
            drawDate: '2024-01-08',
            winningNumbers: [8, 16, 32, 44, 52],
            jackpot: 2000000,
            winners: 5,
            prizeDistribution: {
                jackpot: 2000000,
                secondPrize: 100000,
                thirdPrize: 10000
            }
        },
        {
            id: 4,
            lotteryName: 'Supreme Draw',
            drawDate: '2024-01-05',
            winningNumbers: [11, 22, 33, 44, 55, 3],
            jackpot: 8000000,
            winners: 2,
            prizeDistribution: {
                jackpot: 8000000,
                secondPrize: 400000,
                thirdPrize: 40000
            }
        }
    ];

    localStorage.setItem('lotteryResults', JSON.stringify(defaultResults));
}

function displayResults(resultsToShow) {
    const container = document.getElementById('results-container');
    if (!container) return;

    if (resultsToShow.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <p style="font-size: 3rem; margin: 0;">🔍</p>
                <h2 style="color: var(--text-secondary); margin: 15px 0;">No Results Found</h2>
                <p style="color: var(--text-secondary);">Try adjusting your search filters.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = resultsToShow
        .map(
            (result) => `
            <div class="result-card" style="padding: 24px; background: var(--bg-secondary); border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transition: transform 0.3s ease; border-top: 4px solid var(--primary-color);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
                    <div>
                        <h3 style="margin: 0 0 5px 0; color: var(--primary-color); font-size: 1.3rem;">🎰 ${result.lotteryName}</h3>
                        <p style="margin: 0; color: var(--text-secondary); font-size: 0.9rem;">📅 Draw Date: ${result.drawDate}</p>
                    </div>
                    <div style="text-align: right;">
                        <p style="margin: 0 0 5px 0; color: var(--text-secondary); font-size: 0.85rem;">Jackpot Prize</p>
                        <p style="margin: 0; font-size: 1.4rem; font-weight: 700; color: var(--success-color);">৳ ${formatPrice(result.jackpot)}</p>
                    </div>
                </div>

                <div style="background: var(--bg-primary); padding: 16px; border-radius: 8px; margin-bottom: 16px; border-left: 3px solid var(--primary-color);">
                    <p style="margin: 0 0 10px 0; color: var(--text-secondary); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px;">🎲 Winning Numbers</p>
                    <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                        ${result.winningNumbers
                            .map(
                                (num) =>
                                    `<div style="width: 50px; height: 50px; background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 1.1rem; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">${num}</div>`
                            )
                            .join('')}
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                    <div style="background: var(--bg-primary); padding: 12px; border-radius: 8px; text-align: center;">
                        <p style="margin: 0 0 5px 0; color: var(--text-secondary); font-size: 0.85rem;">Winners</p>
                        <p style="margin: 0; font-size: 1.3rem; font-weight: 700; color: var(--primary-color);">${result.winners}</p>
                    </div>
                    <div style="background: var(--bg-primary); padding: 12px; border-radius: 8px; text-align: center;">
                        <p style="margin: 0 0 5px 0; color: var(--text-secondary); font-size: 0.85rem;">2nd Prize</p>
                        <p style="margin: 0; font-size: 1.1rem; font-weight: 600;">৳ ${formatPrice(result.prizeDistribution.secondPrize)}</p>
                    </div>
                    <div style="background: var(--bg-primary); padding: 12px; border-radius: 8px; text-align: center;">
                        <p style="margin: 0 0 5px 0; color: var(--text-secondary); font-size: 0.85rem;">3rd Prize</p>
                        <p style="margin: 0; font-size: 1.1rem; font-weight: 600;">৳ ${formatPrice(result.prizeDistribution.thirdPrize)}</p>
                    </div>
                </div>

                <div style="background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(56, 142, 60, 0.1) 100%); padding: 12px; border-radius: 8px; border-left: 3px solid var(--success-color); text-align: center;">
                    <p style="margin: 0; color: var(--success-color); font-weight: 600;">✅ Draw Completed</p>
                </div>
            </div>
        `
        )
        .join('');
}

function setupResultsEventListeners() {
    const searchInput = document.getElementById('results-search');
    if (searchInput) {
        searchInput.addEventListener('input', filterResults);
    }

    const filterButtons = document.querySelectorAll('[data-filter]');
    filterButtons.forEach((button) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            filterButtons.forEach((btn) => btn.style.opacity = '0.5');
            this.style.opacity = '1';
            filterResults();
        });
    });
}

function filterResults() {
    const searchInput = document.getElementById('results-search') || { value: '' };
    const activeFilter = document.querySelector('[data-filter][style*="opacity: 1"]') || { dataset: { filter: 'all' } };

    const searchTerm = searchInput.value.toLowerCase();
    let filtered = allResults;

    // Filter by search
    if (searchTerm) {
        filtered = filtered.filter(
            (r) =>
                r.lotteryName.toLowerCase().includes(searchTerm) ||
                r.drawDate.includes(searchTerm) ||
                r.winningNumbers.some((n) => n.toString().includes(searchTerm))
        );
    }

    // Filter by period
    const filter = activeFilter.dataset.filter;
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

    if (filter === 'month') {
        filtered = filtered.filter((r) => new Date(r.drawDate) >= thirtyDaysAgo);
    } else if (filter === 'quarter') {
        filtered = filtered.filter((r) => new Date(r.drawDate) >= ninetyDaysAgo);
    }

    displayResults(filtered);
}

function formatPrice(price) {
    if (price >= 10000000) {
        return (price / 10000000).toFixed(1) + 'Cr';
    }
    if (price >= 100000) {
        return (price / 100000).toFixed(1) + 'L';
    }
    if (price >= 1000) {
        return (price / 1000).toFixed(1) + 'K';
    }
    return price.toString();
}
