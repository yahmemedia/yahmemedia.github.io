/* ========= Yahme Media - GLOBAL JS =========
   This file MUST exist at: assets/js/global.js  (case-sensitive on live hosting)
   Used by: index.html, audit.html, pricing.html, contact.html, policies.html, thankyoupage.html
*/

(function () {
  // ---------- Helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ---------- Mobile Drawer ----------
  window.toggleMobileMenu = function (forceClose) {
    const drawer = document.getElementById("mobileDrawer");
    if (!drawer) return;

    if (forceClose === true) {
      drawer.classList.remove("open");
      return;
    }
    drawer.classList.toggle("open");
  };

  // ---------- Growth Plan Modal ----------
  window.openGrowthPlan = function () {
    const dim = document.getElementById("gpDim");
    const modal = document.getElementById("gpModal");
    if (!dim || !modal) {
      console.warn("[GrowthPlan] Missing #gpDim or #gpModal on this page.");
      return;
    }

    dim.classList.add("open");
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  window.closeGrowthPlan = function () {
    const dim = document.getElementById("gpDim");
    const modal = document.getElementById("gpModal");
    if (!dim || !modal) return;

    dim.classList.remove("open");
    modal.classList.remove("open");
    document.body.style.overflow = "";
  };

  // ---------- Init on load ----------
  document.addEventListener("DOMContentLoaded", () => {
    // Close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      const dim = document.getElementById("gpDim");
      if (dim && dim.classList.contains("open")) window.closeGrowthPlan();
    });

    // Prevent clicks inside modal from bubbling (so dim click doesn't close)
    const modal = document.getElementById("gpModal");
    if (modal) modal.addEventListener("click", (e) => e.stopPropagation());

    // Red-dot buttons: disable dot + apply lighter red state (until refresh)
    $$(".harsh-red-btn").forEach((el) => {
      el.addEventListener(
        "click",
        () => {
          el.classList.add("dot-disabled");
        },
        { passive: true }
      );
    });

    // Reels playback speed 1.5x
    $$(".reel-video").forEach((v) => {
      try {
        v.playbackRate = 1.5;
      } catch (_) {}
    });
  });
})();
