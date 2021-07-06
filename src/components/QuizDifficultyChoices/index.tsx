import React from 'react';
// import { useQuiz } from '../../context/quiz-context/quiz-context';
import { QuizCategory } from '../../data/quiz-data.types';
import { generateQuizDifficultyClassNames } from '../../utils/utils';

/** TODO: check if type'interface */
export type QuizDifficultyChoicesProps = {
  setShowStartQuizModal: React.Dispatch<React.SetStateAction<boolean>>;
  // selectedQuizCategoryId: string;
  showStartQuizModal: boolean;
  setSelectedQuizSetId: React.Dispatch<React.SetStateAction<string>>;
  selectedQuizSetId: string;
  quizObj: QuizCategory;
};

export const QuizDifficultyChoices: React.FC<QuizDifficultyChoicesProps> = ({
  // selectedQuizCategoryId,
  showStartQuizModal,
  setShowStartQuizModal,
  selectedQuizSetId,
  setSelectedQuizSetId,
  quizObj,
}) => {
  // const { state, dispatch } = useQuiz();

  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      {quizObj.quizAllSets.map((quizSet, index) => {
        return (
          <div>
            <button
              key={index}
              onClick={() => {
                setShowStartQuizModal(!showStartQuizModal);
                setSelectedQuizSetId(quizSet.quizSetId);
                console.log(selectedQuizSetId);
              }}
              className={`p-2 rounded-md text ${generateQuizDifficultyClassNames(
                quizSet.rules.difficulty
              )}`}>
              {quizSet.rules.difficulty}
            </button>
          </div>
        );
      })}
    </div>
  );
};
