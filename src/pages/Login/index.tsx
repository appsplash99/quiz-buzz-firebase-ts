import React, { useState } from "react";
import { useAuth } from "reactfire";
import { FaUnlock } from "react-icons/fa";
import { IoMdMail, IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const auth = useAuth();
  const [email, setEmail] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");

  /** TODO:  might need to change type of event */
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const resp = await auth.signInWithEmailAndPassword(email, password);
      // TODO: change ui response for succesful login
      alert("Logged In: " + resp?.user?.email);
    } catch (e) {
      setShowError(true);
      setValidationError((prev) => e.message);
      // alert("ERROR: " + e.message);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
      <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
        Login To Your Account
      </div>
      <form onSubmit={handleSubmit}>
        {/* ERROR VALIDATION */}
        {validationError && (
          <div
            className={`${
              !showError && "hidden"
            } relative bg-yellow-200 border-yellow-600 text-yellow-600 border-l-4 p-4 mb-4`}
          >
            <IoIosClose
              className="absolute right-2 top-2 text-yellow-600 font-extrabold text-4xl cursor-pointer"
              onClick={() => setShowError(false)}
            />
            <p className="font-bold">Error</p>
            <p>{validationError}</p>
          </div>
        )}

        <div className="flex flex-col mb-2">
          <div className="flex relative ">
            <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
              <IoMdMail height="15" width="15" />
            </span>
            <input
              type="text"
              id="sign-in-email"
              className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col mb-6">
          <div className="flex relative ">
            <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
              <FaUnlock height="15" width="15" />
            </span>
            <input
              type="password"
              id="sign-in-email"
              className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex w-full">
          {/* TODO: CONVERT INTO CUSTOM BUTTON */}
          <button
            type="submit"
            className="py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            Login
          </button>
        </div>
      </form>
      <div className="flex items-center justify-center mt-6">
        <p className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white">
          <span className="ml-2 flex gap-2">
            Don't have an account?
            <Link to="/signup">
              <span className="font-semibold">Sign Up</span>
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};
