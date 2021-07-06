import React from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import { Home } from './pages/Home';
// import { QuizCategories } from './pages/QuizCategories';
import { QuizCategories } from './pages/QuizCategories';
import { PlayQuizSet } from './pages/PlayQuizSet';
import { QuizStarter } from './pages/QuizStarter';
import { QuizBuzzNav } from './components/QuizBuzzNav';
import { DropDown } from './components/Dropdown';

export const App = () => {
  /** TODO: temporary */
  const [showDropDown, setShowDropDown] = React.useState<boolean>(false);

  return (
    <div className="flex flex-col items-center">
      <QuizBuzzNav />
      <div className="quiz-app__body p--lg">
        <Routes>
          <Route path="/" element={<Home />} />
          {/** TODO: temporary */}
          <Route
            path="/dropdown"
            element={
              <DropDown
                showDropDown={showDropDown}
                handleShowDropDown={() => setShowDropDown(!showDropDown)}
              />
            }
          />
          {/* <Route path="/quiz-categories" element={<QuizCategories />} /> */}
          <Route path="/quiz-categories" element={<QuizCategories />} />
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
