// 1. LocalStorage visit message
const message = document.getElementById("visitMessage");
const lastVisit = localStorage.getItem("lastVisit");
const today = Date.now();

if (!lastVisit) {
    message.textContent = "Welcome! This is your first visit.";
} else {
    const days = Math.floor((today - lastVisit) / (1000 * 60 * 60 * 24));
    message.textContent = `Your last visit was ${days} day(s) ago.`;
}

localStorage.setItem("lastVisit", today);


// 2. Fetch JSON and build 8 cards
const container = document.getElementById("cardsContainer");

async function loadMembers() {
    const response = await fetch("data/memberss.json");
    const data = await response.json();

    data.forEach((business, index) => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.style.gridArea = "card" + (index + 1);

        card.innerHTML = `
            <img src="${business.image}" loading="lazy" alt="${business.name}">
            <h2>${business.name}</h2>
            <p>${business.address}</p>
            <p>${business.description}</p>
            <button onclick="window.open('${business.website}', '_blank')">Learn More</button>
        `;

        container.appendChild(card);
    });
}

loadMembers();
