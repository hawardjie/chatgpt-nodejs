const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const redisClient = require('./redis');
require('dotenv').config();

const app = express();
const port = 3001;

redisClient.set('visits', 0);

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // Increment the page counter in Redis
    let pageCounter = await redisClient.incr('page_counter');

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    res.json({
      response: completion.choices[0].message.content,
      pageCounter,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
