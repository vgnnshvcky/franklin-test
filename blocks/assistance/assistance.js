export default function decorate(block) {
  const container = document.createElement('div');
  container.className = 'assistance-container';

  const title = block.querySelector('h2');
  const description = block.querySelector('p');
  const phone = block.querySelector('strong');
  const button = block.querySelector('a');

  if (title) container.appendChild(title);
  if (description) container.appendChild(description);
  if (phone) container.appendChild(phone);
  if (button) {
    button.className = 'button';
    container.appendChild(button);
  }

  block.textContent = '';
  block.appendChild(container);
}
