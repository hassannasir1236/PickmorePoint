// Navigation Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = navMenu.classList.contains('active') 
            ? 'rotate(45deg) translate(8px, 8px)' 
            : 'none';
        spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMenu.classList.contains('active') 
            ? 'rotate(-45deg) translate(8px, -8px)' 
            : 'none';
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// Menu Category Filter
const tabButtons = document.querySelectorAll('.tab-btn');
const menuSections = document.querySelectorAll('.menu-section');

tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get category
        const category = this.getAttribute('data-category');
        
        // Hide all sections
        menuSections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Show selected section
        const targetSection = document.getElementById(category);
        if (targetSection) {
            targetSection.style.display = 'block';
            // Smooth scroll to section
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Gallery Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter category
        const filterValue = this.getAttribute('data-filter');
        
        // Filter items
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                item.style.display = 'block';
                // Add fade-in animation
                item.style.animation = 'fadeInUp 0.5s ease';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Reset form after 3 seconds
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'flex';
            formSuccess.style.display = 'none';
        }, 5000);
    });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.feature-card, .item-card, .menu-item, .standard-card, .testimonial-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add to Cart Functionality (Basic Example)
function addToCart(itemName, price) {
    alert(`${itemName} added to cart! Price: ${price}`);
    // Here you would implement actual cart functionality
}

// WhatsApp Click Tracking
const whatsappButton = document.querySelector('.whatsapp-float');
if (whatsappButton) {
    whatsappButton.addEventListener('click', function() {
        console.log('WhatsApp button clicked');
        // You can add analytics tracking here
    });
}

// Lazy Loading Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// Scroll to Top Button (Optional Enhancement)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show scroll-to-top button when scrolling down
let scrollToTopBtn;
window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        if (!scrollToTopBtn) {
            scrollToTopBtn = document.createElement('button');
            scrollToTopBtn.innerHTML = '↑';
            scrollToTopBtn.className = 'scroll-top-btn';
            scrollToTopBtn.onclick = scrollToTop;
            document.body.appendChild(scrollToTopBtn);
        }
        scrollToTopBtn.style.display = 'flex';
    } else if (scrollToTopBtn) {
        scrollToTopBtn.style.display = 'none';
    }
});

// Add CSS for scroll-to-top button dynamically
const style = document.createElement('style');
style.textContent = `
    .scroll-top-btn {
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--dark-color);
        color: var(--light-color);
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-lg);
        z-index: 998;
        transition: all 0.3s ease;
    }
    
    .scroll-top-btn:hover {
        background: var(--primary-color);
        transform: translateY(-3px);
    }
`;
document.head.appendChild(style);

console.log('Pickmore website loaded successfully! 🍕🍔');