import React from "react";
import firebase from "firebase/app";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../utils/firebaseFunctions";

export interface UserMenuProps {
  user: firebase.User;
  auth: firebase.auth.Auth;
}

// TODO: FIX NAV USER MENU BUTTONS
export const LoggedInUserMenu: React.FC<UserMenuProps> = ({ user, auth }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-2 mt-2 md:flex-row md:mt-0 md:mx-1">
      <h2 className="font-bold font-mono text-lg">
        <Link to="/quiz-categories">CATEGORIES</Link>
      </h2>
      {user && (
        <div className="flex items-center gap-12 border-black border-black rounded-full p-1">
          <h2 className="font-bold font-mono">{`${user.displayName}`}</h2>
          <button
            onClick={() => {
              signOut(auth);
              navigate("/signup");
            }}
            className="font-mono text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 px-3 py-2 mx-1"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
