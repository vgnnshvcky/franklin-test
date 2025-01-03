export default function decorate(block) {
  // Create main container
  const container = document.createElement('div');
  container.className = 'footer-links-container';

  // Create left and right columns
  const leftColumn = document.createElement('div');
  leftColumn.className = 'footer-links-left';

  const rightColumn = document.createElement('div');
  rightColumn.className = 'footer-links-right';

  // Process rows in the block
  Array.from(block.children).forEach((row) => {
    const columns = Array.from(row.children);

    // Left column: Links
    if (columns[0]) {
      const link = document.createElement('a');
      link.textContent = columns[0].textContent.trim();
      link.href = '#'; // Placeholder, can be replaced with actual URLs in Google Doc
      link.className = 'footer-link';
      leftColumn.appendChild(link);
    }

    // Right column: Details
    if (columns[1]) {
      const detail = document.createElement('p');
      detail.textContent = columns[1].textContent.trim();
      detail.className = 'footer-detail';
      rightColumn.appendChild(detail);
    }
  });

  // Append columns to the container
  container.appendChild(leftColumn);
  container.appendChild(rightColumn);

  // Replace block content with the new structure
  block.textContent = '';
  block.appendChild(container);
}
