import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const container = document.createElement('div');
  container.className = 'hero-with-form-container';

  const rows = [...block.children];
  const image = rows[0].querySelector('img');
  const title = rows[1].querySelector('h1');
  const description = rows[1].querySelector('p');
  const subText = rows[1].querySelector('small');
  const zipInput = rows[2].querySelector('input');
  const locationLink = rows[2].querySelector('a[href="#"]');
  const button = rows[2].querySelector('a.button');

  if (image) {
    const picture = createOptimizedPicture(image.src, image.alt);
    container.appendChild(picture);
  }

  const content = document.createElement('div');
  content.className = 'hero-with-form-content';

  if (title) content.appendChild(title);
  if (description) content.appendChild(description);
  if (subText) content.appendChild(subText);
  if (zipInput) content.appendChild(zipInput);
  if (locationLink) content.appendChild(locationLink);
  if (button) content.appendChild(button);

  container.appendChild(content);
  block.textContent = '';
  block.appendChild(container);
}
