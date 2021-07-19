import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { QuizProvider } from "./context/quiz-context";
import { ToastProvider } from "./context/toast-context";
import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "./firebase.config";
import App from "./App";
import "./index.css";
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <QuizProvider>
        <ToastProvider>
          <Router>
            <App />
          </Router>
        </ToastProvider>
      </QuizProvider>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
