import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useQuiz } from "../context/quiz-context";
import { MdStar, MdTimelapse } from "react-icons/md";
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import {
  delayFunction,
  desiredQuizSetfromId,
  generateQuizDifficultyClassNames,
  genImgNameFromQuizName,
  isUserCorrect,
} from "../utils";

export const PlayQuizSet = () => {
  const {
    dispatch,
    state: {
      selectedQuizSetId,
      selectedQuizCategoryId,
      quizCategories,
      currentQuestionNumber,
      user: { score },
    },
  } = useQuiz();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isCorrectOption, setIsCorrectOption] = useState<boolean | null>(null);
  const [optionColor, setOptionColor] = useState<{ bgColor: string; color: string }>({ bgColor: "", color: "" });
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const conditionForLastQuestion = Number(currentQuestionNumber) === 14;

  if (currentQuestionNumber > 15) navigate("user-score");

  /** TODO: Navigate to User page after last question */
  useEffect(() => {
    // co nditionForLastQuestion && navigate("/user-score");
    console.log("FROM USE EFFECT");

    return () => {
      console.log("FROM CLEANUP");
      conditionForLastQuestion && navigate("/user-score");
    };
  }, [currentQuestionNumber]);

  // const desiredQuizSet = quizCategories
  //   .find((quizSetObj) => quizSetObj.id === selectedQuizCategoryId)
  //   ?.quizAllSets?.find((quizCompleteSetObj) => quizCompleteSetObj.quizSetId === selectedQuizSetId);

  const desiredQuizSet = desiredQuizSetfromId({ quizCategories, selectedQuizCategoryId, selectedQuizSetId });

  return (
    <div className="flex flex-col justify-center gap-2 rounded-2xl bg-theme-white shadow-play-quiz-box max-w-sm mx-auto sm:max-w-none sm:mx-auto mb-4">
      <div>Current QUestion Number: {currentQuestionNumber}</div>
      <div>conditionForLastQuestion: {conditionForLastQuestion}</div>
      <div>-</div>
      <div>-</div>
      <div>-</div>
      <div className="flex items-center justify-around text-white text-lg py-2 px-4 font-semibold flex-wrap w-full bg-theme-dark-blue rounded-t-2xl">
        {desiredQuizSet && (
          <div
            key={desiredQuizSet.quizSetId}
            className={`flex items-center gap-3 px-5 py-2 rounded-full ${generateQuizDifficultyClassNames(
              desiredQuizSet?.rules?.difficulty
            )}`}
          >
            <img
              className="text-xs"
              src={`../../../src/assets/images/${genImgNameFromQuizName(desiredQuizSet.category)}.png`}
              alt={desiredQuizSet.category}
              width="40"
              height="40"
            />

            <div className={`py-1 px-3 rounded-full`}>{desiredQuizSet?.rules.difficulty}</div>
          </div>
        )}
        <div className="flex items-center gap-4 my-4 self-end justify-self-end">
          <div className="flex items-center gap-1">
            <span className="text-3xl">{Number(currentQuestionNumber) + 1}</span>
            <span className="self-end"> /15</span>
          </div>
          {/* TODO: SHOW SCORE AND TIME RECORDED */}
          <div className="flex items-center gap-1">
            <MdStar className="text-3xl" />
            <p className="self-end">{JSON.stringify(score)}</p>
          </div>
          <div className="flex items-center gap-1">
            <MdTimelapse className="text-3xl" />
            <p className="self-end">{new Date(currentSeconds * 1000).toISOString().substr(11, 8)}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col self-center justify-center gap-2 m-4 ">
        {!!conditionForLastQuestion && (
          <div className="font-medium text-lg py-2 px-4">
            {desiredQuizSet && desiredQuizSet.questions[Number(currentQuestionNumber)].question}
          </div>
        )}
        <div className="flex flex-col justify-center gap-2">
          <div className="flex justify-between flex-wrap gap-4 py-4 px-2 rounded-lg">
            {desiredQuizSet &&
              desiredQuizSet.questions[Number(currentQuestionNumber)] &&
              desiredQuizSet.questions[Number(currentQuestionNumber)].options.map((eachOptionObj, index) => (
                <div
                  /** TODO: Make Options into a grid */
                  className={`flex flex-wrap items-center justify-start gap-2 font-semibold mx-auto py-3 px-2 rounded-lg shadow-quiz-options cursor-pointer transition-all duration-200 ease-in-out w-12/25 ${
                    eachOptionObj.option === selectedOption
                      ? `${optionColor.bgColor} ${optionColor.color}`
                      : "bg-theme-light-blue text-black"
                  }`}
                  onClick={() => {
                    isUserCorrect({
                      optionObj: eachOptionObj,
                      setOptionColor,
                      setIsCorrectOption,
                      setSelectedOption,
                      dispatch,
                      desiredQuizSet,
                    });
                    /**DELAY Show Answer */
                    delayFunction(() => {
                      setIsCorrectOption(null);
                      // reset selected option and styles
                      setSelectedOption("");
                    }, 300);
                    /**DELAY GOING TO NEXT QUESTION */
                    delayFunction(() => {
                      dispatch({ type: "INCREMENT_QUESTION_NUMBER" });
                    }, 500);
                  }}
                >
                  {eachOptionObj.option === selectedOption ? (
                    eachOptionObj.isRight ? (
                      <IoMdCheckmarkCircleOutline className="flex flex-col justify-center items-center h-8 w-8 rounded-full text-white text-lg" />
                    ) : (
                      <IoMdCloseCircleOutline className="flex flex-col justify-center items-center h-8 w-8 rounded-full text-white text-lg" />
                    )
                  ) : (
                    <p className="flex flex-col justify-center items-center p-2 text-white bg-black h-8 w-8 rounded-full">
                      {String.fromCharCode(65 + index)}
                    </p>
                  )}
                  <p className="text-xs sm:text-lg">{eachOptionObj.option}</p>
                </div>
              ))}
          </div>
        </div>
        {/* NEXT BUTTON */}
        <div className="flex items-center gap-2">
          <button
            className="px-4 py-1 bg-black text-white text-lg rounded-full"
            onClick={() => {
              setIsCorrectOption(null);
              /**AT LAST QUESTION */
              // TODO: SAVE USER TIME INTO A STATE
              //  Saving quiz finish time
              if (conditionForLastQuestion) {
                dispatch({ type: "GET_QUIZ_FINISH_TIME", payload: moment() });
              } else {
                dispatch({ type: "INCREMENT_QUESTION_NUMBER" });
              }
            }}
          >
            {conditionForLastQuestion ? "Submit" : "Pass"}
          </button>
          <div
            className={`font-semibold ${isCorrectOption === null && "hidden"} ${
              isCorrectOption ? "text-green-600" : "text-red-600"
            }`}
          >
            {isCorrectOption ? "Well Done!" : "Pay Attention!"}
          </div>
        </div>
      </div>
    </div>
  );
};
