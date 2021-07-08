import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useQuiz } from "../../context/quiz-context";
import { quizCategories } from "../../data/quiz-data";
import { Option } from "../../data/quiz-data.types";
import { MdStar, MdTimelapse } from "react-icons/md";
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { delayFunction, generateQuizDifficultyClassNames, genImgNameFromQuizName } from "../../utils";

export const PlayQuizSet = () => {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();
  const { categoryId, quizSetId, questionNumber } = useParams();
  const [questionCountDown, setQuestionCountDown] = useState(Number(50));
  const [selectedOption, setSelectedOption] = useState<string | number>("");
  const [isCorrectOption, setIsCorrectOption] = useState<boolean | null>(null);
  const [optionColor, setOptionColor] = useState<{ bgColor: string; color: string }>({ bgColor: "", color: "" });
  const [currentSeconds, setCurrentSeconds] = useState(0);

  console.log({ categoryId, quizSetId, questionNumber });

  const conditionForLastQuestion = Number(questionNumber) === 14;
  const nextQuestionRoute = `/quiz/${categoryId}/${quizSetId}/${Number(questionNumber) + 1}`;

  /** Decrements Question Timer by One */
  useEffect(() => {
    if (!questionCountDown) return;
    const intervalId = setInterval(() => {
      // setQuestionCountDown((prev) => prev - 1);
      setCurrentSeconds((prev) => prev + 1);
      // setCurrentTime((prev) => new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  /** Navigate to User page after last question */
  useEffect(() => {
    if (conditionForLastQuestion) {
      console.log("FINAL CONDITION MET");
      navigate(`/user-score`);
    }
  }, [conditionForLastQuestion, navigate]);

  /** desiredQuizSet can be easy-set of gkQuiz */
  const desiredQuizSet = quizCategories
    .find((quizSetObj) => quizSetObj.id === categoryId)
    ?.quizAllSets?.find((quizCompleteSetObj) => quizCompleteSetObj.quizSetId === quizSetId);

  console.log({ desiredQuizSet });

  /** CHECKING IF USER IS CORRECT/INCORRECT */
  const isUserCorrect = (optionObj: Option) => {
    setSelectedOption(optionObj.option);
    if (optionObj.isRight) {
      console.log(`Correct answer ${optionObj}`);
      setOptionColor({ bgColor: "bg-green-600", color: "text-white" });
      setIsCorrectOption(true);
      dispatch({ type: "CORRECT_ANSWER", payload: { ...optionObj, questionNumber: Number(questionNumber) + 1 } });
      // return true;
      return;
    }
    console.log(`InCorrect answer ${optionObj}`);
    setOptionColor({ bgColor: "bg-red-600", color: "text-white" });
    setIsCorrectOption(false);
    dispatch({ type: "INCORRECT_ANSWER", payload: { ...optionObj, questionNumber: Number(questionNumber) + 1 } });
    // return false;
    return;
  };

  return (
    <div className="flex flex-col justify-center gap-2 rounded-2xl bg-theme-white shadow-play-quiz-box max-w-sm mx-auto sm:max-w-none sm:mx-auto mb-4">
      <div className="flex items-center justify-around text-white text-lg py-2 px-4 font-semibold flex-wrap w-full bg-theme-dark-blue rounded-t-2xl">
        <div className="flex items-center gap-3">
          <img
            className="text-xs"
            /** TODO: optional - find an alternative for the path name */
            src={`../../../src/assets/images/${genImgNameFromQuizName(state.currentQuizSet.category)}.png`}
            alt={genImgNameFromQuizName(state.currentQuizSet.category)}
            width="50"
            height="50"
          />
          {desiredQuizSet && (
            <div
              className={`py-1 px-3 rounded-full ${generateQuizDifficultyClassNames(
                desiredQuizSet?.rules?.difficulty
              )}`}
            >
              {desiredQuizSet?.rules.difficulty}
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 my-4 self-end justify-self-end">
          <div className="flex items-center gap-1">
            <span className="text-3xl">{Number(questionNumber) + 1}</span>
            <span className="self-end"> /15</span>
          </div>
          <div className="flex items-center gap-1">
            <MdStar className="text-3xl" />
            <p className="self-end">{state.user.score}</p>
          </div>
          <div className="flex items-center gap-1">
            <MdTimelapse className="text-3xl" />
            <p className="self-end">{new Date(currentSeconds * 1000).toISOString().substr(11, 8)}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col self-center justify-center gap-2 m-4 ">
        <div className="font-medium text-lg py-2 px-4">
          {desiredQuizSet && desiredQuizSet.questions[Number(questionNumber)].question}
        </div>
        <div className="flex flex-col justify-center gap-2">
          <div
            // style={defaultAnswersContainerStyle}
            className="flex justify-between flex-wrap gap-4 py-4 px-2 rounded-lg"
          >
            {desiredQuizSet &&
              desiredQuizSet.questions[Number(questionNumber)].options.map((eachOptionObj, index) => (
                <div
                  /** TODO: Make Options into a grid */
                  className={`flex flex-wrap items-center justify-start gap-2 font-semibold mx-auto py-3 px-2 rounded-lg shadow-quiz-options cursor-pointer transition-all duration-200 ease-in-out w-12/25 ${
                    eachOptionObj.option === selectedOption
                      ? `${optionColor.bgColor} ${optionColor.color}`
                      : "bg-theme-light-blue text-black"
                  }`}
                  onClick={() => {
                    isUserCorrect(eachOptionObj);
                    /**DELAY ROUTER */
                    delayFunction(() => {
                      navigate(nextQuestionRoute);
                      setIsCorrectOption(null);
                    }, 1000);
                    setQuestionCountDown(30);
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
          <Link
            to={nextQuestionRoute}
            className="no-underline"
            onClick={() => {
              // setQuestionCountDown(30);
              setIsCorrectOption(null);
              /**AT LAST QUESTION DISPLAY */
              conditionForLastQuestion && navigate("/user-score");
            }}
          >
            <button className="px-4 py-1 bg-black text-white text-lg rounded-full">Pass</button>
          </Link>
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
