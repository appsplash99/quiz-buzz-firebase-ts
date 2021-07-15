import React from "react";
import { Link } from "react-router-dom";
import { delayFunction, generateQuizDifficultyClassNames } from "../utils";
import { useQuiz } from "../context/quiz-context";

/** TODO:
 * 1. MOVE PROPS TO type file
 * 2. Check whether quiz-buzz-ts projects contains typescript types or interfaces
 *
 */

export const QuizSetDetailsModal: React.FC = () => {
  const {
    state: { selectedQuizCategoryId, showStartQuizModal, selectedQuizSetId, currentQuizCategory },
    dispatch,
  } = useQuiz();

  const desiredQuizSetFromId = currentQuizCategory.filter((quizSetObj) => {
    return quizSetObj.quizSetId === selectedQuizSetId;
  })[0];

  const {
    quizSetId,
    rules: { type, correctAnswerPoints, totalQuestions, difficulty, totalPoints, inCorrectAnswerPoints },
  } = desiredQuizSetFromId;

  return (
    <>
      {showStartQuizModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    <div className={`p-4 rounded-lg ${generateQuizDifficultyClassNames(difficulty)}`}>{difficulty}</div>
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => dispatch({ type: "TOGGLE_SHOW_START_QUIZ_MODAL", payload: false })}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="flex flex-col gap-4 text-sm p-4 text-white bg-black">
                    <p>Total Questions: {totalQuestions}</p>
                    <p>Total Points: {totalPoints}</p>
                    <p>Correct Answer Points: {correctAnswerPoints}</p>
                    <p>Incorrect Answer Points: {inCorrectAnswerPoints}</p>
                    <p>Questions Type: {type} Choice</p>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      dispatch({ type: "TOGGLE_SHOW_START_QUIZ_MODAL", payload: false });
                    }}
                  >
                    Close
                  </button>
                  <Link
                    // to={`/quiz/${selectedQuizCategoryId}/${quizSetId}/quiz-starter`}
                    to={`/quiz-starter`}
                    onClick={() => {
                      /**DELAY Close Modal */
                      delayFunction(() => dispatch({ type: "TOGGLE_SHOW_START_QUIZ_MODAL", payload: false }), 500);
                      dispatch({ type: "SET_SELECTED_QUIZ_SET_ID", payload: quizSetId });
                    }}
                  >
                    <button
                      className={`active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${generateQuizDifficultyClassNames(
                        difficulty
                      )} `}
                      type="button"
                      onClick={() => dispatch({ type: "TOGGLE_SHOW_START_QUIZ_MODAL", payload: false })}
                    >
                      Play Quiz
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
