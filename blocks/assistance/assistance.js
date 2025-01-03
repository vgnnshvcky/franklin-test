export default function decorate(block) {
  const container = document.createElement('div');
  container.className = 'assistance-container';

  const header = block.querySelector('h2');
  const content = document.createElement('div');
  content.className = 'assistance-content';

  [...block.children].forEach((child) => {
    if (child !== header) {
      content.appendChild(child);
    }
  });

  const innerContainer = document.createElement('div');
  innerContainer.className = 'assistance-inner';
  innerContainer.appendChild(header);
  innerContainer.appendChild(content);

  container.appendChild(innerContainer);

  block.textContent = '';
  block.appendChild(container);
}
