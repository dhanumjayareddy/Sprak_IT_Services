// Initialize AOS - Fast animations
AOS.init({
  duration: 300,        // Reduced from 800ms to 300ms (much faster)
  offset: 50,           // Reduced from 100 to 50 (trigger earlier)
  once: true,           // Keep once: true (animation happens only once)
  delay: 0,             // No delay for instant appearance
  easing: 'ease-out'    // Fast easing for quick animation
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero parallax effect
gsap.to('.hero-image img', {
  yPercent: -20,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
});

// Floating shapes animation (faster movement)
gsap.to('.shape-1', {
  y: '+=30',
  duration: 2,        // Reduced from 4s to 2s (faster movement)
  ease: 'power1.inOut',
  yoyo: true,
  repeat: -1
});

gsap.to('.shape-2', {
  y: '+=20',
  duration: 1.5,      // Reduced from 3s to 1.5s (faster movement)
  ease: 'power1.inOut',
  yoyo: true,
  repeat: -1,
  delay: 0.5         // Reduced from 1s to 0.5s (less delay)
});

gsap.to('.shape-3', {
  y: '+=25',
  duration: 2.5,      // Reduced from 5s to 2.5s (faster movement)
  ease: 'power1.inOut',
  yoyo: true,
  repeat: -1,
  delay: 1           // Reduced from 2s to 1s (less delay)
});

// Animated counters - Fast animation
function animateCounter(element, target) {
  gsap.fromTo(element, 
    { innerText: 0 },
    {
      innerText: target,
      duration: 0.8,        // Reduced from 2s to 0.8s (much faster)
      ease: 'power2.out',    // Faster easing
      snap: { innerText: 1 },
      onUpdate: function() {
        element.innerText = Math.floor(element.innerText);
      }
    }
  );
}

function startCounters() {
  const counters = document.querySelectorAll('.metric-number');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    animateCounter(counter, target);
  });
}

// Trigger counters on scroll - Earlier trigger
ScrollTrigger.create({
  trigger: '.success-metrics',
  start: 'top 90%',         // Changed from 80% to 90% (trigger earlier)
  onEnter: startCounters,
  once: true
});

// Swiper carousels
const testimonialSwiper = new Swiper('.testimonial-slider .swiper-container', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    // when window width is >= 768px
    768: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    // when window width is >= 1024px
    1024: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
  },
});

const companiesSwiper = new Swiper('.companies-carousel .swiper-container', {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
  pagination: {
    el: '.companies-carousel .swiper-pagination',
    clickable: true,
  },
});

// Modal functionality
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Event listeners for modal buttons — guarded with null checks so missing
// elements (which differ between index.html and services.html) don't crash.
function bindModal(id, modalId) {
  var el = document.getElementById(id);
  if (el) el.addEventListener('click', () => openModal(modalId));
}
bindModal('explore-programs',  'enrollment-modal');
bindModal('hire-talent',       'hiring-modal');
bindModal('partner-us',        'hiring-modal');
bindModal('enroll-cta',        'enrollment-modal');
bindModal('enroll-now-cta',    'enrollment-modal');  // actual id in index.html
bindModal('hire-talent-cta',   'hiring-modal');
bindModal('enroll-nav',        'enrollment-modal');

// Close modal when clicking on close button or outside
document.querySelectorAll('.close-modal').forEach(closeBtn => {
  closeBtn.addEventListener('click', function() {
    const modal = this.closest('.modal');
    closeModal(modal.id);
  });
});

window.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    closeModal(event.target.id);
  }
});

// Form handling
document.getElementById('enrollment-form').addEventListener('submit', function(e) {
  e.preventDefault();
  // Here you would typically send the data to a server
  alert('Thank you for your enrollment! We will contact you soon.');
  closeModal('enrollment-modal');
  this.reset();
});

document.getElementById('hiring-form').addEventListener('submit', function(e) {
  e.preventDefault();
  // Here you would typically send the data to a server
  alert('Thank you for your interest! Our team will reach out to discuss your hiring needs.');
  closeModal('hiring-modal');
  this.reset();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.backdropFilter = 'blur(10px)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
  }
});

// Performance optimizations
// Lazy load images (already have loading="lazy" in HTML)

// Preload critical resources
const linkPreload = document.createElement('link');
linkPreload.rel = 'preload';
linkPreload.href = 'css/styles.css';
linkPreload.as = 'style';
document.head.appendChild(linkPreload);
