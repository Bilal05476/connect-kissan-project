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
let weatherIcon = document.getElementById("weather-icon");

// api-key for data fetching
const api_Key = "4b36a8c51a0c99c38c1cfff230b8d126";

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
  const weatherFor = weather.map((item) => item.main);
  cityForcast.innerHTML = weatherFor;

  if (weatherFor == "Dust") {
    weatherIcon.classList.add("fa-smog");
    weatherIcon.classList.remove("fa-cloud-showers-heavy");
    weatherIcon.classList.remove("fa-cloud");
    weatherIcon.classList.remove("fa-moon");
  } else if (weatherFor == "Rain" || weatherFor == "Thunderstorm") {
    weatherIcon.classList.add("fa-cloud-showers-heavy");
    weatherIcon.classList.remove("fa-smog");
    weatherIcon.classList.remove("fa-cloud");
    weatherIcon.classList.remove("fa-moon");
  } else if (weatherFor == "Clouds") {
    weatherIcon.classList.add("fa-cloud");
    weatherIcon.classList.remove("fa-smog");
    weatherIcon.classList.remove("fa-cloud-showers-heavy");
    weatherIcon.classList.remove("fa-moon");
  } else if (weatherFor == "Clear") {
    weatherIcon.classList.add("fa-moon");
    weatherIcon.classList.remove("fa-smog");
    weatherIcon.classList.remove("fa-cloud-showers-heavy");
    weatherIcon.classList.remove("fa-cloud");
  }
});
