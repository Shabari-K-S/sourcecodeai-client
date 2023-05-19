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
      "message": "Warm greetings! I am thrilled to introduce myself as your AI assistant, created by Shabari and integrated with the power of Bing. My mission is to serve as your dependable source of information, your trusted problem-solving companion, and your knowledgeable guide. With the combined expertise of Shabari and the vast resources of Bing, I am equipped to assist you with a wide range of topics. Whether you require assistance with intricate challenges, seek guidance on specific subjects, or simply desire an enjoyable conversation, I am here to cater to your needs. Don't hesitate to ask me anything that comes to mind, as I am committed to providing you with comprehensive and valuable responses. Your satisfaction is my utmost priority!"
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
                src="https://img.icons8.com/3d-fluency/94/chatbot.png" 
                alt="chatbot"
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
