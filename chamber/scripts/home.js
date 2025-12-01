// ========================
// WEATHER SECTION WITH FALLBACK
// ========================
const weatherApiKey = '918a029e1018cbc9beaf59fd3eb43af7'; // <-- my API KEY-->
const city = 'Addis Ababa,ET'; // City name and country code
const weatherDescEl = document.getElementById('weather-desc');
const weatherTempEl = document.getElementById('weather-temp');
const forecastEl = document.getElementById('forecast');

async function getWeather() {
    try {
        // Fetch 5-day forecast data from OpenWeatherMap
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=en&appid=${weatherApiKey}`);
        if (!res.ok) throw new Error('API request failed');
        const data = await res.json();

        // Current weather (first item in list)
        const current = data.list[0];
        weatherDescEl.textContent = current.weather[0].description;
        weatherTempEl.textContent = `Temperature: ${current.main.temp.toFixed(1)} °C`;

        // 3-Day Forecast (next 3 days at noon)
        forecastEl.innerHTML = '';
        const daysAdded = new Set();
        for (let i = 0; i < data.list.length; i++) {
            const dt = new Date(data.list[i].dt_txt);
            const dateStr = dt.toLocaleDateString();
            if (!daysAdded.has(dateStr) && dt.getHours() === 12 && daysAdded.size < 3) {
                daysAdded.add(dateStr);
                const li = document.createElement('li');
                li.textContent = `${dateStr}: ${data.list[i].main.temp.toFixed(1)} °C, ${data.list[i].weather[0].description}`;
                forecastEl.appendChild(li);
            }
        }

    } catch (err) {
        console.warn('Weather API failed, using fallback data:', err);

        // Fallback sample data
        weatherDescEl.textContent = "Clear sky";
        weatherTempEl.textContent = "Temperature: 25 °C";
        forecastEl.innerHTML = `
            <li>Dec 2: 25 °C, Clear sky</li>
            <li>Dec 3: 26 °C, Partly cloudy</li>
            <li>Dec 4: 27 °C, Light rain</li>
        `;
    }
}

// Call the function
getWeather();