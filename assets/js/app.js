/**
 * Apolo Landing Page — Main Script
 * info.apolo.education
 */
document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile Menu Toggle ---- */
  const mobileToggle = document.getElementById('mobile-toggle')
  const navMenu = document.getElementById('nav-menu')

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active')
      mobileToggle.setAttribute('aria-expanded', isOpen)
      mobileToggle.querySelector('span').innerHTML = isOpen ? '&#10005;' : '&#9776;'
    })

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active')
        mobileToggle.setAttribute('aria-expanded', 'false')
        mobileToggle.querySelector('span').innerHTML = '&#9776;'
      })
    })
  }

  /* ---- Navbar Scroll Effect ---- */
  const navbar = document.querySelector('.navbar')
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50)
    }, { passive: true })
  }

  /* ---- Tabs (Roles) ---- */
  const tabBtns = document.querySelectorAll('.tab-btn')
  const tabContents = document.querySelectorAll('.tab-content')

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => {
        b.classList.remove('active')
        b.setAttribute('aria-selected', 'false')
      })
      tabContents.forEach(c => c.classList.remove('active'))

      btn.classList.add('active')
      btn.setAttribute('aria-selected', 'true')
      const target = document.getElementById(btn.dataset.target)
      if (target) target.classList.add('active')
    })
  })

  /* ---- Smooth Scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault()
      const id = anchor.getAttribute('href')
      if (id === '#') return
      const el = document.querySelector(id)
      if (el) {
        const offset = 80
        const top = el.getBoundingClientRect().top + window.pageYOffset - offset
        window.scrollTo({ top, behavior: 'smooth' })
      }
    })
  })

  /* ---- Intersection Observer (data-animate) ---- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el))

  /* ---- ScrollSpy ---- */
  const sections = document.querySelectorAll('section[id]')
  const navLinks = document.querySelectorAll('.nav-link')

  window.addEventListener('scroll', () => {
    let current = ''
    sections.forEach(section => {
      if (window.pageYOffset >= section.offsetTop - 150) {
        current = section.id
      }
    })
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current)
    })
  }, { passive: true })

  /* ---- Theme Toggle ---- */
  const themeBtn = document.getElementById('theme-toggle')
  const sunIcon = document.querySelector('.sun-icon')
  const moonIcon = document.querySelector('.moon-icon')

  const applyTheme = (isLight) => {
    document.body.classList.toggle('light-mode', isLight)
    if (sunIcon) sunIcon.style.display = isLight ? 'none' : 'block'
    if (moonIcon) moonIcon.style.display = isLight ? 'block' : 'none'
    const metaTheme = document.querySelector('meta[name="theme-color"]')
    if (metaTheme) metaTheme.content = isLight ? '#f5f9fc' : '#050B14'
  }

  const saved = localStorage.getItem('apolo-theme')
  if (saved === 'light') applyTheme(true)

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isLight = !document.body.classList.contains('light-mode')
      applyTheme(isLight)
      localStorage.setItem('apolo-theme', isLight ? 'light' : 'dark')
    })
  }
})
