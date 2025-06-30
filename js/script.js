// Escape HTML for safe comment rendering
function escapeHTML(str) {
  const p = document.createElement("p");
  p.textContent = str;
  return p.innerHTML;
}

// 🌙 Dark Mode Toggle
const toggleDark = document.getElementById("toggle-dark");
const body = document.body;

function updateDarkModeUI() {
  const isDark = body.classList.contains("dark-mode");
  toggleDark.setAttribute("aria-pressed", isDark);
  toggleDark.textContent = isDark ? "☀" : "🌙";
}

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
}
updateDarkModeUI();

if (toggleDark) {
  toggleDark.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
    updateDarkModeUI();
  });
}

// 🔍 Blog Search
const searchInput = document.getElementById('search');
const blogCards = document.querySelectorAll('.blog-card');

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    blogCards.forEach(card => {
      const title = card.querySelector('h2').textContent.toLowerCase();
      card.style.display = title.includes(query) ? 'block' : 'none';
    });
  });
}


// ⬆ Scroll-to-Top Button
const scrollTopBtn = document.createElement("button");
scrollTopBtn.innerText = "↑";
scrollTopBtn.id = "scroll-top";
scrollTopBtn.setAttribute("aria-label", "Scroll to top");
document.body.appendChild(scrollTopBtn);

scrollTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
});

// 💬 Comment Section
const commentForm = document.getElementById("comment-form");
const commentList = document.getElementById("comment-list");
const commentName = document.getElementById("comment-name");
const commentText = document.getElementById("comment-text");

if (commentForm && commentList && commentName && commentText) {
  const blogId = window.location.pathname;
  const savedComments = JSON.parse(localStorage.getItem(blogId)) || [];

  function renderComments() {
    commentList.innerHTML = "";
    savedComments.forEach(({ name, text }) => {
      const item = document.createElement("li");
      item.innerHTML = `<strong>${escapeHTML(name)}:</strong> ${escapeHTML(text)}`;
      commentList.appendChild(item);
    });
  }

  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameVal = commentName.value.trim();
    const textVal = commentText.value.trim();

    if (!nameVal || !textVal) return;
    if (textVal.length > 250) {
      alert("Comment too long. Please keep it under 250 characters.");
      return;
    }

    const comment = { name: nameVal, text: textVal };
    savedComments.push(comment);
    localStorage.setItem(blogId, JSON.stringify(savedComments));
    renderComments();
    commentForm.reset();
  });

  commentName.focus(); // Autofocus
  renderComments();
}

// 📱 Mobile Menu Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("nav ul.nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// 🌀 Smooth Page Transitions
document.querySelectorAll('a[href]').forEach(link => {
  if (link.hostname === window.location.hostname) {
    link.addEventListener('click', e => {
      const href = link.href;
      document.body.classList.add('fade-out');
      e.preventDefault();
      setTimeout(() => window.location = href, 300);
    });
  }
});

// Like Button Logic
document.querySelectorAll(".like-btn").forEach(btn => {
  const blogId = btn.dataset.id;
  const countSpan = btn.querySelector(".like-count");
  let count = parseInt(localStorage.getItem(`like-${blogId}`)) || 0;
  countSpan.textContent = count;

  btn.addEventListener("click", () => {
    count++;
    countSpan.textContent = count;
    localStorage.setItem(`like-${blogId}`, count);
  });
});

// Bookmark Button Logic
document.querySelectorAll(".bookmark-btn").forEach(btn => {
  const blogId = btn.dataset.id;
  const saved = localStorage.getItem(`bookmark-${blogId}`) === "true";
  btn.textContent = saved ? "✅ Bookmarked" : "🔖 Bookmark";

  btn.addEventListener("click", () => {
    const isBookmarked = localStorage.getItem(`bookmark-${blogId}`) === "true";
    localStorage.setItem(`bookmark-${blogId}`, !isBookmarked);
    btn.textContent = !isBookmarked ? "✅ Bookmarked" : "🔖 Bookmark";
  });
});

// Reading Progress Bar Logic
window.addEventListener("scroll", () => {
  const progress = document.getElementById("progress-bar");
  if(progress) {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progress.style.width = `${scrollPercent}%`;
  }
});

const carouselTrack = document.querySelector('.carousel-track');

if (carouselTrack) {
  carouselTrack.addEventListener('mouseenter', () => {
    carouselTrack.style.animationPlayState = 'paused';
  });

  carouselTrack.addEventListener('mouseleave', () => {
    carouselTrack.style.animationPlayState = 'running';
  });
}

// Blog Tag Filter
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove active from all buttons
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");
    blogCards.forEach(card => {
      const tags = card.getAttribute("data-tags");
      if (filter === "all" || tags.includes(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// In script.js (or inline script for testing)
window.onscroll = function () {
  const bar = document.getElementById("progress-bar");
  if (bar) {
  const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  bar.style.width = scrolled + "%";
  }
};