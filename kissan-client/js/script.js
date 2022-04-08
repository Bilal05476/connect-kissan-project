// @desc Global Variables
var itemPORT = "http://localhost:8080/api/items/all";
let itemsArray = [];

//toggle small screen navbar
var labelId = document.getElementById("navbar-chckd");
var smallNav = document.getElementById("small-nav");
labelId.addEventListener("click", () => {
  smallNav.classList.toggle("show");
  labelId.classList.toggle("show");
});

// small screen dropdown
var servicesMenu = document.getElementById("services-menu-id");
var dropdownContent = document.getElementById("dropdown-small");
var servicesIcon = document.getElementById("services-icon-id");
servicesMenu.addEventListener("click", () => {
  dropdownContent.classList.toggle("show");
  servicesIcon.classList.toggle("fa-caret-up");
});

//Weather Fetching

// set variables for weather data
let city = "";
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
if (cityGetBtn) {
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

    if (
      weatherFor == "Dust" ||
      weatherFor == "Mist" ||
      weatherFor == "Haze" ||
      weatherFor == "Smoke"
    ) {
      weatherIcon.classList.add("fa-smog");
      weatherIcon.classList.remove("fa-cloud-showers-heavy");
      weatherIcon.classList.remove("fa-cloud");
      weatherIcon.classList.remove("fa-moon");
      weatherIcon.classList.remove("fa-snowflake");
    } else if (weatherFor == "Rain" || weatherFor == "Thunderstorm") {
      weatherIcon.classList.add("fa-cloud-showers-heavy");
      weatherIcon.classList.remove("fa-smog");
      weatherIcon.classList.remove("fa-cloud");
      weatherIcon.classList.remove("fa-moon");
      weatherIcon.classList.remove("fa-snowflake");
    } else if (weatherFor == "Clouds") {
      weatherIcon.classList.add("fa-cloud");
      weatherIcon.classList.remove("fa-smog");
      weatherIcon.classList.remove("fa-cloud-showers-heavy");
      weatherIcon.classList.remove("fa-moon");
      weatherIcon.classList.remove("fa-snowflake");
    } else if (weatherFor == "Clear") {
      weatherIcon.classList.add("fa-moon");
      weatherIcon.classList.remove("fa-smog");
      weatherIcon.classList.remove("fa-cloud-showers-heavy");
      weatherIcon.classList.remove("fa-cloud");
      weatherIcon.classList.remove("fa-snowflake");
    } else if (weatherFor == "Snow") {
      weatherIcon.classList.add("fa-snowflake");
      weatherIcon.classList.remove("fa-moon");
      weatherIcon.classList.remove("fa-smog");
      weatherIcon.classList.remove("fa-cloud-showers-heavy");
      weatherIcon.classList.remove("fa-cloud");
    } else {
      weatherIcon.classList.add("fa-moon");
      weatherIcon.classList.remove("fa-smog");
      weatherIcon.classList.remove("fa-cloud-showers-heavy");
      weatherIcon.classList.remove("fa-cloud");
      weatherIcon.classList.remove("fa-snowflake");
    }
  });
}

// @desc Get User Item
// DOMContentLoaded load all the items when client visit the website immediately
document.addEventListener("DOMContentLoaded", function () {
  getUserItem();
});

async function getUserItem() {
  const response = await fetch(window.itemPORT, {
    headers: {
      "User-Agent": "*",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  setupItems(data);
}

const setupItems = (data) => {
  if (data.length) {
    let item = "";
    data.map((doc, index) => {
      const temp = `
          <div class="item" key=${index}>
            <img src="images/2.jpg" />
            <div>
              <h4 class="i-name">Item Name: <span class="i-name">${doc.itemName}</span></h4>
              <h4>Item Type: <span>${doc.itemType}</span></h4>
              <h4>Item Price(Rs): <span>${doc.itemPrice}</span></h4>
              <p>
                Item Description:
                <span>${doc.itemDetails}</span>
              </p>
              <div class="dealer-info">
                <h4>Dealer Name: <span>${doc.itemUserName}</span></h4>
                <h4>Dealer Contact: <span>${doc.itemUserPhone}</span></h4>
              </div>
            </div>
          </div>`;
      item += temp;
    });

    document.querySelector(".item-content").innerHTML = item;
  } else {
    document.querySelector(".item-content").innerHTML =
      '<div class="item"><h4 class="center-align">No Items to Show!</h4></div>';
  }
};

