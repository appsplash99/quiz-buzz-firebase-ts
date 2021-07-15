import React, { useState, useEffect } from "react";
import { useQuiz } from "../context/quiz-context";
import firebase from "firebase";
// import { quizCategories } from "../data/quiz-data";
import { QuizCategoryCard, QuizSetDetailsModal, QuizDifficultiesModal, Loader } from "../components";

/**
 * TODO:
 * 1. ADD REDUCERS
 * 2. AND REMOVE UNDANTED STATES
 */

export const QuizCategories = () => {
  const { state, dispatch } = useQuiz();
  console.log("state from app", state);
  return (
    <div className="flex flex-col gap-6">
      <div className="font-mono text-4xl font-medium text-center bg-black text-gray-200 p-4 rounded-2xl font-semibold shadow-2xl">
        Choose Category
      </div>
      <div className="flex gap-6 flex-wrap justify-center">
        {state.quizCategories.map((quizObj) => {
          return (
            <div className="flex gap-16" key={quizObj.id}>
              <QuizCategoryCard
                categoryTitle={quizObj.name}
                imageName={quizObj.name}
                onClick={() => {
                  /**
                   * NEED THIS TO PASS PARTICULAR CATEGORY
                   * TO PAYLOAD VIA DISPATCH WITH TYPE: SET_QUIZ_CATEGORY_SETS
                   */
                  dispatch({ type: "SET_SELECTED_QUIZ_CATEGORY_ID", payload: quizObj.id });
                  dispatch({ type: "TOGGLE_SHOW_QUIZ_DIFFICULTIES_MODAL", payload: true });
                  dispatch({ type: "SET_QUIZ_CATEGORY_SETS", payload: quizObj.quizAllSets });
                }}
              />
              {/* QUIZ DIFFICULTIES MODAL */}
              <QuizDifficultiesModal quizCategory={quizObj} />
            </div>
          );
        })}
      </div>
      {/** * NEW QUIZ SET DETAILS MODAL */}
      {state.selectedQuizSetId && <QuizSetDetailsModal />}
    </div>
  );
};
