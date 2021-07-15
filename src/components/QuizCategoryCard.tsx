import React from "react";
import { genImgNameFromQuizName } from "../utils";

export interface QuizCategoryCardProps {
  imageName?: string;
  onClick?: () => void;
  categoryTitle?: string;
  style?: React.CSSProperties;
}

export const QuizCategoryCard: React.FC<QuizCategoryCardProps> = ({
  imageName,
  onClick,
  categoryTitle,
  style = {},
}) => {
  return (
    <div
      key={categoryTitle}
      className="shadow-2xl rounded-2xl p-4 bg-white dark:bg-gray-900 w-64 m-auto relative cursor-pointer"
      onClick={onClick}
      style={style}
    >
      <div className="w-full h-full text-center">
        <div className="flex h-full flex-col items-center">
          <img
            src={`src/assets/images/${imageName && genImgNameFromQuizName(imageName)}.png`}
            alt={`${imageName}`}
            height="auto"
            width="auto"
          />
          <p className="font-mono text-gray-900 dark:text-white text-3xl mt-4">{categoryTitle}</p>
        </div>
      </div>
    </div>
  );
};
