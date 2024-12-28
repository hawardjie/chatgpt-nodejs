import React, { useState } from 'react';
import axios from 'axios';
import './css/App.css';

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
    <div className='container'>
      <h1>Postsea Chat</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter your query here...'
        className='query'
      />
      <button
        type='button'
        onClick={handleSubmit}
        disabled={loading}
        className='button'
      >
        {loading ? 'Sending...' : 'Send'}
      </button>

      {response && (
        <div className='response'>
          <h3>Response #{pageCounter}</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
