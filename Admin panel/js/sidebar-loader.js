const sidebarContainer = document.getElementById("sidebar-container");

fetch("/pages/sidebar-navbar/sidebar.html")
  .then(res => res.text())
  .then(data => {
    sidebarContainer.innerHTML = data;
    initSidebar();
  })
  .catch(err => console.error("Error loading sidebar:", err));

function initSidebar() {
  const sidebar = document.getElementById("sidebar");
  const mobileClose = sidebar.querySelector(".mobile-close");
  const overlay = document.querySelector(".overlay");

  // Mobile close
  if (mobileClose) {
    mobileClose.addEventListener("click", () => {
      sidebar.classList.remove("expanded");
      overlay.classList.remove("show");
    });
  }
  if (overlay) {
    overlay.addEventListener("click", () => {
      sidebar.classList.remove("expanded");
      overlay.classList.remove("show");
    });
  }

  // Mobile dropdown toggle
  if (window.innerWidth < 819) {
    const dropdownLinks = sidebar.querySelectorAll(".has-dropdown > a");
    dropdownLinks.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        link.parentElement.classList.toggle("active");
      });
    });
  }

  /// Active link highlight
  let currentPath = window.location.pathname.toLowerCase();
  const links = sidebar.querySelectorAll("a[href]");

  links.forEach(link => {
    let linkHref = link.getAttribute("href");
    if (!linkHref || linkHref === "#") return;
    linkHref = linkHref.toLowerCase();

    const fileName = currentPath.split("/").pop();

    if (fileName === linkHref.split("/").pop()) {
      // Remove all active classes and close dropdowns
      sidebar.querySelectorAll("a.active").forEach(el => el.classList.remove("active"));
      sidebar.querySelectorAll(".has-dropdown.active").forEach(el => {
        el.classList.remove("active");
        const menu = el.querySelector(".dropdown-menu");
        if (menu) menu.style.display = "none";
      });

      // Set active link
      link.classList.add("active");

      // Keep its parent dropdown open
      const parentDropdown = link.closest(".has-dropdown");
      if (parentDropdown) {
        parentDropdown.classList.add("active");
        const parentLink = parentDropdown.querySelector("> a");
        if (parentLink) parentLink.classList.add("active");
        const dropdownMenu = parentDropdown.querySelector(".dropdown-menu");
        if (dropdownMenu) dropdownMenu.style.display = "block";
      }
    }
  });

}
function searchMenu(searchText) {
  searchText = searchText.toLowerCase();
  const menuItems = document.querySelectorAll('.nav-list > li'); // top-level li

  menuItems.forEach(item => {
    const label = item.textContent.toLowerCase();

    if (item.classList.contains('has-dropdown')) {
      // handle dropdown
      const dropdownItems = item.querySelectorAll('.dropdown-menu li');
      let hasVisibleChild = false;

      dropdownItems.forEach(child => {
        const childText = child.textContent.toLowerCase();
        if (childText.includes(searchText)) {
          child.style.display = '';
          hasVisibleChild = true;
        } else {
          child.style.display = 'none';
        }
      });

      // Show parent if it matches OR any child matches
      if (label.includes(searchText) || hasVisibleChild || searchText === '') {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }

    } else {
      // normal (non-dropdown) item
      if (label.includes(searchText) || searchText === '') {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    }
  });
}