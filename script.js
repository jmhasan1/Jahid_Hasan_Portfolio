                                 
                                                                                                                                                                                 
  // Smooth scroll and active link highlighting             
  document.addEventListener('DOMContentLoaded', function() {                                                                                                                     
      const navLinks = document.querySelectorAll('.nav-link');                                                                                                                   
      const sections = document.querySelectorAll('section');                                                                                                                     
      const hamburger = document.querySelector('.hamburger');                                                                                                                    
      const navMenu = document.querySelector('.nav-menu');                                                                                                                       
                                                                                                                                                                                 
      // Hamburger menu toggle                                                                                                                                                   
      if (hamburger) {                                                                                                                                                           
          hamburger.addEventListener('click', function() {                                                                                                                       
              navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';                                                                                        
          });                                                                                                                                                                    
      }                                                                                                                                                                          
                                                                                                                                                                                 
      // Close menu when link is clicked                                                                                                                                         
      navLinks.forEach(link => {                                                                                                                                                 
          link.addEventListener('click', function() {                                                                                                                            
              if (navMenu) navMenu.style.display = 'none';                                                                                                                       
          });                                                                                                                                                                    
      });                                                                                                                                                                        
                                                                                                                                                                                 
      // Update active link on scroll                                                                                                                                            
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
              if (link.getAttribute('href').slice(1) === current) {                                                                                                              
                  link.classList.add('active');                                                                                                                                  
              }                                                                                                                                                                  
          });                                                                                                                                                                    
      });                                                                                                                                                                        
                                                                                                                                                                                 
      // Smooth scroll for navigation links                                                                                                                                      
      navLinks.forEach(link => {                            
          link.addEventListener('click', function(e) {                                                                                                                           
              e.preventDefault();                                                                                                                                                
              const targetId = this.getAttribute('href').slice(1);                                                                                                               
              const targetSection = document.getElementById(targetId);                                                                                                           
                                                                                                                                                                                 
              if (targetSection) {                                                                                                                                               
                  targetSection.scrollIntoView({ behavior: 'smooth' });                                                                                                          
              }                                                                                                                                                                  
          });                                               
      });                                                                                                                                                                        
  });                                                                                                                                                                            
                                                                                                                                                                                 
  // Form submission                                                                                                                                                             
  const contactForm = document.getElementById('contactForm');                                                                                                                    
  if (contactForm) {                                                                                                                                                             
      contactForm.addEventListener('submit', function(e) {                                                                                                                       
          e.preventDefault();                                                                                                                                                    
                                                                                                                                                                                 
          // Get form data                                                                                                                                                       
          const formData = new FormData(this);                                                                                                                                   
          const data = Object.fromEntries(formData);                                                                                                                             
                                                                                                                                                                                 
          // Simple validation                                                                                                                                                   
          const inputs = this.querySelectorAll('input, textarea');                                                                                                               
          let isValid = true;                                                                                                                                                    
                                                                                                                                                                                 
          inputs.forEach(input => {                                                                                                                                              
              if (!input.value.trim()) {                                                                                                                                         
                  isValid = false;                                                                                                                                               
                  input.style.borderColor = '#ec4899';                                                                                                                           
              } else {                                                                                                                                                           
                  input.style.borderColor = '';                                                                                                                                  
              }                                                                                                                                                                  
          });                                                                                                                                                                    
                                                                                                                                                                                 
          if (isValid) {                                                                                                                                                         
              // Show success message                       
              showNotification('Message sent successfully! I\'ll get back to you soon.');                                                                                        
                                                                                                                                                                                 
              // Reset form                                                                                                                                                      
              this.reset();                                                                                                                                                      
                                                                                                                                                                                 
              // Reset input styles                                                                                                                                              
              inputs.forEach(input => {                                                                                                                                          
                  input.style.borderColor = '';                                                                                                                                  
              });                                                                                                                                                                
          } else {                                                                                                                                                               
              showNotification('Please fill all fields correctly.', 'error');                                                                                                    
          }                                                                                                                                                                      
      });                                                                                                                                                                        
  }                                                                                                                                                                              
                                                                                                                                                                                 
  // Notification system                                                                                                                                                         
  function showNotification(message, type = 'success') {    
      const notification = document.createElement('div');                                                                                                                        
      notification.className = `notification ${type}`;                                                                                                                           
      notification.textContent = message;                                                                                                                                        
      notification.style.cssText = `                                                                                                                                             
          position: fixed;                                                                                                                                                       
          top: 20px;                                                                                                                                                             
          right: 20px;                                                                                                                                                           
          padding: 1rem 2rem;                                                                                                                                                    
          background: ${type === 'success' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : '#ec4899'};                                                                           
          color: white;                                                                                                                                                          
          border-radius: 8px;                                                                                                                                                    
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);                                                                                                                            
          z-index: 2000;                                                                                                                                                         
          animation: slideDown 0.3s ease;                                                                                                                                        
      `;                                                                                                                                                                         
                                                                                                                                                                                 
      document.body.appendChild(notification);                                                                                                                                   
                                                                                                                                                                                 
      setTimeout(() => {                                                                                                                                                         
          notification.style.animation = 'slideUp 0.3s ease';
          setTimeout(() => notification.remove(), 300);                                                                                                                          
      }, 3000);                                                                                                                                                                  
  }                                                                                                                                                                              
                                                                                                                                                                                 
  // Add animations for elements on scroll                                                                                                                                       
  const observerOptions = {                                                                                                                                                      
      threshold: 0.1,                                                                                                                                                            
      rootMargin: '0px 0px -100px 0px'                                                                                                                                           
  };                                                                                                                                                                             
                                                                                                                                                                                 
  const observer = new IntersectionObserver(function(entries) {                                                                                                                  
      entries.forEach(entry => {                            
          if (entry.isIntersecting) {                                                                                                                                            
              entry.target.style.animation = 'fadeInUp 0.6s ease forwards';                                                                                                      
              observer.unobserve(entry.target);                                                                                                                                  
          }                                                                                                                                                                      
      });                                                                                                                                                                        
  }, observerOptions);                                                                                                                                                           
                                                                                                                                                                                 
  // Observe elements for scroll animations                                                                                                                                      
  document.querySelectorAll('.skill-category, .project-card, .stat, .contact-item').forEach(el => {                                                                              
      el.style.opacity = '0';                                                                                                                                                    
      observer.observe(el);                                                                                                                                                      
  });                                                                                                                                                                            
                                                                                                                                                                                 
  // Add CSS animations                                                                                                                                                          
  const style = document.createElement('style');                                                                                                                                 
  style.textContent = `                                                                                                                                                          
      @keyframes fadeInUp {                                                                                                                                                      
          from {                                                                                                                                                                 
              opacity: 0;                                                                                                                                                        
              transform: translateY(30px);                                                                                                                                       
          }                                                                                                                                                                      
          to {                                                                                                                                                                   
              opacity: 1;                                                                                                                                                        
              transform: translateY(0);                                                                                                                                          
          }                                                                                                                                                                      
      }                                                                                                                                                                          
                                                                                                                                                                                 
      @keyframes slideDown {                                                                                                                                                     
          from {                                                                                                                                                                 
              opacity: 0;                                                                                                                                                        
              transform: translateY(-20px);                                                                                                                                      
          }                                                                                                                                                                      
          to {                                                                                                                                                                   
              opacity: 1;                                                                                                                                                        
              transform: translateY(0);                                                                                                                                          
          }                                                                                                                                                                      
      }                                                                                                                                                                          
                                                                                                                                                                                 
      @keyframes slideUp {                                                                                                                                                       
          from {                                                                                                                                                                 
              opacity: 1;                                                                                                                                                        
              transform: translateY(0);                                                                                                                                          
          }                                                                                                                                                                      
          to {                                                                                                                                                                   
              opacity: 0;                                                                                                                                                        
              transform: translateY(-20px);                                                                                                                                      
          }                                                                                                                                                                      
      }                                                                                                                                                                          
                                                                                                                                                                                 
      @media (max-width: 768px) {                                                                                                                                                
          .nav-menu {                                                                                                                                                            
              position: absolute;                                                                                                                                                
              top: 100%;                                                                                                                                                         
              left: 0;                                                                                                                                                           
              right: 0;                                                                                                                                                          
              background: rgba(15, 23, 42, 0.95);                                                                                                                                
              flex-direction: column;                                                                                                                                            
              padding: 1rem;                                                                                                                                                     
              border-bottom: 1px solid var(--border-color);                                                                                                                      
          }                                                                                                                                                                      
                                                                                                                                                                                 
          .nav-menu li {                                                                                                                                                         
              padding: 0.5rem 0;                                                                                                                                                 
          }                                                                                                                                                                      
      }                                                                                                                                                                          
  `;                                                                                                                                                                             
  document.head.appendChild(style);                                                                                                                                              
                                                                                                                                                                                 
  // Counter animation for stats                                                                                                                                                 
  function animateCounters() {                                                                                                                                                   
      const stats = document.querySelectorAll('.stat h3');                                                                                                                       
      const observerStats = new IntersectionObserver(function(entries) {                                                                                                         
          entries.forEach(entry => {                                                                                                                                             
              if (entry.isIntersecting) {                                                                                                                                        
                  const element = entry.target;                                                                                                                                  
                  const finalValue = parseInt(element.textContent);                                                                                                              
                  let currentValue = 0;                                                                                                                                          
                  const increment = Math.ceil(finalValue / 50);                                                                                                                  
                                                                                                                                                                                 
                  const counter = setInterval(() => {                                                                                                                            
                      currentValue += increment;                                                                                                                                 
                      if (currentValue >= finalValue) {                                                                                                                          
                          element.textContent = finalValue;                                                                                                                      
                          clearInterval(counter);                                                                                                                                
                      } else {                                                                                                                                                   
                          element.textContent = currentValue;                                                                                                                    
                      }                                                                                                                                                          
                  }, 20);                                                                                                                                                        
                                                                                                                                                                                 
                  observerStats.unobserve(element);                                                                                                                              
              }                                                                                                                                                                  
          });                                                                                                                                                                    
      }, { threshold: 0.5 });                               
                                                                                                                                                                                 
      stats.forEach(stat => observerStats.observe(stat));                                                                                                                        
  }                                                                                                                                                                              
                                                                                                                                                                                 
  animateCounters();                                                                                                                                                             
  
  // Parallax effect for hero section                                                                                                                                            
  window.addEventListener('scroll', function() {            
      const hero = document.querySelector('.hero');                                                                                                                              
      if (hero) {                                                                                                                                                                
          const scrollPosition = window.pageYOffset;                                                                                                                             
          hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;                                                                                                    
      }                                                                                                                                                                          
  });                                                                                                                                                                            
                                                                                                                                                                                 
  // Add keyboard navigation                                                                                                                                                     
  document.addEventListener('keydown', function(e) {                                                                                                                             
      if (e.key === 'Escape') {                                                                                                                                                  
          const navMenu = document.querySelector('.nav-menu');                                                                                                                   
          if (navMenu) navMenu.style.display = 'none';                                                                                                                           
      }                                                                                                                                                                          
  });                                                                                                                                                                            
                                                                                                                                                                                 
  // Debounce function for scroll events                                                                                                                                         
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
                                                                                                                                                                                 
  // Scroll effect for navbar                                                                                                                                                    
  const navbar = document.querySelector('.navbar');         
  let lastScroll = 0;                                                                                                                                                            
                                                                                                                                                                                 
  window.addEventListener('scroll', debounce(function() {                                                                                                                        
      const currentScroll = window.pageYOffset;                                                                                                                                  
                                                                                                                                                                                 
      if (currentScroll > 100) {                                                                                                                                                 
          navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';                                                                                                             
      } else {                                                                                                                                                                   
          navbar.style.boxShadow = 'none';                                                                                                                                       
      }                                                                                                                                                                          
                                                                                                                                                                                 
      lastScroll = currentScroll;                                                                                                                                                
  }, 50));                                                                                                                                                                       
                                                                                                                                                                                 
             