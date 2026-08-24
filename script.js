// Sombreros Mexican Restaurant — Main Script
// Simulates client-side routing (React-style) over a single static page:
// distinct "pages" are toggled via JS, the URL/history updates, but nothing reloads.

(function () {
  'use strict';

  var sombrerosRoutes = {
    home: {
      title: 'Sombreros Mexican Restaurant | Authentic Mexican Flavor',
      description: 'Sombreros Mexican Restaurant serves handcrafted, authentic Mexican food made fresh daily. View our menu, hours, location, and contact info.'
    },
    menu: {
      title: 'Menu | Sombreros Mexican Restaurant',
      description: 'Browse the Sombreros Mexican Restaurant menu, featuring handcrafted, authentic Mexican dishes made fresh daily.'
    },
    hours: {
      title: 'Hours & Location | Sombreros Mexican Restaurant',
      description: 'Find Sombreros Mexican Restaurant hours of operation, address, and directions.'
    },
    contact: {
      title: 'Contact | Sombreros Mexican Restaurant',
      description: 'Contact Sombreros Mexican Restaurant with questions, catering requests, or reservations.'
    }
  };

  var sombrerosBentoToggle = document.getElementById('sombreros-bento-toggle');
  var sombrerosSideNav = document.getElementById('sombreros-side-nav');
  var sombrerosSideNavOverlay = document.getElementById('sombreros-side-nav-overlay');
  var sombrerosSideNavClose = document.getElementById('sombreros-side-nav-close');
  var sombrerosMainContent = document.getElementById('sombreros-main-content');
  var sombrerosSiteFooter = document.getElementById('sombreros-site-footer');
  var sombrerosMetaDescription = document.querySelector('meta[name="description"]');
  var sombrerosRouteLinks = document.querySelectorAll('[data-sombreros-route]');

  function sombrerosPrefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // --- "Router" ---------------------------------------------------------

  function sombrerosRouteFromHash() {
    var hash = window.location.hash.replace('#sombreros-page-', '');
    return sombrerosRoutes[hash] ? hash : 'home';
  }

  function sombrerosNavigate(routeName, options) {
    options = options || {};
    var pushHistory = options.pushHistory !== false;
    var focusHeading = options.focusHeading !== false;

    if (!sombrerosRoutes[routeName]) {
      routeName = 'home';
    }

    document.querySelectorAll('.sombreros-page').forEach(function (page) {
      page.hidden = page.getAttribute('data-sombreros-page') !== routeName;
    });

    sombrerosRouteLinks.forEach(function (link) {
      if (link.getAttribute('data-sombreros-route') === routeName) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    var route = sombrerosRoutes[routeName];
    document.title = route.title;
    if (sombrerosMetaDescription) {
      sombrerosMetaDescription.setAttribute('content', route.description);
    }

    if (pushHistory) {
      history.pushState({ sombrerosRoute: routeName }, '', '#sombreros-page-' + routeName);
    }

    sombrerosCloseSideNav();

    var activePage = document.getElementById('sombreros-page-' + routeName);
    if (focusHeading && activePage) {
      var heading = activePage.querySelector('h1');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus();
      }
    }

    window.scrollTo({ top: 0, behavior: sombrerosPrefersReducedMotion() ? 'auto' : 'smooth' });
  }

  sombrerosRouteLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      sombrerosNavigate(link.getAttribute('data-sombreros-route'));
    });
  });

  window.addEventListener('popstate', function (event) {
    var routeName = (event.state && event.state.sombrerosRoute) || sombrerosRouteFromHash();
    sombrerosNavigate(routeName, { pushHistory: false, focusHeading: false });
  });

  // --- Bento icon / left-side drawer nav ---------------------------------

  function sombrerosHandleSideNavKeydown(event) {
    if (event.key === 'Escape') {
      sombrerosCloseSideNav({ restoreFocus: true });
      return;
    }
    if (event.key === 'Tab') {
      var focusable = sombrerosSideNav.querySelectorAll('a[href], button:not([disabled])');
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  function sombrerosOpenSideNav() {
    sombrerosSideNav.classList.add('sombreros-side-nav-open');
    sombrerosSideNav.removeAttribute('inert');
    sombrerosSideNavOverlay.hidden = false;
    sombrerosBentoToggle.setAttribute('aria-expanded', 'true');
    sombrerosMainContent.setAttribute('inert', '');
    sombrerosSiteFooter.setAttribute('inert', '');
    document.body.classList.add('sombreros-no-scroll');
    document.addEventListener('keydown', sombrerosHandleSideNavKeydown);
    sombrerosSideNavClose.focus();
  }

  function sombrerosCloseSideNav(options) {
    options = options || {};
    if (!sombrerosSideNav.classList.contains('sombreros-side-nav-open')) return;
    sombrerosSideNav.classList.remove('sombreros-side-nav-open');
    sombrerosSideNav.setAttribute('inert', '');
    sombrerosSideNavOverlay.hidden = true;
    sombrerosBentoToggle.setAttribute('aria-expanded', 'false');
    sombrerosMainContent.removeAttribute('inert');
    sombrerosSiteFooter.removeAttribute('inert');
    document.body.classList.remove('sombreros-no-scroll');
    document.removeEventListener('keydown', sombrerosHandleSideNavKeydown);
    if (options.restoreFocus) {
      sombrerosBentoToggle.focus();
    }
  }

  sombrerosBentoToggle.addEventListener('click', function () {
    var isOpen = sombrerosSideNav.classList.contains('sombreros-side-nav-open');
    if (isOpen) {
      sombrerosCloseSideNav({ restoreFocus: true });
    } else {
      sombrerosOpenSideNav();
    }
  });

  sombrerosSideNavClose.addEventListener('click', function () {
    sombrerosCloseSideNav({ restoreFocus: true });
  });

  sombrerosSideNavOverlay.addEventListener('click', function () {
    sombrerosCloseSideNav({ restoreFocus: true });
  });

  // --- Init ---------------------------------------------------------------

  sombrerosNavigate(sombrerosRouteFromHash(), { pushHistory: false, focusHeading: false });
})();
