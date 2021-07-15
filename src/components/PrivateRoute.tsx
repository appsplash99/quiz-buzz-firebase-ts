import React from "react";
// TODO: Check whether this is the correct type
import { RouteProps } from "react-router";
import { Route, Navigate } from "react-router-dom";
import { useSigninCheck } from "reactfire";
import { Loader } from "../components";

export const PrivateRoute: React.FC<RouteProps> = ({ path, ...props }): React.ReactElement | null => {
  const { status, data: signInCheckResult } = useSigninCheck();

  if (status === "loading") {
    return <Loader />;
  }

  if (signInCheckResult.signedIn === true) {
    return <Route {...props} path={path} />;
  } else {
    return <Navigate state={{ from: path }} replace to="/login" />;
  }
};
