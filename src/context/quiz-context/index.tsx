import React, { createContext, useContext, useReducer } from "react";
import { quizReducer } from "../../reducer/quiz-reducer";
import { ContextType, InitialState } from "./quiz-context.types";
import moment from "moment";

const initialState: InitialState = {
  // new States
  quizCategories: [],
  showStartQuizModal: false,
  showQuizDifficultiesModal: false,
  selectedQuizCategoryId: "",
  selectedQuizSetId: "",
  currentQuestionNumber: 0,

  // OLD STATES
  // MIGHT NEED TO REMOVE SOME
  // currentQuizSet: quizCategories[0].quizAllSets[0],
  // currentQuizSet: {},
  // currentQuiz: quizCategories.gk.set1,
  currentQuizCategory: [],
  /**quizCategories -> first item(gk quiz complete object) */
  // currentQuestion: 0,
  user: {
    playTime: 0,
    score: 0,
    correctAttempts: 0,
    inCorrectAttempts: 0,
    totalAttemptedQuestions: 0,
    totalUnAttemptedQuestions: 15,
    quizStartTime: moment(),
    quizFinishTime: moment(),
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
  return <QuizContext.Provider value={{ state, dispatch }}>{children}</QuizContext.Provider>;
};

export const useQuiz = () => useContext(QuizContext);
