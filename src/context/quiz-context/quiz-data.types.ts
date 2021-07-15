/**
 * Individual Option within Question Object
 */
export type Option = {
  option: string;
  isRight: boolean;
};

/**
 * Single Question present within a QuizSet's Questions Array
 */
export type QuizQuestion = {
  _id: string;
  questionNumber: number;
  question: string;
  // correctAnswer?: string;
  // incorrectAnswers?: string[];
  options: Option[];
};

/**
 * Rules for Each Quiz Set of each category
 */
export type QuizRules = {
  type: "multiple" | "boolean";
  difficulty: "Easy" | "Medium" | "Hard";
  totalQuestions: number;
  correctAnswerPoints: number;
  inCorrectAnswerPoints: number;
  totalPoints: number;
};

/**
 * Individual Quiz Set
 */
export type QuizSet = {
  quizSetId: string;
  category: "General Knowledge" | "Computer Science" | "Natural Science";
  questions: QuizQuestion[];
  rules: QuizRules;
};

/**
 * Each Object within Categories Array
 */
export type QuizCategory = {
  id: string;
  name: "General Knowledge" | "Computer Science" | "Natural Science";
  quizAllSets: QuizSet[];
};

/**
 * All Quiz Categories
 */
export type QuizCategories = QuizCategory[];
