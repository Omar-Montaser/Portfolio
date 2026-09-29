const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const navLinks = [...navigation.querySelectorAll('a')];
const mobileQuery = window.matchMedia('(max-width: 760px)');
function closeMenu(returnFocus = false) {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const opening = menuButton.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('is-open', opening);
  menuButton.setAttribute('aria-expanded', String(opening));
  document.body.classList.toggle('menu-open', opening);
});
navLinks.forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('click', event => {
  if (!event.target.closest('.navbar')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (menuButton.getAttribute('aria-expanded') !== 'true') return;
  if (event.key === 'Escape') closeMenu(true);
  if (event.key === 'Tab') {
    const lastLink = navLinks[navLinks.length - 1];
    if (event.shiftKey && document.activeElement === menuButton) {
      event.preventDefault(); lastLink.focus();
    } else if (!event.shiftKey && document.activeElement === lastLink) {
      event.preventDefault(); menuButton.focus();
    }
  }
});
mobileQuery.addEventListener('change', () => closeMenu());
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
  document.documentElement.classList.add('motion-ready');
}
reducedMotion.addEventListener('change', event => {
  if (event.matches) document.documentElement.classList.remove('motion-ready');
});
const sections = [...document.querySelectorAll('main section[id]')];
let ticking = false;
function updateNavigation() {
  let activeId = 'home';
  sections.forEach(section => {
    if (section.getBoundingClientRect().top <= 180) activeId = section.id;
  });
  navLinks.forEach(link => {
    if (link.hash === `#${activeId}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(updateNavigation); ticking = true; }
}, { passive: true });
window.addEventListener('resize', updateNavigation);
updateNavigation();
document.querySelector('#year').textContent = new Date().getFullYear();
