import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post('http://localhost:3001/api/chat', {
        message: input,
      });
      setResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error occurred while fetching response');
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>OpenAI Chat</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Type your message...'
          style={{ width: '300px', marginRight: '10px' }}
        />
        <button type='submit' disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
      {response && (
        <div style={{ marginTop: '20px' }}>
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
