import { QuizCategory, QuizSet } from '../../data/quiz-data.types';

export type UserOption = {
  questionNumber: number;
  option: string;
  isRight: boolean;
};

export type User = {
  score: number;
  correctAttempts: number;
  inCorrectAttempts: number;
  totalAttemptedQuestions: number;
  totalUnAttemptedQuestions: number;
  userQuizQuestions: UserOption[];
};

export type InitialState = {
  currentQuizCategory: QuizSet[];
  currentQuizSet: QuizSet;
  user: User;
};

export type ContextType = {
  state: InitialState;
  dispatch: React.Dispatch<any>;
};
