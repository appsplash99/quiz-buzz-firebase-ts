import {
  InitialState,
  UserOption,
} from '../context/quiz-context/quiz-context.types';
import { QuizCategory } from '../data/quiz-data.types';

export type ACTIONTYPE =
  | { type: 'LOAD_QUIZ_CATEGORIES_DATA'; payload: QuizCategory[] }
  | { type: 'SET_CURRENT_QUIZSET'; payload: { desiredQuizSetId: string } }
  | { type: 'SET_QUIZ_CATEGORY_SETS'; payload: [] }
  | { type: 'INCREMENT_USER_SCORE'; payload: number }
  | { type: 'DECREMENT_USER_SCORE'; payload: number }
  | { type: 'CORRECT_ANSWER'; payload: UserOption }
  | { type: 'INCORRECT_ANSWER'; payload: UserOption };

export const quizReducer = (
  prevState: InitialState,
  action: ACTIONTYPE
): InitialState => {
  switch (action.type) {
    case 'SET_QUIZ_CATEGORY_SETS':
      console.log('Mounted QUIZ CATEGORY Successfully');
      return {
        ...prevState,
        currentQuizCategory: prevState.currentQuizCategory.concat(
          action.payload
        ),
      };

    // case 'SET_CURRENT_QUIZSET':
    //   console.log('Mounted QUIZ SET from category array Successfully');
    //   return {
    //     ...prevState,
    //      /**NEED TO FIND QUIZSET BY ID, and RETURN HERE */
    //     currentQuizSet: prevState.currentQuizCategory.filter(
    //       (quizSetObj) =>
    //         quizSetObj.quizSetId === action.payload.desiredQuizSetId
    //     ),
    //   };

    case 'CORRECT_ANSWER':
      console.log('correct answer');
      console.log(action.payload);
      return {
        ...prevState,
        user: {
          ...prevState.user,
          score:
            prevState.user.score +
            prevState.currentQuizSet.rules.correctAnswerPoints,
          correctAttempts: prevState.user.correctAttempts + 1,
          totalAttemptedQuestions: prevState.user.totalAttemptedQuestions + 1,
          totalUnAttemptedQuestions:
            prevState.user.totalUnAttemptedQuestions - 1,
          /**Passing question object for score board */
          userQuizQuestions: prevState.user.userQuizQuestions.concat({
            ...action.payload,
          }),
        },
      };

    case 'INCORRECT_ANSWER':
      console.log('in-correct answer');
      return {
        ...prevState,
        user: {
          ...prevState.user,
          score:
            prevState.user.score +
            Number(prevState.currentQuizSet.rules.inCorrectAnswerPoints),
          inCorrectAttempts: prevState.user.inCorrectAttempts + 1,
          totalAttemptedQuestions: prevState.user.totalAttemptedQuestions + 1,
          totalUnAttemptedQuestions:
            prevState.user.totalUnAttemptedQuestions - 1,
          /**Passing question object for score board */
          userQuizQuestions: prevState.user.userQuizQuestions.concat({
            ...action.payload,
          }),
        },
      };

    default:
      // break;
      return prevState;
  }
};
