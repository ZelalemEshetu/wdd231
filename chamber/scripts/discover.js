// NAV MENU
const menuBtn = document.getElementById("menu-btn");
const navList = document.getElementById("nav-list");

menuBtn.addEventListener("click", () => {
    navList.style.display = navList.style.display === "flex" ? "none" : "flex";
});


// LOCAL STORAGE VISIT MESSAGE
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

fetch("data/members.json")
    .then(res => res.json())
    .then(data => {
        data.forEach((item, index) => {
            const card = document.createElement("div");
            card.classList.add("card");

            // Grid area name
            card.style.gridArea = `c${index + 1}`;

            card.innerHTML = `
                <img src="${item.logo}" alt="${item.company}" loading="lazy">
                <h3>${item.company}</h3>
                <p><strong>Address:</strong> ${item.address}</p>
                <p><strong>Phone:</strong> ${item.phone}</p>
                <p><strong>Membership:</strong> ${item.membership}</p>
                <a href="${item.website}" target="_blank" class="learn-btn">Learn More</a>
            `;

            container.appendChild(card);
        });
    })
    .catch(err => console.error("Error loading JSON:", err));

