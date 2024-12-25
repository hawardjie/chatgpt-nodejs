import express from 'express';
import redis from 'redis';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env variable(s), such as OPENAI_API_KEY, from the .env file
dotenv.config();

const app = express();

// Configure __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(express.json());
app.use(express.static('public'));

const client = redis.createClient({
  host: 'redis-server',
  port: 6379,
});
client.set('visits', 0);

// Routes
app.post('/ask', async (req, res) => {
  try {
    console.log('I am here');
    const { query } = req.body;
    const gptResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.',
        },
        {
          role: 'user',
          content: query,
        },
      ],
    });

    res.json({ response: gptResponse.data.choices[0].text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/visits', (req, res) => {
  client.get('visits', (err, visits) => {
    res.send('Number of visits is ' + visits);
    client.set('visits', parseInt(visits) + 1);
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
