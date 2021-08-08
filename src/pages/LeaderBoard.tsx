import React from "react";
import { Link } from "react-router-dom";
import home from "../assets/images/home.png";

//  TODO: ADD LANDING PAGE AND 404 PAGE
export const LeaderBoard = () => {
  return (
    <div className="bg-indigo-900 relative h-screen w-screen">
      <img
        // src={`src/assets/images/home.png`}
        src={home}
        alt="quiz-buzz-home"
        className="absolute h-full w-full object-cover"
        style={{ filter: "brightness(50%)" }}
      />
      <div className="container mx-auto px-6 md:px-12 z-10 flex items-center py-32 xl:py-40">
        <div className="lg:w-3/5 xl:w-2/5 flex flex-col items-start z-10">
          <h1 className="font-bold text-6xl sm:text-7xl text-white leading-tight mt-4">
            Quiz Buzz
            <br />
            <Link to="/login" className="text-lg uppercase mx-3 text-white cursor-pointer hover:text-gray-300 ">
              Login
            </Link>
            <Link to="/signup" className="text-lg uppercase mx-3 text-white cursor-pointer hover:text-gray-300">
              Signup
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};
