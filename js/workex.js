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
  const opening = !menu.classList.contains("open");

  if (opening) {
    // fully SHOW
    menu.hidden = false;
    menu.classList.remove("is-hidden");
    menu.style.removeProperty("display");
    menu.classList.add("open");
  } else {
    // HIDE via class only (let CSS handle visibility)
    menu.classList.remove("open");
    // optional: also add a helper class if you want display:none
    // menu.classList.add('is-hidden');
  }
}
/////////// /////////// /////////// ///////////
//code for hangling to menu button that deals with the experince options
//showing up on scroll page
function toggleSkillsOverlay() {
  const container = document.getElementById("imageContainer");
  const scrollTop = container.scrollTop;
  const imageHeight = container.clientHeight;
  const currentIndex = Math.round(scrollTop / imageHeight);

  // Hide all overlays first
  const allOverlays = document.querySelectorAll(".tab-overlay");
  allOverlays.forEach((overlay) => overlay.classList.remove("active"));

  // Show the correct overlay for the visible image
  const activeOverlay = document.getElementById(`skillsOverlay${currentIndex}`);
  if (activeOverlay) {
    activeOverlay.classList.add("active");
  }
}

//////////////////////////////////////////////////////////////////////////////////////
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

//for image scroll and dynamic subtitle with button code below

//
/////////////////////////////////////////////////////////////////////////////////
///
function handleTagClick(button, imageIndex) {
  // ✅ Remove active class from all buttons
  document.querySelectorAll(".tag").forEach((btn) => {
    btn.classList.remove("active");
  });

  // ✅ Add active class to the clicked button
  button.classList.add("active");

  // ✅ Update subtitle
  const subtitleText = button.getAttribute("data-subtitle");
  document.querySelector(".subtitle").textContent = subtitleText;

  // ✅ Scroll to image
  scrollToImage(imageIndex);

  // ✅ Hide all experience card sections
  document.querySelectorAll(".experience-cards").forEach((section) => {
    section.style.display = "none";
  });

  // ✅ Show the correct experience section
  const buttonText = button.textContent
    .trim()
    .toLowerCase()
    .replace(/\W+/g, "");
  const sectionId = buttonText + "Experience";
  const section = document.getElementById(sectionId);
  if (section) {
    section.style.display = "flex";
  }
}

