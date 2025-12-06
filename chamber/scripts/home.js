// ===== NAV MENU TOGGLE =====
const menuBtn = document.getElementById("menu-btn");
const navList = document.getElementById("nav-list");

menuBtn.addEventListener("click", () => {
    navList.style.display = navList.style.display === "flex" ? "none" : "flex";
});

// ===== WEATHER API =====
const weatherDesc = document.getElementById("weather-desc");
const weatherTemp = document.getElementById("weather-temp");
const forecastList = document.getElementById("forecast");

// Replace with your OpenWeatherMap API key
const apiKey = "YOUR_API_KEY";
const city = "Addis Ababa";
const units = "metric";

async function getWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`);
        const data = await response.json();

        // Current weather
        const current = data.list[0];
        weatherDesc.textContent = `Current: ${current.weather[0].description}`;
        weatherTemp.textContent = `Temperature: ${current.main.temp.toFixed(1)}°C`;

        // 3-day forecast (every 8th item is approx. 24h interval)
        forecastList.innerHTML = "";
        for (let i = 8; i <= 24; i += 8) {
            const day = data.list[i];
            const li = document.createElement("li");
            li.textContent = `${new Date(day.dt * 1000).toLocaleDateString()}: ${day.weather[0].description}, ${day.main.temp.toFixed(1)}°C`;
            forecastList.appendChild(li);
        }
    } catch (err) {
        weatherDesc.textContent = "Weather data not available.";
        console.error(err);
    }
}
getWeather();

// ===== SPOTLIGHT MEMBERS =====
const spotlightContainer = document.getElementById("spotlight-list");

async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();

        // Filter Gold/Silver members
        const filtered = members.filter(m => m.membership === "Gold" || m.membership === "Silver");

        // Shuffle and pick 2–3 members
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        const spotlightMembers = shuffled.slice(0, 3);

        spotlightMembers.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <img src="images/${member.logo.split('/').pop()}" alt="${member.company}" loading="lazy">
                <h3>${member.company}</h3>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Membership:</strong> ${member.membership}</p>
                <a href="${member.website}" target="_blank" class="learn-btn">Learn More</a>
            `;
            spotlightContainer.appendChild(card);
        });
    } catch (err) {
        console.error("Error loading spotlight members:", err);
    }
}

loadSpotlights();
