let currentTemperature;
// Main function to handle search and display current weather
function displaySearch(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-input");
  let city = searchCity.value;
  let apiKey = "6df0ffa7b3o5c063e6td86aed344ffe7";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(function (response) {
    updateCurrentWeather(response.data);
    getForecast(city);
  });
}
// Helper function to update current weather information
function updateCurrentWeather(data) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = data.city;
  let currentTemperatureElement = document.querySelector("#temperature");
  currentTemperature = Math.round(data.temperature.current);
  currentTemperatureElement.innerHTML = currentTemperature;
  let currentFeels = document.querySelector("#feels");
  currentFeels.innerHTML = `Feels like: ${Math.round(data.temperature.feels_like)}&deg`;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${data.temperature.humidity}`;
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Wind   : ${Math.round(data.wind.speed)} KMPH`;
  let timeElement = document.querySelector("#searched-time");
  let date = new Date(data.time * 1000);
  timeElement.innerHTML = formatDate(date);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = data.condition.description;
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${data.condition.icon_url}" class="weather-icon" />`;
}
// Helper function to format date
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${days[date.getDay()]}, ${hours}:${minutes}`;
}
// Helper function to get forecast
function getForecast(city) {
  let apiKey = "6df0ffa7b3o5c063e6td86aed344ffe7";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiUrl).then(displayForecast);
}
// Display forecast based on the response data
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  console.log(response.data);
  let forecastHTML = '<div class="row mt-4">'; // Start the row here
  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML += `<div class="col weeklyWeather mx-1">
         <div class="weather-forecast-date">${formatDay(day.time)}</div>
         <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
         <div class="weather-forecast-temp">
          <span class="weather-forecast-temp-max">${Math.round(day.temperature.maximum)}&deg<br /></span>
          <span class="weather-forecast-temp-min">${Math.round(day.temperature.minimum)}&deg</span>
         </div>
      </div>`;
    }
  });
  forecastHTML += '</div>'; // End the row here
  forecastElement.innerHTML = forecastHTML;
}
// Helper function to format day
function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

// Event listeners
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", displaySearch);
let searchInput = document.querySelector("#search-input");
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    displaySearch(event);
  }
});
// Temperature conversion event listeners
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsiusTemp);
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheitTemp);
// Display temperature in Celsius
function displayCelsiusTemp(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  temp.innerHTML = currentTemperature;
}
// Display temperature in Fahrenheit
function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (currentTemperature * 1.8) + 32;
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(fahrenheitTemp);
}
