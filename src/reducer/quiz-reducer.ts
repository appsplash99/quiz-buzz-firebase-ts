import { InitialState, UserOption } from "../context/quiz-context/quiz-context.types";
import { Option, QuizCategories, QuizCategory, QuizSet } from "../context/quiz-context/quiz-data.types";

/** TODO: ADD REDUCERS */

export type ACTIONTYPE =
  | { type: "LOAD_QUIZ_CATEGORIES_DATA"; payload: QuizCategory[] }
  | { type: "SET_CURRENT_QUIZSET"; payload: { desiredQuizSetId: string } }
  | { type: "SET_QUIZ_CATEGORY_SETS"; payload: [] }
  | { type: "INCREMENT_USER_SCORE"; payload: number }
  | { type: "DECREMENT_USER_SCORE"; payload: number }
  | { type: "CORRECT_ANSWER"; payload: UserOption }
  | { type: "INCORRECT_ANSWER"; payload: UserOption }
  // NEW REDUCERS
  | { type: "MOUNT_QUIZ_CATEGORIES"; payload: QuizCategories }
  | { type: "TOGGLE_SHOW_START_QUIZ_MODAL"; payload: boolean }
  | { type: "TOGGLE_SHOW_QUIZ_DIFFICULTIES_MODAL"; payload: boolean }
  | { type: "SET_SELECTED_QUIZ_CATEGORY_ID"; payload: string }
  | { type: "SET_SELECTED_QUIZ_SET_ID"; payload: string }
  | { type: "INCREMENT_QUESTION_NUMBER" }
  | { type: "INCREMENT_SECONDS_NUMBER" }
  | { type: "GET_QUIZ_STARTING_TIME"; payload: moment.Moment }
  | { type: "GET_QUIZ_FINISH_TIME"; payload: moment.Moment }
  | { type: "SET_GAME_PLAY_TIME"; payload: number }
  | { type: "NEW_CORRECT_ANSWER"; payload: any }
  | {
      type: "NEW_INCORRECT_ANSWER";
      payload: {
        desiredQuizSet: QuizSet;
        optionObj: { questionNumber: number; option: string; isRight: boolean; isSelected: true };
      };
    };

export const quizReducer = (prevState: InitialState, action: ACTIONTYPE): InitialState => {
  switch (action.type) {
    case "MOUNT_QUIZ_CATEGORIES":
      console.log("Mounted QUIZ CATEGORIES ARRAY Successfully");
      return { ...prevState, quizCategories: action.payload };

    case "TOGGLE_SHOW_START_QUIZ_MODAL":
      return { ...prevState, showStartQuizModal: action.payload };

    case "TOGGLE_SHOW_QUIZ_DIFFICULTIES_MODAL":
      return { ...prevState, showQuizDifficultiesModal: action.payload };

    case "SET_SELECTED_QUIZ_CATEGORY_ID":
      return { ...prevState, selectedQuizCategoryId: action.payload };

    case "SET_SELECTED_QUIZ_SET_ID":
      return { ...prevState, selectedQuizSetId: action.payload };

    case "INCREMENT_QUESTION_NUMBER":
      return { ...prevState, currentQuestionNumber: prevState.currentQuestionNumber + 1 };

    case "GET_QUIZ_STARTING_TIME":
      return {
        ...prevState,
        user: {
          ...prevState.user,
          quizStartTime: action.payload,
        },
      };

    case "INCREMENT_QUESTION_NUMBER":
      return { ...prevState, currentQuestionNumber: prevState.currentQuestionNumber + 1 };

    case "GET_QUIZ_STARTING_TIME":
      return { ...prevState, user: { ...prevState.user, quizStartTime: action.payload } };

    case "GET_QUIZ_FINISH_TIME":
      return { ...prevState, user: { ...prevState.user, quizFinishTime: action.payload } };

    case "SET_GAME_PLAY_TIME":
      return { ...prevState, user: { ...prevState.user, playTime: action.payload } };

    case "NEW_CORRECT_ANSWER":
      console.log("correct answer");
      console.log(action.payload);
      return {
        ...prevState,
        user: {
          ...prevState.user,
          score: prevState.user.score + Number(action.payload.desiredQuizSet.rules.corretAnswerPoints),
          correctAttempts: prevState.user.correctAttempts + 1,
          totalAttemptedQuestions: prevState.user.totalAttemptedQuestions + 1,
          /**Passing question object for score board */
          userQuizQuestions: prevState.user.userQuizQuestions.concat({
            ...action.payload.optionObj,
          }),
        },
      };

    case "NEW_INCORRECT_ANSWER":
      console.log("Incorrect answer");
      console.log(action.payload);
      return {
        ...prevState,
        user: {
          ...prevState.user,
          score: prevState.user.score + Number(action.payload.desiredQuizSet.rules.inCorrectAnswerPoints),
          inCorrectAttempts: prevState.user.correctAttempts + 1,
          totalAttemptedQuestions: prevState.user.totalAttemptedQuestions + 1,
          // totalUnAttemptedQuestions: prevState.user.totalUnAttemptedQuestions - 1,
          /**Passing question object for score board */
          userQuizQuestions: prevState.user.userQuizQuestions.concat({
            ...action.payload.optionObj,
          }),
        },
      };

    // case "INCREMENT_SECONDS_NUMBER":
    //   return {
    //     ...prevState,
    //     user: {
    //       ...prevState.user,
    //       userTime: prevState.user.userTime + 1,
    //     },
    //   };

    // OLD REDUCERS
    case "SET_QUIZ_CATEGORY_SETS":
      // console.log("Mounted QUIZ CATEGORY Successfully");
      return { ...prevState, currentQuizCategory: action.payload };

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

    case "CORRECT_ANSWER":
      console.log("correct answer");
      console.log(action.payload);
      console.log(prevState.user.userQuizQuestions);
      return {
        ...prevState,
        user: {
          ...prevState.user,
          score: prevState.user.score + prevState.currentQuizSet.rules.correctAnswerPoints,
          correctAttempts: prevState.user.correctAttempts + 1,
          totalAttemptedQuestions: prevState.user.totalAttemptedQuestions + 1,
          totalUnAttemptedQuestions: prevState.user.totalUnAttemptedQuestions - 1,
          /**Passing question object for score board */
          userQuizQuestions: prevState.user.userQuizQuestions.concat({
            ...action.payload,
          }),
        },
      };

    case "INCORRECT_ANSWER":
      console.log("in-correct answer");
      return {
        ...prevState,
        user: {
          ...prevState.user,
          score: prevState.user.score + Number(prevState.currentQuizSet.rules.inCorrectAnswerPoints),
          inCorrectAttempts: prevState.user.inCorrectAttempts + 1,
          totalAttemptedQuestions: prevState.user.totalAttemptedQuestions + 1,
          totalUnAttemptedQuestions: prevState.user.totalUnAttemptedQuestions - 1,
          /**Passing question object for score board */
          userQuizQuestions: prevState.user.userQuizQuestions.concat({
            ...action.payload,
          }),
        },
      };

    default:
      // break;
      console.log("This Dispatch is not present");
      return prevState;
  }
};
