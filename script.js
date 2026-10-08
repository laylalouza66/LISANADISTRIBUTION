/* ============================================
   LISANA DISTRIBUTION — Interactive Script
   Mobile menu, product filtering, custom popup
   ============================================ */

(function () {
  'use strict';

  /* ---------- Mobile Menu Toggle ---------- */
  var menuToggle = document.getElementById('menuToggle');
  var navMenu = document.getElementById('navMenu');

  menuToggle.addEventListener('click', function () {
    navMenu.classList.toggle('open');
    menuToggle.classList.toggle('open');
    var isOpen = navMenu.classList.contains('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile menu when a link is clicked
  navMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Navbar scroll shadow ---------- */
  var navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ---------- Active nav link on scroll ---------- */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY + 100;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  /* ---------- Product Category Filtering ---------- */
  var tabButtons = document.querySelectorAll('.tab-btn');
  var productCards = document.querySelectorAll('.product-card');

  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var category = btn.getAttribute('data-category');

      // Update active tab
      tabButtons.forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      // Filter products
      productCards.forEach(function (card) {
        var cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  /* ---------- Custom Popup ---------- */
  var popupOverlay = document.getElementById('popupOverlay');
  var popupClose = document.getElementById('popupClose');
  var popupOk = document.getElementById('popupOk');
  var popupTitle = document.getElementById('popupTitle');
  var popupMessage = document.getElementById('popupMessage');

  var DEMO_MESSAGE =
    'This is a custom interactive demo website created by Zakaria to showcase web development services for Lisana Distribution.';

  var actionTitles = {
    order: 'Order Received!',
    quote: 'Quote Requested!',
    contact: 'Message Sent!',
  };

  function openPopup(action) {
    var title = actionTitles[action] || 'Thank You!';
    popupTitle.textContent = title;
    popupMessage.textContent = DEMO_MESSAGE;
    popupOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    popupOverlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  popupClose.addEventListener('click', closePopup);
  popupOk.addEventListener('click', closePopup);
  popupOverlay.addEventListener('click', function (e) {
    if (e.target === popupOverlay) {
      closePopup();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && popupOverlay.classList.contains('show')) {
      closePopup();
    }
  });

  /* ---------- Action buttons (Order, Quote, Contact) ---------- */
  document.querySelectorAll('[data-action]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var action = btn.getAttribute('data-action');
      openPopup(action);
    });
  });

  /* ---------- Contact form ---------- */
  var contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    openPopup('contact');
    contactForm.reset();
  });
})();
