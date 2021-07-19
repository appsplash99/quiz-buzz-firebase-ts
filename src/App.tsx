import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { useUser } from "reactfire";
import { useQuiz } from "./context/quiz-context";
import { useToast } from "./context/toast-context";
import { QuizBuzzNav, QuizBuzzRoutes, Loader } from "./components";
import "tailwindcss/tailwind.css";

export const App = () => {
  const [showMobileNav, setShowMobileNav] = React.useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: user } = useUser();
  const { ToastContainer } = useToast();
  const { dispatch } = useQuiz();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = firebase
      .firestore()
      .collection("quizCategories")
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => doc.data());
        dispatch({ type: "MOUNT_QUIZ_CATEGORIES", payload: data });
        setLoading(false);
      });
    return () => unsubscribe();
  }, []);

  if (loading) return <Loader />;
  return (
    <div className="flex flex-col items-center">
      {user && <QuizBuzzNav showMobileNav={showMobileNav} setShowMobileNav={setShowMobileNav} />}
      <QuizBuzzRoutes />
      <ToastContainer />
    </div>
  );
};

export default App;
