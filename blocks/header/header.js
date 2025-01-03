import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

function toggleSubMenu(drop) {
  const expanded = drop.getAttribute('aria-expanded') === 'true';
  drop.setAttribute('aria-expanded', expanded ? 'false' : 'true');
}

function toggleMainMenu(nav) {
  const expanded = nav.getAttribute('aria-expanded') === 'true';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  document.body.style.overflowY = expanded ? '' : 'hidden'; // Lock scrolling when menu is open
}

export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.setAttribute('aria-expanded', 'false');

  while (fragment.firstElementChild) {
    nav.append(fragment.firstElementChild);
  }

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);

  // Add dropdown toggle for sub-links
  nav.querySelectorAll('.nav-drop').forEach((drop) => {
    const toggleButton = document.createElement('button');
    toggleButton.className = 'nav-toggle-button';
    toggleButton.setAttribute('aria-label', 'Toggle Submenu');
    toggleButton.innerHTML = '▼'; // Icon for toggle
    drop.prepend(toggleButton);

    toggleButton.addEventListener('click', () => toggleSubMenu(drop));
  });

  // Add toggle button for the main menu (mobile)
  const mainToggleButton = document.createElement('button');
  mainToggleButton.className = 'main-nav-toggle';
  mainToggleButton.setAttribute('aria-label', 'Toggle Navigation');
  mainToggleButton.innerHTML = '☰'; // Hamburger icon
  mainToggleButton.addEventListener('click', () => toggleMainMenu(nav));
  block.prepend(mainToggleButton);
}
