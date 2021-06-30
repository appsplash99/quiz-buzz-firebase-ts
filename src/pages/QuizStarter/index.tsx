import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useCountdown } from '../../hooks/useCountdown';

export const QuizStarter = () => {
  const { categoryId, quizSetId } = useParams();
  let navigate = useNavigate();

  const quizStartingIn = useCountdown(2);

  /** AT ANY COST DO NOT CHANGE THE 0 IN ROUTE
   * ELSE, ALL LOGIC IN PlayQuizSet
   * WOULD NEED TO BE REFACTORED
   */
  if (quizStartingIn === 0) {
    navigate(`/quiz/${categoryId}/${quizSetId}/${0}`);
  }

  return (
    <div className="flex flex--column justify-content--c align-items--c gap--sm">
      <div className="text--xxxl">Quiz Staring in...</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          fontSize: '5rem',
          backgroundColor: 'var(--info)',
          color: 'var(--light)',
          height: '12rem',
          width: '12rem',
          margin: '5vh 0',
          fontWeight: 600,
        }}>
        {quizStartingIn}
      </div>
      <div className="text--xxxl">Seconds</div>
    </div>
  );
};
