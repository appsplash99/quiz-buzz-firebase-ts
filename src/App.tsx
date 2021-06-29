import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button
            type="button"
            onClick={() => setCount((count) => count + 1)}
            className="bg-pink-50 text-black px-4">
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer">
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer">
            Vite Docs
          </a>
        </p>
        <div className="bg-blue-400 text-white p-20 ">With Tailwind CSS</div>
        <Routes>
          <Route path="/" element={<>Cool</>} />
          <Route path="/wish" element={<>Wish</>} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
