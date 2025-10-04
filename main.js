// Mobile Navigation Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links > li > a');
const dropdownToggles = document.querySelectorAll('.dropdown > a');
const body = document.body;
const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.appendChild(overlay);

// Toggle mobile menu with overlay
function toggleMobileMenu() {
    const isOpen = navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    overlay.classList.toggle('active');
    
    if (isOpen) {
        body.style.overflow = 'hidden';
        overlay.addEventListener('click', closeMobileMenu);
    } else {
        body.style.overflow = '';
        overlay.removeEventListener('click', closeMobileMenu);
    }
}

function closeMobileMenu() {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
    overlay.classList.remove('active');
    body.style.overflow = '';
    overlay.removeEventListener('click', closeMobileMenu);
}

// Toggle mobile menu on hamburger click
hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobileMenu();
});

// Handle dropdown toggle on mobile
if (window.innerWidth <= 991) {
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 991) {
                e.preventDefault();
                const parent = this.parentElement;
                const dropdownMenu = this.nextElementSibling;
                
                // Close other open dropdowns
                document.querySelectorAll('.dropdown').forEach(item => {
                    if (item !== parent) {
                        item.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                parent.classList.toggle('active');
            }
        });
    });
}

// Close mobile menu when clicking on nav links
navLinksItems.forEach(link => {
    if (!link.classList.contains('dropdown-toggle')) {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 991) {
                closeMobileMenu();
            }
        });
    }
});

// Close mobile menu when clicking on a nav link
navLinksItems.forEach(link => {
    if (!link.classList.contains('dropdown-toggle')) {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 991) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
});

// Handle window resize
function handleResize() {
    if (window.innerWidth > 991) {
        // Reset mobile menu state on desktop
        if (navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
        
        // Reset dropdowns
        document.querySelectorAll('.dropdown').forEach(item => {
            item.classList.remove('active');
        });
    }
}

// Add resize event listener with debounce
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 250);
});

// Sticky Header on Scroll
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animation on Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .section-title, .hero-content, .hero-image');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes after a short delay for initial load
    setTimeout(() => {
        document.querySelector('.hero-content').classList.add('animate');
        document.querySelector('.hero-image').classList.add('animate');
    }, 300);
    
    // Initialize service card animations
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
});

// Form Validation for Appointment Form
const appointmentForm = document.getElementById('appointment-form');
if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        const name = this.querySelector('input[name="name"]').value.trim();
        const email = this.querySelector('input[name="email"]').value.trim();
        const phone = this.querySelector('input[name="phone"]').value.trim();
        const date = this.querySelector('input[name="date"]').value;
        const service = this.querySelector('select[name="service"]').value;
        
        if (!name || !email || !phone || !date || !service) {
            showAlert('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showAlert('Please enter a valid email address', 'error');
            return;
        }
        
        // If all validations pass, you can submit the form
        // For demo purposes, we'll just show a success message
        showAlert('Appointment requested successfully! We will contact you shortly.', 'success');
        this.reset();
    });
}

// Helper function to validate email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show alert message
function showAlert(message, type) {
    // Remove any existing alerts
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Add styles to the alert
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.padding = '15px 25px';
    alertDiv.style.borderRadius = '5px';
    alertDiv.style.color = 'white';
    alertDiv.style.fontWeight = '500';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    alertDiv.style.transform = 'translateX(120%)';
    alertDiv.style.transition = 'transform 0.3s ease-in-out';
    
    if (type === 'error') {
        alertDiv.style.backgroundColor = '#e74c3c';
    } else {
        alertDiv.style.backgroundColor = '#2ecc71';
    }
    
    document.body.appendChild(alertDiv);
    
    // Trigger the slide-in animation
    setTimeout(() => {
        alertDiv.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove the alert after 5 seconds
    setTimeout(() => {
        alertDiv.style.transform = 'translateX(120%)';
        setTimeout(() => {
            alertDiv.remove();
        }, 300);
    }, 5000);
}

// Add animation classes to elements when they come into view
const animateElements = () => {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop >= 0) && (elementBottom <= window.innerHeight);
        
        if (isVisible) {
            element.classList.add('animate');
        }
    });
};

// Listen for scroll and resize events to trigger animations
window.addEventListener('scroll', animateElements);
window.addEventListener('resize', animateElements);

// Initialize animations on page load
animateElements();
