// Team member data
const teamMembers = [
  {
    id: 1,
    name: "Phạm Tấn Phát",
    role: "Fullstack Developer",
    bio: "Chuyên gia ReactJS và VueJS với 1 năm kinh nghiệm. Luôn tìm kiếm giải pháp sáng tạo cho giao diện người dùng.",
    image: "./assets/img/avatar.png",
    portfolio: "https://loser-huhu.github.io/Web-CV/",
  },
  {
    id: 2,
    name: "Nguyễn Văn Sơn",
    role: "Backend Developer",
    bio: "Chuyên gia Node.js và Python với kiến thức sâu về kiến trúc hệ thống và cơ sở dữ liệu. Luôn đảm bảo hiệu suất cao cho ứng dụng.",
    image: "./assets/img/nguyenvanson.png",
    portfolio: "https://vansom2245.github.io/Profolio/",
  },
  {
    id: 3,
    name: "Nguyễn Hoàng Minh Tuấn",
    role: "Fullstack Developer",
    bio: "Kết hợp cả frontend và backend để tạo ra ứng dụng hoàn chỉnh. Có kinh nghiệm với MERN stack và giải pháp cloud.",
    image: "./assets/img/minhtuan.jpg",
    portfolio: "https://vansom2245.github.io/minhtuan/#",
  },
  {
    id: 4,
    name: "Trần Gia Huy",
    role: "DevOps Engineer",
    bio: "Chuyên gia triển khai CI/CD, containerization và cloud infrastructure. Đảm bảo hệ thống hoạt động ổn định và hiệu quả.",
    image: "./assets/img/trangiahuy.jpg",
    portfolio: "#",
  },
  {
    id: 5,
    name: "Huỳnh Minh Quân",
    role: "UI/UX Designer",
    bio: "Biến ý tưởng thành trải nghiệm người dùng tuyệt vời. Chuyên gia Figma và Adobe Creative Suite với đôi mắt thẩm mỹ sắc sảo.",
    image: "./assets/img/hinhminhquan.png",
    portfolio: "#",
  },
];

// DOM Elements
const teamWrapper = document.getElementById("teamWrapper");
const searchInput = document.getElementById("searchInput");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const themeToggle = document.getElementById("themeToggle");
const backToTopBtn = document.getElementById("backToTop");
const loadingScreen = document.querySelector(".loading-screen");

// Carousel state
let currentIndex = 0;
let cardsPerView = 3;
let cardWidth = 0;
let gap = 30; // Gap between cards
let filteredMembers = [...teamMembers];

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  // Hide loading screen after 1.5 seconds
  setTimeout(() => {
    loadingScreen.classList.add("hidden");
  }, 1500);

  // Render team members
  renderTeamMembers(teamMembers);

  // Setup event listeners
  setupEventListeners();

  // Check system preference for dark mode
  checkSystemThemePreference();

  // Update card dimensions and carousel state
  updateCarouselState();
});

// Render team members to the page
function renderTeamMembers(members) {
  teamWrapper.innerHTML = "";
  filteredMembers = [...members];

  members.forEach((member) => {
    const memberCard = document.createElement("div");
    memberCard.className = "team-member-card";
    memberCard.innerHTML = `
            <div class="member-img-container">
                <img src="${member.image}" alt="${member.name}" class="member-img" loading="lazy">
            </div>
            <div class="card-body">
                <h3 class="member-name">${member.name}</h3>
                <p class="member-role">${member.role}</p>
                <p class="member-bio">${member.bio}</p>
                <a href="${member.portfolio}" class="portfolio-link" target="_blank">
                    <i class="fas fa-external-link-alt me-2"></i>Portfolio
                </a>
            </div>
        `;
    teamWrapper.appendChild(memberCard);
  });

  // Update carousel after rendering
  updateCarouselState();
}

// Search functionality
function filterMembers(searchTerm) {
  if (searchTerm === "") {
    renderTeamMembers(teamMembers);
    return;
  }

  const filtered = teamMembers.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  renderTeamMembers(filtered);
}

// Theme toggle functionality
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);
  themeToggle.innerHTML = isDarkMode
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
}

// Check system theme preference
function checkSystemThemePreference() {
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const savedDarkMode = localStorage.getItem("darkMode") === "true";

  if (savedDarkMode || prefersDarkScheme.matches) {
    document.body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

// Back to top button
function setupBackToTop() {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Update carousel state based on screen size
function updateCarouselState() {
  // Calculate cards per view
  if (window.innerWidth >= 992) {
    cardsPerView = 3;
  } else if (window.innerWidth >= 768) {
    cardsPerView = 2;
  } else {
    cardsPerView = 1;
  }

  // Update card dimensions
  if (document.querySelector(".team-member-card")) {
    const card = document.querySelector(".team-member-card");
    cardWidth = card.offsetWidth;
    const style = getComputedStyle(teamWrapper);
    gap = parseInt(style.gap) || 30;
  }

  // Adjust current index if needed
  const maxIndex = Math.max(0, filteredMembers.length - cardsPerView);
  if (currentIndex > maxIndex) {
    currentIndex = maxIndex;
  }

  // Update carousel position
  updateCarouselPosition();

  // Update navigation buttons
  updateNavigationButtons();
}

// Update carousel position
function updateCarouselPosition() {
  const position = -(currentIndex * (cardWidth + gap));
  teamWrapper.style.transform = `translateX(${position}px)`;
}

// Update navigation buttons state
function updateNavigationButtons() {
  // Previous button
  if (currentIndex <= 0) {
    prevBtn.classList.add("disabled");
  } else {
    prevBtn.classList.remove("disabled");
  }

  // Next button
  const maxIndex = Math.max(0, filteredMembers.length - cardsPerView);
  if (currentIndex >= maxIndex) {
    nextBtn.classList.add("disabled");
  } else {
    nextBtn.classList.remove("disabled");
  }
}

// Move to previous card
function movePrev() {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarouselPosition();
    updateNavigationButtons();
  }
}

// Move to next card
function moveNext() {
  const maxIndex = Math.max(0, filteredMembers.length - cardsPerView);
  if (currentIndex < maxIndex) {
    currentIndex++;
    updateCarouselPosition();
    updateNavigationButtons();
  }
}

// Setup all event listeners
function setupEventListeners() {
  // Search input
  searchInput.addEventListener("input", () => {
    filterMembers(searchInput.value);
    currentIndex = 0; // Reset to first position
    updateNavigationButtons();
  });

  // Theme toggle
  themeToggle.addEventListener("click", toggleTheme);

  // Back to top
  setupBackToTop();

  // Carousel navigation
  prevBtn.addEventListener("click", movePrev);
  nextBtn.addEventListener("click", moveNext);

  // Update carousel on resize
  window.addEventListener("resize", () => {
    updateCarouselState();
  });
}
