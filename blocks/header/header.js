import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

function toggleMenu(nav, expanded) {
  const isExpanded = expanded || nav.getAttribute('aria-expanded') === 'true';
  document.body.style.overflowY = isExpanded ? '' : 'hidden';
  nav.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
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

  // Add dropdown toggle functionality
  nav.querySelectorAll('.nav-drop').forEach((drop) => {
    drop.addEventListener('click', () => {
      const expanded = drop.getAttribute('aria-expanded') === 'true';
      drop.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    });
  });

  // Toggle the main navigation menu
  const toggleButton = document.createElement('button');
  toggleButton.className = 'nav-toggle';
  toggleButton.setAttribute('aria-label', 'Toggle navigation');
  toggleButton.innerHTML = '☰';
  toggleButton.addEventListener('click', () => toggleMenu(nav));
  block.prepend(toggleButton);
}
