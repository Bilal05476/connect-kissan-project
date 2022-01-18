//toggle small screen navbar
var labelId = document.getElementById("navbar-chckd");
var smallNav = document.getElementById("small-nav");
labelId.addEventListener("click", () => {
  smallNav.classList.toggle("show");
  labelId.classList.toggle("show");
});

fetchWeather: function foo() {
  fetch(
    "api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"
  ),
    then((res) => res.json);
}
