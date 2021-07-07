import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { QuizProvider } from './context/quiz-context/quiz-context';
import { FirebaseAppProvider } from 'reactfire';
import { firebaseConfig } from './firebase.config';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <QuizProvider>
        <Router>
          <App />
        </Router>
      </QuizProvider>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
