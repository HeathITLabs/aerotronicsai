import React, { useState } from 'react';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input) {
      setMessages([...messages, { sender: 'User', text: input }]);
      setInput('');
     
    }
  };

  return (
    <div>
      <div style={{ height: '300px', overflow: 'auto', border: '1px solid black' }}>
        {messages.map((message, index) => (
          <p key={index}><b>{message.sender}:</b> {message.text}</p>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' ? handleSend() : null}
          style={{ flex: 1, marginRight: '10px',border: '1px solid black' }} // Add some margin to the right of the input
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;