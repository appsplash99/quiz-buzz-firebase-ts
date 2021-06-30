export const delayFunction = (callback: () => void, delay: number) => {
  setTimeout(() => {
    callback();
  }, delay);
};

// export const findQuizSetwithinAllSetsById = ( completeQuizSets: , quizId: string) => {

// };
