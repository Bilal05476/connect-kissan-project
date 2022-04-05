// @desc Global Variables
var authPORT = "http://localhost:8080/api/user/login/";
var registerPORT = "http://localhost:8080/api/user/";

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
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });

  const data = await response.json();
  console.log("User", data);
  if (data.message !== "Invalid credentials") {
    localStorage.setItem("user", JSON.stringify(data));
  }
}

// @desc Register Form Submission
if (document.getElementById("registerForm")) {
  document.getElementById("registerForm").onsubmit = function () {
    userRegister();
  };
}
async function userRegister() {
  console.log(document.getElementById("name").value);
  console.log(document.getElementById("dealer").value);
  console.log(document.getElementById("email").value);
  console.log(document.getElementById("phone").value);
  console.log(document.getElementById("password").value);
}
