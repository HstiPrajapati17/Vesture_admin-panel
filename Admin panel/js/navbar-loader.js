const navbarContainer = document.getElementById("navbar-container");

fetch("/pages/sidebar-navbar/navbar.html")
  .then(res => res.text())
  .then(data => {
    navbarContainer.innerHTML = data;

    // === Now navbar exists in DOM, so we can add events ===
    const navToggle = navbarContainer.querySelector(".h_nav-toggle");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.querySelector(".overlay");
    const body = document.body;
    let collapsed = false;

    if (navToggle && sidebar) {
      navToggle.addEventListener("click", () => {
        if (window.innerWidth < 819) {
          sidebar.classList.add("expanded");
          overlay.classList.add("show");
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
      });
    }
  })
  .catch(err => console.error("Error loading navbar:", err));
