import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Toggles the visibility of a submenu
 * @param {HTMLElement} dropdown The dropdown element
 */
function toggleSubMenu(dropdown) {
  const expanded = dropdown.getAttribute('aria-expanded') === 'true';
  dropdown.setAttribute('aria-expanded', expanded ? 'false' : 'true');
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

  // Add dropdown toggle functionality for lists with sublists
  nav.querySelectorAll('li').forEach((listItem) => {
    const sublist = listItem.querySelector('ul');
    if (sublist) {
      listItem.classList.add('nav-drop');
      listItem.setAttribute('aria-expanded', 'false');

      // Add a toggle button
      const toggleButton = document.createElement('button');
      toggleButton.className = 'nav-toggle-button';
      toggleButton.setAttribute('aria-label', 'Expand/Collapse submenu');
      toggleButton.innerHTML = '▼';
      listItem.prepend(toggleButton);

      // Add event listener for toggling submenu
      toggleButton.addEventListener('click', () => toggleSubMenu(listItem));
    }
  });

  // Add hamburger menu toggle for mobile view
  const mainToggleButton = document.createElement('button');
  mainToggleButton.className = 'main-nav-toggle';
  mainToggleButton.setAttribute('aria-label', 'Toggle Navigation');
  mainToggleButton.innerHTML = '☰';
  mainToggleButton.addEventListener('click', () => {
    const expanded = nav.getAttribute('aria-expanded') === 'true';
    nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    document.body.style.overflowY = expanded ? '' : 'hidden'; // Lock scrolling
  });
  block.prepend(mainToggleButton);
}
