# Blog-Website

Welcome to My Blog. a responsive, interactive, and user-friendly blog website built with HTML, CSS, and JavaScript. This project showcases clean UI design, accessibility features, and client-side interactivity using localStorage and DOM manipulation.

# Live Demo
https://rakshith1078.github.io/Blog-Website/

# Features

- Dark Mode Toggle
- Real-time Blog Title Search
  Filter by Categories (Inspiration, Nature, Sports)
- Like & Bookmark with persistence (localStorage)
- Comment System (localStorage-based)
- Recent Posts Carousel
- Scroll-to-Top Button
- Reading Progress Bar
- Smooth Page Transitions

# How It Works

- Dark Mode: Saved in localStorage and toggled with a button.
- Like/Bookmark: Stores post-specific likes and bookmarks using localStorage keys like like-blog1.
- Comments: Comments per post are saved and rendered dynamically based on URL path.
- Search: Filters blog cards on the homepage by matching title text.
- Filter Buttons: Shows/hides blog cards by data-tags.
- Carousel: Animates recent posts with auto-scroll and pause on hover.
- Scroll Progress: A progress bar indicates how far the user has scrolled down the page.

# To Add a New Blog Post

1. Duplicate any existing blogN.html file.
2. Update:
   - Title
   - Date
   - Content
   - Image
   - Blog ID (e.g., blog4) in data-id, localStorage keys, etc.
3. Add a new preview in index.html under:
   - .carousel-item
   - .blog-card
4. Add to the navbar.

# Technologies Used

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- JavaScript (ES6+, DOM API, localStorage)

# Accessibility & Performance

- Responsive design across all screen sizes
- ARIA attributes for navigation and buttons
- Keyboard-friendly controls
- Lightweight â€” no frameworks or build tools

# License

This project is open for educational use. Attribution appreciated but not required.

Created by Rakshith N.
