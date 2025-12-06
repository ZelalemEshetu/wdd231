// NAV MENU TOGGLE
const menuBtn = document.getElementById("menu-btn");
const navList = document.getElementById("nav-list");

menuBtn.addEventListener("click", () => {
    navList.style.display = navList.style.display === "flex" ? "none" : "flex";
});

// FETCH MEMBERS.JSON AND BUILD CARDS
const container = document.getElementById("members-container");

fetch("data/members.json")
    .then(response => response.json())
    .then(data => {
        data.forEach((item, index) => {
            const card = document.createElement("div");
            card.classList.add("card");

            // Named grid area for desktop layouts
            card.style.gridArea = `c${index + 1}`;

            card.innerHTML = `
                <img src="images/${item.logo.split('/').pop()}" alt="${item.company}" loading="lazy">
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
