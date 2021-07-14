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
