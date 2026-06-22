// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ========== MOBILE MENU ==========
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
  }
});

// ========== SCROLL REVEAL ANIMATIONS ==========
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ========== COUNTER ANIMATION ==========
const counters = document.querySelectorAll('.stat-number[data-target]');
let countersAnimated = false;

const animateCounters = () => {
  if (countersAnimated) return;
  countersAnimated = true;

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const suffix = counter.getAttribute('data-suffix') || '+';
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current) + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + suffix;
      }
    };

    updateCounter();
  });
};

const statsSection = document.getElementById('stats');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
    }
  });
}, { threshold: 0.3 });

statsObserver.observe(statsSection);

// ========== FAQ ACCORDION ==========
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');

  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    // Close all
    faqItems.forEach(i => {
      i.classList.remove('active');
      i.querySelector('.faq-answer').style.maxHeight = null;
    });

    // Open clicked if it was closed
    if (!isActive) {
      item.classList.add('active');
      const answer = item.querySelector('.faq-answer');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ========== REVIEWS CAROUSEL ==========
const reviewsTrack = document.getElementById('reviewsTrack');
const prevBtn = document.getElementById('reviewPrev');
const nextBtn = document.getElementById('reviewNext');

let reviewScrollAmount = 374; // card width + gap

prevBtn.addEventListener('click', () => {
  reviewsTrack.scrollBy({ left: -reviewScrollAmount, behavior: 'smooth' });
});

nextBtn.addEventListener('click', () => {
  reviewsTrack.scrollBy({ left: reviewScrollAmount, behavior: 'smooth' });
});

// Touch/swipe support for reviews
let startX = 0;
let scrollLeft = 0;
let isDown = false;

reviewsTrack.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - reviewsTrack.offsetLeft;
  scrollLeft = reviewsTrack.scrollLeft;
  reviewsTrack.style.cursor = 'grabbing';
});

reviewsTrack.addEventListener('mouseleave', () => {
  isDown = false;
  reviewsTrack.style.cursor = 'grab';
});

reviewsTrack.addEventListener('mouseup', () => {
  isDown = false;
  reviewsTrack.style.cursor = 'grab';
});

reviewsTrack.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - reviewsTrack.offsetLeft;
  const walk = (x - startX) * 2;
  reviewsTrack.scrollLeft = scrollLeft - walk;
});

// ========== PARTICLES ==========
const particlesContainer = document.getElementById('particles');

function createParticles() {
  const count = window.innerWidth < 768 ? 15 : 30;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 3 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = Math.random() * 15 + 10 + 's';
    particle.style.animationDelay = Math.random() * 10 + 's';

    // Random color between primary and secondary
    const colors = ['rgba(139,92,246,0.5)', 'rgba(59,130,246,0.5)', 'rgba(16,185,129,0.3)'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];

    particlesContainer.appendChild(particle);
  }
}

createParticles();

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const position = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: position, behavior: 'smooth' });
    }
  });
});

// ========== ACTIVE NAV LINK HIGHLIGHT ==========
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-links a').forEach(a => a.style.color = '');
        link.style.color = '#A78BFA';
      }
    }
  });
});

// ========== RESPONSIVE REVIEW SCROLL AMOUNT ==========
function updateReviewScroll() {
  if (window.innerWidth <= 480) {
    reviewScrollAmount = 284;
  } else if (window.innerWidth <= 768) {
    reviewScrollAmount = 324;
  } else {
    reviewScrollAmount = 374;
  }
}

updateReviewScroll();
window.addEventListener('resize', updateReviewScroll);
