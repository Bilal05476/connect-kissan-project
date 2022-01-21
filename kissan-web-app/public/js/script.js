//toggle small screen navbar
var labelId = document.getElementById("navbar-chckd");
var smallNav = document.getElementById("small-nav");
labelId.addEventListener("click", () => {
  smallNav.classList.toggle("show");
  labelId.classList.toggle("show");
});

//Weather Fetching

// set variables for weather data
let city = "karachi";
let cityGetBtn = document.getElementById("weather-get");
let weatherField = document.getElementById("weatherField");
let weatherDegree = document.querySelector(".weather-degree");
let cityName = document.querySelector(".city-name");
let countryName = document.querySelector(".country-name");
let cityForcast = document.querySelector(".city-forcast");

// api-key for data fetching
const api_Key = "your-key";

// function call on event listener
cityGetBtn.addEventListener("click", async () => {
  city = weatherField.value;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_Key}&units=metric`
  );
  const data = await response.json();

  const { weather, name, sys, main } = data;
  const { temp } = main;
  weatherDegree.innerHTML = temp;
  cityName.innerHTML = name;
  countryName.innerHTML = sys.country;
  weather.map((item) => (cityForcast.innerHTML = item.main));
});
