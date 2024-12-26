import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'vaccine-finder-list';

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'vaccine-finder-item';

    while (row.firstElementChild) {
      const child = row.firstElementChild;
      if (child.querySelector('img')) {
        const img = child.querySelector('img');
        const imgUrl = img.src;
        li.style.backgroundImage = `url(${imgUrl})`;
        li.style.backgroundSize = 'cover';
        li.style.backgroundPosition = 'center';
        child.remove(); // Remove the image element
      } else {
        const bodyDiv = document.createElement('div');
        bodyDiv.className = 'vaccine-finder-body';
        bodyDiv.append(child);
        li.append(bodyDiv);
      }
    }

    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}
