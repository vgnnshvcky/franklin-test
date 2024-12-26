import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const container = document.createElement('div');
  container.className = 'test-tile-container';

  [...block.children].forEach((row) => {
    const card = document.createElement('div');
    card.className = 'test-tile-card';

    const title = row.children[0].textContent;
    const description = row.children[1].textContent;
    const buttonText = row.children[2].textContent;
    const img = row.querySelector('img');

    const cardContent = document.createElement('div');
    cardContent.className = 'test-tile-card-content';

    const cardTitle = document.createElement('h2');
    cardTitle.textContent = title;
    cardContent.appendChild(cardTitle);

    const cardDescription = document.createElement('p');
    cardDescription.textContent = description;
    cardContent.appendChild(cardDescription);

    const button = document.createElement('button');
    button.textContent = buttonText;
    cardContent.appendChild(button);

    card.appendChild(cardContent);

    if (img) {
      const imgDiv = document.createElement('div');
      imgDiv.className = 'test-tile-card-image';
      imgDiv.style.backgroundImage = `url(${img.src})`;
      card.appendChild(imgDiv);
    }

    container.appendChild(card);
  });

  block.textContent = '';
  block.append(container);
}
