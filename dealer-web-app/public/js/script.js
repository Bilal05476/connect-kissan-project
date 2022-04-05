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

// @desc Get User Data
async function getUserData() {
  let itemPORT = "http://localhost:5000/api/items/";
  const response = await fetch(itemPORT);
  const data = await response.json();
  console.log("Get Item", data.message);
}
// @desc Post User Data
async function postUserData(token) {
  let itemPORT = "http://localhost:5000/api/items/";
  document.getElementById("item-submit").addEventListener("click", (e) => {
    e.preventDefault();
    const itemName = document.getElementById("item-name").value;
    const itemDesc = document.getElementById("item-desc").value;
    const itemType = document.getElementById("item-type").value;
    const itemPrice = document.getElementById("item-price").value;
    const itemImg = document.getElementById("item-img").value;

    await fetch(itemPORT, {
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
  }).then((res) => res.json()).then((data) => console.log(data))
  });
  
}

// @desc Get User
async function getUser() {
  let authPORT = "http://localhost:5000/api/user/me";
  const response = await fetch(authPORT);
  const data = await response.json();
  console.log("Auth", data.message);
}
