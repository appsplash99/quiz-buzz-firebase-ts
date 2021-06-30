import React, { useState } from 'react';
import faker from 'faker';
import { useQuiz } from '../../context/quiz-context/quiz-context';
import { quizCategories } from '../../data/quiz-data';
import { Link } from 'react-router-dom';
import { QuizDifficultyChoices } from './QuizDifficultyChoices';
import { delayFunction } from '../../utils/utils';
import { Btn, BtnInverted, Modal } from 'morphine-ui';

export const QuizCategories = () => {
  const { state, dispatch } = useQuiz();
  const [
    showQuizDifficultiesContainer,
    setShowQuizDifficultiesContainer,
  ] = useState(false);

  const [showStartQuizModal, setShowStartQuizModal] = useState(false);
  const [selectedQuizCategoryId, setSelectedQuizCategoryId] = useState('');
  const [selectedQuizSetId, setSelectedQuizSetId] = useState('');

  const desiredQuizSetFromId = state.currentQuizCategory.filter(
    (quizSetObj) => {
      return quizSetObj.quizSetId === selectedQuizSetId;
    }
  )[0];

  console.log({ desiredQuizSetFromId });

  return (
    <div className="flex flex--column ">
      <div className="mb--md text--xxl font-weight--500 text-align--c">
        Select a Quiz Category
      </div>
      <div className="flex flex--column gap--lg my">
        {quizCategories.map((quizObj) => {
          return (
            // <Link
            //   key={quizObj.id}
            //   to={`/quiz/${quizObj.id}`}
            //   className="text-decoration--none text--dark flex flex--column">
            // </Link>
            <div className="flex flex--column gap--md">
              <Btn
                size="lg"
                shape="capsule"
                variant="dark"
                key={faker.datatype.uuid()}
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
                  setShowQuizDifficultiesContainer(
                    !showQuizDifficultiesContainer
                  );
                  /**
                   * WORKING DISPATCH
                   */
                  dispatch({
                    type: 'SET_QUIZ_CATEGORY_SETS',
                    payload: quizObj.quizAllSets,
                  });
                }}
                style={{
                  boxShadow: 'var(--card-box-shadow)',
                  width: '100%',
                }}>
                {quizObj.name}
              </Btn>
              <div
                className="flex--column align-items--c justify-content--c bg--dark text--light border-radius--sm p--sm"
                style={{
                  display:
                    quizObj.id === selectedQuizCategoryId &&
                    showQuizDifficultiesContainer
                      ? 'flex'
                      : 'none',
                }}>
                <QuizDifficultyChoices
                  quizObj={quizObj}
                  showStartQuizModal={showStartQuizModal}
                  setShowStartQuizModal={setShowStartQuizModal}
                  setSelectedQuizSetId={setSelectedQuizSetId}
                  selectedQuizSetId={selectedQuizSetId}
                />
                {desiredQuizSetFromId && (
                  <div>
                    <Modal
                      showModal={desiredQuizSetFromId && showStartQuizModal}
                      style={{
                        overflow: 'hidden',
                      }}
                      modalBackdropStyle={{
                        opacity: 0.5,
                        overflow: 'hidden',
                      }}
                      handleCloseModal={() =>
                        setShowStartQuizModal(!showStartQuizModal)
                      }
                      modalHeader={
                        <div
                          className="p--sm"
                          style={{
                            backgroundColor:
                              desiredQuizSetFromId.rules.difficulty === 'Easy'
                                ? 'var(--success)'
                                : desiredQuizSetFromId.rules.difficulty ===
                                  'Medium'
                                ? 'var(--warning)'
                                : 'var(--danger)',
                            color:
                              desiredQuizSetFromId.rules.difficulty === 'Easy'
                                ? 'var(--light)'
                                : desiredQuizSetFromId.rules.difficulty ===
                                  'Medium'
                                ? 'var(--dark)'
                                : 'var(--light)',
                          }}>
                          {desiredQuizSetFromId.rules.difficulty}
                        </div>
                      }
                      modalBody={
                        <div className="flex flex--column gap--sm text--sm p--sm text--light bg--dark">
                          <div>
                            Total Questions:{' '}
                            {desiredQuizSetFromId.rules.totalQuestions}
                          </div>
                          <div>
                            Total Points:{' '}
                            {desiredQuizSetFromId.rules.totalPoints}
                          </div>
                          <div>
                            Correct Answer Points:{' '}
                            {desiredQuizSetFromId.rules.correctAnswerPoints}
                          </div>
                          <div>
                            Incorrect Answer Points:{' '}
                            {desiredQuizSetFromId.rules.inCorrectAnswerPoints}
                          </div>
                          <div>
                            Questions Type: {desiredQuizSetFromId.rules.type}{' '}
                            Choice
                          </div>
                        </div>
                      }
                      modalFooter={
                        <div
                          className="flex flex--column align-items--c"
                          style={{
                            backgroundColor:
                              desiredQuizSetFromId.rules.difficulty === 'Easy'
                                ? 'var(--success)'
                                : desiredQuizSetFromId.rules.difficulty ===
                                  'Medium'
                                ? 'var(--warning)'
                                : 'var(--danger)',
                            color:
                              desiredQuizSetFromId.rules.difficulty === 'Easy'
                                ? 'var(--light)'
                                : desiredQuizSetFromId.rules.difficulty ===
                                  'Medium'
                                ? 'var(--dark)'
                                : 'var(--light)',
                          }}>
                          <Link
                            to={`/quiz/${selectedQuizCategoryId}/${desiredQuizSetFromId.quizSetId}/quiz-starter`}
                            onClick={() => {
                              /**DELAY Close Modal */
                              delayFunction(() => {
                                setShowStartQuizModal(false);
                              }, 500);
                              /**
                               * FIX THIS
                               */
                              // dispatch({
                              //   type: 'SET_CURRENT_QUIZSET',
                              //   payload: {
                              //     desiredQuizSetId: selectedQuizSetId,
                              //   },
                              // });
                            }}>
                            <Btn
                              className="m--sm text-align--c"
                              size="sm"
                              variant="dark">
                              Play Quiz
                            </Btn>
                          </Link>
                        </div>
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
