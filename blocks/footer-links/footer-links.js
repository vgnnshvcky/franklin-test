export default function decorate(block) {
  // Create main container
  const container = document.createElement('div');
  container.className = 'footer-links-container';

  // Create left and right columns
  const leftColumn = document.createElement('div');
  leftColumn.className = 'footer-links-left';

  const rightColumn = document.createElement('div');
  rightColumn.className = 'footer-links-right';

  // Iterate over rows in the block
  Array.from(block.children).forEach((row) => {
    const columns = Array.from(row.children);

    // Left column: Extract link text
    if (columns[0]) {
      const linkText = columns[0].querySelector('p')?.textContent.trim();
      if (linkText) {
        const link = document.createElement('a');
        link.textContent = linkText;
        link.href = '#'; // Placeholder URL, replace with actual links if available
        link.className = 'footer-link';
        leftColumn.appendChild(link);
      }
    }

    // Right column: Extract details text
    if (columns[1]) {
      const detailText = columns[1].querySelector('p')?.textContent.trim();
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
