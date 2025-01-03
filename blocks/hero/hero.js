export default function decorate(block) {
  // Create the container for the hero block
  const container = document.createElement('div');
  container.className = 'hero-container';

  // Extract elements from the block
  const picture = block.querySelector('picture');
  const h1 = block.querySelector('h1');
  const h2 = block.querySelector('h2');
  const button = block.querySelector('a');

  // Create the left section for the image
  if (picture) {
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'hero-image';
    imageWrapper.appendChild(picture);
    container.appendChild(imageWrapper);
  }

  // Create the right section for text and button
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'hero-content';

  if (h1) contentWrapper.appendChild(h1);
  if (h2) contentWrapper.appendChild(h2);
  if (button) {
    button.classList.add('hero-button');
    contentWrapper.appendChild(button);
  }

  container.appendChild(contentWrapper);

  // Replace the block content with the new hero structure
  block.textContent = '';
  block.appendChild(container);
}
