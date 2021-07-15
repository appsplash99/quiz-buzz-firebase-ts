import React from "react";
import { useQuiz } from "../context/quiz-context";
import { QuizCategory } from "../context/quiz-context/quiz-data.types";
import { generateQuizDifficultyClassNames } from "../utils";

export interface QuizDifficultyChoicesProps {
  quizObj: QuizCategory;
}

export const QuizDifficultyChoices: React.FC<QuizDifficultyChoicesProps> = ({ quizObj }) => {
  const {
    state: { showStartQuizModal, quizCategories, selectedQuizCategoryId, selectedQuizSetId },
    dispatch,
  } = useQuiz();

  const desiredQuizSet = quizCategories
    .find((quizSetObj) => quizSetObj.id === selectedQuizCategoryId)
    ?.quizAllSets?.find((quizCompleteSetObj) => quizCompleteSetObj.quizSetId === selectedQuizSetId);

  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      {quizObj.quizAllSets.map((quizSet, index) => {
        return (
          <div key={index}>
            <button
              onClick={() => {
                dispatch({ type: "TOGGLE_SHOW_START_QUIZ_MODAL", payload: !showStartQuizModal });
                dispatch({ type: "TOGGLE_SHOW_QUIZ_DIFFICULTIES_MODAL", payload: false });
                dispatch({ type: "SET_SELECTED_QUIZ_SET_ID", payload: quizSet.quizSetId });
              }}
              className={`p-2 rounded-md text ${generateQuizDifficultyClassNames(quizSet.rules.difficulty)}`}
            >
              {quizSet.rules.difficulty}
            </button>
          </div>
        );
      })}
    </div>
  );
};
