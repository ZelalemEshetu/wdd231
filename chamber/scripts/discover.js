// NAV MENU TOGGLE
const menuBtn = document.getElementById("menu-btn");
const navList = document.getElementById("nav-list");

menuBtn.addEventListener("click", () => {
    navList.classList.toggle("show"); // use CSS class toggle
});

// LOCAL STORAGE: LAST VISIT MESSAGE
const visitMessage = document.getElementById("visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
    visitMessage.textContent = "Welcome! This is your first visit.";
} else {
    const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    visitMessage.textContent = `Welcome back! It's been ${days} day(s) since your last visit.`;
}

localStorage.setItem("lastVisit", now);

// FETCH MEMBERS.JSON AND BUILD CARDS
const container = document.getElementById("members-container");

async function loadMembers() {
    try {
        const response = await fetch("data/members.json");
        const data = await response.json();
        const fragment = document.createDocumentFragment(); // temporary container

        data.forEach((item, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.style.gridArea = `c${index + 1}`;

            // Use lazy loading and optimized image path
            card.innerHTML = `
                <img src="images/${item.logo.split('/').pop()}" alt="${item.company}" loading="lazy">
                <h3>${item.company}</h3>
                <p><strong>Address:</strong> ${item.address}</p>
                <p><strong>Phone:</strong> ${item.phone}</p>
                <p><strong>Membership:</strong> ${item.membership}</p>
                <a href="${item.website}" target="_blank" class="learn-btn">Learn More about ${item.company}</a>
            `;

            fragment.appendChild(card); // append to fragment
        });

        container.appendChild(fragment); // append all at once for better performance
    } catch (err) {
        console.error("Error loading JSON:", err);
    }
}

// Load members on page load
loadMembers();



