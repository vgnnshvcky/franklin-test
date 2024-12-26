 // Code generated via "Slingshot" 
import { buildBlock } from '../../scripts/aem.js';

async function fetchContentFromGoogleDoc(docUrl) {
  const response = await fetch(docUrl);
  if (response.ok) {
    const data = await response.json();
    return data.content; // Adjust based on actual JSON structure
  }
  return '';
}

async function createVaccineFinder() {
  const content = await fetchContentFromGoogleDoc('https://your-google-doc-url');

  const blockContent = [
    [
      `<h2>${content.title}</h2>
      <p>${content.description}</p>
      <p>${content.note}</p>`
    ],
    [
      `<form>
        <label for="zipCode">Enter your zip code</label>
        <input type="text" id="zipCode" placeholder="ex: 12345">
        <div>
          <input type="checkbox" id="useLocation">
          <label for="useLocation">Use current location</label>
        </div>
        <button type="submit">Find a Vaccine</button>
      </form>`
    ]
  ];

  const vaccineFinderBlock = buildBlock('vaccine-finder', blockContent);
  document.body.appendChild(vaccineFinderBlock);
}

createVaccineFinder();
