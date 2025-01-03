import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Clear existing block content
  block.textContent = '';

  // Create the main container
  const container = document.createElement('div');
  container.className = 'tile-card-container';

  // Iterate over block children to build cards
  Array.from(block.children).forEach((row) => {
    const card = document.createElement('div');
    card.className = 'tile-card';

    // Extract the elements from the row
    const title = row.querySelector('h3')?.textContent || '';
    const description = row.querySelector('p')?.textContent || '';
    const buttonText = row.querySelector('button')?.textContent || '';
    const image = row.querySelector('img');

    // Create the card content
    const cardContent = `
      <h3 class="tile-card-title">${title}</h3>
      <p class="tile-card-description">${description}</p>
      <button class="tile-card-button">${buttonText}</button>
    `;

    card.innerHTML = cardContent;

    // Add the optimized image
    if (image) {
      const imageContainer = document.createElement('div');
      imageContainer.className = 'tile-card-image';

      const optimizedPicture = createOptimizedPicture(image.src, image.alt, false, [
        { width: '750' }, // Set desired responsive widths
      ]);

      imageContainer.appendChild(optimizedPicture);

      // Add actor label
      const actorLabel = document.createElement('span');
      actorLabel.className = 'actor-label';
      actorLabel.textContent = 'Actor Portrayal';
      imageContainer.appendChild(actorLabel);

      card.appendChild(imageContainer);
    }

    // Append the card to the container
    container.appendChild(card);
  });

  // Append the container back to the block
  block.appendChild(container);
}
