// Set current timestamp in hidden field
window.addEventListener('DOMContentLoaded', () => {
    const timestampField = document.getElementById('timestamp');
    const now = new Date();
    timestampField.value = now.toLocaleString(); // e.g., "12/3/2025, 10:45:30 AM"
});

// Modal functionality
const cards = document.querySelectorAll('.card');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close');

cards.forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = card.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = 'block';
    });
});

closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.parentElement.parentElement.style.display = 'none';
    });
});

// Close modal when clicking outside modal content
window.addEventListener('click', (e) => {
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

