// Initialize AOS
AOS.init({
  duration: 800,
  offset: 100,
  once: true
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

// Floating shapes animation (additional GSAP for more control)
gsap.to('.shape-1', {
  y: '+=30',
  duration: 4,
  ease: 'power1.inOut',
  yoyo: true,
  repeat: -1
});

gsap.to('.shape-2', {
  y: '+=20',
  duration: 3,
  ease: 'power1.inOut',
  yoyo: true,
  repeat: -1,
  delay: 1
});

gsap.to('.shape-3', {
  y: '+=25',
  duration: 5,
  ease: 'power1.inOut',
  yoyo: true,
  repeat: -1,
  delay: 2
});

// Animated counters
function animateCounter(element, target) {
  gsap.fromTo(element, 
    { innerText: 0 },
    {
      innerText: target,
      duration: 2,
      ease: 'power1.out',
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

// Trigger counters on scroll
ScrollTrigger.create({
  trigger: '.success-metrics',
  start: 'top 80%',
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
  slidesPerView: 2,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  breakpoints: {
    640: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 6,
    },
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

// Event listeners for modal buttons
document.getElementById('explore-programs').addEventListener('click', () => openModal('enrollment-modal'));
document.getElementById('hire-talent').addEventListener('click', () => openModal('hiring-modal'));
document.getElementById('partner-us').addEventListener('click', () => openModal('hiring-modal'));
document.getElementById('enroll-cta').addEventListener('click', () => openModal('enrollment-modal'));
document.getElementById('hire-talent-cta').addEventListener('click', () => openModal('hiring-modal'));
document.getElementById('enroll-nav').addEventListener('click', () => openModal('enrollment-modal'));

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
