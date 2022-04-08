// @desc Global Variables
var contactPORT = "http://localhost:8080/contact-us";

// @desc Login Form Submission
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

  await fetch(window.contactPORT, {
    method: "POST",
    headers: {
      "User-Agent": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactInfo),
  });

  // window.location.replace =
  //   "http://127.0.0.1:5500/dealer-client/formSubmission.html";
}
