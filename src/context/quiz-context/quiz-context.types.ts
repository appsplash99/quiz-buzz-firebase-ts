import { QuizCategory, QuizSet, QuizCategories } from "./quiz-data.types";
import moment from "moment";

export interface UserOption {
  questionNumber: number;
  option: string;
  isRight: boolean;
}

export interface User {
  playTime: number;
  score: number;
  correctAttempts: number;
  inCorrectAttempts: number;
  totalAttemptedQuestions: number;
  totalUnAttemptedQuestions: number;
  userQuizQuestions: UserOption[];
  quizStartTime: moment.Moment;
  quizFinishTime: moment.Moment;
}

export interface InitialState {
  quizCategories: QuizCategories;
  showStartQuizModal: boolean;
  showQuizDifficultiesModal: boolean;
  selectedQuizCategoryId: string;
  selectedQuizSetId: string;
  currentQuestionNumber: number;
  //
  currentQuizCategory: QuizSet[];
  // currentQuizSet: QuizSet | {};
  user: User;
}

export interface ContextType {
  state: InitialState;
  dispatch: React.Dispatch<any>;
}
