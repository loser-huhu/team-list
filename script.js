document.addEventListener("DOMContentLoaded", function () {
  // Filter button functionality
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Here you would typically filter the team members
      // For this example, we'll just log the filter
      console.log(`Filter by: ${this.textContent}`);
    });
  });

  // Mobile menu toggle
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarNav = document.querySelector("#navbarNav");

  navbarToggler.addEventListener("click", function () {
    navbarNav.classList.toggle("show");
  });

  // Close mobile menu when clicking a nav link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (navbarNav.classList.contains("show")) {
        navbarNav.classList.remove("show");
      }
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  });
});
// xoa thanh vien

document.addEventListener("DOMContentLoaded", function () {
  const member6 = document.querySelector(".member-6 .team-card");

  member6.addEventListener("click", function () {
    // Kiểm tra nếu đã có overlay thì không làm gì
    if (this.querySelector(".member-overlay")) {
      return;
    }

    // Tạo overlay
    const overlay = document.createElement("div");
    overlay.className = "member-overlay"; // Thêm class để kiểm tra sau này
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0,0,0,0.7)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.color = "white";
    overlay.style.fontSize = "1.5rem";
    overlay.style.borderRadius = "8px";
    overlay.textContent = "Người này đã rời khỏi nhóm";

    // Thêm overlay vào card
    this.style.position = "relative";
    this.appendChild(overlay);
  });
});
