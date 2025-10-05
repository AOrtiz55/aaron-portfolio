// ../assets/js/workex.js
(function () {
  // ---------- Back button ----------
  window.goBack = function (e) {
    if (e) e.preventDefault();
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // fallback: go home if no history
      window.location.href = "../index.html";
    }
    return false;
  };

  document.addEventListener("DOMContentLoaded", () => {
    const backA = document.querySelector(".back-button");
    if (window.history.length <= 1 && backA) {
      backA.setAttribute("aria-disabled", "true");
      backA.style.pointerEvents = "none";
      backA.style.opacity = "0.6";
    }
  });

  // ---------- Elements ----------
  const tabMenu = document.getElementById("tabMenu");
  const tabsToggle = document.getElementById("tabsToggle");
  const container = document.getElementById("imageContainer");

  const skillsOverlays = Array.from(
    document.querySelectorAll('[id^="skillsOverlay"]')
  ); // skillsOverlay0..3
  const skillsetsOverlays = Array.from(
    document.querySelectorAll('[id^="skillsetsOverlay"]')
  ); // skillsetsOverlay0..3

  // ---------- Tiny helpers ----------
  const open = (el) => {
    if (el) {
      el.classList.add("open");
      el.hidden = false;
    }
  };
  const close = (el) => {
    if (el) {
      el.classList.remove("open");
      el.hidden = true;
    }
  };
  const toggle = (el) => {
    if (!el) return;
    el.classList.contains("open") ? close(el) : open(el);
  };
  const closeAllOverlays = () => {
    document
      .querySelectorAll(".tab-overlay")
      .forEach((o) => o.classList.remove("active"));
    unlockScroll();
  };
  const closeEverything = () => {
    close(tabMenu);
    closeAllOverlays();
  };

  // ---------- Menu toggle ----------
  if (tabsToggle && tabMenu) {
    document.addEventListener("DOMContentLoaded", () => close(tabMenu)); // start closed
    tabsToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      // optional: close any open overlays when opening the side menu
      closeAllOverlays();
      toggle(tabMenu);
    });
  }

  // Close menu when clicking a link inside it
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    if (tabMenu && tabMenu.contains(a)) close(tabMenu);
  });

  // Click outside to close menu/overlays
  document.addEventListener("click", (e) => {
    const inMenu = tabMenu && tabMenu.contains(e.target);
    const onToggle = tabsToggle && tabsToggle.contains(e.target);
    if (!inMenu && !onToggle) close(tabMenu);
  });

  // Hide menu when clicking an image (your requirement)
  document.addEventListener(
    "click",
    (e) => {
      if (e.target.closest(".image-wrapper")) close(tabMenu);
    },
    true
  );

  // ---------- Overlays (per current image) ----------
  // Lock scrolling of the scroller behind overlays
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
    )
      e.preventDefault();
  }
  function lockScroll() {
    if (!container) return;
    container.classList.add("no-scroll");
    container.addEventListener("wheel", prevent, { passive: false });
    container.addEventListener("touchmove", prevent, { passive: false });
    window.addEventListener("keydown", keyBlock, { passive: false });
  }
  function unlockScroll() {
    if (!container) return;
    container.classList.remove("no-scroll");
    container.removeEventListener("wheel", prevent, { passive: false });
    container.removeEventListener("touchmove", prevent, { passive: false });
    window.removeEventListener("keydown", keyBlock, { passive: false });
  }

  function currentImageIndex() {
    if (!container) return 0;
    const scrollTop = container.scrollTop;
    const imageHeight = container.clientHeight;
    return Math.round(scrollTop / imageHeight);
  }

  // Generic overlay toggler by prefix ("skillsOverlay" or "skillsetsOverlay")
  function toggleOverlay(prefix) {
    const idx = currentImageIndex();
    const target = document.getElementById(`${prefix}${idx}`);
    if (!target) return;

    const isOpening = !target.classList.contains("active");
    // Close ALL overlays first
    document
      .querySelectorAll(".tab-overlay")
      .forEach((o) => o.classList.remove("active"));

    if (isOpening) {
      target.classList.add("active");
      // block wheel/touch on overlay itself
      target.addEventListener("wheel", prevent, { passive: false });
      target.addEventListener("touchmove", prevent, { passive: false });
      lockScroll();
    } else {
      target.classList.remove("active");
      target.removeEventListener("wheel", prevent);
      target.removeEventListener("touchmove", prevent);
      unlockScroll();
    }
  }

  // Expose functions used by your HTML onclicks in the menu:
  //   toggleSkillsOverlay()   -> opens skillsOverlay{current}
  //   toggleSkillsetsOverlay() -> opens skillsetsOverlay{current}
  window.toggleSkillsOverlay = () => toggleOverlay("skillsOverlay");
  window.toggleSkillsetsOverlay = () => toggleOverlay("skillsetsOverlay");

  // Close overlay on link click or backdrop click; also hide side menu
  document.addEventListener("click", (e) => {
    if (
      e.target.matches(".tab-overlay") ||
      e.target.closest(".tab-overlay .tab-options a")
    ) {
      closeAllOverlays();
      close(tabMenu);
    }
  });

  // ---------- Keep your existing handlers, but make them close ALL overlays ----------
  window.handleOverlayTabClick = function (link, imageIndex) {
    const subtitle = link.getAttribute("data-subtitle");
    const subtitleEl = document.querySelector(".subtitle");
    if (subtitleEl) subtitleEl.textContent = subtitle;

    scrollToImage(imageIndex);

    // Hide all experience sections
    document
      .querySelectorAll(".experience-cards")
      .forEach((s) => (s.style.display = "none"));

    // Show matching section
    const key = link.textContent.trim().toLowerCase().replace(/\W+/g, "");
    const section = document.getElementById(key + "Experience");
    if (section) section.style.display = "flex";

    // Close overlays + side menu
    closeAllOverlays();
    close(tabMenu);
  };

  window.handleTagClick = function (button, imageIndex) {
    document
      .querySelectorAll(".tag")
      .forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const subtitleText = button.getAttribute("data-subtitle");
    const subtitleDiv = document.querySelector(".subtitle");
    if (subtitleDiv) subtitleDiv.textContent = subtitleText;

    scrollToImage(imageIndex);

    document
      .querySelectorAll(".experience-cards")
      .forEach((s) => (s.style.display = "none"));
    const key = button.textContent.trim().toLowerCase().replace(/\W+/g, "");
    const section = document.getElementById(key + "Experience");
    if (section) section.style.display = "flex";

    closeAllOverlays();
  };

  function scrollToImage(index) {
    if (!container) return;
    const images = container.querySelectorAll(".main-image");
    if (images[index]) {
      images[index].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // ---------- Global close behaviors ----------
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeEverything();
  });

  // Reset UI when returning via back/forward cache
  window.addEventListener("pageshow", () => closeEverything());
})();
