import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/theme-context/theme-context';
import { QuizProvider } from './context/quiz-context/quiz-context';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <QuizProvider>
      <Router>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Router>
    </QuizProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
