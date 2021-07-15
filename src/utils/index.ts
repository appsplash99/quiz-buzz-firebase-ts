import React from "react";
import { Option, QuizSet } from "../context/quiz-context/quiz-data.types";

export const delayFunction = (callback: () => void, delay: number) => {
  setTimeout(() => {
    callback();
  }, delay);
};

export const generateQuizDifficultyClassNames = (expr: string) => {
  switch (expr) {
    case "Easy":
      return "bg-green-400 text-white";
    case "Medium":
      return "bg-yellow-400 text-black";
    case "Hard":
      return "bg-red-400 text-white";
    default:
      break;
  }
};

export const genImgNameFromQuizName = (quizName: string) => {
  return quizName.toLowerCase().replace(" ", "-");
};

interface IsUserCorrectType {
  dispatch: (value: any) => void;
  optionObj: Option;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  setOptionColor: ({ bgColor, color }: { bgColor: string; color: string }) => void;
  setIsCorrectOption: (x: boolean) => void;
  desiredQuizSet: QuizSet;
}

/** CHECKING IF USER IS CORRECT/INCORRECT */
export const isUserCorrect = ({
  optionObj,
  dispatch,
  setOptionColor,
  setSelectedOption,
  setIsCorrectOption,
  desiredQuizSet,
}: IsUserCorrectType) => {
  setSelectedOption(optionObj.option);
  if (optionObj.isRight) {
    // console.log(`Correct answer ${optionObj}`);
    setOptionColor({ bgColor: "bg-green-600", color: "text-white" });
    // dispatch({ type: "CORRECT_ANSWER", payload: optionObj });
    dispatch({
      type: "NEW_CORRECT_ANSWER",
      payload: { desiredQuizSet, optionObj: { ...optionObj, isSelected: true } },
    });
    setIsCorrectOption(true);
    return;
  }
  console.log(`InCorrect answer ${optionObj}`);
  // dispatch({ type: "INCORRECT_ANSWER", payload: optionObj });
  dispatch({
    type: "NEW_INCORRECT_ANSWER",
    payload: { desiredQuizSet, optionObj: { ...optionObj, isSelected: true } },
  });
  setOptionColor({ bgColor: "bg-red-600", color: "text-white" });
  setIsCorrectOption(false);
  return;
};
