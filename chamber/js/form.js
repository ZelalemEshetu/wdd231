// form.js - form action + localStorage draft save/load + DOM manipulation + template literals
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('joinForm');
    const saveBtn = document.getElementById('saveDraft');
    const loadBtn = document.getElementById('loadDraft');

    const DRAFT_KEY = 'w06_join_draft_v1';

    saveBtn?.addEventListener('click', () => {
        const data = {
            business: form.business.value || '',
            owner: form.owner.value || '',
            email: form.email.value || '',
            category: form.category.value || ''
        };
        localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
        alert('Draft saved locally.');
    });

    loadBtn?.addEventListener('click', () => {
        const raw = localStorage.getItem(DRAFT_KEY);
        if (!raw) { alert('No draft found.'); return; }
        const data = JSON.parse(raw);
        form.business.value = data.business || '';
        form.owner.value = data.owner || '';
        form.email.value = data.email || '';
        form.category.value = data.category || '';
        alert('Draft loaded.');
    });

    // Demonstrate URLSearchParams use on submit (form uses GET)
    form?.addEventListener('submit', (e) => {
        // no need to preventDefault because action is thanks.html
        // but we can store a copy
        const payload = {
            business: form.business.value,
            owner: form.owner.value,
            email: form.email.value,
            category: form.category.value
        };
        localStorage.setItem('lastApplication', JSON.stringify(payload));
    });
});
