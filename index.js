// Define constants for elements and API key
const form = document.querySelector('form');
const weatherSearchInput = document.getElementById('weather-search');
const weatherDisplay = document.getElementById('weather');
const apiKey = '349afb2a9869a89854e4a871186ec3d8'; // Replace with your actual API key

// Helper function to display the weather data
const displayWeather = ({ name, sys, weather, main, dt, coord }) => {
  // Destructure required data from the API response
  const { country } = sys;
  const { description, icon } = weather[0];
  const { temp, feels_like } = main;
  const { lat, lon } = coord;

  // Format the time
  const lastUpdated = new Date(dt * 1000).toLocaleTimeString();

  // Build the weather display HTML using template literals
  weatherDisplay.innerHTML = `
    <h2>${name}, ${country}</h2>
    <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}" target="__BLANK">Click to view map</a>
    <img id="example-icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
    <p id="example-desc" style="text-transform: capitalize;">${description}</p>
    <p id="example-actual-temp">Current: ${temp.toFixed(2)}° F</p>
    <p id="example-feels-temp">Feels like: ${feels_like.toFixed(2)}° F</p>
    <p id="example-time">Last updated: ${lastUpdated}</p>
  `;
};

// Helper function to display an error message
const displayError = () => {
  weatherDisplay.innerHTML = '<h2>Location not found</h2>';
};

// Async function to fetch weather data
const fetchWeather = async (location) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Location not found');
    const weatherData = await response.json();
    displayWeather(weatherData);
  } catch (error) {
    displayError();
  }
};

// Event listener for form submission
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form submission
  const location = weatherSearchInput.value.trim();
  if (location) {
    fetchWeather(location);
    weatherSearchInput.value = ''; // Clear input field
    weatherDisplay.innerHTML = ''; // Clear weather display for next search
  }
});
