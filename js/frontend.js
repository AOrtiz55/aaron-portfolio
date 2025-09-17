//code for the back button to go back on the page///

window.goBack = function (e) {
  if (e) e.preventDefault();
  if (window.history.length > 1) {
    window.history.back();
  }
  return false; // block default <a> nav
};

// (optional) dim/disable when there's no history
document.addEventListener("DOMContentLoaded", () => {
  const a = document.querySelector(".back-button");
  if (window.history.length <= 1 && a) {
    a.setAttribute("aria-disabled", "true");
    a.style.pointerEvents = "none";
    a.style.opacity = "0.6";
  }
});

///////////////////////////////////////////////

function toggleTabs() {
  const menu = document.getElementById("tabMenu");
  menu.classList.toggle("open");
}

function toggleSkillsOverlay() {
  const overlay = document.getElementById("skillsOverlay");
  overlay.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("skillsOverlay");
  const links = overlay.querySelectorAll(".tab-options a");

  links.forEach((link) => {
    link.addEventListener("click", () => {
      // ✅ Hide skills overlay
      overlay.classList.remove("active");

      // ✅ Also hide the tab menu sidebar
      document.getElementById("tabMenu").classList.remove("open");
    });
  });
});
