import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageCounter, setPageCounter] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post('http://localhost:3001/api/chat', {
        message: input,
      });
      setResponse(data.response);
      setPageCounter(data.pageCounter);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error occurred while fetching response');
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Postsea Chat</h1>
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
        <p>Number of visits is = {pageCounter}</p>
      </form>
      {response && (
        <div style={{ marginTop: '20px' }}>
          <h3>Response:</h3>
          <p>{response}</p>
          <p>Number of visits is = {pageCounter}</p>
        </div>
      )}
      {pageCounter && (
        <div style={{ marginTop: '20px' }}>
          <h4>Page Counter:</h4>
          <p>{pageCounter}</p>
        </div>
      )}
    </div>
  );
}

export default App;
