/* =========================================
   OMAR MONTASER PORTFOLIO — SCRIPT.JS
   ========================================= */

/* ---- Typewriter ---- */
const phrases = [
  "Cybersecurity Engineer",
  "Cloud Security Engineer"
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const el = document.getElementById("typewriter");

function typeWriter() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    el.textContent = current.slice(0, --charIndex);
  } else {
    el.textContent = current.slice(0, ++charIndex);
  }
  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(typeWriter, 2000);
    return;
  }
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }
  setTimeout(typeWriter, isDeleting ? 55 : 90);
}
window.addEventListener("load", () => setTimeout(typeWriter, 800));

/* ---- Custom cursor ---- */
const cursor = document.getElementById("cursor");
const cursorDot = document.getElementById("cursorDot");

if (cursor && cursorDot) {
  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursorDot.style.left = mx + "px";
    cursorDot.style.top = my + "px";
  });
  function animateCursor() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursor.style.left = cx + "px";
    cursor.style.top = cy + "px";
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  document.querySelectorAll("a, button, .skill-pills span, .exp-tags span, .project-card, .cert-card, .ach-card, .highlight-card").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hovering"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hovering"));
  });
}

/* ---- Navbar scroll ---- */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
}, { passive: true });

/* ---- Hamburger menu ---- */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  const spans = hamburger.querySelectorAll("span");
  if (mobileMenu.classList.contains("open")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
  } else {
    spans.forEach(s => { s.style.transform = ""; s.style.opacity = ""; });
  }
});
document.querySelectorAll(".mobile-link").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    hamburger.querySelectorAll("span").forEach(s => { s.style.transform = ""; s.style.opacity = ""; });
  });
});

/* ---- Reveal on scroll ---- */
const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add("visible");
      }, delay * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

reveals.forEach((el, i) => {
  el.dataset.delay = i % 4;
  revealObserver.observe(el);
});

/* ---- Active nav link on scroll ---- */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.style.color = "");
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = "var(--accent)";
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));

/* ---- Smooth scroll for all anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

/* ---- Parallax on hero orbs (subtle) ---- */
const orb1 = document.querySelector(".hero-orb-1");
const orb2 = document.querySelector(".hero-orb-2");
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  if (orb1) orb1.style.transform = `translateY(${y * 0.15}px)`;
  if (orb2) orb2.style.transform = `translateY(${y * 0.08}px)`;
}, { passive: true });
