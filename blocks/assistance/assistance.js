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

  container.appendChild(header);
  container.appendChild(content);

  block.textContent = '';
  block.appendChild(container);
}
