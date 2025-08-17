// script.js
const locationInput = document.getElementById('locationInput');
const getWeatherButton = document.getElementById('getWeatherButton');
const temperatureDisplay = document.getElementById('temperature');
const conditionDisplay = document.getElementById('condition');
const locationDisplay = document.getElementById('location');
const iconDisplay = document.getElementById('icon');
const errorMessage = document.getElementById('error-message');


const apiKey = 'b526789b73444727a0495341250802'; // Your API key

getWeatherButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (!location) {
        displayError("Please enter a location.");
        return;
    }
    getWeatherData(location);
});

async function getWeatherData(location) {
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
           const errorData = await response.json(); // Try to get error details from API
            let errorMessageText = "Error fetching weather data.";
            if (errorData && errorData.error && errorData.error.message) {
                errorMessageText = errorData.error.message; // Use API's error message if available
            }
            throw new Error(errorMessageText);  // Throw error with more context
        }
        const data = await response.json();
        displayWeather(data);
        errorMessage.textContent = ''; // Clear any previous error messages
    } catch (error) {
       displayError(error.message); // Display the error message to the user
    }
}


function displayWeather(data) {
    const temperature = data.current.temp_c;
    const condition = data.current.condition.text;
    const location = data.location.name + ", " + data.location.region;
    const icon = "http:" + data.current.condition.icon; // Correct icon URL

    temperatureDisplay.textContent = `${temperature}°C`;
    conditionDisplay.textContent = condition;
    locationDisplay.textContent = location;
    iconDisplay.src = icon;
    iconDisplay.alt = condition; // Set alt text for accessibility
}

function displayError(message) {
    errorMessage.textContent = message;
    temperatureDisplay.textContent = "";
    conditionDisplay.textContent = "";
    locationDisplay.textContent = "";
    iconDisplay.src = ""; // Clear the icon
}