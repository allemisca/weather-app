let now = new Date();
let h3 = document.querySelector("h3");

let hours = now.getHours();
if (hours < 10) {
  hours = "0" + minutes;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

h3.innerHTML = `${day} ${hours}:${minutes}`;

function displayWeather(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let degrees = document.querySelector("h2");
  degrees.innerHTML = `${Math.round(response.data.main.temp)}°`;
}

function updateCity(event) {
  let apiKey = "f07a94241e107c627fab3534ea3f2313";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#submit-button").value;
  updateCity(city);
}

function searchLocation(position) {
  let apiKey = "f07a94241e107c627fab3534ea3f2313";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function showLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", showLocation);
