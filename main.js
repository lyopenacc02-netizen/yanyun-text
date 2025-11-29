// Main JavaScript for 燕云十六声百业组织 Website

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollProgress();
    initHeroAnimations();
    initScrollAnimations();
    initParticleBackground();
    initCounterAnimations();
    initNavbarScroll();
});

// Scroll Progress Bar
function initScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        scrollProgress.style.width = scrollPercent + '%';
    });
}

// Hero Section Animations
function initHeroAnimations() {
    // Animate hero elements with staggered timing
    anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000
    })
    .add({
        targets: '.hero-title',
        opacity: [0, 1],
        translateY: [30, 0],
        delay: 500
    })
    .add({
        targets: '.hero-subtitle',
        opacity: [0, 1],
        translateY: [30, 0],
        delay: 200
    }, '-=800')
    .add({
        targets: '.hero-description',
        opacity: [0, 1],
        translateY: [30, 0],
        delay: 300
    }, '-=600')
    .add({
        targets: '.cta-button',
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.8, 1],
        delay: 400
    }, '-=400');
}

// Scroll-triggered Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate feature cards with stagger
                if (entry.target.classList.contains('feature-card')) {
                    const cards = document.querySelectorAll('.feature-card');
                    const index = Array.from(cards).indexOf(entry.target);
                    
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        delay: index * 100,
                        duration: 600,
                        easing: 'easeOutQuart'
                    });
                }
                
                // Animate stat numbers
                if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target);
                }
                
                // Animate news cards
                if (entry.target.classList.contains('news-card')) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 600,
                        easing: 'easeOutQuart'
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Counter Animation for Statistics
function initCounterAnimations() {
    // This will be triggered by scroll animations
}

function animateCounter(element) {
    const counter = element.querySelector('.stat-number');
    const target = parseInt(counter.getAttribute('data-count'));
    
    anime({
        targets: { count: 0 },
        count: target,
        duration: 2000,
        easing: 'easeOutQuart',
        update: function(anim) {
            counter.textContent = Math.floor(anim.animatables[0].target.count);
        }
    });
}

// Particle Background using p5.js
function initParticleBackground() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    new p5(function(p) {
        let particles = [];
        let numParticles = 50;
        
        p.setup = function() {
            const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent('particles');
            
            // Create particles
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-0.5, 0.5),
                    vy: p.random(-0.5, 0.5),
                    size: p.random(2, 6),
                    opacity: p.random(0.1, 0.3)
                });
            }
        };
        
        p.draw = function() {
            p.clear();
            
            // Update and draw particles
            particles.forEach(particle => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = p.width;
                if (particle.x > p.width) particle.x = 0;
                if (particle.y < 0) particle.y = p.height;
                if (particle.y > p.height) particle.y = 0;
                
                // Draw particle
                p.fill(255, 255, 255, particle.opacity * 255);
                p.noStroke();
                p.ellipse(particle.x, particle.y, particle.size);
            });
            
            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const distance = p.dist(particle.x, particle.y, otherParticle.x, otherParticle.y);
                    if (distance < 100) {
                        const alpha = p.map(distance, 0, 100, 0.1, 0);
                        p.stroke(255, 255, 255, alpha * 255);
                        p.strokeWeight(1);
                        p.line(particle.x, particle.y, otherParticle.x, otherParticle.y);
                    }
                });
            });
        };
        
        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        // Change background opacity based on scroll
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(26, 59, 46, 0.98)';
        } else {
            navbar.style.background = 'rgba(26, 59, 46, 0.95)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Smooth Scrolling for Anchor Links
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

// Feature Card Interactions
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        anime({
            targets: this,
            scale: 1.02,
            duration: 300,
            easing: 'easeOutQuart'
        });
    });
    
    card.addEventListener('mouseleave', function() {
        anime({
            targets: this,
            scale: 1,
            duration: 300,
            easing: 'easeOutQuart'
        });
    });
});

// News Card Interactions
document.querySelectorAll('.news-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        anime({
            targets: this.querySelector('.news-image'),
            scale: 1.05,
            duration: 300,
            easing: 'easeOutQuart'
        });
    });
    
    card.addEventListener('mouseleave', function() {
        anime({
            targets: this.querySelector('.news-image'),
            scale: 1,
            duration: 300,
            easing: 'easeOutQuart'
        });
    });
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance Optimization
const debouncedScrollHandler = debounce(function() {
    // Handle scroll events efficiently
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Loading State Management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Hide loading spinner if present
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

// Accessibility Enhancements
document.addEventListener('keydown', function(e) {
    // Skip to main content with Tab key
    if (e.key === 'Tab' && e.target.classList.contains('skip-link')) {
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.focus();
        }
    }
});

// Mobile Menu Toggle (if needed)
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }
}

// Initialize mobile menu
initMobileMenu();