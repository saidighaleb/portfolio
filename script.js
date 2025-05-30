// DOM Elements
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const header = document.querySelector('header');
const animatedElements = document.querySelectorAll('.animate-on-scroll');
const mobileNavLinks = document.querySelectorAll('.mobile-nav ul li a');

// Toggle mobile navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    
    // Animate hamburger icon
    if (hamburger.classList.contains('active')) {
        hamburger.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        hamburger.children[1].style.opacity = '0';
        hamburger.children[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        hamburger.children[0].style.transform = 'none';
        hamburger.children[1].style.opacity = '1';
        hamburger.children[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        
        // Reset hamburger icon
        hamburger.children[0].style.transform = 'none';
        hamburger.children[1].style.opacity = '1';
        hamburger.children[2].style.transform = 'none';
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.background = 'rgba(26, 26, 26, 0.95)';
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(26, 26, 26, 0.9)';
        header.style.boxShadow = 'none';
    }
    
    // Check for elements to animate on scroll
    checkScroll();
});

// Animate elements when they come into view
function checkScroll() {
    const triggerBottom = window.innerHeight * 0.8;
    
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            element.classList.add('visible');
        }
    });
}

// Avatar and floating elements animation
document.addEventListener('DOMContentLoaded', () => {
    const avatar = document.querySelector('#avatar');
    const elements = document.querySelectorAll('.element');
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let rotationAngle = 0;
    
    // Mouse movement animation
    document.addEventListener('mousemove', (event) => {
        if (!avatar) return;
        
        // Avatar movement
        const rect = avatar.getBoundingClientRect();
        const avatarCenterX = rect.left + rect.width / 2;
        const avatarCenterY = rect.top + rect.height / 2;
        
        const moveX = (event.clientX - avatarCenterX) / 30;
        const moveY = (event.clientY - avatarCenterY) / 30;
        
        updateAvatarTransform(moveX, moveY);
        
        // Floating elements movement - opposite direction for parallax effect
        elements.forEach((element, index) => {
            const speed = (index + 1) * 2;
            const x = -moveX * speed;
            const y = -moveY * speed;
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Enhanced scroll animation
    let lastTime = Date.now();
    
    window.addEventListener('scroll', () => {
        if (!avatar) return;
        
        const currentTime = Date.now();
        const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
        lastTime = currentTime;
        
        const currentScrollY = window.scrollY;
        const scrollDiff = currentScrollY - lastScrollY;
        lastScrollY = currentScrollY;
        
        // Calculate scroll velocity (pixels per second)
        scrollVelocity = scrollDiff / deltaTime;
        
        // Calculate rotation based on scroll velocity
        const targetRotation = Math.min(Math.max(scrollVelocity / 50, -20), 20); // Limit rotation to -20 to 20 degrees
        rotationAngle = lerp(rotationAngle, targetRotation, 0.1);
        
        // Calculate vertical movement
        const scrollMove = Math.min(Math.abs(scrollDiff), 20) * Math.sign(scrollDiff);
        
        updateAvatarTransform(0, scrollMove);
    });
    
    function updateAvatarTransform(moveX, moveY) {
        if (!avatar) return;
        
        // Combine translation and rotation
        avatar.style.transform = `
            translate(${moveX}px, ${moveY}px)
            rotateX(${rotationAngle}deg)
        `;
    }
    
    // Linear interpolation helper function
    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }
    
    // Smooth animation loop for rotation decay
    function animate() {
        if (Math.abs(rotationAngle) > 0.01) {
            rotationAngle *= 0.95; // Decay factor
            updateAvatarTransform(0, 0);
        }
        requestAnimationFrame(animate);
    }
    
    animate();
});

// Interactive avatar animation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    checkScroll();
    
    // Parallax effect for floating elements
    window.addEventListener('mousemove', (e) => {
        const elements = document.querySelectorAll('.element');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        elements.forEach(element => {
            const speed = 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Project hover effects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const overlay = card.querySelector('.project-overlay');
            overlay.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            const overlay = card.querySelector('.project-overlay');
            overlay.style.opacity = '0';
        });
    });
});

// Helper functions for form validation
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorElement = document.getElementById(`${inputId}-error`);
    
    input.classList.add('error-input');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearError(inputId) {
    const input = document.getElementById(inputId);
    const errorElement = document.getElementById(`${inputId}-error`);
    
    input.classList.remove('error-input');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showSuccessMessage() {
    const formContainer = document.querySelector('.form-container');
    const successMessage = document.createElement('div');
    
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <h3>Message Sent Successfully!</h3>
        <p>Thank you for reaching out. I'll get back to you soon.</p>
    `;
    
    formContainer.innerHTML = '';
    formContainer.appendChild(successMessage);
    
    // Reset form after 5 seconds
    setTimeout(() => {
        window.location.reload();
    }, 5000);
}

// ... rest of your functions

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    console.log("Contact form found, attaching event listener");
    contactForm.addEventListener('submit', (e) => {
        console.log("Form submitted");
        e.preventDefault();

        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        let isValid = true;
        
        // Simple validation
        if (name === '') {
            showError('name', 'Name is required');
            isValid = false;
        } else {
            clearError('name');
        }
        
        if (email === '') {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email');
            isValid = false;
        } else {
            clearError('email');
        }
        
        if (message === '') {
            showError('message', 'Message is required');
            isValid = false;
        } else {
            clearError('message');
        }
        
        if (isValid) {
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Create template parameters
            const templateParams = {
                name: name,
                email: email,
                message: message
            };
            
            // Send email using EmailJS
            emailjs.send(
                "service_knk631r", 
                "template_yiokvjp", 
                templateParams
            )
            .then(function() {
                // Show success message
                showSuccessMessage();
                contactForm.reset();
            })
            .catch(function(error) {
                console.error('Error sending message:', error);
                alert('Failed to send message! Please try again later.');
            })
            .finally(function() {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        }
    });
}

// Ensure complete button animation for View Project buttons
document.addEventListener('DOMContentLoaded', function() {
    // Target only the View Project buttons on the home page
    const homePageProjectButtons = document.querySelectorAll('.project-card .project-overlay .view-project');
    
    // Target the exploration buttons on the Monple page
    const explorationButtons = document.querySelectorAll('.enhanced-link');
    
    // For home page project buttons - ensure animation completes fully
    homePageProjectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                // Prevent default navigation momentarily
                e.preventDefault();
                
                const href = this.getAttribute('href');
                const button = this;
                
                // Force animation to complete fully
                button.classList.add('complete-animation');
                
                // Navigate after a slightly longer delay
                setTimeout(function() {
                    window.location.href = href;
                }, 200); // Increased from 150ms to 200ms for full completion
            }
        });
    });
    
    // For exploration buttons - disable animations for immediate navigation
    explorationButtons.forEach(button => {
        button.classList.add('no-animation-mobile');
    });
});

// Enhanced scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Initial check - animate elements already in view on page load
    checkScroll();
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.85; // Slightly higher trigger point
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                // Add visible class with eased timing
                element.classList.add('visible');
            }
        });
    }
    
    // Check on scroll with throttling for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(function() {
            checkScroll();
        });
    });
});

// Simple page transitions
document.addEventListener('DOMContentLoaded', function() {
    // Add transition overlay to the body
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    document.body.appendChild(overlay);
    
    // Show page with fade-in effect once loaded
    document.body.classList.add('page-loaded');
    
    // Handle all internal link clicks
    document.querySelectorAll('a[href^="/"]:not([target]), a[href^="./"]:not([target]), a[href^="../"]:not([target])').forEach(link => {
        link.addEventListener('click', function(e) {
            // Only internal links, not external
            if (this.hostname === window.location.hostname) {
                e.preventDefault();
                const target = this.getAttribute('href');
                
                // Start page transition out
                document.body.classList.add('page-transitioning');
                
                // Navigate after transition
                setTimeout(() => {
                    window.location.href = target;
                }, 400);
            }
        });
    });
});

// Add lazy loading to images
document.addEventListener('DOMContentLoaded', function() {
    // Find all images that should be lazy loaded
    const lazyImages = document.querySelectorAll('img:not([loading])');
    
    // Add loading="lazy" attribute to these images
    lazyImages.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
});

// Enhanced mobile card interaction - IMAGE AREA ONLY
document.addEventListener('DOMContentLoaded', function() {
    // Only apply this behavior on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            let isOverlayVisible = false;
            const overlay = card.querySelector('.project-overlay');
            const imageArea = card.querySelector('.project-image'); // Only the image area
            
            // Skip cards that have coming-soon-overlay (they should stay visible)
            if (overlay && overlay.classList.contains('coming-soon-overlay')) {
                return;
            }
            
            // Only add touch event to the IMAGE AREA, not the entire card
            if (imageArea) {
                imageArea.addEventListener('touchstart', function(e) {
                    // Prevent the default behavior temporarily
                    e.preventDefault();
                    
                    if (!isOverlayVisible) {
                        // Show overlay
                        if (overlay) {
                            overlay.style.opacity = '1';
                            overlay.style.transform = 'translateY(0)';
                            isOverlayVisible = true;
                        }
                    } else {
                        // Check if the touch target is a link
                        const touchTarget = e.target.closest('a');
                        if (touchTarget && touchTarget.classList.contains('view-project')) {
                            // Let the link work normally
                            touchTarget.click();
                            return;
                        }
                        
                        // Hide overlay if touching elsewhere in the image area
                        if (overlay) {
                            overlay.style.opacity = '0';
                            overlay.style.transform = 'translateY(10px)';
                            isOverlayVisible = false;
                        }
                    }
                });
            }
            
            // Reset overlay state when touching outside the image area
            document.addEventListener('touchstart', function(e) {
                if (imageArea && !imageArea.contains(e.target) && isOverlayVisible) {
                    if (overlay) {
                        overlay.style.opacity = '0';
                        overlay.style.transform = 'translateY(10px)';
                        isOverlayVisible = false;
                    }
                }
            });
        });
    }
});