 
export default function decorate(block) {
    const container = document.createElement('div');
    container.className = 'information-container';
  
    const title = block.querySelector('h2');
    if (title) {
      const head = document.createElement('div');
      head.className="information-head";
      head.appendChild(title);
      head.innerHTML+='<button id="expandIcon"><svg xmlns="http://www.w3.org/2000/svg"><path id="minus" d="M0 3.05515V0.9375H12V3.05515H0Z" fill="current"></path><path id="plus" fill-rule="evenodd" clip-rule="evenodd" d="M7.05469 0H4.93704V4.93945H0V7.0571H4.93704V12H7.05469V7.0571H12V4.93945H7.05469V0Z" fill="current"></path></svg></button>'
      container.appendChild(head);
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
    block.setAttribute("data-state","collapsed");

    setTimeout(() => {
      setBlockPosition(block);
      window.addEventListener("resize",()=>setBlockPosition(block))
      document.getElementById('expandIcon').addEventListener('click',handleClick);
    }, 100);

    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].boundingClientRect.y > 0) {
          const intersected = entries.find((entry) => entry.isIntersecting);
          if(intersected){
            block.style.position="static";
            block.style.height="unset";
            block.setAttribute("data-state","partial");
          }else{
            block.style.position="";
            block.style.height="";
            block.setAttribute("data-state","collapsed");
          }
        }
      },
      { threshold: 1.0,rootMargin:"10px" },
    );

    const blocks = Array.from(document.querySelectorAll('.block'));
    const infoContainerIndex = blocks.findIndex((section) => section.classList.contains('information'));
    const prevBlock = blocks[infoContainerIndex - 1];

    const statusObserver = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-block-status') {
          if (block.getAttribute('data-block-status') === 'loaded') {
            observer.observe(prevBlock, { attributes: true });
            statusObserver.disconnect(); // stop observing once the section is loaded
          }
        }
      });
    });
    statusObserver.observe(block, { attributes: true});
  }

  function handleClick(ev){
    console.log(ev.currentTarget);
    const block = document.querySelector('.information.block');
    const state= block.getAttribute('data-state');
    if(state==="collapsed"){
      block.style.height = '100%';
      document.body.style.overflow='hidden';
      block.setAttribute("data-state","expanded");
    }else{
      block.style.height = '';
      document.body.style.overflow='';
      block.setAttribute("data-state","collapsed");
    }
    
  }

  function setBlockPosition(block){  
    block.style.width=block.parentElement.clientWidth + "px"
    block.style.left=Math.max(block.parentElement.offsetLeft,block.parentElement.clientLeft,block.parentElement.scrollLeft) + "px";
  }
