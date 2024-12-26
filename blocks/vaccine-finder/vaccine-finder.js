import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const container = document.createElement('div');
  container.className = 'vaccine-finder-container';

  [...block.children].forEach((row) => {
    const img = row.querySelector('img');
    if (img) {
      const imgUrl = img.src;
      container.style.backgroundImage = `url(${imgUrl})`;
      container.style.backgroundSize = 'cover';
      container.style.backgroundPosition = 'center';
      img.remove(); // Remove the image element
    }

    const content = document.createElement('div');
    content.className = 'vaccine-finder-content';
    content.append(...row.children);
    container.append(content);
  });

  block.textContent = '';
  block.append(container);
}
