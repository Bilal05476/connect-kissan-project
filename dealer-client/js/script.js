// @desc Global Variables
var authPORT = "http://localhost:8080/api/user/login/";
var registerPORT = "http://localhost:8080/api/user/";
var currentUser = JSON.parse(localStorage.getItem("user")) || null;

// @desc hide and show password
function showPassword() {
  document.getElementById("loginPass").type = "text";
  document.querySelector(".showPass").style = "display: none;";
  document.querySelector(".hidePass").style = "display: block;";
}
function hidePassword() {
  document.getElementById("loginPass").type = "password";
  document.querySelector(".showPass").style = "display: block;";
  document.querySelector(".hidePass").style = "display: none;";
}
// @desc toggle small screen navbar
labelId = document.getElementById("navbar-chckd");
smallNav = document.getElementById("small-nav");
labelId.addEventListener("click", () => {
  smallNav.classList.toggle("show");
  labelId.classList.toggle("show");
});

// @desc Login Form Submission
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").onsubmit = function (e) {
    e.preventDefault();
    userLogin();
  };
}

async function userLogin() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPass").value;
  const userInfo = { email, password };

  const response = await fetch(window.authPORT, {
    method: "POST",
    headers: {
      "User-Agent": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  const data = await response.json();
  if (data.message === "Invalid credentials") {
    if (document.getElementById("loginError")) {
      document.getElementById("loginError").innerHTML = data.message;
      document.getElementById("loginError").style.padding = "10px 30px";
      document.getElementById("loginError").style.border = "1px solid red";
    }
  } else {
    document.getElementById("loginError").innerHTML = " ";
    document.getElementById("loginError").style.padding = "0px";
    document.getElementById("loginError").style.border = "none";
    localStorage.setItem("user", JSON.stringify(data));
    window.currentUser = data;
    console.clear();
  }
}

// @desc Register Form Submission
if (document.getElementById("registerForm")) {
  document.getElementById("registerForm").onsubmit = function (e) {
    e.preventDefault();
    userRegister();
  };
}
async function userRegister() {
  const name = document.getElementById("name").value;
  const dealer = document.getElementById("dealer").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  const userInfo = { email, password, name, dealer, phone };

  const response = await fetch(window.registerPORT, {
    method: "POST",
    headers: {
      "User-Agent": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  const data = await response.json();

  if (
    data.message === "User already exist" ||
    data.message === "Please add all fields"
  ) {
    if (document.getElementById("signError")) {
      document.getElementById("signError").innerHTML = data.message;
      document.getElementById("signError").style.padding = "10px 30px";
      document.getElementById("signError").style.border = "1px solid red";
    }
  } else {
    document.getElementById("signError").innerHTML = " ";
    document.getElementById("signError").style.padding = "0px";
    document.getElementById("signError").style.border = "none";
    localStorage.setItem("user", JSON.stringify(data));
    window.currentUser = data;
    console.clear();
  }
}
