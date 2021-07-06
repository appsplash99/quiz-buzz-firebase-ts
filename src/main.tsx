import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/auth-context/auth-context';
import { QuizProvider } from './context/quiz-context/quiz-context';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <QuizProvider>
        <Router>
          <App />
        </Router>
      </QuizProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
