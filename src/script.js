
let currentTemperature;
// get temp according to search
function displaySearch(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-input");
  // Get the value of the search input
  let city = searchCity.value; 
  let apiKey = "6df0ffa7b3o5c063e6td86aed344ffe7";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(function (response) {
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.city;
    let currentTemperatureElement = document.querySelector("#temperature");
    currentTemperature = Math.round(response.data.temperature.current);
    currentTemperatureElement.innerHTML=currentTemperature;
    let currentFeels = document.querySelector("#feels");
    currentFeels.innerHTML = `Feels like:${Math.round(response.data.temperature.feels_like)}`;
    
    let currentHumidity = document.querySelector("#humidity");
    currentHumidity.innerHTML= `Humidity: ${response.data.temperature.humidity}`;
    let currentWind = document.querySelector("#wind");
    currentWind.innerHTML = `Wind   : ${Math.round(response.data.wind.speed)} KMPH`;

    let timeElement = document.querySelector("#searched-time");
    let date = new Date(response.data.time * 1000);
    timeElement.innerHTML = formatDate(date);
   let descriptionElement = document.querySelector("#description");
   descriptionElement.innerHTML = response.data.condition.description;

   let iconElement = document.querySelector("#icon");
   iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;
    });}
  function formatDate(date){
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday" ,"Friday","Saturday"];
        let day = days[date.getDay()];  
        if (minutes<10){
          minutes = `0${minutes}`;
        }
        return `${day}, ${hours}:${minutes}`;

}
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", displaySearch);
let searchInput = document.querySelector("#search-input");
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    displaySearch(event);
  }
});
// temp in celsius
function displayCelsiusTemp(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  temp.innerHTML = currentTemperature;
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsiusTemp);
// temp in fahrenheit
function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (currentTemperature * 1.8) + 32;
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(fahrenheitTemp);
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheitTemp);
