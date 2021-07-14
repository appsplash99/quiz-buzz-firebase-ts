import React from "react";
import { useAuth, useUser } from "reactfire";
import { signOut } from "../utils";
import { useQuiz } from "../context/quiz-context";

export const UserResult = () => {
  const auth = useAuth();
  const { data: user } = useUser();
  const {
    state: { user: userScore },
    dispatch,
  } = useQuiz();

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
          onClick={() => signOut(auth)}
          className="px-3 py-1 bg-red-400 text-white font-medium font-mono text-xl rounded-full"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};
