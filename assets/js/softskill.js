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
///////////////////////////////////////////////
(function () {
  const tabMenu = document.getElementById("tabMenu");
  const tabsToggle = document.getElementById("tabsToggle");
  const skillsOverlay = document.getElementById("skillsOverlay");
  const skillsToggle = document.getElementById("skillsToggle");

  function open(el, controllerBtn) {
    el.classList.add("open");
    el.hidden = false;
    if (controllerBtn) controllerBtn.setAttribute("aria-expanded", "true");
  }

  function close(el, controllerBtn) {
    el.classList.remove("open");
    el.hidden = true;
    if (controllerBtn) controllerBtn.setAttribute("aria-expanded", "false");
  }

  function toggle(el, controllerBtn) {
    const isOpen = el.classList.contains("open");
    isOpen ? close(el, controllerBtn) : open(el, controllerBtn);
  }

  // Wire up the two toggles
  if (tabsToggle && tabMenu) {
    tabsToggle.addEventListener("click", () => toggle(tabMenu, tabsToggle));
  }
  if (skillsToggle && skillsOverlay) {
    skillsToggle.addEventListener("click", () =>
      toggle(skillsOverlay, skillsToggle)
    );
  }

  // Close both on initial load
  document.addEventListener("DOMContentLoaded", () => {
    close(tabMenu, tabsToggle);
    close(skillsOverlay, skillsToggle);
  });

  // Close both when returning via bfcache (back/forward)
  window.addEventListener("pageshow", () => {
    close(tabMenu, tabsToggle);
    close(skillsOverlay, skillsToggle);
  });

  // Close menus when any menu link is clicked (before navigation)
  const menuLinks = document.querySelectorAll(
    ".menu-link, #tabMenu a, #skillsOverlay a"
  );
  menuLinks.forEach((a) => {
    a.addEventListener("click", () => {
      close(tabMenu, tabsToggle);
      close(skillsOverlay, skillsToggle);
    });
  });

  // Click outside to close
  document.addEventListener("click", (e) => {
    const clickedTabMenu = tabMenu && tabMenu.contains(e.target);
    const clickedTabsToggle = tabsToggle && tabsToggle.contains(e.target);
    const clickedSkills = skillsOverlay && skillsOverlay.contains(e.target);
    const clickedSkillsToggle = skillsToggle && skillsToggle.contains(e.target);

    if (!clickedTabMenu && !clickedTabsToggle) close(tabMenu, tabsToggle);
    if (!clickedSkills && !clickedSkillsToggle)
      close(skillsOverlay, skillsToggle);
  });

  // Optional: Escape key closes open panels
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      close(tabMenu, tabsToggle);
      close(skillsOverlay, skillsToggle);
    }
  });

  // Back button behavior
  window.goBack = function (evt) {
    if (evt) evt.preventDefault();
    // Close any open UI first
    close(tabMenu, tabsToggle);
    close(skillsOverlay, skillsToggle);

    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback if no history entry
      window.location.href = "../index.html";
    }
    return false;
  };
})();
