import React, { useState } from 'react';
import { useQuiz } from '../context/quiz-context';
import { quizCategories } from '../data/quiz-data';
import { QuizDifficultiesModal } from '../components/QuizDifficultiesModal';
import { QuizCategoryCard } from '../components/QuizCategoryCard';
import { QuizSetDetailsModal } from '../components/QuizSetDetailsModal';
import { genImgNameFromQuizName } from '../utils';

/**
 * TODO:
 * 1. ADD REDUCERS
 * 2. AND REMOVE UNDANTED STATES
 */

export const QuizCategories = () => {
  const { state, dispatch } = useQuiz();

  const [showStartQuizModal, setShowStartQuizModal] = useState(false);
  const [selectedQuizCategoryId, setSelectedQuizCategoryId] = useState('');
  const [selectedQuizSetId, setSelectedQuizSetId] = useState('');

  /** Newly Added States */
  const [isCategorySelected, setIsCategorySelected] = useState<boolean>(false);
  const [showQuizDifficultiesModal, setShowQuizDifficultiesModal] = useState<
    boolean
  >(false);

  const desiredQuizSetFromId = state.currentQuizCategory.filter(
    (quizSetObj) => {
      return quizSetObj.quizSetId === selectedQuizSetId;
    }
  )[0];

  console.log({ desiredQuizSetFromId });

  console.log({ currentState: state });

  return (
    <div className="flex flex-col gap-6">
      <div className="font-mono text-4xl font-medium text-center bg-black text-gray-200 p-4 rounded-2xl font-semibold shadow-2xl">
        Choose Category
      </div>
      <div className="flex gap-6 flex-wrap justify-center">
        {quizCategories.map((quizObj) => {
          return (
            <div className="flex gap-16">
              <QuizCategoryCard
                onClick={() => {
                  /**
                   * NEED THIS TO PASS PARTICULAR CATEGORY
                   * TO PAYLOAD VIA DISPATCH WITH TYPE: SET_QUIZ_CATEGORY_SETS
                   */
                  // console.log({
                  //   quizCATEGORY: quizObj.name,
                  //   quizAllSets: quizObj.quizAllSets,
                  // });
                  // console.log(quizObj.id);
                  setSelectedQuizCategoryId(quizObj.id);
                  setShowQuizDifficultiesModal(true);
                  setIsCategorySelected(!isCategorySelected);
                  /**
                   * WORKING DISPATCH
                   */
                  dispatch({
                    type: 'SET_QUIZ_CATEGORY_SETS',
                    payload: quizObj.quizAllSets,
                  });
                }}
                categoryTitle={quizObj.name}
                imageName={genImgNameFromQuizName(quizObj.name)}
              />
              <div
                className="absolute"
                style={{
                  display:
                    quizObj.id === selectedQuizCategoryId &&
                    showQuizDifficultiesModal
                      ? 'flex'
                      : 'none',
                }}>
                {/* QUIZ DIFFICULTIES MODAL */}
                <QuizDifficultiesModal
                  showModal={showQuizDifficultiesModal}
                  setShowModal={setShowQuizDifficultiesModal}
                  quizCategory={quizObj}
                  showStartQuizModal={showStartQuizModal}
                  setShowStartQuizModal={setShowStartQuizModal}
                  setSelectedQuizSetId={setSelectedQuizSetId}
                  selectedQuizSetId={selectedQuizSetId}
                />
              </div>
            </div>
          );
        })}
      </div>
      {/** * NEW QUIZ SET DETAILS MODAL */}
      {desiredQuizSetFromId && (
        <QuizSetDetailsModal
          modalTitle={desiredQuizSetFromId.rules.difficulty}
          showModal={desiredQuizSetFromId && showStartQuizModal}
          setShowModal={setShowStartQuizModal}
          setShowStartQuizModal={setShowStartQuizModal}
          quizSet={desiredQuizSetFromId}
          selectedQuizCategoryId={selectedQuizCategoryId}
        />
      )}
    </div>
  );
};
