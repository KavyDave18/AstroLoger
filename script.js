// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const stars = document.querySelector(".stars")
  if (stars) {
    stars.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})

// Testimonials Carousel
class TestimonialsCarousel {
  constructor() {
    this.currentSlide = 0
    this.testimonials = document.querySelectorAll(".testimonial")
    this.dots = document.querySelectorAll(".dot")
    this.autoPlayInterval = null

    this.init()
  }

  init() {
    this.showSlide(0)
    this.startAutoPlay()
    this.bindEvents()
  }

  showSlide(index) {
    // Hide all testimonials
    this.testimonials.forEach((testimonial) => {
      testimonial.classList.remove("active")
    })

    // Remove active class from all dots
    this.dots.forEach((dot) => {
      dot.classList.remove("active")
    })

    // Show current testimonial and activate corresponding dot
    if (this.testimonials[index]) {
      this.testimonials[index].classList.add("active")
      this.dots[index].classList.add("active")
    }

    this.currentSlide = index
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.testimonials.length
    this.showSlide(nextIndex)
  }

  goToSlide(index) {
    this.showSlide(index)
    this.resetAutoPlay()
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide()
    }, 5000)
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval)
    }
  }

  resetAutoPlay() {
    this.stopAutoPlay()
    this.startAutoPlay()
  }

  bindEvents() {
    // Dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        this.goToSlide(index)
      })
    })

    // Pause on hover
    const carousel = document.querySelector(".testimonials-carousel")
    if (carousel) {
      carousel.addEventListener("mouseenter", () => {
        this.stopAutoPlay()
      })

      carousel.addEventListener("mouseleave", () => {
        this.startAutoPlay()
      })
    }
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new TestimonialsCarousel()
})

// Contact Form Handling
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Get form data
    const formData = new FormData(this)
    const name = formData.get("name")
    const email = formData.get("email")
    const message = formData.get("message")

    // Simple validation
    if (!name || !email || !message) {
      alert("Please fill in all fields.")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.")
      return
    }

    // Simulate form submission
    const submitBtn = this.querySelector(".submit-btn")
    const originalText = submitBtn.textContent

    submitBtn.textContent = "Sending..."
    submitBtn.disabled = true

    // Simulate API call
    setTimeout(() => {
      alert("Thank you for your message! I will get back to you soon.")
      this.reset()
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    }, 2000)
  })
}

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(11, 29, 81, 0.98)"
  } else {
    navbar.style.background = "rgba(11, 29, 81, 0.95)"
  }
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".service-card, .about-text, .about-image")

  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// CTA Button clicks
document.querySelectorAll(".cta-button, .book-btn").forEach((button) => {
  button.addEventListener("click", () => {
    // Scroll to contact section
    document.getElementById("contact").scrollIntoView({
      behavior: "smooth",
    })
  })
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Preload critical images
const preloadImages = [
  "/astrologer-portrait.png",
  "/professional-woman-smiling.png",
  "/happy-couple.png",
  "/professional-businessman.png",
  "/spiritual-woman-meditating.png",
]

preloadImages.forEach((src) => {
  const img = new Image()
  img.src = src
})
