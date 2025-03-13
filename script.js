document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    });
    
    // Initialize AOS Animation
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
    
    // Sticky Header
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
    
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileNavToggle.classList.remove('active');
            }
        });
    });
    
    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Visitor Tabs
    const visitorTabs = document.querySelectorAll('.visitor-tab');
    const visitorTabContents = document.querySelectorAll('.visitor-tab-content');
    
    if (visitorTabs.length > 0) {
        visitorTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                visitorTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all tab contents
                visitorTabContents.forEach(content => content.classList.remove('active'));
                
                // Show the corresponding tab content
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Accordion
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            
            header.addEventListener('click', function() {
                // Toggle active class on clicked item
                item.classList.toggle('active');
                
                // Close other accordion items
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        });
    }
    
    // Counter Animation
    const counters = document.querySelectorAll('.counter-number');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    let count = 0;
                    const updateCounter = () => {
                        const increment = target / 100;
                        if (count < target) {
                            count += increment;
                            counter.innerText = Math.ceil(count);
                            setTimeout(updateCounter, 20);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // Events Slider
    const eventsSlider = document.querySelector('.events-slider');
    
    if (eventsSlider) {
        const eventsGrid = eventsSlider.querySelector('.events-grid');
        const eventCards = eventsSlider.querySelectorAll('.event-card');
        const prevBtn = eventsSlider.querySelector('.events-prev');
        const nextBtn = eventsSlider.querySelector('.events-next');
        
        let currentSlide = 0;
        let slidesToShow = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;
        let totalSlides = Math.ceil(eventCards.length / slidesToShow);
        
        function updateEventsSlider() {
            const slideWidth = 100 / slidesToShow;
            eventCards.forEach((card, index) => {
                card.style.flex = `0 0 ${slideWidth}%`;
            });
            
            eventsGrid.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateEventsSlider();
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateEventsSlider();
        }
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);
        }
        
        updateEventsSlider();
        
        window.addEventListener('resize', function() {
            const newSlidesToShow = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;
            
            if (newSlidesToShow !== slidesToShow) {
                slidesToShow = newSlidesToShow;
                totalSlides = Math.ceil(eventCards.length / slidesToShow);
                currentSlide = 0;
                updateEventsSlider();
            }
        });
    }
    
    // Testimonials Slider
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    
    if (testimonialsSlider) {
        const testimonialsWrapper = testimonialsSlider.querySelector('.testimonials-wrapper');
        const testimonialItems = testimonialsSlider.querySelectorAll('.testimonial-item');
        const prevBtn = testimonialsSlider.querySelector('.testimonials-prev');
        const nextBtn = testimonialsSlider.querySelector('.testimonials-next');
        
        let currentSlide = 0;
        const totalSlides = testimonialItems.length;
        
        function updateTestimonialsSlider() {
            testimonialsWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateTestimonialsSlider();
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateTestimonialsSlider();
        }
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);
        }
        
        // Auto slide
        let slideInterval = setInterval(nextSlide, 5000);
        
        testimonialsSlider.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        testimonialsSlider.addEventListener('mouseleave', function() {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Form Submission for New Visitor Form
    const newVisitorForm = document.getElementById('newVisitorForm');
    
    if (newVisitorForm) {
        newVisitorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formDataObj = {};
            
            formData.forEach((value, key) => {
                if (formDataObj[key]) {
                    if (!Array.isArray(formDataObj[key])) {
                        formDataObj[key] = [formDataObj[key]];
                    }
                    formDataObj[key].push(value);
                } else {
                    formDataObj[key] = value;
                }
            });
            
            // Send form data to email (in a real implementation)
            console.log('Form Data:', formDataObj);
            
            // In a real implementation, you would send this data to your server
            // which would then send an email to your address
            /*
            fetch('your-server-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subject: 'New Visitor Form Submission',
                    data: formDataObj,
                    to: 'info@oasisfamilychurchpruebadeweb.com'
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                showFormSuccess();
            })
            .catch((error) => {
                console.error('Error:', error);
                showFormError();
            });
            */
            
            // For demo purposes, simulate success
            showFormSuccess(this);
        });
    }
    
    // Form Submission for Newsletter
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email
            const email = this.querySelector('input[type="email"]').value;
            
            // Send to email (in a real implementation)
            console.log('Newsletter Subscription:', email);
            
            // For demo purposes, simulate success
            this.reset();
            alert('¡Gracias por suscribirte a nuestro boletín!');
        });
    }
    
    function showFormSuccess(form) {
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check"></i>
            </div>
            <h3>¡Gracias por conectarte con nosotros!</h3>
            <p>Hemos recibido tu información y nos pondremos en contacto contigo pronto.</p>
        `;
        
        // Add success styles
        const style = document.createElement('style');
        style.textContent = `
            .form-success {
                text-align: center;
                padding: 30px;
            }
            .success-icon {
                width: 70px;
                height: 70px;
                background-color: var(--success);
                color: white;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 auto 20px;
                font-size: 30px;
            }
        `;
        document.head.appendChild(style);
        
        // Replace form with success message
        form.innerHTML = '';
        form.appendChild(successMessage);
    }
    
    // Corregir los enlaces de navegación - eliminar el "1." que aparece antes de "Inicio"
    document.addEventListener('DOMContentLoaded', function() {
        const breadcrumbLinks = document.querySelectorAll('.breadcrumb-item a');
        breadcrumbLinks.forEach(link => {
            if (link.textContent.includes('1.Inicio')) {
                link.textContent = 'Inicio';
            }
        });
    });

    // Form Validation
    const forms = document.querySelectorAll('form');
    if (forms.length > 0) {
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic validation
                let isValid = true;
                const requiredFields = form.querySelectorAll('[required]');
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                });
                
                if (isValid) {
                    // Here you would normally send the form data to a server
                    // For now, just show a success message
                    alert('¡Formulario enviado con éxito! Te contactaremos pronto.');
                    form.reset();
                } else {
                    alert('Por favor completa todos los campos requeridos.');
                }
            });
        });
    }
});