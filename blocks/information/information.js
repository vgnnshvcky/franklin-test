 // Code generated via "Slingshot" 
export default function decorate(block) {
  const container = document.createElement('div');
  container.className = 'information-container';

  const title = block.querySelector('h2');
  const content = block.querySelector('.row:last-child');

  if (title) container.appendChild(title);
  if (content) container.appendChild(content);

  block.textContent = '';
  block.appendChild(container);
}

