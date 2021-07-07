import React from "react";
// TODO: Check whether this is the correct type
import { RouteProps } from "react-router";
import { Route, Navigate } from "react-router-dom";
import { useSigninCheck } from "reactfire";

export const PrivateRoute: React.FC<RouteProps> = ({ path, ...props }): React.ReactElement | null => {
  const { status, data: signInCheckResult } = useSigninCheck();

  if (status === "loading") {
    return (
      // TODO: ADD SPINNER LOADER HERE
      <div className="bg-purple-600 mt-60 text-xl text-white font-mono font-bold h-6 px-2 py-1 rounded-full">
        Loading...
      </div>
    );
  }

  if (signInCheckResult.signedIn === true) {
    // return <ProfilePage user={signInCheckResult.user} />;
    // TODO: might need to save user into context here

    return <Route {...props} path={path} />;
  } else {
    // return <SignInForm />;
    return <Navigate state={{ from: path }} replace to="/login" />;
  }
};
