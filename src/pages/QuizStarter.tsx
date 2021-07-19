import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/quiz-context";
import { useCountdown } from "../hooks/useCountdown";
import moment from "moment";
import { generateQuizDifficultyClassNames, genImgNameFromQuizName } from "../utils";

export const QuizStarter = () => {
  const navigate = useNavigate();
  const {
    state: { quizCategories, selectedQuizCategoryId, selectedQuizSetId },
    dispatch,
  } = useQuiz();

  const quizStartingIn = useCountdown(7);

  useEffect(() => {
    if (quizStartingIn === 1) {
      console.log("start time snapshot taken");
      dispatch({ type: "GET_QUIZ_STARTING_TIME", payload: moment() });
    }
    if (quizStartingIn === 0) return navigate(`/play-quiz`);
  }, [quizStartingIn]);

  const desiredQuizSet = quizCategories
    .find((quizSetObj) => quizSetObj.id === selectedQuizCategoryId)
    ?.quizAllSets?.find((quizCompleteSetObj) => quizCompleteSetObj.quizSetId === selectedQuizSetId);

  return (
    <div className="flex flex-col flex-wrap justify-center items-center rounded-3xl bg-gray-200">
      <div className="flex justify-center w-full text-4xl bg-black text-white p-3 rounded-t-2xl font-mono">
        Quiz Starting In...
      </div>
      {desiredQuizSet && (
        <div className="flex items-center justify-around gap-4 pt-6">
          <div className={`flex flex-col items-center gap-4 p-4`}>
            <div
              className={`flex flex-col items-center justify-center h-40 w-40 rounded-full ${generateQuizDifficultyClassNames(
                desiredQuizSet?.rules?.difficulty
              )}`}
            >
              <img
                src={`../../../src/assets/images/${genImgNameFromQuizName(desiredQuizSet.category)}.png`}
                alt={desiredQuizSet.category}
                width="100"
                height="100"
              />
            </div>
            <h2 className="text-3xl font-mono font-semibold">{desiredQuizSet.category}</h2>
            <h2
              className={`text-3xl font-mono font-semibold rounded-lg p-2  ${generateQuizDifficultyClassNames(
                desiredQuizSet?.rules?.difficulty
              )}`}
            >
              {desiredQuizSet.rules.difficulty}
            </h2>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center w-full rounded-b-2xl pb-3">
        <p className="font-mono text-8xl font-bold">{quizStartingIn}</p>
        <p className="text-3xl">seconds</p>
      </div>
    </div>
  );
};
