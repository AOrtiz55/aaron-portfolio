function showPopup(id) {
  document.getElementById(id).classList.add("show");
}

function hidePopup(id) {
  document.getElementById(id).classList.remove("show");
}
// navbar
function toggleMenu() {
  const menu = document.getElementById("menu");
  const toggle = document.getElementById("menuToggle");

  menu.classList.toggle("open");

  if (menu.classList.contains("open")) {
    toggle.textContent = "CLOSE";
  } else {
    toggle.textContent = "MENU ";
  }
}
