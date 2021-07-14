import React from "react";
import firebase from "firebase/app";
import { signOut } from "../utils/firebaseFunctions";
import { Link, useNavigate } from "react-router-dom";

export interface UserMenuProps {
  user: firebase.User;
  auth: firebase.auth.Auth;
}

export const UserMenu: React.FC<UserMenuProps> = ({ user, auth }) => {
  const navigate = useNavigate();
  return (
    <div>
      {user && (
        <div className="flex items-center gap-2 border-black border-black rounded-full p-1">
          <div>{`User: ${user.displayName}`}</div>
          <button
            onClick={async () => {
              await signOut(auth);
              navigate("/");
            }}
            className="px-3 py-1 bg-red-800 text-white font-medium font-mono text-xl rounded-full"
          >
            Sign Out
          </button>
        </div>
      )}
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
