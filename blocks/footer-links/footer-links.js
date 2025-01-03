export default function decorate(block) {
  // Create main container
  const container = document.createElement('div');
  container.className = 'footer-links-container';

  // Create left and right columns
  const leftColumn = document.createElement('div');
  leftColumn.className = 'footer-links-left';

  const rightColumn = document.createElement('div');
  rightColumn.className = 'footer-links-right';

  // Iterate over each row in the block
  Array.from(block.children).forEach((row) => {
    const [leftCell, rightCell] = Array.from(row.children);

    // Extract link text and add to the left column
    if (leftCell) {
      const linkText = leftCell.querySelector('p')?.textContent.trim();
      if (linkText) {
        const link = document.createElement('a');
        link.textContent = linkText;
        link.href = '#'; // Placeholder, replace with actual links
        link.className = 'footer-link';
        leftColumn.appendChild(link);
      }
    }

    // Extract detail text and add to the right column
    if (rightCell) {
      const detailText = rightCell.querySelector('p')?.textContent.trim();
      if (detailText) {
        const detail = document.createElement('p');
        detail.textContent = detailText;
        detail.className = 'footer-detail';
        rightColumn.appendChild(detail);
      }
    }
  });

  // Append columns to the container
  container.appendChild(leftColumn);
  container.appendChild(rightColumn);

  // Replace block content with the new structure
  block.textContent = '';
  block.appendChild(container);
}
