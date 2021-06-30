import React, { useEffect, useState } from 'react';
import { Btn } from 'morphine-ui';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useQuiz } from '../../context/quiz-context/quiz-context';
import { quizCategories } from '../../data/quiz-data';
import { Option } from '../../data/quiz-data.types';
import { delayFunction } from '../../utils/utils';
import { MdStar, MdTimer } from 'react-icons/md';
import {
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from 'react-icons/io';
import {
  defaultAnswersContainerStyle,
  defaultSelectedOptionIconStyles,
  defaultOptionSerialAlphabetStyles,
  defaultOptionStyles,
} from './PlayQuizSet.styles';

export const PlayQuizSet = () => {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();
  const { categoryId, quizSetId, questionNumber } = useParams();
  const [questionCountDown, setQuestionCountDown] = useState(Number(50));
  const [selectedOption, setSelectedOption] = useState<string | number>('');
  const [isCorrectOption, setIsCorrectOption] = useState<boolean | null>(null);
  const [optionColor, setOptionColor] = useState<{
    bgColor: string;
    color: string;
  }>({
    bgColor: '',
    color: '',
  });
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [startingTime, setStartingTime] = useState<Date>(new Date());
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  console.log({ categoryId, quizSetId, questionNumber });

  const conditionForLastQuestion = Number(questionNumber) === 14;
  const nextQuestionRoute = `/quiz/${categoryId}/${quizSetId}/${
    Number(questionNumber) + 1
  }`;

  /**
   * Decrements Question Timer by One
   */
  useEffect(() => {
    if (!questionCountDown) return;
    const intervalId = setInterval(() => {
      // setQuestionCountDown((prev) => prev - 1);
      setCurrentSeconds((prev) => prev + 1);
      // setCurrentTime((prev) => new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  /**
   * Navigate to User page after last question
   */
  useEffect(() => {
    if (conditionForLastQuestion) {
      console.log('FINAL CONDITION MET');
      navigate(`/user-score`);
    }
  }, [conditionForLastQuestion, navigate]);

  /**
   * desiredQuizSet can be easy-set of gkQuiz
   */
  const desiredQuizSet = quizCategories
    .find((quizSetObj) => quizSetObj.id === categoryId)
    ?.quizAllSets?.find(
      (quizCompleteSetObj) => quizCompleteSetObj.quizSetId === quizSetId
    );
  console.log({ desiredQuizSet });

  /**
   * CHECKING IF USER IS CORRECT/INCORRECT
   */
  const isUserCorrect = (optionObj: Option) => {
    setSelectedOption(optionObj.option);
    if (optionObj.isRight) {
      console.log(`Correct answer ${optionObj}`);
      setOptionColor({ bgColor: 'var(--success)', color: 'var(--light)' });
      setIsCorrectOption(true);
      dispatch({
        type: 'CORRECT_ANSWER',
        payload: { ...optionObj, questionNumber: Number(questionNumber) + 1 },
      });
      // return true;
      return;
    }
    console.log(`InCorrect answer ${optionObj}`);
    setOptionColor({ bgColor: 'var(--danger)', color: 'var(--light)' });
    setIsCorrectOption(false);
    dispatch({
      type: 'INCORRECT_ANSWER',
      payload: { ...optionObj, questionNumber: Number(questionNumber) + 1 },
    });
    // return false;
    return;
  };

  return (
    <div
      className="flex flex--column justify-content--c gap--sm"
      style={{
        borderRadius: 'var(--space-md)',
        backgroundColor: 'var(--grey-300)',
        boxShadow: '0 5px 12px -2px rgb(0 0 0 / 40%)',
      }}>
      <div
        className="flex align-items--c justify-content--sb text--light text--md p--sm--md font-weight--600 flex-wrap--wrap m--xxs"
        style={{
          borderTopLeftRadius: 'var(--space-md)',
          borderTopRightRadius: 'var(--space-md)',
          backgroundColor: 'var(--dark)',
        }}>
        <div style={{ marginRight: 'var(--space-xl)' }}>
          {state.currentQuizSet.category}
        </div>
        <div
          className="flex align-items--c gap--md my"
          style={{ alignSelf: 'flex-end', justifySelf: 'flex-end' }}>
          <div className="flex align-items--c gap--xxxs">
            <MdStar />
            <div>{state.user.score}</div>
          </div>
          <div className="flex align-items--c gap--xxxs">
            <div>{Number(questionNumber) + 1}/15</div>
          </div>
          <div className="flex align-items--c gap--xxxs">
            <MdTimer />
            {/* <div>{questionCountDown}</div> */}
            {/* <div>{currentSeconds}</div> */}
            <div>
              {new Date(currentSeconds * 1000).toISOString().substr(11, 8)}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex--column align-self--c justify-content--c gap--sm m--md">
        <div className="font-weight--500 text--lg p--sm--md">
          {desiredQuizSet &&
            desiredQuizSet.questions[Number(questionNumber)].question}
        </div>
        {/* <div>{Number(timeLeft) === 0 && "Your response won't be counted"}</div> */}
        <div className="flex flex--column justify-content--c gap--sm">
          <div
            style={defaultAnswersContainerStyle}
            className="flex justify-content--sb flex-wrap--wrap gap">
            {desiredQuizSet &&
              desiredQuizSet.questions[Number(questionNumber)].options.map(
                (eachOptionObj, index) => (
                  <div
                    style={{
                      ...defaultOptionStyles,
                      backgroundColor:
                        eachOptionObj.option === selectedOption
                          ? optionColor.bgColor
                          : 'var(--themeSecondary)',
                      color:
                        eachOptionObj.option === selectedOption
                          ? optionColor.color
                          : 'var(--dark)',
                    }}
                    onClick={() => {
                      isUserCorrect(eachOptionObj);
                      /**DELAY ROUTER */
                      delayFunction(() => {
                        navigate(nextQuestionRoute);
                        setIsCorrectOption(null);
                      }, 1000);
                      setQuestionCountDown(30);
                    }}>
                    {eachOptionObj.option === selectedOption ? (
                      eachOptionObj.isRight ? (
                        <IoMdCheckmarkCircleOutline
                          style={defaultSelectedOptionIconStyles}
                        />
                      ) : (
                        <IoMdCloseCircleOutline
                          style={defaultSelectedOptionIconStyles}
                        />
                      )
                    ) : (
                      <div style={defaultOptionSerialAlphabetStyles}>
                        {String.fromCharCode(65 + index)}
                      </div>
                    )}
                    <div>{eachOptionObj.option}</div>
                  </div>
                )
              )}
          </div>
        </div>
        {/* NEXT BUTTON */}
        <div className="flex align-items--c gap--sm">
          <Link
            to={nextQuestionRoute}
            onClick={() => {
              // setQuestionCountDown(30);
              setIsCorrectOption(null);
              /**AT LAST QUESTION DISPLAY */
              conditionForLastQuestion && navigate('/user-score');
            }}
            className="text-decoration--none">
            <Btn variant="dark" size="sm" shape="capsule">
              Pass
            </Btn>
          </Link>
          <div
            style={{
              display: isCorrectOption === null ? 'none' : '',
              fontWeight: 600,
              color: isCorrectOption ? 'var(--success)' : 'var(--danger)',
            }}>
            {isCorrectOption ? 'Well Done!' : 'Pay Attention'}
          </div>
        </div>
      </div>
    </div>
  );
};
