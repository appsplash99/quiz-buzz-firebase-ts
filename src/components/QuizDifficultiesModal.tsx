import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useQuiz } from "../context/quiz-context";
import { QuizCategory } from "../context/quiz-context/quiz-data.types";
import { QuizDifficultyChoices } from "./QuizDifficultyChoices";

/** TODO:
 * 2. change UI for the modal in mobile view
 * 3. Add a close(X) button in top right corner
 * 4. Remove Prop drilling  */
export interface quizDifficultiesModalProps {
  quizCategory: QuizCategory;
}

export const QuizDifficultiesModal: React.FC<quizDifficultiesModalProps> = ({ quizCategory }) => {
  const {
    state: { showQuizDifficultiesModal, selectedQuizCategoryId },
    dispatch,
  } = useQuiz();

  return (
    <div
      className="absolute"
      style={{
        display: quizCategory.id === selectedQuizCategoryId && showQuizDifficultiesModal ? "flex" : "none",
      }}
    >
      <div
        className={`fixed z-10 inset-0 overflow-y-auto ${!showQuizDifficultiesModal && "hidden"}`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-center min-h-screen  pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <div className="inline-block align-bottom bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full">
            <div className=" flex flex-col gap-4 mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl leading-6 font-medium font-mono pr-6" id="modal-title">
                  {quizCategory.name}
                </h3>
                <AiFillCloseCircle
                  className="text-2xl cursor-pointer"
                  onClick={() => dispatch({ type: "TOGGLE_SHOW_QUIZ_DIFFICULTIES_MODAL", payload: false })}
                />
              </div>
              <QuizDifficultyChoices quizObj={quizCategory} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
