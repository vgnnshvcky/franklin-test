export default function decorate(block) {
  // Create the container for the hero block
  const container = document.createElement('div');
  container.className = 'hero-container';

  // Extract content from the block
  const picture = block.querySelector('picture');
  const heading = block.querySelector('h1, h2');
  const description = block.querySelector('p');
  const button = block.querySelector('a');
  const form = block.querySelector('form');

  // Add image to the hero container
  if (picture) {
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'hero-image';
    imageWrapper.appendChild(picture);
    container.appendChild(imageWrapper);
  }

  // Add text content (heading, description, etc.)
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'hero-content';

  if (heading) contentWrapper.appendChild(heading);
  if (description) contentWrapper.appendChild(description);
  if (button) {
    button.className = 'hero-button';
    contentWrapper.appendChild(button);
  }
  if (form) contentWrapper.appendChild(form);

  container.appendChild(contentWrapper);

  // Replace the block content with the new hero structure
  block.textContent = '';
  block.appendChild(container);
}

