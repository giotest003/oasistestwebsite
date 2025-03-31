// Toggle Mobile Menu
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle")
    const navMenu = document.getElementById("nav-menu")
  
    if (menuToggle && navMenu) {
      menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active")
  
        // Change icon based on menu state
        const icon = menuToggle.querySelector("i")
        if (navMenu.classList.contains("active")) {
          icon.classList.remove("fa-bars")
          icon.classList.add("fa-times")
        } else {
          icon.classList.remove("fa-times")
          icon.classList.add("fa-bars")
        }
      })
  
      // Close menu when clicking on a link
      const navLinks = navMenu.querySelectorAll("a")
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          navMenu.classList.remove("active")
          const icon = menuToggle.querySelector("i")
          icon.classList.remove("fa-times")
          icon.classList.add("fa-bars")
        })
      })
    }
  
    // Form submission
    const contactForm = document.querySelector(".contact-form")
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Get form values
        const firstName = document.getElementById("first-name").value
        const lastName = document.getElementById("last-name").value
        const email = document.getElementById("email").value
        const phone = document.getElementById("phone").value
        const message = document.getElementById("message").value
  
        // Here you would typically send the form data to a server
        // For now, we'll just log it and show an alert
        console.log({
          firstName,
          lastName,
          email,
          phone,
          message,
        })
  
        alert("¡Gracias por tu mensaje! Te contactaremos pronto.")
        contactForm.reset()
      })
    }
  
    // Scroll reveal animation
    function reveal() {
      const reveals = document.querySelectorAll(".reveal")
  
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight
        const elementTop = reveals[i].getBoundingClientRect().top
        const elementVisible = 150
  
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active")
        } else {
          reveals[i].classList.remove("active")
        }
      }
    }
  
    window.addEventListener("scroll", reveal)
  
    // Add reveal class to elements
    const addRevealClasses = () => {
      // Add reveal classes to sections
      document.querySelectorAll(".section-title").forEach((el) => {
        el.classList.add("reveal", "fade-bottom")
      })
  
      document.querySelectorAll(".service-card, .leader-card, .service-detailed").forEach((el) => {
        el.classList.add("reveal", "fade-bottom")
      })
  
      // Add left/right animations
      const leftElements = document.querySelectorAll(".contact-info, .contact-info-detailed")
      leftElements.forEach((el) => {
        el.classList.add("reveal", "fade-left")
      })
  
      const rightElements = document.querySelectorAll(".map, .contact-form-section")
      rightElements.forEach((el) => {
        el.classList.add("reveal", "fade-right")
      })
    }
  
    // Run on page load
    addRevealClasses()
    reveal() // Trigger once on page load
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  
    // Add hover effects to buttons
    const buttons = document.querySelectorAll(".btn-primary")
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", function () {
        this.style.animation = "pulse 0.5s ease-in-out"
      })
  
      button.addEventListener("animationend", function () {
        this.style.animation = ""
      })
    })
  })
  
  