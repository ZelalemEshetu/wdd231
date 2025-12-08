// modal.js - dialog usage and open/close
export function initDialog() {
    const dialog = document.getElementById('welcomeDialog');
    if (!dialog) return;
    const viewed = sessionStorage.getItem('welcome_shown');
    if (!viewed) {
        try {
            dialog.showModal();
            sessionStorage.setItem('welcome_shown', '1');
        } catch (err) {
            // fallback for browsers that don't support dialog
            alert('Welcome to Zelalem Chamber!');
        }
    }

    const closeBtn = document.getElementById('closeDialog');
    const viewDir = document.getElementById('viewDir');

    closeBtn?.addEventListener('click', () => dialog.close());
    viewDir?.addEventListener('click', () => {
        dialog.close();
        location.href = 'products.html';
    });
}
