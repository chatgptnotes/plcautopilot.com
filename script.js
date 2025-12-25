// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        }
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const button = contactForm.querySelector('button[type="submit"]');
        const originalText = button.textContent;

        // Show loading state
        button.textContent = 'Submitting...';
        button.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            button.textContent = 'Request Sent!';
            button.style.background = '#10B981';

            // Reset form
            contactForm.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
            }, 3000);
        }, 1500);
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
const animateOnScroll = document.querySelectorAll('.problem-card, .feature-card, .step-card, .platform-card, .pricing-card');
animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Code Preview Animation
const codePreview = document.querySelector('.code-preview');
if (codePreview) {
    let isHovering = false;

    codePreview.addEventListener('mouseenter', () => {
        isHovering = true;
        animateCodeTyping();
    });

    codePreview.addEventListener('mouseleave', () => {
        isHovering = false;
    });
}

function animateCodeTyping() {
    const codeLines = document.querySelectorAll('.code-line');
    if (!codeLines.length) return;

    codeLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '0.5';
            setTimeout(() => {
                line.style.opacity = '1';
            }, 100);
        }, index * 100);
    });
}

// Trust Indicators Counter Animation
const trustNumbers = document.querySelectorAll('.trust-number');

const animateCounter = (element, target) => {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const isPercentage = target.toString().includes('%');
    const numericTarget = parseFloat(target);

    const timer = setInterval(() => {
        current += increment;
        if (current >= numericTarget) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            if (isPercentage) {
                element.textContent = Math.floor(current) + '%';
            } else {
                element.textContent = current.toFixed(1) + '%';
            }
        }
    }, 16);
};

const trustObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const target = entry.target.textContent;
            entry.target.dataset.animated = 'true';
            animateCounter(entry.target, target);
        }
    });
}, { threshold: 0.5 });

trustNumbers.forEach(num => {
    trustObserver.observe(num);
});
