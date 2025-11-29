// -----------------------------
// Navigation toggle (mobile)
// -----------------------------
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('.navigation');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('show');
    });
}

// -----------------------------
// Members container
// -----------------------------
const membersContainer = document.getElementById('members-container');
let membersData = [];

// -----------------------------
// Load members from JSON
// -----------------------------
async function loadMembers() {
    try {
        const response = await fetch('data/members.json'); // ensure path is correct
        membersData = await response.json();
        displayMembers(membersData, 'grid'); // default view
    } catch (error) {
        console.error('Failed to load members:', error);
        if (membersContainer) {
            membersContainer.innerHTML = '<p>Failed to load members. Please try again later.</p>';
        }
    }
}

// -----------------------------
// Display members in grid or list
// -----------------------------
function displayMembers(members, view) {
    if (!membersContainer) return;

    membersContainer.className = view;
    membersContainer.innerHTML = '';

    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';
        card.innerHTML = `
            ${member.image ? `<img src="images/${member.image}" alt="${member.name}" class="member-image">` : ''}
            <h2>${member.name}</h2>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Website</a></p>
            <p>Membership Level: ${['Member', 'Silver', 'Gold'][member.membership - 1]}</p>
        `;
        membersContainer.appendChild(card);
    });
}

// -----------------------------
// Toggle grid/list views
// -----------------------------
const gridBtn = document.getElementById('grid-view');
const listBtn = document.getElementById('list-view');

if (gridBtn) gridBtn.addEventListener('click', () => displayMembers(membersData, 'grid'));
if (listBtn) listBtn.addEventListener('click', () => displayMembers(membersData, 'list'));

// -----------------------------
// Footer info
// -----------------------------
const yearEl = document.getElementById('year');
const lastModEl = document.getElementById('last-modified');

if (yearEl) yearEl.textContent = new Date().getFullYear();
if (lastModEl) lastModEl.textContent = document.lastModified;

// -----------------------------
// Initial load
// -----------------------------
loadMembers();
