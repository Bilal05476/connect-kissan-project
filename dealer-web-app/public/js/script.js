// hide and show password
function showPassword() {
  document.getElementById("passInput").type = "text";
}
function hidePassword() {
  document.getElementById("passInput").type = "password";
}
//toggle small screen navbar
var labelId = document.getElementById("navbar-chckd");
var smallNav = document.getElementById("small-nav");
labelId.addEventListener("click", () => {
  smallNav.classList.toggle("show");
  labelId.classList.toggle("show");
});