// visits.js - localStorage usage (visits counter)
export function initVisits() {
    const key = 'zelalem_visits_v1';
    let count = Number(localStorage.getItem(key) || 0);
    count++;
    localStorage.setItem(key, String(count));
    const el = document.getElementById('visitsCount');
    if (el) el.textContent = count;
}
