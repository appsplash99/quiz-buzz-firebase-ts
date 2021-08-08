import React from "react";
import nsImage from '../assets/images/natural-science.png'
import csImage from '../assets/images/computer-science.png'
import gkImage from '../assets/images/general-knowledge.png'

export interface QuizCategoryCardProps {
  imageName?: string;
  onClick?: () => void;
  categoryTitle?: string;
  style?: React.CSSProperties;
}

export const QuizCategoryCard: React.FC<QuizCategoryCardProps> = ({
  categoryTitle,
  style = {},
  imageName,
  onClick,
}) => {
  return (
    <div
      className="shadow-2xl rounded-2xl p-4 bg-white dark:bg-gray-900 w-64 m-auto relative cursor-pointer"
      key={categoryTitle}
      onClick={onClick}
      style={style}
    >
      <div className="w-full h-full text-center">
        <div className="flex h-full flex-col items-center">
          {imageName && <img
            src={imageName === 'Computer Science' ? csImage : imageName === 'General Knowledge' ? gkImage: nsImage }
            alt={`${imageName}`}
            height="auto"
            width="auto"
          />}
          <p className="font-mono text-gray-900 dark:text-white text-3xl mt-4">{categoryTitle}</p>
        </div>
      </div>
    </div>
  );
};
