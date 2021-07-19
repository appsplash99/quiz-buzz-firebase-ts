import React from "react";
import firebase from "firebase/app";
import { Link } from "react-router-dom";
import { useUser, useAuth } from "reactfire";

export const LoggedOutUserMenu: React.FC = () => {
  const { data: user } = useUser();
  const auth = useAuth();

  return (
    <div>
      {!user && (
        <div className="flex items-center py-2 -mx-1 md:mx-0">
          <Link
            to="/login"
            className="block w-1/2 px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-theme-red md:mx-2 md:w-auto"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="block w-1/2 px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 md:mx-0 md:w-auto"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};
