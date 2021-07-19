import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../utils/firebaseFunctions";
import { useUser, useAuth } from "reactfire";

// TODO: FIX NAV USER MENU BUTTONS
export const LoggedInUserMenu: React.FC = () => {
  const auth = useAuth();
  const { data: user } = useUser();
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>("");

  useEffect(() => {
    if (!userName) {
      setUserName(user?.displayName);
    }
  });

  return (
    <div className="flex flex-col items-center gap-2 mt-2 md:flex-row md:mt-0 md:mx-1">
      <h2 className="font-bold font-mono text-lg">
        <Link to="/quiz-categories">CATEGORIES</Link>
      </h2>
      {user && (
        <div className="flex items-center gap-6 border-black border-black rounded-full p-1">
          <h2 className="font-bold font-mono">{`${userName}`}</h2>
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
