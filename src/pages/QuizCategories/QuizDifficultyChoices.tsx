import { Btn } from 'morphine-ui';
import React from 'react';
// import { useQuiz } from '../../context/quiz-context/quiz-context';
import { QuizCategory } from '../../data/quiz-data.types';

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
    <div className="flex align-items--c justify-content--c gap--sm">
      {quizObj.quizAllSets.map((quizSet, index) => {
        return (
          <Btn
            key={index}
            onClick={() => {
              setShowStartQuizModal(!showStartQuizModal);
              setSelectedQuizSetId(quizSet.quizSetId);
              console.log(selectedQuizSetId);
            }}
            size="sm"
            shape="rounded"
            variant={
              quizSet.rules.difficulty === 'Easy'
                ? 'success'
                : quizSet.rules.difficulty === 'Medium'
                ? 'warning'
                : 'error'
            }>
            {quizSet.rules.difficulty}
          </Btn>
        );
      })}
    </div>
  );
};
