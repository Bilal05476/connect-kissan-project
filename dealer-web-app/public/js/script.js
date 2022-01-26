// hide and show password
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
//toggle small screen navbar
var labelId = document.getElementById("navbar-chckd");
var smallNav = document.getElementById("small-nav");
labelId.addEventListener("click", () => {
  smallNav.classList.toggle("show");
  labelId.classList.toggle("show");
});
