import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import { Home } from './pages/Home';
import { QuizCategories } from './pages/QuizCategories';
import { PlayQuizSet } from './pages/PlayQuizSet';
import { QuizStarter } from './pages/QuizStarter';
import { QuizBuzzNav } from './components/QuizBuzzNav';

export const App = () => {
  return (
    <div className="flex flex--column align-items--c">
      <QuizBuzzNav />
      <div className="quiz-app__body p--lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz-categories" element={<QuizCategories />} />
          {/* <Route path="/quiz/:categoryId" element={<QuizDifficulties />} /> */}
          <Route
            path="/quiz/:categoryId/:quizSetId/:questionNumber"
            element={<PlayQuizSet />}
          />
          <Route
            path="/quiz/:categoryId/:quizSetId/quiz-starter"
            element={<QuizStarter />}
          />
          <Route path="/user-score" element={<>User Score Page</>} />
          <Route path="*" element={<>Route Not found</>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
