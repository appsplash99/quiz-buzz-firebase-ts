import React, { useEffect } from "react";
import { useAuth, useUser, useFirestore, useFirestoreDocData, useFirestoreCollection } from "reactfire";
import { signOut } from "../utils/firebaseFunctions";
import { useQuiz } from "../context/quiz-context";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export const UserResult = () => {
  const auth = useAuth();
  const { data: user } = useUser();
  const navigate = useNavigate();
  const {
    state: {
      user: { quizStartTime, quizFinishTime, playTime },
    },
    dispatch,
  } = useQuiz();

  useEffect(() => {
    const userTime = moment.duration(quizStartTime.diff(quizFinishTime));
    if (userTime) {
      console.log("Saving Quiz Finish Time");
      const gamePlaySeconds = userTime.asSeconds();
      dispatch({ type: "SET_GAME_PLAY_TIME", payload: gamePlaySeconds });
    }
  }, []);

  useEffect(() => {
    if ((user === null && auth) || (!user && auth)) navigate("/quiz-categories");
  }, []);

  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="bg-black text-white mb-4 p-2 h-8 text-center"> User Score Page </div>
      <div title="Displayname">{user.displayName}</div>
      <div title="Providers">
        <ul>
          {user.providerData.map((profile) => {
            if (profile) {
              return (
                <li key={profile.providerId}>
                  <div className="flex flex-col gap-2 items-center mx-60">
                    <div>User Profile Object: {JSON.stringify(profile)}</div>
                    <div>User Name: {profile.displayName}</div>
                    <div>User Email: {profile.email}</div>
                    <div>Password: {profile.providerId}</div>
                    <div>userdata: {JSON.stringify({ quizStartTime, quizFinishTime, playTime })}</div>
                  </div>
                </li>
              );
            } else {
              return "null profile";
            }
          })}
        </ul>
      </div>
      <div>
        <button
          onClick={async () => await signOut(auth)}
          className="px-3 py-1 bg-red-400 text-white font-medium font-mono text-xl rounded-full"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};
