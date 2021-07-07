import React from "react";
import { GrTechnology } from "react-icons/gr";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUser, useAuth } from "reactfire";
import { UserMenu } from "./UserMenu";

export interface QuizBuzzNavProps {
  showMobileNav: boolean;
  setShowMobileNav: React.Dispatch<React.SetStateAction<boolean>>;
}

export const QuizBuzzNav: React.FC<QuizBuzzNavProps> = ({ showMobileNav, setShowMobileNav }) => {
  const auth = useAuth();
  const { data: user } = useUser();

  return (
    <nav className="bg-white shadow dark:bg-gray-800 w-screen">
      <div className="px-6 py-3 mx-auto sm:w-8/12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* APP LOGO */}
              <Link to="/" className="flex items-center no-underline gap-2">
                <GrTechnology className=" h-12 w-12" />
                <div className="flex flex-col items-end justify-center">
                  <span className="font-mono font-extrabold">QUIZ</span>
                  <span className="font-mono font-extrabold">BUZZ</span>
                </div>
              </Link>
            </div>

            {/* <!-- Mobile menu button --> */}
            <div className="flex md:hidden">
              <button
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
                onClick={() => setShowMobileNav(!showMobileNav)}
              >
                <FaBars />
              </button>
            </div>
          </div>

          {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
          <div className={`${showMobileNav ? "block" : "hidden"} items-center md:flex`}>
            {/* TODO: Fix Styles */}
            <div className="flex flex-col mt-2 md:flex-row md:mt-0 md:mx-1">
              <Link
                to="/quiz-categories"
                className="my-1 text-sm leading-5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400 hover:underline md:mx-4 md:my-0"
              >
                Quiz-Categories
              </Link>

              {/* TODO: Add Reset Functionality - via component*/}
              <Link to="*" className="">
                Reset
              </Link>
            </div>

            <UserMenu user={user} auth={auth} />
          </div>
        </div>
      </div>
    </nav>
  );
};
