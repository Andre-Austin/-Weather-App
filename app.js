async function getWeather() {
    const city = document.getElementById("city-input").value.trim();  // Get input and trim spaces
    const apiKey = "795317b707a61bdbf9006954846f0fe6";  // Your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Input validation for empty city name
    if (!city) {
        document.getElementById("weather-result").innerHTML = "Please enter a city name.";
        return;  // Stop execution if the input is empty
    }

    try {
        // Fetch the data from the API
        const response = await fetch(url);
        const data = await response.json();

        // Debugging: Log the full data response to check what's returned
        console.log(data);

        // Check if the city was found (status code 200)
        if (data.cod === 200) {
            const weather = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
            document.getElementById("weather-result").innerHTML = weather;
        } else {
            // If city not found or other issues, show "City not found!" message
            document.getElementById("weather-result").innerHTML = "City not found!";
        }
    } catch (error) {
        // Handle any errors (like network issues)
        document.getElementById("weather-result").innerHTML = "Error fetching data!";
        console.error(error);
    }
}
