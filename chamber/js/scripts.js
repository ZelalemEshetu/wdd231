// Navigation toggle
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('.navigation');
menuToggle.addEventListener('click', () => nav.classList.toggle('show'));

// Members container
const membersContainer = document.getElementById('members-container');
let membersData = [];

// Load members from JSON
async function loadMembers() {
    try {
        const response = await fetch('data/members.json'); // matches your folder structure
        membersData = await response.json();
        displayMembers(membersData, 'grid');
    } catch (error) {
        console.error('Failed to load members:', error);
        membersContainer.innerHTML = '<p>Failed to load members. Please try again later.</p>';
    }
}

// Display members in grid or list
function displayMembers(members, view) {
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

// Toggle views
document.getElementById('grid-view').addEventListener('click', () => displayMembers(membersData, 'grid'));
document.getElementById('list-view').addEventListener('click', () => displayMembers(membersData, 'list'));

// Footer info
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// Initial load
loadMembers();
