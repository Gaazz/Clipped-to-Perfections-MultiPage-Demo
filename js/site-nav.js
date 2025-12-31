// Mobile header + dropdown behaviour
(function () {
  const header = document.querySelector('.header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav') || document.querySelector('.main-nav');

  if (!header || !toggle || !nav) return;

  function closeMenu() {
    header.classList.remove('header--open');
    toggle.setAttribute('aria-expanded', 'false');

    const dd = nav.querySelector('.dropdown.dropdown--open');
    if (dd) dd.classList.remove('dropdown--open');
  }

  function openMenu() {
    header.classList.add('header--open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = header.classList.toggle('header--open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    if (!isOpen) {
      const dd = nav.querySelector('.dropdown.dropdown--open');
      if (dd) dd.classList.remove('dropdown--open');
    }
  });

  // Tap-to-toggle dropdown on mobile (Services)
  const dropdown = nav.querySelector('.dropdown');
  if (dropdown) {
    const trigger = dropdown.querySelector('a');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        if (window.matchMedia('(max-width: 968px)').matches) {
          e.preventDefault();
          e.stopPropagation();
          dropdown.classList.toggle('dropdown--open');
        }
      });
    }
  }

  // Close menu when clicking outside (mobile)
  document.addEventListener('click', (e) => {
    if (window.matchMedia('(max-width: 968px)').matches) {
      if (!header.contains(e.target)) closeMenu();
    }
  });

  // Close menu when a nav link is selected (but allow Services toggle)
  nav.addEventListener('click', (e) => {
    const a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!a) return;

    // If it's the Services trigger, let the dropdown handler manage it
    if (a.parentElement && a.parentElement.classList.contains('dropdown')) return;

    if (window.matchMedia('(max-width: 968px)').matches) {
      closeMenu();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();
