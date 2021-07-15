import React from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

interface TogglePasswordProps {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TogglePassword: React.FC<TogglePasswordProps> = ({ showPassword, setShowPassword }) => {
  return (
    <div className="absolute right-2 inset-y-1/2 rounded-l-md inline-flex items-center bg-white border-l text-gray-500 shadow-sm text-2xl cursor-pointer">
      {showPassword ? (
        <FaEyeSlash
          height="15"
          width="15"
          className="bg-gray-200 rounded-full p-1"
          onClick={() => setShowPassword(!showPassword)}
        />
      ) : (
        <FaEye
          height="15"
          width="15"
          className="bg-gray-200 rounded-full p-1"
          onClick={() => setShowPassword(!showPassword)}
        />
      )}
    </div>
  );
};
