// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Hide loader when page is loaded
    setTimeout(function() {
      document.querySelector('.loader').classList.add('loader-hidden');
    }, 1500);
  
    // Typing animation for greeting
    const greetingText = "Hi, I'm Sidhish";
    const typingElement = document.querySelector('.typing-text');
    
    function typeWriter(text, i, element) {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(function() {
          typeWriter(text, i, element)
        }, 100);
      } else {
        // Add blinking cursor after typing is done
        element.style.borderRight = '2px solid transparent';
      }
    }
    
    // Start typing animation after a delay
    setTimeout(function() {
      typeWriter(greetingText, 0, typingElement);
    }, 500);
  
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
      skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.setProperty('--level', level + '%');
      });
    }
    
    // Intersection Observer for skill bars
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillBars();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    document.querySelector('#skills').style.setProperty('--level', '0%');
    observer.observe(document.querySelector('#skills'));
  
    // Animate stats counting
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const counter = setInterval(() => {
          current += step;
          if (current >= target) {
            clearInterval(counter);
            stat.textContent = target;
          } else {
            stat.textContent = Math.floor(current);
          }
        }, 16);
      });
    }
    
    // Intersection Observer for stats
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    statsObserver.observe(document.querySelector('.stats'));
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        // For demonstration, we'll just show an alert
        alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
        
        // Reset form
        contactForm.reset();
      });
    }
  
    // Parallax effect for header image
    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      const imageContainer = document.querySelector('.image-container');
      
      if (imageContainer) {
        imageContainer.style.transform = `translateY(${scrollPosition * 0.2}px)`;
      }
    });
  
    // Active navigation highlight
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.floating-nav a');
    
    window.addEventListener('scroll', function() {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  });
