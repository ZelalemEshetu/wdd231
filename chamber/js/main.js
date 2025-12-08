// main.js (ES module) - imports behavior modules
import { initMenu } from './menu.js';
import { initVisits } from './visits.js';
import { initDialog } from './modal.js';

document.getElementById('year').textContent = new Date().getFullYear();

initMenu();
initVisits();
initDialog();

// fill a small preview of businesses on index page using fetch (if present)
(async function loadPreview() {
    try {
        const el = document.getElementById('preview-grid');
        if (!el) return;
        const resp = await fetch('data/products.json');
        const data = await resp.json();
        // show first 3 items
        data.slice(0, 3).forEach(p => {
            const card = document.createElement('article');
            card.className = 'card';
            card.innerHTML = `<h3>${p.name}</h3><p class="muted">${p.category}</p><p>${p.description}</p>`;
            el.appendChild(card);
        });
    } catch (err) {
        console.error('Preview load failed', err);
    }
})();
