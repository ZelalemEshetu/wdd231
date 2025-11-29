// Navigation toggle
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('.navigation');
if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => nav.classList.toggle('show'));
}

// Footer info
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// ----------------------
// Spotlight Members
// ----------------------
const spotlightContainer = document.getElementById('spotlight-container');
let membersData = [];

async function loadSpotlights() {
    try {
        const response = await fetch('data/members.json');
        membersData = await response.json();
        displaySpotlights();
    } catch (error) {
        console.error('Failed to load members:', error);
        spotlightContainer.innerHTML = '<p>Failed to load spotlights.</p>';
    }
}

function displaySpotlights() {
    const eligibleMembers = membersData.filter(m => m.membership >= 2); // Silver or Gold
    const shuffled = eligibleMembers.sort(() => 0.5 - Math.random()).slice(0, 3);
    spotlightContainer.innerHTML = '';

    shuffled.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';
        card.innerHTML = `
            ${member.image ? `<img src="images/${member.image}" alt="${member.name}" class="member-image">` : ''}
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Website</a></p>
            <p>Membership Level: ${['Member', 'Silver', 'Gold'][member.membership - 1]}</p>
        `;
        spotlightContainer.appendChild(card);
    });
}

// ----------------------
// Weather Section (OpenWeatherMap API)
// ----------------------
const weatherDesc = document.getElementById('weather-desc');
const weatherTemp = document.getElementById('weather-temp');
const forecastList = document.getElementById('forecast');

async function loadWeather() {
    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
    const city = 'Addis Ababa';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=24&appid=${apiKey}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        // Current weather
        const current = data.list[0];
        weatherDesc.textContent = `Description: ${current.weather[0].description}`;
        weatherTemp.textContent = `Temp: ${current.main.temp}°C`;

        // 3-day forecast (approx every 8th entry = 24h forecast)
        forecastList.innerHTML = '';
        for (let i = 7; i < data.list.length; i += 8) {
            const item = data.list[i];
            const li = document.createElement('li');
            const date = new Date(item.dt * 1000);
            li.textContent = `${date.toDateString()}: ${item.main.temp}°C, ${item.weather[0].description}`;
            forecastList.appendChild(li);
        }

    } catch (error) {
        console.error('Weather API error:', error);
        weatherDesc.textContent = 'Unable to load weather';
    }
}

// Initial load
loadSpotlights();
loadWeather();
