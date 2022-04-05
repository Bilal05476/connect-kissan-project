// @desc Global Variables
var itemPORT = "http://localhost:8080/api/items/";

// @desc Get User Item
// @desc async function for data fetching
async function getUserItem() {
  const response = await fetch(window.itemPORT);
  const data = await response.json();
  console.log("Get Item", data.message);
}
// getUserItem();

// @desc Post Item By User
// @desc Store Html id scope in the variable
// @desc DOM event listener, call function on click
if (document.getElementById("setItem")) {
  document.getElementById("setItem").onsubmit = function () {
    setItem();
  };
}

// @desc async function for setting item into database
async function setItem(token) {
  const itemName = document.getElementById("item-name").value;
  const itemDesc = document.getElementById("item-desc").value;
  const itemType = document.getElementById("item-type").value;
  const itemPrice = document.getElementById("item-price").value;
  const itemImg = document.getElementById("item-img").value;

  const response = await fetch(window.itemPORT, {
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
  console.log("Set Item", data);
  localStorage.setItem("item", JSON.stringify(data))
}

// @desc Get User
// async function getUser() {
//   let authPORT = "http://localhost:5000/api/user/me";
//   const response = await fetch(authPORT);
//   const data = await response.json();
//   console.log("Auth", data.message);
// }
