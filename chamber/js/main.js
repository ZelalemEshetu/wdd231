// Hamburger toggle
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav').querySelector('ul');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('show');
});

// Update current year
document.getElementById('year').textContent = new Date().getFullYear();

// Optional: Welcome dialog if exists
const welcomeDialog = document.getElementById('welcomeDialog');
if (welcomeDialog) {
    welcomeDialog.showModal();
    const closeBtn = document.getElementById('closeDialog');
    const viewBtn = document.getElementById('viewDir');
    closeBtn.addEventListener('click', () => welcomeDialog.close());
    viewBtn.addEventListener('click', () => {
        welcomeDialog.close();
        window.location.href = 'products.html';
    });
}
