/**
 * DALLOLBOOK MAIN JS
 * Handles homepage functionality:
 * - Image gallery scrolling
 * - Mobile navigation
 * - Interactive elements
 */

// ======================
// DOM ELEMENTS
// ======================
const gallery = document.getElementById('gallery');
const leftArrow = document.querySelector('.nav-arrow.left');
const rightArrow = document.querySelector('.nav-arrow.right');
const navMenu = document.querySelector('.nav-menu');
const mobileMenuButton = document.createElement('button');

// ======================
// IMAGE GALLERY
// ======================
let scrollInterval;

function scrollGallery(amount) {
    if (gallery) {
        gallery.scrollBy({
            left: amount,
            behavior: 'smooth'
        });
    }
}

function startAutoScroll() {
    if (gallery) {
        scrollInterval = setInterval(() => scrollGallery(300), 5000);
    }
}

function initGallery() {
    if (!gallery) return;

    // Start auto-scroll
    startAutoScroll();

    // Pause on hover
    gallery.addEventListener('mouseenter', () => clearInterval(scrollInterval));
    gallery.addEventListener('mouseleave', startAutoScroll);

    // Clickable cards
    document.querySelectorAll('.image-card').forEach(card => {
        card.addEventListener('click', () => {
            const serviceType = card.querySelector('p').className;
            // Navigate to corresponding page
            window.location.href = `./pages/${serviceType}.html`;
        });
    });
}

// ======================
// MOBILE NAVIGATION
// ======================
function setupMobileMenu() {
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuButton.setAttribute('aria-label', 'Toggle menu');
    
    const header = document.querySelector('.header');
    if (header) {
        header.prepend(mobileMenuButton);
        
        mobileMenuButton.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

function checkMobileView() {
    if (window.innerWidth <= 768) {
        setupMobileMenu();
    } else {
        if (document.contains(mobileMenuButton)) {
            mobileMenuButton.remove();
        }
        navMenu.classList.remove('active');
    }
}

// ======================
// EVENT LISTENERS
// ======================
function setupEventListeners() {
    // Arrow buttons
    if (leftArrow) leftArrow.addEventListener('click', () => scrollGallery(-300));
    if (rightArrow) rightArrow.addEventListener('click', () => scrollGallery(300));
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') scrollGallery(-300);
        if (e.key === 'ArrowRight') scrollGallery(300);
    });
    
    // Window resize
    window.addEventListener('resize', checkMobileView);
}

// ======================
// INITIALIZATION
// ======================
function init() {
    initGallery();
    setupEventListeners();
    checkMobileView(); // Check on load
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', init);