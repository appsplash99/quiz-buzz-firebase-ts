import React, { createContext, useState, useEffect, useContext } from 'react';
import firebase from 'firebase';
import { app } from '../../firebase';

const AuthContext = createContext<firebase.User | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  /** TODO: might need to move these states to reducer */
  const [currentUser, setCurrentUser] = useState<typeof firebase.User | null>(
    null
  );
  const [pending, setPending] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
