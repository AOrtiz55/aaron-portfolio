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
//code for the modal//////////////////////////////////////////////////////////////
(function () {
  const openBtn = document.getElementById("openModalBtn");
  const modal = document.getElementById("learnMoreModal");
  if (!openBtn || !modal) return; // fail-safe if markup isn't present

  const dialog = modal.querySelector(".dialog");
  const closeEls = modal.querySelectorAll("[data-close]");
  const primaryAction = document.getElementById("primaryAction");
  let lastFocused = null;

  const focusable = () =>
    Array.from(
      dialog.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    );

  function openModal() {
    lastFocused = document.activeElement;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    setTimeout(() => {
      const first = focusable()[0] || dialog;
      first.focus();
    }, 10);
    document.addEventListener("keydown", onKeyDown);
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.removeEventListener("keydown", onKeyDown);
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  function onKeyDown(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      closeModal();
      return;
    }
    if (e.key === "Tab") {
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  openBtn.addEventListener("click", openModal);
  openBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal();
    }
  });

  closeEls.forEach((el) => el.addEventListener("click", closeModal));
  modal.querySelector(".overlay").addEventListener("click", closeModal);
  dialog.addEventListener("click", (e) => e.stopPropagation());

  if (primaryAction) {
    primaryAction.addEventListener("click", () => {
      closeModal();
      console.log("Primary action clicked");
    });
  }
})();

// code for hiding the menu tab if you click outside of it////////////////////////////////////////////
var tabMenu = document.getElementById("tabMenu");
var skillsOverlay = document.getElementById("skillsOverlay");
// Prefer the explicit id above; if missing, this falls back to the element with onclick="toggleTabs()"
var tabsToggle =
  document.getElementById("tabsToggle") ||
  document.querySelector('[onclick*="toggleTabs"]');

function isMenuOpen() {
  return tabMenu && tabMenu.classList.contains("open");
}

function closeTabUI() {
  if (tabMenu) tabMenu.classList.remove("open");
  if (skillsOverlay) skillsOverlay.classList.remove("active");
}

function handleDocumentClick(e) {
  if (!isMenuOpen()) return;

  var clickedInsideMenu = tabMenu.contains(e.target);
  var clickedOnToggle = tabsToggle && tabsToggle.contains(e.target);
  var clickedInsideOverlay = skillsOverlay && skillsOverlay.contains(e.target);

  // Close if the click is not on the menu, not on the toggle, and not on the overlay area
  if (!clickedInsideMenu && !clickedOnToggle && !clickedInsideOverlay) {
    closeTabUI();
  }
}

function handleOverlayClick(e) {
  // Close only when clicking the backdrop itself, not the .tab-options box
  if (e.target === skillsOverlay) {
    closeTabUI();
  }
}

function handleEsc(e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeTabUI();
  }
}

function attachMenuLinkHandlers() {
  if (!tabMenu) return;
  var links = tabMenu.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", closeTabUI);
  }
}

function initTabDismiss() {
  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("keydown", handleEsc);
  if (skillsOverlay)
    skillsOverlay.addEventListener("click", handleOverlayClick);
  attachMenuLinkHandlers();
}

// Initialize after DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTabDismiss);
} else {
  initTabDismiss();
}
