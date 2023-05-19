import React, {useState} from 'react'
import './App.css'
import './normalize.css'
import MessageWithCode from './MessageWithCode';


function App() {

  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      "user" : "me",
      "message": "Who are you?"
    },
    {
      "user" : "gpt",
      "message": "Welcome! I'm an AI assistant developed by Shabari, and my primary goal is to ensure you have the best possible experience. \nI'm equipped with extensive knowledge and advanced capabilities, allowing me to provide you with accurate information, address your inquiries, and offer assistance in various areas. \nFrom tackling intricate problem-solving tasks to providing guidance on specific subjects, I'm here to support you. \nAdditionally, if you're in the mood for a friendly chat,\nI'm more than happy to engage in a conversation with you. \nDon't hesitate to ask me anything you'd like—I'm here to provide you with comprehensive and helpful responses."
    }
  ]);

  //clear chat log

  function clearChatLog() {
    setChatLog([]);
  }


  async function handleSubmit(e) {
    e.preventDefault();
    const chatLogNew = [...chatLog, { user: "me", message: input }];
    await setChatLog([...chatLogNew]);
    await setInput("");
    
    const messages = chatLogNew.map((message) => message.message);
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
        await setChatLog([...chatLogNew, { user: "gpt", message: data.response }]);
      } else {
        console.error("ResponseError:", response.status);
      }
    } catch (error) {
      console.error("CodeError:", error);
    }
  }
  
  
  return (
    <div className='App'>
      <aside className='sidemenu'>
        <div className='side-menu-button' onClick={clearChatLog}>
          <span>+</span>
          New Chat
        </div>
      </aside>
      <section className='chatarea'>
        <div className='chat-log'>
          {
            chatLog.map((message, index) => (
              <ChatMessage key={index} message={message}/>
            ))
          }
        </div>
        <form className='chat-form' onSubmit={handleSubmit}>
          <div className='chat-input-holder'>
            <input className='chat-input-textarea' rows='1' value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your prompt here...."></input>
          </div>
        </form>
      </section>
    </div>
  )
}

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
                src="https://img.icons8.com/color/48/artificial-intelligence.png"
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


export default App