function scrollToImage(index) {
  const container = document.getElementById("imageContainer");
  const images = container.querySelectorAll(".main-image");

  if (images[index]) {
    images[index].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

function updateSubtitle(button) {
  const subtitleText = button.getAttribute("data-subtitle");
  const subtitleDiv = document.querySelector(".subtitle");
  subtitleDiv.textContent = subtitleText;
}
function handleOverlayTabClick(link, imageIndex) {
  const subtitle = link.getAttribute("data-subtitle");
  document.querySelector(".subtitle").textContent = subtitle;

  scrollToImage(imageIndex);

  // ✅ Hide all experience card sections
  document.querySelectorAll(".experience-cards").forEach((section) => {
    section.style.display = "none";
  });

  // ✅ Match section ID from link text
  const textKey = link.textContent.trim().toLowerCase().replace(/\W+/g, "");
  const sectionId = textKey + "Experience";

  const section = document.getElementById(sectionId);
  if (section) {
    section.style.display = "flex";
  }

  // ✅ Close overlays
  document.getElementById("skillsOverlay").classList.remove("active");
  document.getElementById("tabMenu").classList.remove("open");
}

///////////////////////////////////////////////////////////////////////////////////////
//experince card
function showExperience(id) {
  // Hide all sections
  document.querySelectorAll(".experience-cards").forEach((section) => {
    section.style.display = "none";
  });

  // Show selected section
  const selected = document.getElementById(id);
  if (selected) {
    selected.style.display = "flex";
  }
}
/////////////////////code for menu button opening and closing when you click on image wrapper
(() => {
  const menu = document.getElementById("tabMenu");
  if (!menu) return;
  document.addEventListener(
    "click",
    (e) => {
      if (e.target.closest(".image-wrapper")) {
        // just remove 'open' (and optionally add 'is-hidden')
        menu.classList.remove("open");
        // menu.classList.add("is-hidden"); // only if you want display:none via CSS
        // also clear any leftover inline/hidden, just in case
        menu.hidden = false;
        menu.style.removeProperty("display");
      }
    },
    true
  );
})();
(() => {
  const container = document.getElementById("imageContainer");

  // Block wheel/touch on overlay itself (so events don’t bubble to the scroller)
  const prevent = (e) => e.preventDefault();

  function lockScroll() {
    container.classList.add("no-scroll");
    container.addEventListener("wheel", prevent, { passive: false });
    container.addEventListener("touchmove", prevent, { passive: false });
    // Optional: block keyboard scrolling too
    window.addEventListener("keydown", keyBlock, { passive: false });
  }
  function unlockScroll() {
    container.classList.remove("no-scroll");
    container.removeEventListener("wheel", prevent, { passive: false });
    container.removeEventListener("touchmove", prevent, { passive: false });
    window.removeEventListener("keydown", keyBlock, { passive: false });
  }
  function keyBlock(e) {
    if (
      [
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        " ",
      ].includes(e.key)
    ) {
      e.preventDefault();
    }
  }

  // Enhance your existing toggle to lock/unlock scroll
  const origToggle = window.toggleSkillsOverlay;
  window.toggleSkillsOverlay = function () {
    // your original logic:
    const scrollTop = container.scrollTop;
    const imageHeight = container.clientHeight;
    const currentIndex = Math.round(scrollTop / imageHeight);

    document
      .querySelectorAll(".tab-overlay")
      .forEach((o) => o.classList.remove("active"));
    const activeOverlay = document.getElementById(
      `skillsOverlay${currentIndex}`
    );
    if (activeOverlay) {
      const isOpening = !activeOverlay.classList.contains("active");
      if (isOpening) {
        activeOverlay.classList.add("active");
        // capture wheel/touch on the overlay itself
        activeOverlay.addEventListener("wheel", prevent, {
          passive: false,
        });
        activeOverlay.addEventListener("touchmove", prevent, {
          passive: false,
        });
        lockScroll();
      } else {
        activeOverlay.classList.remove("active");
        activeOverlay.removeEventListener("wheel", prevent);
        activeOverlay.removeEventListener("touchmove", prevent);
        unlockScroll();
      }
    }
  };

  // Close overlay (and unlock) when clicking a link or the dark backdrop
  document.addEventListener("click", (e) => {
    if (
      e.target.closest(".tab-overlay .tab-options a") ||
      e.target.matches(".tab-overlay")
    ) {
      document
        .querySelectorAll(".tab-overlay")
        .forEach((o) => o.classList.remove("active"));
      unlockScroll();
    }
  });
})();
//off click menu on image///////////////////////////////////////////
// document.addEventListener("click", (e) => {
//   if (e.target.closest(".image-wrapper")) {
//     const menu = document.getElementById("tabMenu");
//     if (menu) menu.classList.add("hidden");
//   }
// });
// document.getElementById("tabMenu").classList.remove("hidden");
function toggleSkills() {
  const container = document.getElementById("imageContainer");
  const scrollTop = container.scrollTop;
  const imageHeight = container.clientHeight;
  const currentIndex = Math.round(scrollTop / imageHeight);

  // Hide all overlays first
  const allOverlays = document.querySelectorAll(".tab-overlay");
  allOverlays.forEach((overlay) => overlay.classList.remove("active"));

  // Show the correct overlay for the visible image
  const activeOverlay = document.getElementById(`skillsOverlay${currentIndex}`);
  if (activeOverlay) {
    activeOverlay.classList.add("active");
  }
}
/////////////////////////drop down for skillsets

///////////////////this is needed in order for the skillset to have a dropdown///////////
(() => {
  const container = document.getElementById("imageContainer");
  if (!container) return;

  const prevent = (e) => e.preventDefault();

  function keyBlock(e) {
    if (
      [
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        " ",
      ].includes(e.key)
    ) {
      e.preventDefault();
    }
  }
  function lockScroll() {
    container.classList.add("no-scroll");
    container.addEventListener("wheel", prevent, { passive: false });
    container.addEventListener("touchmove", prevent, { passive: false });
    window.addEventListener("keydown", keyBlock, { passive: false });
  }
  function unlockScroll() {
    container.classList.remove("no-scroll");
    container.removeEventListener("wheel", prevent, { passive: false });
    container.removeEventListener("touchmove", prevent, { passive: false });
    window.removeEventListener("keydown", keyBlock, { passive: false });
  }

  // Generic toggler used by both Work Experience and Skill Sets
  function toggleOverlay(prefix) {
    const scrollTop = container.scrollTop;
    const imageHeight = container.clientHeight;
    const currentIndex = Math.round(scrollTop / imageHeight);

    // close all overlays first
    document
      .querySelectorAll(".tab-overlay")
      .forEach((o) => o.classList.remove("active"));

    const activeOverlay = document.getElementById(`${prefix}${currentIndex}`);
    if (!activeOverlay) return;

    const isOpening = !activeOverlay.classList.contains("active");
    if (isOpening) {
      activeOverlay.classList.add("active");
      activeOverlay.addEventListener("wheel", prevent, { passive: false });
      activeOverlay.addEventListener("touchmove", prevent, {
        passive: false,
      });
      lockScroll();
    } else {
      activeOverlay.classList.remove("active");
      activeOverlay.removeEventListener("wheel", prevent);
      activeOverlay.removeEventListener("touchmove", prevent);
      unlockScroll();
    }
  }

  // Expose both toggles
  window.toggleSkillsOverlay = () => toggleOverlay("skillsOverlay"); // existing Work Experience
  window.toggleSkillsetsOverlay = () => toggleOverlay("skillsetsOverlay"); // NEW Skill Sets

  // Close overlay when clicking a link or the dark backdrop, and hide the side menu
  document.addEventListener("click", (e) => {
    if (
      e.target.closest(".tab-overlay .tab-options a") ||
      e.target.matches(".tab-overlay")
    ) {
      document
        .querySelectorAll(".tab-overlay")
        .forEach((o) => o.classList.remove("active"));
      const menu = document.getElementById("tabMenu");
      if (menu) menu.classList.remove("open");
      unlockScroll();
    }
  });
})();
