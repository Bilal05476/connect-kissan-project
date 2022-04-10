// @desc Global Variables
var authPORT = "http://localhost:8080/api/user/login/";
var registerPORT = "http://localhost:8080/api/user/";
var contactPORT = "http://localhost:8080/contact-us";
var currentUser = JSON.parse(localStorage.getItem("user")) || null;

setTimeout(showPage, 1000);

function showPage() {
  const dashboardRedirection =
    "http://127.0.0.1:5500/dealer-client/dashboard.html";
  const loginHref = "http://127.0.0.1:5500/dealer-client/login.html";
  const registerHref = "http://127.0.0.1:5500/dealer-client/register.html";
  if (window.currentUser !== null) {
    if (
      window.location.href === loginHref ||
      window.location.href === registerHref
    ) {
      window.location.replace(dashboardRedirection);
    }
  }
  if (window.currentUser === null) {
    if (window.location.href === dashboardRedirection) {
      window.location.replace(loginHref);
    }
  }
}

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
  const userInfo = { email: email.toLowerCase(), password };

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
    showPage();
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
    showPage();
  }
}

// @desc logout user
if (document.getElementById("logoutBtn")) {
  document.getElementById("logoutBtn").onclick = function () {
    // e.preventDefault();
    if (window.currentUser) {
      localStorage.clear();
      showPage();
    }
  };
}

// @desc Contact Form Submission
if (document.getElementById("contactForm")) {
  document.getElementById("contactForm").onsubmit = function (e) {
    e.preventDefault();
    userContact();
  };
}

async function userContact() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const emailAddress = document.getElementById("emailAddress").value;
  const phoneNum = document.getElementById("phoneNum").value;
  const message = document.getElementById("message").value;
  const contactInfo = { firstName, lastName, emailAddress, phoneNum, message };
  document.querySelector(".formSubmission").innerHTML = `
    <h3 style="margin: 1rem auto; text-align: center; color: #f1f1f1; font-size: 1rem">
      Thank You! Your details are submitted, We'll contact you soon :)...
    </h3>
    <a
      style="
        color: #f1f1f1;
        background-color: rgb(236, 153, 0);
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 5px;
        margin: 1rem auto;
      "
      href="dashboard.html">Home
    </a>`;

  await fetch(window.contactPORT, {
    method: "POST",
    headers: {
      "User-Agent": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactInfo),
  });
}
