// ==========================
// NAV MENU TOGGLE (Optional)
// ==========================
const menuBtn = document.getElementById("menu-btn");
const navList = document.getElementById("nav-list");

if (menuBtn && navList) {
    menuBtn.addEventListener("click", () => {
        navList.style.display = navList.style.display === "flex" ? "none" : "flex";
    });
}

// ==========================
// WEATHER SECTION
// ==========================
const apiKey = "918a029e1018cbc9beaf59fd3eb43af7"; // <-- Replace with your key
const city = "Addis Ababa";

const weatherDesc = document.getElementById("weather-desc");
const weatherTemp = document.getElementById("weather-temp");
const forecastList = document.getElementById("forecast");

async function getWeather() {
    try {
        // Current weather
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const data = await res.json();
        weatherDesc.textContent = `Weather: ${data.weather[0].description}`;
        weatherTemp.textContent = `Current Temp: ${data.main.temp}°C`;

        // 3-day forecast (8 * 3 ~ every 24 hours)
        const resForecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=24&appid=${apiKey}`);
        const forecastData = await resForecast.json();

        forecastList.innerHTML = "";
        for (let i = 7; i < forecastData.list.length; i += 8) {
            const li = document.createElement("li");
            li.textContent = `${new Date(forecastData.list[i].dt * 1000).toLocaleDateString()}: ${forecastData.list[i].main.temp}°C, ${forecastData.list[i].weather[0].description}`;
            forecastList.appendChild(li);
        }
    } catch (err) {
        console.error(err);
        weatherDesc.textContent = "Weather data not available.";
        weatherTemp.textContent = "";
        forecastList.innerHTML = "<li>Forecast not available</li>";
    }
}

getWeather();

// ==========================
// SPOTLIGHT CARDS
// ==========================
const spotlightContainer = document.getElementById("spotlight-list");

fetch("data/members.json")
    .then(res => res.json())
    .then(data => {
        // Filter Gold or Silver members
        const spotlightMembers = data.filter(m => m.membership === "Gold" || m.membership === "Silver");

        // Shuffle array for random selection
        const shuffled = spotlightMembers.sort(() => 0.5 - Math.random());

        // Select 2 or 3 members
        const selected = shuffled.slice(0, 3);

        // Build spotlight cards
        selected.forEach(member => {
            const li = document.createElement("li");
            li.innerHTML = `
                <div class="spotlight-card">
                    <img src="images/${member.logo.split('/').pop()}" alt="${member.company}" loading="lazy">
                    <h3>${member.company}</h3>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Membership:</strong> ${member.membership}</p>
                    <a href="${member.website}" target="_blank">Learn More</a>
                </div>
            `;
            spotlightContainer.appendChild(li);
        });
    })
    .catch(err => console.error("Error loading members.json:", err));

