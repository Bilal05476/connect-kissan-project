// @desc Global Variables
var itemPORT = "http://localhost:8080/api/items/";
var authPORT = "http://localhost:8080/api/user/";
var getUserItem;

// @desc
window.onload = function () {
  window.getUserItem = document.getElementById("get-item");
  console.log(window.getUserItem);
};

// @desc hide and show password
function showPassword() {
  document.getElementById("passInput").type = "text";
  document.querySelector(".showPass").style = "display: none;";
  document.querySelector(".hidePass").style = "display: block;";
}
function hidePassword() {
  document.getElementById("passInput").type = "password";
  document.querySelector(".showPass").style = "display: block;";
  document.querySelector(".hidePass").style = "display: none;";
}

// @desc toggle small screen navbar
var labelId = document.getElementById("navbar-chckd");
var smallNav = document.getElementById("small-nav");
labelId.addEventListener("click", () => {
  smallNav.classList.toggle("show");
  labelId.classList.toggle("show");
});

// @desc Get User Item
// @desc Store Html id scope in the variable
// var gd = document.getElementById("get-item");

// @desc DOM event listener, call function on click
getUserItem.addEventListener("click", () => {
  console.log("Hello click");
});
// @desc async function for data fetching
async function getItem() {
  console.log("Hello World");
  let itemPORT = "http://localhost:8080/api/items/";
  const response = await fetch(itemPORT);
  const data = await response.json();
  console.log("Get Item", data.message);
}

// @desc Post Item By User
// @desc Store Html id scope in the variable
const postUserItem = document.getElementById("item-submit");
// @desc DOM event listener, call function on click
postUserItem.addEventListener("click", setItem);
// @desc async function for data fetching
async function setItem(e) {
  e.preventDefault();
  let itemPORT = "http://localhost:8080/api/items/";
  const itemName = document.getElementById("item-name").value;
  const itemDesc = document.getElementById("item-desc").value;
  const itemType = document.getElementById("item-type").value;
  const itemPrice = document.getElementById("item-price").value;
  const itemImg = document.getElementById("item-img").value;

  const response = await fetch(itemPORT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      itemName,
      itemDesc,
      itemImg,
      itemType,
      itemPrice,
    }),
  });
  const data = await response.json();
  console.log("Set Item", data.message);
}

// @desc Get User
// async function getUser() {
//   let authPORT = "http://localhost:5000/api/user/me";
//   const response = await fetch(authPORT);
//   const data = await response.json();
//   console.log("Auth", data.message);
// }
