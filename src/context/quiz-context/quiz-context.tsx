import React, { createContext, useContext, useReducer } from 'react';
import { quizCategories } from '../../data/quiz-data';
import { quizReducer } from '../../reducer/quiz-reducer';
import { ContextType, InitialState } from './quiz-context.types';

const initialState: InitialState = {
  // currentQuiz: quizCategories.gk.set1,
  currentQuizCategory: [],
  /**quizCategories -> first item(gk quiz complete object) */
  currentQuizSet: quizCategories[0].quizAllSets[0],
  // currentQuestion: 0,
  user: {
    score: 0,
    correctAttempts: 0,
    inCorrectAttempts: 0,
    totalAttemptedQuestions: 0,
    totalUnAttemptedQuestions: 15,
    userQuizQuestions: [
      /**
       * Array of UserOption Objects
       * {
       *  queNum: 1,
       *  option: 'paris',
       *  isRight: false
       * }
       *
       */
    ],
  },
};

/**
 * context starts here
 */
const QuizContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => null,
});

export const QuizProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
