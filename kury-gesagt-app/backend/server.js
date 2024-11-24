// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(bodyParser.json());

const openai = new OpenAIApi(
  new Configuration({
    apiKey: '<YOUR_OPENAI_API_KEY>',
  })
);

app.post('/ask', async (req, res) => {
  const { question } = req.body;

  try {
    // Generate text answer
    const textResponse = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: question }],
    });

    const text = textResponse.data.choices[0].message.content;

    // Generate image
    const imageResponse = await openai.createImage({
      prompt: question,
      n: 1,
      size: '256x256',
    });

    const imageUrl = imageResponse.data.data[0].url;

    res.json({ text, image: imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating response');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
