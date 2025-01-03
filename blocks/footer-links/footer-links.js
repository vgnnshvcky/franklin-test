export default function decorate(block) {
  // Create a container for the transformed content
  const container = document.createElement('div');
  container.className = 'footer-links-container';

  // Create left and right columns
  const leftColumn = document.createElement('div');
  leftColumn.className = 'footer-links-left';

  const rightColumn = document.createElement('div');
  rightColumn.className = 'footer-links-right';

  // Iterate over the rows in the block
  Array.from(block.children).forEach((row) => {
    const [linkCell, detailCell] = Array.from(row.children);

    // Process the link from the first cell
    if (linkCell) {
      const linkText = linkCell.querySelector('p')?.textContent.trim();
      if (linkText) {
        const link = document.createElement('a');
        link.textContent = linkText;
        link.href = '#'; // Placeholder, replace with actual links
        link.className = 'footer-link';
        leftColumn.appendChild(link);
      }
    }

    // Process the detail from the second cell
    if (detailCell) {
      const detailText = detailCell.querySelector('p')?.textContent.trim();
      if (detailText) {
        const detail = document.createElement('p');
        detail.textContent = detailText;
        detail.className = 'footer-detail';
        rightColumn.appendChild(detail);
      }
    }
  });

  // Append the left and right columns to the container
  container.appendChild(leftColumn);
  container.appendChild(rightColumn);

  // Replace block content with the transformed structure
  block.textContent = '';
  block.appendChild(container);
}
