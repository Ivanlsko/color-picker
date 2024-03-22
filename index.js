import https from 'https';
import fs from 'fs';
import axios from 'axios';

https.get(
  'https://api.apiflash.com/v1/urltoimage?' +
    new URLSearchParams({
      access_key: '',
      url: '',
    }).toString(),
  (response) => {
    const fileStream = fs.createWriteStream('screenshot.jpeg');
    response.pipe(fileStream);
    fileStream.on('finish', () => {
      const api_key = '';

      const imageBuffer = fs.readFileSync('screenshot.jpeg');

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
    });
  }
);
