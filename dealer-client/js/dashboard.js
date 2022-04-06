// @desc Global Variables
var itemPORT = "http://localhost:8080/api/items/";
var currentUser = JSON.parse(localStorage.getItem("user")) || null;

let userItemsArray = [];
console.log("User Items", userItemsArray);

if (currentUser) {
  document.querySelector(".username").innerHTML = currentUser.name;
  document.querySelector(".userEmail").innerHTML = currentUser.email;
  document.querySelector(".dealerShip").innerHTML = currentUser.dealer;
  document.querySelector(".phone").innerHTML = currentUser.phone;
}

// @desc Get User Item
// @desc async function for data fetching
// @desc DOM event listener, call function on click
if (document.getElementById("get-item")) {
  document.getElementById("get-item").addEventListener("click", function (e) {
    e.preventDefault();
    getUserItem();
  });
}
async function getUserItem() {
  const response = await fetch(window.itemPORT, {
    headers: {
      Authorization: `Bearer ${window.currentUser.token}`,
      "User-Agent": "*",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  window.userItemsArray = data;

  if (window.userItemsArray) {
  }
}

// @desc Post Item By User
// @desc Store Html id scope in the variable
// @desc DOM event listener, call function on submit
if (document.getElementById("setItem")) {
  document.getElementById("setItem").onsubmit = function (e) {
    e.preventDefault();
    setItem();
  };
}

// @desc async function for setting item into database
async function setItem() {
  const itemName = document.getElementById("item-name").value;
  const itemDetails = document.getElementById("item-details").value;
  const itemType = document.getElementById("item-type").value;
  const itemPrice = document.getElementById("item-price").value;
  const itemImg = document.getElementById("item-img").value;

  const response = await fetch(window.itemPORT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${window.currentUser.token}`,
      "Content-Type": "application/json",
      "User-Agent": "*",
    },
    body: JSON.stringify({
      itemName,
      itemDetails,
      itemImg,
      itemType,
      itemPrice,
    }),
  });
  const data = await response.json();
  console.log("Set Item", data);
}
