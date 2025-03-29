document.addEventListener('DOMContentLoaded', function() {
    let authModal = document.getElementById('auth-modal');
    authModal.style.display = 'flex';
    
    document.getElementById('login').addEventListener('click', function() {
        window.location.href = 'login.html';
    });

    document.getElementById('register').addEventListener('click', function() {
        window.location.href = 'register.html';
    });

    document.getElementById('buy').addEventListener('click', function() {
        let ticketNumber = 'L-' + Math.floor(100000 + Math.random() * 900000);
        alert('Ticket Purchased! Your ticket number: ' + ticketNumber);
    });
});
