import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSigninCheck } from "reactfire";
import { Loader } from "../components";

export const PrivateRoute: React.FC<{
  element: React.ReactElement | null;
  path: string;
}> = ({ path, element, ...props }) => {
  const { status, data: signInCheckResult } = useSigninCheck();

  if (status === "loading") {
    return <Loader />;
  }

  if (signInCheckResult.signedIn === true) {
    return <Route path={path} element={element} {...props} />;
  } else {
    return <Navigate state={{ from: path }} replace to="/login" />;
  }
};
