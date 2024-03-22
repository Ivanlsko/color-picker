import { main } from './color-picker.js';

async function getHexCode() {
  const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/NASA_website_homepage.jpg/640px-NASA_website_homepage.jpg';
  const hexCode = await main(imageUrl);
  console.log(hexCode);
}

getHexCode();
