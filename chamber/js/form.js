const form = document.getElementById('joinForm');
const saveBtn = document.getElementById('saveDraft');
const loadBtn = document.getElementById('loadDraft');

saveBtn.addEventListener('click', () => {
    const data = Object.fromEntries(new FormData(form).entries());
    localStorage.setItem('joinDraft', JSON.stringify(data));
    alert('Draft saved!');
});

loadBtn.addEventListener('click', () => {
    const data = JSON.parse(localStorage.getItem('joinDraft') || '{}');
    for (const [key, value] of Object.entries(data)) {
        const input = form.elements[key];
        if (input) input.value = value;
    }
});

