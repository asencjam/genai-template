import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';
import {useEffect, useState, useRef} from 'react';
import {sendMsgToOpenAI} from './server';

function App() {

  const msgEnd = useRef(null);

  const [input, setInput] = useState("");  
  const [messages, setMessages] = useState([
    {
      text: 'Hi, I am OpenAI! How can I help?', 
      isBot: true, 
    }
  ]);

  const handleEnter = async (e) => {
    if(e.key === 'Enter') await handleSend();
  }

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);
  
  const handleSend = async () => {
    const text = input;
    setInput('');
    setMessages([
      ...messages, 
      {text, isBot: false}
    ]);
    const res = await sendMsgToOpenAI(text);
    setMessages([
      ...messages, 
      {text, isBot: false},
      {text: res, isBot: true}
    ])
  }

  const handleQuery = async (e) => {
    
    const text = e.target.value;
    setMessages([
      ...messages, 
      {text, isBot: false}
    ]);
    const res = await sendMsgToOpenAI(text);
    setMessages([
      ...messages, 
      {text, isBot: false},
      {text: res, isBot: true}
    ])
  }
  
  return (
    <div className="App">
      <div className='sidebar'>
        <div className='upperSide'>
          <div className="upperSideTop">
            <img src={gptLogo} alt="logo" className="logo" /><span className="brand">Your GenAI Idea</span>
          </div>
          <button className="midBtn" onClick={() => {window.location.reload()}}><img src={addBtn} alt="" className="addBtn" />New Chat</button>
          <div className="upperSideBottom">
            <button className="query" onClick={handleQuery} value={"Provide a test automation out of a swagger file"}><img src={msgIcon} alt="query" />Provide a test automation out of a swagger file</button>
            <button className="query" onClick={handleQuery} value={"How to use this OpenAI template?"}><img src={msgIcon} alt="query"/>How to use this OpenAI template?</button>
          </div>
        </div>
        <div className='lowerSide'>
          <div className="listItems"><img src={home} alt="home" className="listItemsImg" />Home</div>
          <div className="listItems"><img src={saved} alt="saved" className="listItemsImg" />Saved</div>
          <div className="listItems"><img src={rocket} alt="upgrade" className="listItemsImg" />Upgradeto PRO</div>
        </div>
      </div>
      <div className='main'>
        <div className="chats">
          {messages.map((message, i) => 
            <div key={i} className={message.isBot? "chat bot" : "chat"}>
              <img className='chatImg' src={message.isBot? gptImgLogo : userIcon} alt="" /><p className="txt">{message.text}</p>
            </div>
          )}
          <div ref={msgEnd}/>
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input type="text" placeholder='Send a message' value={input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}}/><button className="send" onClick={handleSend}><img src={sendBtn} alt="Send" /></button>
          </div>
          <p>ChatGPT may produce inaccurate information about people, places or facts. OpenAI version v</p>
        </div>
      </div>
    </div>
  );
}

export default App;
