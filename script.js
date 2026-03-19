/* ================================================================
   MUSTEHSAN NAWAZ — PORTFOLIO JAVASCRIPT
   Features: Typewriter, Scroll Reveal, Skill Bars, Counter,
             Modal, Custom Cursor, Navbar, Hamburger, Back-to-top
   ================================================================ */

"use strict";

/* ── DOM READY ─────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  initCursor();
  initNavbar();
  initHamburger();
  initTypewriter();
  initScrollProgress();
  initScrollReveal();
  initSkillBars();
  initCounters();
  initContactForm();
  initBackToTop();
  setYear();
});

/* ── CUSTOM CURSOR ─────────────────────────────────────────── */
function initCursor() {
  const dot  = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left  = mouseX + "px";
    dot.style.top   = mouseY + "px";
  });

  // Smooth ring follow
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + "px";
    ring.style.top  = ringY + "px";
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect on interactive elements
  const interactives = document.querySelectorAll("a, button, .skill-card, .cert-card, .project-card, input, textarea");
  interactives.forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("hovering"));
    el.addEventListener("mouseleave", () => ring.classList.remove("hovering"));
  });
}

/* ── NAVBAR SCROLL ─────────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  // Active link highlighting
  const sections   = document.querySelectorAll("section[id]");
  const navLinks   = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) link.classList.add("active");
    });
  });
}

/* ── HAMBURGER MENU ────────────────────────────────────────── */
function initHamburger() {
  const hamburger = document.getElementById("hamburger");
  const navLinks  = document.getElementById("navLinks");
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  // Close on link click
  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    }
  });
}

/* ── TYPEWRITER EFFECT ─────────────────────────────────────── */
function initTypewriter() {
  const el = document.getElementById("typewriter");
  if (!el) return;

  const phrases = [
    "Full Stack Developer",
    "Creative Problem Solver",
    "UI / UX Enthusiast",
    "B.Tech CSE Student",
    "Open Source Contributor",
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  const TYPING_SPEED   = 90;
  const DELETING_SPEED = 45;
  const PAUSE_END      = 1800;
  const PAUSE_START    = 300;

  function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex--);
      if (charIndex < 0) {
        isDeleting   = false;
        phraseIndex  = (phraseIndex + 1) % phrases.length;
        setTimeout(type, PAUSE_START);
        return;
      }
      setTimeout(type, DELETING_SPEED);
    } else {
      el.textContent = current.substring(0, charIndex++);
      if (charIndex > current.length) {
        isDeleting = true;
        setTimeout(type, PAUSE_END);
        return;
      }
      setTimeout(type, TYPING_SPEED);
    }
  }

  type();
}

/* ── SCROLL PROGRESS BAR ───────────────────────────────────── */
function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;

  window.addEventListener("scroll", () => {
    const scrollTop  = document.documentElement.scrollTop;
    const scrollMax  = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width  = (scrollTop / scrollMax) * 100 + "%";
  });
}

/* ── SCROLL REVEAL ─────────────────────────────────────────── */
function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Trigger skill bars when skills section enters view
          if (entry.target.closest("#skills")) {
            animateSkillBars();
          }
          // Trigger counters when about section enters view
          if (entry.target.querySelector && entry.target.querySelector(".stat-num")) {
            animateCounters();
          }
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* ── SKILL BARS ────────────────────────────────────────────── */
let skillsBarsAnimated = false;

function initSkillBars() {
  // Initial state already handled by CSS (width: 0)
}

function animateSkillBars() {
  if (skillsBarsAnimated) return;
  skillsBarsAnimated = true;

  const fills = document.querySelectorAll(".skill-fill");
  fills.forEach((fill) => {
    const target = fill.getAttribute("data-width") || "0";
    setTimeout(() => {
      fill.style.width = target + "%";
    }, 200);
  });
}

/* ── COUNTER ANIMATION ─────────────────────────────────────── */
let countersAnimated = false;

function initCounters() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countersAnimated) {
          animateCounters();
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".stat-num").forEach((el) => observer.observe(el));
}

function animateCounters() {
  if (countersAnimated) return;
  countersAnimated = true;

  document.querySelectorAll(".stat-num").forEach((el) => {
    const target   = parseInt(el.getAttribute("data-target"), 10);
    const duration = 1500;
    const step     = Math.ceil(duration / target);
    let current    = 0;

    const timer = setInterval(() => {
      current++;
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, step);
  });
}

/* ── CERTIFICATE MODAL ─────────────────────────────────────── */
function openModal(imgSrc, title) {
  const overlay = document.getElementById("modalOverlay");
  const img     = document.getElementById("modalImg");
  const ttl     = document.getElementById("modalTitle");

  img.src    = imgSrc;
  ttl.textContent = title;
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const overlay = document.getElementById("modalOverlay");
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

// Also expose globally (used in HTML onclick)
window.openModal  = openModal;
window.closeModal = closeModal;

// Close with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* ── CONTACT FORM ──────────────────────────────────────────── */
function initContactForm() {
  const form    = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simulate sending (replace with real API call / EmailJS / Formspree)
    const btn   = form.querySelector(".btn-primary");
    const orig  = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    setTimeout(() => {
      form.reset();
      btn.innerHTML = orig;
      btn.disabled  = false;
      success.classList.add("show");
      setTimeout(() => success.classList.remove("show"), 5000);
    }, 1500);
  });
}

/* ── BACK TO TOP ───────────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById("backTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 500);
  });
}

/* ── CURRENT YEAR ──────────────────────────────────────────── */
function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ── SMOOTH ANCHOR SCROLLING ───────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* ── SKILL CARD TILT EFFECT (subtle 3D) ───────────────────── */
document.querySelectorAll(".skill-card, .project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x    = (e.clientX - rect.left) / rect.width  - 0.5;
    const y    = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* ── PARTICLE SPARKLES on HERO (lightweight) ───────────────── */
(function createSparkles() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  for (let i = 0; i < 30; i++) {
    const sp = document.createElement("div");
    sp.classList.add("sparkle");

    const size = Math.random() * 2.5 + 0.5;
    sp.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${Math.random() > 0.5 ? "rgba(168,85,247," : "rgba(0,212,255,"}${Math.random() * 0.6 + 0.2})";
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation: sparkleAnim ${Math.random() * 6 + 4}s ease-in-out infinite;
      animation-delay: ${Math.random() * 6}s;
      pointer-events: none;
      z-index: 1;
    `;
    hero.appendChild(sp);
  }

  // Inject sparkle keyframes
  const style = document.createElement("style");
  style.textContent = `
    @keyframes sparkleAnim {
      0%,100% { opacity: 0; transform: scale(0) translateY(0); }
      30%      { opacity: 1; }
      60%      { opacity: 0.5; transform: scale(1) translateY(-30px); }
      100%     { opacity: 0; transform: scale(0.5) translateY(-60px); }
    }
  `;
  document.head.appendChild(style);
})();
