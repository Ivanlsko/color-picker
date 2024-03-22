import puppeteer from 'puppeteer';
import fs from 'fs';
import axios from 'axios';

(async () => {
  const browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();

  await page.goto(window.location.origin);

  await page.screenshot({ path: 'screenshot.png' });

  await browser.close();

  const api_key = 'doplnit';

  const imageBuffer = fs.readFileSync('screenshot.png');

  const base64Image = Buffer.from(imageBuffer).toString('base64');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${api_key}`,
  };

  const payload = {
    model: 'gpt-4-vision-preview',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Describe this image. Tell me a main color from the image and convert it into a HEX code. Output just the HEX code and no other words.',
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`,
            },
          },
        ],
      },
    ],
    max_tokens: 300,
  };

  axios
    .post('https://api.openai.com/v1/chat/completions', payload, { headers })
    .then((response) => {
      const hex = response.data.choices[0].message.content;
      console.log(hex);
      return hex;
    })
    .catch((error) => {
      console.error(error);
    });
})();
