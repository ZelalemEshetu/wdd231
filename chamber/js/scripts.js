// Toggle Navigation Menu
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('.navigation');
menuToggle.addEventListener('click', () => nav.classList.toggle('show'));

// Load members from JSON
const membersContainer = document.getElementById('members-container');
async function loadMembers() {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displayMembers(members, 'grid');
}

// Display members in grid or list view
function displayMembers(members, view) {
    membersContainer.className = view;
    membersContainer.innerHTML = '';
    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';
        card.innerHTML = `
            <h2>${member.name}</h2>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Website</a></p>
            <p>Membership Level: ${['Member', 'Silver', 'Gold'][member.membership - 1]}</p>
        `;
        membersContainer.appendChild(card);
    });
}

// Toggle View Buttons
document.getElementById('grid-view').addEventListener('click', async () => {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displayMembers(members, 'grid');
});
document.getElementById('list-view').addEventListener('click', async () => {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displayMembers(members, 'list');
});

// Footer Info
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// Initial load
loadMembers();
