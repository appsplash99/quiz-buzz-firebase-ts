import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useCountdown } from '../hooks/useCountdown';

export const QuizStarter = () => {
  const { categoryId, quizSetId } = useParams();
  let navigate = useNavigate();

  const quizStartingIn = useCountdown(5);

  /** AT ANY COST DO NOT CHANGE THE 0 IN ROUTE
   * ELSE, ALL LOGIC IN PlayQuizSet
   * WOULD NEED TO BE REFACTORED
   */
  if (quizStartingIn === 0) {
    navigate(`/quiz/${categoryId}/${quizSetId}/${0}`);
  }

  /** TODO: DISPLAY
   * 1. QUIZ CATEGGORY IMAGE AND
   * 2. QUIZ SET DIFFICULTY LEVEL */

  return (
    <div className="flex flex-col flex-wrap justify-center items-center rounded-3xl bg-gray-200">
      <div className="text-3xl bg-black text-white p-3 rounded-t-2xl">
        Quiz Staring in...
      </div>
      <div className="flex flex-col items-center bg-red-600 text-white w-full rounded-b-2xl pb-3">
        <p className="font-mono text-8xl bg-red-600 font-bold">
          {quizStartingIn}
        </p>
        <p className="text-3xl">seconds</p>
      </div>
    </div>
  );
};
