(function () {
  "use strict";

  var GSP = {
    init: function () {
      this.handleScrollbar();
      this.loader();
      this.stickyHeader();
      this.mobileMenu();
      this.scrollTopBtn();
      this.tabSwitcher();
      this.scrollAnimations();
      this.contactForm();
      this.smoothScroll();
    },

    handleScrollbar: function () {
      var body = document.body;
      var scrollbarWidth = window.innerWidth - body.clientWidth;
      if (scrollbarWidth > 0) {
        body.classList.add('has-scrollbar');
        document.documentElement.style.setProperty('--scroll-bar', scrollbarWidth + 'px');
      }
    },

    loader: function () {
      var loader = document.getElementById('page-loader');
      if (!loader) return;
      setTimeout(function () {
        loader.style.opacity = '0';
        setTimeout(function () {
          loader.style.display = 'none';
        }, 500);
      }, 800);
    },

    stickyHeader: function () {
      var header = document.getElementById('site-header');
      if (!header) return;
      window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    },

    mobileMenu: function () {
      var toggle = document.querySelector('.hamburger');
      var mobileNav = document.querySelector('.mobile-nav');
      if (!toggle || !mobileNav) return;

      toggle.addEventListener('click', function () {
        toggle.classList.toggle('open');
        mobileNav.classList.toggle('open');
      });

      var links = mobileNav.querySelectorAll('a');
      links.forEach(function (link) {
        link.addEventListener('click', function () {
          toggle.classList.remove('open');
          mobileNav.classList.remove('open');
        });
      });
    },

    scrollTopBtn: function () {
      var btn = document.getElementById('back-to-top');
      if (!btn) return;

      window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
      });

      btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    },

    tabSwitcher: function () {
      var tabBtns = document.querySelectorAll('.tab-btn');
      var tabPanels = document.querySelectorAll('.tab-panel');
      if (!tabBtns.length) return;

      tabBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var target = btn.getAttribute('data-tab');

          tabBtns.forEach(function (b) { b.classList.remove('active'); });
          tabPanels.forEach(function (p) { p.classList.remove('active'); });

          btn.classList.add('active');
          var panel = document.getElementById(target);
          if (panel) panel.classList.add('active');
        });
      });
    },

    scrollAnimations: function () {
      var elements = document.querySelectorAll('.fade-in');
      if (!elements.length) return;

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.12 });

      elements.forEach(function (el) { observer.observe(el); });
    },

    contactForm: function () {
      var form = document.getElementById('contact-form');
      if (!form) return;

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = form.querySelector('.form-submit');
        var original = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        setTimeout(function () {
          btn.textContent = 'Message Sent!';
          btn.style.background = '#059669';
          form.reset();
          setTimeout(function () {
            btn.textContent = original;
            btn.disabled = false;
            btn.style.background = '';
          }, 3000);
        }, 1200);
      });
    },

    smoothScroll: function () {
      var links = document.querySelectorAll('a[href^="#"]:not([href="#"])');
      links.forEach(function (link) {
        link.addEventListener('click', function (e) {
          var target = document.querySelector(link.getAttribute('href'));
          if (!target) return;
          e.preventDefault();
          var offset = 90;
          var top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        });
      });
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    GSP.init();
  });

})();
