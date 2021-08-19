import React, { useMemo, useEffect, useState } from "react";
import moment from "moment";
import {
  shuffle,
  sectoHMS,
  isUserCorrect,
  delayFunction,
  desiredQuizSetfromId,
  generateQuizDifficultyClassNames,
} from "../utils";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/quiz-context";
import { MdStar, MdTimelapse } from "react-icons/md";
import nsImage from "../assets/images/natural-science.png";
import csImage from "../assets/images/computer-science.png";
import gkImage from "../assets/images/general-knowledge.png";
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";

export const PlayQuizSet = () => {
  const {
    dispatch,
    state: {
      selectedQuizCategoryId,
      currentQuestionNumber,
      selectedQuizSetId,
      user: { score },
      quizCategories,
    },
  } = useQuiz();
  const navigate = useNavigate();
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  // TODO: remove any
  const [selectedOptionObj, setSelectedOptionObj] = useState<any>(null);
  const conditionForLastQuestion = Number(currentQuestionNumber) === 15;
  const [isCorrectOption, setIsCorrectOption] = useState<boolean | null>(null);

  const [optionColor, setOptionColor] = useState<{ bgColor: string; color: string }>({ bgColor: "", color: "" });

  if (currentQuestionNumber > 15) navigate("user-score");
  /** TODO: Navigate to User page after last question */
  useEffect(() => {
    // conditionForLastQuestion && navigate("/user-score");
    console.log("FROM USE EFFECT");

    const intervalId = setInterval(() => {
      setCurrentSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
      console.log("FROM CLEANUP");
      // conditionForLastQuestion && navigate("/user-score");
    };
  }, [currentQuestionNumber]);

  const desiredQuizSet = desiredQuizSetfromId({ quizCategories, selectedQuizCategoryId, selectedQuizSetId });

  // DO NOT REMOVE THIS CODE
  // TODO: STyle this component
  if (!desiredQuizSet) {
    return <>Return to Select Categories</>;
  }

  // As desiredQuizSet is Present
  // shuffle array only once depending on currentQuestionNumber
  let memoisedOptions = useMemo(() => {
    return shuffle(desiredQuizSet.questions[Number(currentQuestionNumber)].options);
  }, [currentQuestionNumber]);

  return (
    <div className="flex flex-col justify-center gap-2 rounded-2xl bg-theme-white shadow-play-quiz-box max-w-sm mx-auto sm:max-w-none sm:mx-auto mb-4">
      {/* TODO: CLean code after everything is done! */}
      {/* <div>Current QUestion Number: {currentQuestionNumber}</div>
      <div>conditionForLastQuestion: {JSON.stringify(conditionForLastQuestion)}</div>
      <div>-</div>
      <div>-</div>
      <div>-</div> */}
      <div className="flex items-center justify-around text-white text-lg py-2 px-4 font-semibold flex-wrap w-full bg-theme-dark-blue rounded-t-2xl">
        <div
          key={desiredQuizSet.quizSetId}
          className={`flex items-center gap-3 px-5 py-2 rounded-full ${generateQuizDifficultyClassNames(
            desiredQuizSet?.rules?.difficulty
          )}`}
        >
          <img
            src={
              desiredQuizSet.category === "Computer Science"
                ? csImage
                : desiredQuizSet.category === "General Knowledge"
                ? gkImage
                : nsImage
            }
            alt={desiredQuizSet.category}
            className="text-xs"
            height="40"
            width="40"
          />
          <div className={`py-1 px-3 rounded-full`}>{desiredQuizSet?.rules.difficulty}</div>
        </div>
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
            <span className="self-end inline-block w-16">{sectoHMS(currentSeconds)}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col self-center justify-center gap-2 m-4 ">
        <div className="font-medium text-lg py-2 px-4">
          {desiredQuizSet.questions[Number(currentQuestionNumber)].question}
        </div>
        <div className="flex flex-col justify-center gap-2">
          <div className="flex justify-between flex-wrap gap-4 py-4 px-2 rounded-lg">
            {desiredQuizSet.questions[Number(currentQuestionNumber)] &&
              memoisedOptions?.map((eachOptionObj, index) => (
                <div
                  key={index}
                  /** TODO: Make Options into a grid */
                  className={`flex flex-wrap items-center justify-start gap-2 font-semibold mx-auto py-3 px-2 rounded-lg shadow-quiz-options cursor-pointer transition-all duration-200 ease-in-out w-12/25 
                  ${
                    eachOptionObj.option === selectedOption
                      ? `${optionColor.bgColor} ${optionColor.color}`
                      : "bg-theme-light-blue text-black"
                  }
                  ${eachOptionObj === selectedOptionObj && "text-gray-700"}`}
                  onClick={() => setSelectedOptionObj(eachOptionObj)}
                >
                  {eachOptionObj.option === selectedOption ? (
                    eachOptionObj.isRight ? (
                      <IoMdCheckmarkCircleOutline className="flex flex-col justify-center items-center h-8 w-8 rounded-full text-white text-lg" />
                    ) : (
                      <IoMdCloseCircleOutline className="flex flex-col justify-center items-center h-8 w-8 rounded-full text-white text-lg" />
                    )
                  ) : (
                    <p
                      className={`flex flex-col justify-center items-center p-2  h-8 w-8 rounded-full ${
                        eachOptionObj === selectedOptionObj ? "bg-white text-black" : "bg-black text-white"
                      }`}
                    >
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
              isUserCorrect({
                optionObj: selectedOptionObj,
                setOptionColor,
                setIsCorrectOption,
                setSelectedOption,
                dispatch,
                desiredQuizSet,
              });

              /**AT LAST QUESTION */
              // TODO: SAVE USER TIME INTO A STATE
              //  Saving quiz finish time
              if (conditionForLastQuestion) {
                dispatch({ type: "GET_QUIZ_FINISH_TIME", payload: moment() });
              } else {
                delayFunction(() => {
                  setIsCorrectOption(null);
                  // reset selected option and styles
                  setSelectedOption("");
                  setSelectedOptionObj(null);
                }, 300);
                delayFunction(() => {
                  dispatch({ type: "INCREMENT_QUESTION_NUMBER" });
                }, 500);
              }
            }}
          >
            {conditionForLastQuestion ? "Submit" : "Next"}
          </button>
          <div
            className={`font-semibold ${isCorrectOption === null && "hidden"} ${
              isCorrectOption ? "text-green-600" : "text-red-600"
            }`}
          >
            {selectedOptionObj ? (isCorrectOption ? "Well Done!" : "Pay Attention!") : ""}
          </div>
        </div>
      </div>
    </div>
  );
};
