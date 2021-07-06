import React from 'react';
import { Route, Navigate } from 'react-router-dom';

import { useAuth } from '../../context/auth-context/auth-context';

export const PrivateRoute: React.FC = ({ path, ...props }) => {
  const { currentUser } = useAuth();
  return auth.token ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
};
