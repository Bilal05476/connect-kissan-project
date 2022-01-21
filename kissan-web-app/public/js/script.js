//toggle small screen navbar
var labelId = document.getElementById("navbar-chckd");
var smallNav = document.getElementById("small-nav");
labelId.addEventListener("click", () => {
  smallNav.classList.toggle("show");
  labelId.classList.toggle("show");
});

//Weather Fetching
let cityName = "karachi";
let cityGetBtn = document.getElementById("weather-get");
let weatherField = document.getElementById("weatherField");
const api_Key = "xxxxxxxxxxxx";

cityGetBtn.addEventListener("click", async () => {
  cityName = weatherField.value;
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_Key}`
  );
  console.log(data.body);
});
