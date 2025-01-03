export default function decorate(block) {
  const container = document.createElement('div');
  container.className = 'newsletter-container';

  const title = block.querySelector('h2');
  const button = block.querySelector('a');

  if (title) container.appendChild(title);
  if (button) {
    button.className = 'button';
    container.appendChild(button);
  }

  block.textContent = '';
  block.appendChild(container);
}
