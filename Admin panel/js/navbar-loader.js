(function () {
  if (window.__navbarLoaderInitialized) return;
  window.__navbarLoaderInitialized = true;

  function init() {
    const navbarContainer = document.getElementById("navbar-container");
    if (!navbarContainer) return;

    fetch("/pages/sidebar-navbar/navbar.html")
      .then(res => res.text())
      .then(data => {
        navbarContainer.innerHTML = data;

        const navToggle = navbarContainer.querySelector(".h_nav-toggle");
        const body = document.body;
        let collapsed = false;

        if (navToggle) {
          navToggle.addEventListener("click", () => {
            // Lazy query to avoid race with async sidebar loader
            const sidebar = document.getElementById("sidebar");
            const overlay = document.querySelector(".overlay");
            if (!sidebar) return;

            if (window.innerWidth < 819) {
              sidebar.classList.add("expanded");
              overlay?.classList.add("show");
            } else {
              collapsed = !collapsed;
              if (collapsed) {
                sidebar.classList.add("collapsed");
                body.classList.add("sidebar-collapsed");
              } else {
                sidebar.classList.remove("collapsed");
                body.classList.remove("sidebar-collapsed");
              }
            }
          }, { passive: true });
        }
      })
      .catch(err => console.error("Error loading navbar:", err));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
