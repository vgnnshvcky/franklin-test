import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const container = document.createElement('div');
  container.className = 'hero-container';

  const image = block.querySelector('img');
  const content = document.createElement('div');
  content.className = 'hero-content';

  const title = block.querySelector('h1');
  const description = block.querySelector('p');
  const button = block.querySelector('a');

  if (image) {
    const picture = createOptimizedPicture(image.src, image.alt);
    container.appendChild(picture);
  }

  if (title) content.appendChild(title);
  if (description) content.appendChild(description);
  if (button) {
    button.className = 'button';
    content.appendChild(button);
  }

  container.appendChild(content);
  block.textContent = '';
  block.appendChild(container);
}
