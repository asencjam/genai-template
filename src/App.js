import './App.css';

function App() {
  return (
    <div className="App">
      <div className='sidebar'></div>
        <div className='upperSide'>
          <div className="upperSideTop"><img src="" alt="" className="logo" /><span className="brand">Your GenAI Idea</span></div>
          <button className="midBtn"><img src="" alt="" className="addBtn" />New Chat</button>
          <div className="upperSideBottom">
            <button className="query"><img src="" alt="" className="query" />What is Programming?</button>
            <button className="query"><img src="" alt="" className="query" />What is Diet?</button>
          </div>
        </div>
        <div className='lowerSide'></div>
      <div className='main'></div>
    </div>
  );
}

export default App;
