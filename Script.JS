// Sombreros Mexican Restaurant — Main Script

const sombrerоsMobileMenuToggle = document.getElementById('sombreros-mobile-menu-toggle');
const sombrerоsNavLinks = document.getElementById('sombreros-nav-links');

sombrerоsMobileMenuToggle.addEventListener('click', () => {
  sombrerоsNavLinks.classList.toggle('sombreros-nav-open');
});

// Close mobile nav when a link is tapped
sombrerоsNavLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    sombrerоsNavLinks.classList.remove('sombreros-nav-open');
  });
});
