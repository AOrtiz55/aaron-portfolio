function showPopup(id) {
  document.getElementById(id).classList.add("show");
}

function hidePopup(id) {
  document.getElementById(id).classList.remove("show");
}
// navbar
// function toggleMenu() {
//   const menu = document.getElementById("menu");
//   const toggle = document.getElementById("menuToggle");

//   menu.classList.toggle("open");

//   if (menu.classList.contains("open")) {
//     toggle.textContent = "CLOSE";
//   } else {
//     toggle.textContent = "MENU ";
//   }
// }
// ./assets/js/index.js
(function () {
  const menu = document.getElementById("menu");
  const toggle = document.getElementById("menuToggle");

  function openMenu() {
    menu.classList.add("open");
    menu.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    menu.classList.remove("open");
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }

  function toggleMenu() {
    const isOpen = menu.classList.contains("open");
    isOpen ? closeMenu() : openMenu();
  }

  // Expose if you rely on inline onclick="toggleMenu()"
  window.toggleMenu = toggleMenu;

  // Prefer JS event instead of inline onclick:
  if (toggle) {
    toggle.addEventListener("click", toggleMenu);
  }

  // Always start closed on first load
  document.addEventListener("DOMContentLoaded", closeMenu);

  // When returning via back/forward, pageshow fires even with bfcache.
  // Reset the menu so it isn't stuck open.
  window.addEventListener("pageshow", function () {
    closeMenu();
  });

  // Close immediately when a menu link is clicked (before nav)
  const menuLinks = menu ? menu.querySelectorAll("a") : [];
  menuLinks.forEach((a) => {
    a.addEventListener("click", () => {
      // optional: brief delay to ensure click ripple/animation shows
      closeMenu();
    });
  });

  // Optional: click outside to close
  document.addEventListener("click", (e) => {
    const clickedToggle = toggle && toggle.contains(e.target);
    const clickedMenu = menu && menu.contains(e.target);
    if (!clickedToggle && !clickedMenu) closeMenu();
  });
})();
