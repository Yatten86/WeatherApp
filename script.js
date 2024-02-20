// Your API key for accessing the OpenWeather API
const apiKey = "dae8a4530957b35c8bb0c1a29eca8bd1";

// Selects the input box where the user can type the city name
const searchBox = document.querySelector(".search input");

// Selects the search button that the user will click to search for the weather
const searchButton = document.querySelector(".search button");

// Selects the element where the weather icon will be displayed
const weatherIcon = document.querySelector(".weather-icon");

// The main function that fetches and displays the weather data
async function checkWeather(city) {
  // Constructs the URL for the API request, including the city name and units (metric for Celsius)
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  const response = await fetch(apiURL); // Fetches the data from the API
  var data = await response.json(); // Parses the JSON response
  console.log(data); // Logs the data for debugging purposes

  // Checks if the response includes main weather data
  if (data.main) {
    let temperature = Math.round(data.main.temp); // Rounds the temperature to the nearest whole number
    let cityName = data.name; // Gets the city name from the response
    let humidity = data.main.humidity; // Gets the humidity
    let wind = data.wind.speed; // Gets the wind speed

    // Updates the webpage with the retrieved data
    document.querySelector(".temp").innerHTML = temperature + "°c";
    document.querySelector(".city").innerHTML = cityName;
    document.querySelector(".humidity").innerHTML = humidity + " %";
    document.querySelector(".wind").innerHTML = wind + " km/h";
  } else {
    // If the city is not found or another error occurs, log the error
    console.error("City not found or other error:", data.message);
  }

  // Updates the weather icon based on the "main" weather condition
  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "images/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "images/clear.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "images/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
  } else if (data.weather[0].main == "Snow") {
    weatherIcon.src = "images/snow.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "images/mist.png";
  }
  // Makes the weather information visible by setting display to block
  document.querySelector(".weather").style.display = "block";
}

// Adds an event listener to the search button to call the checkWeather function with the input value when clicked
searchButton.addEventListener("click", function () {
  checkWeather(searchBox.value);
});
