export default function decorate(block) {
  const container = document.createElement('div');
  container.className = 'news-letter-container';

  const title = block.querySelector('h2');
  const button = block.querySelector('a');

  const innerContainer = document.createElement('div');
  innerContainer.className = 'news-letter-inner';

  if (title) innerContainer.appendChild(title);
  if (button) {
    button.className = 'button';
    innerContainer.appendChild(button);
  }

  container.appendChild(innerContainer);
  block.textContent = '';
  block.appendChild(container);
}
