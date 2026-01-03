/**
 * PixelMint Studio - Masterpiece Logic
 * Handles: Custom Cursor, Swiper Slider, Scroll Reveals, Theme Toggle
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Custom Magnetic Cursor Logic
    const dot = document.getElementById('cursor-dot');
    const outline = document.getElementById('cursor-outline');

    if (window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows mouse exactly
            dot.style.transform = `translate(${posX}px, ${posY}px)`;
            dot.style.opacity = "1";

            // Outline follows with a smooth lag (physics)
            outline.animate({
                transform: `translate(${posX - 16}px, ${posY - 16}px)`
            }, { 
                duration: 500, 
                fill: "forwards", 
                easing: "ease-out" 
            });
            outline.style.opacity = "1";
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            dot.style.opacity = "0";
            outline.style.opacity = "0";
        });
    }

    // 3. Swiper.js Slider Initialization (Split Screen)
    const swiper = new Swiper('.project-slider', {
        loop: true,
        grabCursor: true,
        spaceBetween: 50,
        speed: 1000,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-next-btn',
            prevEl: '.swiper-prev-btn',
        },
        // Creative Effect for the Masterpiece look
        effect: 'creative',
        creativeEffect: {
            prev: {
                shadow: true,
                translate: ['-20%', 0, -1],
            },
            next: {
                translate: ['100%', 0, 0],
            },
        },
    });

    // 4. Scroll Reveal Observer (Trigger animations on scroll)
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

    // 5. Theme Toggle Logic (Persistence with LocalStorage)
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (savedTheme === 'dark') {
        html.classList.add('dark');
    }

    themeToggle.addEventListener('click', () => {
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // 6. Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetID = this.getAttribute('href');
            const targetElement = document.querySelector(targetID);

            if (targetElement) {
                const navHeight = 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 7. Navbar Scroll Effect (Adds background on scroll)
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('shadow-lg', 'bg-white/95', 'dark:bg-gray-950/95');
        } else {
            nav.classList.remove('shadow-lg', 'bg-white/95', 'dark:bg-gray-950/95');
        }
    });
});

// Mobile Menu Logic
const menuOpen = document.getElementById('menu-open');
const menuClose = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

function toggleMenu(open) {
    if (open) {
        mobileMenu.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
        mobileMenu.classList.add('translate-x-full');
        document.body.style.overflow = '';
    }
}

menuOpen.addEventListener('click', () => toggleMenu(true));
menuClose.addEventListener('click', () => toggleMenu(false));

// Close menu when a link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
});

// Mobile Theme Toggle (Extra for Mobile Menu)
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
themeToggleMobile.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});