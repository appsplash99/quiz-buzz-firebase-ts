import { QuizCategory, QuizSet } from "../../data/quiz-data.types";

export interface UserOption {
  questionNumber: number;
  option: string;
  isRight: boolean;
}

export interface User {
  score: number;
  correctAttempts: number;
  inCorrectAttempts: number;
  totalAttemptedQuestions: number;
  totalUnAttemptedQuestions: number;
  userQuizQuestions: UserOption[];
}

export interface InitialState {
  currentQuizCategory: QuizSet[];
  currentQuizSet: QuizSet;
  user: User;
}

export interface ContextType {
  state: InitialState;
  dispatch: React.Dispatch<any>;
}
