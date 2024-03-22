import OpenAI from 'openai';

//doplnit api key
const openai = new OpenAI({ apiKey: '' });

export async function main(imageUrl) {
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
              url: imageUrl,
            },
          },
        ],
      },
    ],
  });
  return response.choices[0].message.content;
}
