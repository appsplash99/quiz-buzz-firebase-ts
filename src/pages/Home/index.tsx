import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <>
      <div>This is Home Component</div>
      <Link to="/quiz-categories">Quizzes</Link>
    </>
  );
};
