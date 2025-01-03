 
export default function decorate(block) {
    const container = document.createElement('div');
    container.className = 'information-container';
  
    const title = block.querySelector('h2');
    if (title) {
      container.appendChild(title);
    }
  
    // Create content wrapper for two-column layout
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'content-wrapper';
  
    // Filter children to include only <div> elements
    const divChildren = Array.from(block.children).filter((child) => child.tagName === 'DIV');
  
    // Treat the first <div> as the left column
    if (divChildren[1]) {
      const leftColumn = document.createElement('div');
      leftColumn.className = 'left-column';
      leftColumn.appendChild(divChildren[1]);
      contentWrapper.appendChild(leftColumn);
    }
  
    // Treat the second <div> as the right column
    if (divChildren[2]) {
      const rightColumn = document.createElement('div');
      rightColumn.className = 'right-column';
      rightColumn.appendChild(divChildren[2]);
      contentWrapper.appendChild(rightColumn);
    }
  
    // Append content wrapper to the main container
    container.appendChild(contentWrapper);
  
    // Append the main container back to the block
    block.appendChild(container);
  }
  
