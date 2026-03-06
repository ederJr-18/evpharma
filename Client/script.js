// Navbar scroll effect
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger lines
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if(this.classList.contains('btn-contact')) {
            e.preventDefault(); // <-- Fix: We must prevent default here so it doesn't navigate to #contacto
            return;
        }

        e.preventDefault();
        navLinks.classList.remove('active');
        
        // Reset hamburger
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';

        const target = document.querySelector(this.getAttribute('href'));
        if(target && target.id !== 'contactModal') {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Modal Logic
const modal = document.getElementById('contactModal');
const btnContact = document.getElementById('contactBtn');
const spansClose = document.getElementsByClassName('close-btn')[0];

if (btnContact && modal) {
    btnContact.onclick = function(e) {
        e.preventDefault();
        modal.classList.add('show');
    }
}

if (spansClose && modal) {
    spansClose.onclick = function() {
        modal.classList.remove('show');
    }
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove('show');
    }
}

document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Mensaje enviado. ¡Nos pondremos en contacto pronto!');
    modal.classList.remove('show');
    this.reset();
});
