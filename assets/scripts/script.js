// Smooth scrolling for navigation links with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      const navHeight = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Typing animation for hero text
const heroText = document.querySelector('.animate-text');
if (heroText) {
  const text = heroText.textContent;
  heroText.textContent = '';
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      heroText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };
  typeWriter();
}

// Particle background effect
function createParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.id = 'particles';
  particlesContainer.style.position = 'fixed';
  particlesContainer.style.top = '0';
  particlesContainer.style.left = '0';
  particlesContainer.style.width = '100%';
  particlesContainer.style.height = '100%';
  particlesContainer.style.pointerEvents = 'none';
  particlesContainer.style.zIndex = '-1';
  document.body.appendChild(particlesContainer);

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = Math.random() > 0.5 ? '#00ff88' : '#00bfff';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
    particlesContainer.appendChild(particle);
  }
}

const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0% { transform: translateY(0) rotate(0deg); }
    100% { transform: translateY(-100vh) rotate(360deg); }
  }
`;
document.head.appendChild(style);

// Active nav highlighting
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}` || (current === '' && link.getAttribute('href') === '#home')) {
      link.classList.add('active');
    }
  });
}

// For multi-page active (on load)
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const linkPage = link.getAttribute('href');
  if (linkPage === currentPage || (currentPage === 'index.html' && linkPage === '#home')) {
    link.classList.add('active');
  }
});

// IntersectionObserver for single-page sections
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.3, rootMargin: '-50% 0px -20% 0px' });

document.querySelectorAll('section[id]').forEach(section => {
  sectionObserver.observe(section);
});

window.addEventListener('scroll', updateActiveNav);

// Fade in animation on scroll with stagger
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

let staggerDelay = 0;
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, staggerDelay);
      staggerDelay += 100;
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.skill-item, .project-card, .glass').forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(30px)';
  item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(item);
});

// Text reveal animation
const textElements = document.querySelectorAll('h1, h2, h3, p');
textElements.forEach((element, index) => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  setTimeout(() => {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }, index * 200);
});

// Frontend form validation
function validateForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  let isValid = true;

  // Clear previous errors
  document.querySelectorAll('.error-message').forEach(el => el.remove());
  document.querySelectorAll('.form-group').forEach(el => el.classList.remove('error'));

  // Name validation
  if (name === '') {
    showError('name', 'Name is required');
    isValid = false;
  } else if (name.length < 2) {
    showError('name', 'Name must be at least 2 characters');
    isValid = false;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '') {
    showError('email', 'Email is required');
    isValid = false;
  } else if (!emailRegex.test(email)) {
    showError('email', 'Please enter a valid email address');
    isValid = false;
  }

  // Message validation
  if (message === '') {
    showError('message', 'Message is required');
    isValid = false;
  } else if (message.length < 10) {
    showError('message', 'Message must be at least 10 characters');
    isValid = false;
  }

  return isValid;
}

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const formGroup = field.closest('.form-group');
  formGroup.classList.add('error');

  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  formGroup.appendChild(errorDiv);
}

// Contact form submission with enhanced feedback
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData(this);
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.animation = 'none';

    fetch('sendmail.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        submitBtn.textContent = 'Sent!';
        submitBtn.style.background = 'rgba(0, 255, 136, 0.3)';
        contactForm.reset();
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.style.animation = '';
        }, 3000);
      } else {
        submitBtn.textContent = 'Error!';
        submitBtn.style.background = 'rgba(255, 0, 136, 0.3)';
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.style.animation = '';
        }, 3000);
        alert('Error: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      submitBtn.textContent = 'Failed!';
      submitBtn.style.background = 'rgba(255, 0, 136, 0.3)';
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.style.animation = '';
      }, 3000);
      alert('An error occurred. Please try again.');
    })
    .finally(() => {
      submitBtn.disabled = false;
    });
  });
}

// Mobile menu toggle with ARIA
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.setAttribute('aria-expanded', 'false');
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('mobile-open');
    mobileMenuBtn.setAttribute('aria-expanded', isOpen);
  });
}

// Blog like functionality with localStorage
document.querySelectorAll('.like-btn').forEach(btn => {
  const postTitle = btn.closest('.blog-post').querySelector('h3').textContent.trim();
  const countSpan = btn.nextElementSibling;
  const storageKey = `like-${postTitle}`;
  let count = parseInt(localStorage.getItem(storageKey)) || 0;
  countSpan.textContent = count;
  if (count > 0) {
    btn.textContent = '👍 Liked';
    btn.disabled = true;
  }

  btn.addEventListener('click', function() {
    if (!this.disabled) {
      count++;
      countSpan.textContent = count;
      localStorage.setItem(storageKey, count);
      this.textContent = '👍 Liked';
      this.disabled = true;
    }
  });
});

// Keyboard navigation for mobile menu
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      mobileMenuBtn.click();
    }
  });
}

// Focus management for mobile menu
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks.classList.contains('mobile-open')) {
      navLinks.classList.remove('mobile-open');
      mobileMenuBtn.focus();
    }
  }
});

// Hero image preloader
const profileImage = document.querySelector('.profile-image');
if (profileImage) {
  const preloader = document.createElement('div');
  preloader.className = 'preloader';
  profileImage.parentNode.style.position = 'relative';
  profileImage.parentNode.appendChild(preloader);
  profileImage.addEventListener('load', () => {
    preloader.remove();
  });
  if (profileImage.complete) {
    preloader.remove();
  }
}

// Contact link loading states
document.querySelectorAll('.contact-link').forEach(link => {
  link.addEventListener('click', function(e) {
    this.classList.add('loading');
    setTimeout(() => {
      this.classList.remove('loading');
    }, 2000); // Simulate connection time
  });
});

// Reduce particles on reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Skip particle creation or reduce count
  const originalCreateParticles = createParticles;
  createParticles = () => {
    // Create fewer particles or none
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles';
    // ... existing styles
    for (let i = 0; i < 10; i++) { // Reduced from 50
      // ... particle creation
    }
  };
}

// Lazy loading for images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      observer.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

// Initialize animations on page load
window.addEventListener('load', () => {
  createParticles();
  document.body.style.opacity = '1';
});

// Scroll-triggered animations with nav shadow
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const nav = document.querySelector('nav');

  if (currentScrollY > 50) {
    nav.classList.add('nav-scrolled');
  } else {
    nav.classList.remove('nav-scrolled');
  }

  updateActiveNav();

  lastScrollY = currentScrollY;
});
