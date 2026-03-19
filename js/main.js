// ============================================================
// VeiligebedrijfsvloerNL - Main JavaScript
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- Mobile menu ----
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  const dropdownToggles = document.querySelectorAll('.nav > li > a[data-dropdown]');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      nav.classList.toggle('open');
    });
  }

  // Mobile dropdowns
  dropdownToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdown = this.nextElementSibling;
        if (dropdown && dropdown.classList.contains('dropdown')) {
          dropdown.classList.toggle('open');
        }
      }
    });
  });

  // Close menu on outside click
  document.addEventListener('click', function (e) {
    if (nav && hamburger && !nav.contains(e.target) && !hamburger.contains(e.target)) {
      nav.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });

  // ---- Scroll animaties ----
  const animeerElementen = document.querySelectorAll(
    '.dienst-kaart, .stat-item, .usp-item, .about-grid, .intro-grid, .vijfs-inhoud, .portaal-kaart, .team-kaart, .waarde-kaart, .machine-kaart, .content-kaart'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animeerElementen.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  // ---- Teller animatie ----
  const tellers = document.querySelectorAll('.stat-getal[data-waarde]');

  function animeerTeller(el) {
    const doel = parseFloat(el.getAttribute('data-waarde'));
    const suffix = el.getAttribute('data-suffix') || '';
    const decimalen = el.getAttribute('data-decimalen') || 0;
    const duur = 2000;
    const stap = doel / (duur / 16);
    let huidig = 0;

    const interval = setInterval(function () {
      huidig += stap;
      if (huidig >= doel) {
        huidig = doel;
        clearInterval(interval);
      }
      if (decimalen > 0) {
        el.textContent = huidig.toFixed(decimalen).replace('.', ',') + suffix;
      } else {
        el.textContent = Math.round(huidig).toLocaleString('nl-NL') + suffix;
      }
    }, 16);
  }

  if ('IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animeerTeller(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    tellers.forEach(function (teller) {
      statsObserver.observe(teller);
    });
  }

  // ---- Actieve nav link ----
  const huidigeUrl = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href && (href === huidigeUrl || href.includes(huidigeUrl))) {
      link.closest('li').classList.add('actief');
    }
  });

  // ---- Sticky header schaduwa ----
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
      } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
      }
    });
  }

  // ---- Formulier validatie ----
  const contactForm = document.getElementById('contactFormulier');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const knop = contactForm.querySelector('[type="submit"]');
      knop.textContent = 'Verzonden! ✓';
      knop.style.background = '#28a745';
      knop.disabled = true;
      setTimeout(function () {
        contactForm.reset();
        knop.textContent = 'Verstuur bericht';
        knop.style.background = '';
        knop.disabled = false;
      }, 4000);
    });
  }

});
