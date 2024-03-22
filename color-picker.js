import OpenAI from 'openai';

//doplnit api key
const openai = new OpenAI({ apiKey: '' });

export async function main() {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-vision-preview',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: 'Analyze this image and give me a hex code of the main color. Return the hex code only.' },
          {
            type: 'image_url',
            image_url: {
              url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/NASA_website_homepage.jpg/640px-NASA_website_homepage.jpg',
            },
          },
        ],
      },
    ],
  });
  return response.choices[0].message.content;
}
