import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import './normalize.css';
import MessageWithCode from './MessageWithCode';
import './test.css'; // Import the CSS file for styling

function App() {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([
    {
      "user" : "me",
      "message": "Who are you?"
    },
    {
      "user" : "gpt",
      "message": "Warm greetings! I am thrilled to introduce myself as your AI assistant, created by Shabari and integrated with the power of Bing. My mission is to serve as your dependable source of information, your trusted problem-solving companion, and your knowledgeable guide. With the combined expertise of Shabari and the vast resources of Bing, I am equipped to assist you with a wide range of topics. Whether you require assistance with intricate challenges, seek guidance on specific subjects, or simply desire an enjoyable conversation, I am here to cater to your needs. Don't hesitate to ask me anything that comes to mind, as I am committed to providing you with comprehensive and valuable responses. Your satisfaction is my utmost priority!"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatFormRef = useRef(null);
  const chatLogRef = useRef(null);

  // clear chat log
  function clearChatLog() {
    setChatLog([
      {
        "user" : "me",
        "message": "Who are you?"
      },
      {
        "user" : "gpt",
        "message": "Warm greetings! I am thrilled to introduce myself as your AI assistant, created by Shabari and integrated with the power of Bing. My mission is to serve as your dependable source of information, your trusted problem-solving companion, and your knowledgeable guide. With the combined expertise of Shabari and the vast resources of Bing, I am equipped to assist you with a wide range of topics. Whether you require assistance with intricate challenges, seek guidance on specific subjects, or simply desire an enjoyable conversation, I am here to cater to your needs. Don't hesitate to ask me anything that comes to mind, as I am committed to providing you with comprehensive and valuable responses. Your satisfaction is my utmost priority!"
      }
    ]);
  }
  
  async function handleSubmit(e) {
    e.preventDefault();

    if (input.trim() === '') {
      return; // Skip if input is empty or only whitespace
    }

    const chatLogNew = [...chatLog, { user: 'me', message: input }];
    setChatLog(chatLogNew);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`https://sourcecode-ai.onrender.com/api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_input: input,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setChatLog([...chatLogNew, { user: 'gpt', message: data.response }]);
      } else {
        console.error('ResponseError:', response.status);
      }
    } catch (error) {
      console.error('CodeError:', error);
    } finally {
        setIsLoading(false);
        if (chatFormRef.current) {
          chatFormRef.current.querySelector('.chat-input-textarea').focus();
        }
    }
  }

  function scrollChatLog() {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button" onClick={clearChatLog}>
          <span>+</span>
          New Chat
        </div>
      </aside>
      <section className="chatarea">
        <div className="chat-log" ref={chatLogRef}>
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
        <form className="chat-form" onSubmit={handleSubmit} ref={chatFormRef}>
          <div className="chat-input-holder">
            <textarea
              className="chat-input-textarea"
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
            <div className="ani">{isLoading && <LoadingAnimation />}</div>
          </div>
        </form>
      </section>
    </div>
  );
}

const LoadingAnimation = () => {
  return <div className="loading-animation"><span></span><span></span><span></span></div>;
};

const ChatMessage = ({ message }) => {
  return (
    <div className="chat-message-container">
      <div className={`chat-message ${message.user === 'gpt' && 'chatbot'}`}>
        <div className="chat-message-center">
          <div className={`avatar ${message.user === 'gpt' && 'chatbot'}`}>
            {message.user === 'gpt' && (
              <img
                width="40"
                height="40"
                src="https://img.icons8.com/3d-fluency/94/chatbot.png"
                alt="artificial-intelligence"
              />
            )}
            {message.user === 'me' && (
              <img
                width="40"
                height="40"
                src="https://img.icons8.com/bubbles/50/user.png"
                alt="user"
              />
            )}
          </div>
          <div className="chat-message-content">
            <MessageWithCode message={message.message} />
          </div>
        </div>
      </div>
    </div>
  );
};




export default App;
