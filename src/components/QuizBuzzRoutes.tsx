import React from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { Login, PlayQuizSet, QuizCategories, QuizStarter, SignUp, UserResult, Signup } from "../pages";

import { DefaultReactFireQuery } from "../pages/reactfire/DefaultReactFireQuery";
import { ReactFireTutorial } from "../pages/reactfire/ReactFireTutorial";
import { useUser } from "reactfire";

export const QuizBuzzRoutes = () => {
  const { data: user } = useUser();
  return (
    <div className={`quiz-app__body ${user && "mt-8"}`}>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* TODO: Remove below two routes when done */}
        <PrivateRoute path="/default-reactfire-query" element={<DefaultReactFireQuery />} />
        <PrivateRoute path="/react-fire-tutorial" element={<ReactFireTutorial />} />

        {/** PRIVATE ROUTES - BELOW */}
        <PrivateRoute path="/quiz-categories" element={<QuizCategories />} />
        <PrivateRoute path="/quiz/:categoryId/:quizSetId/:questionNumber" element={<PlayQuizSet />} />
        <PrivateRoute path="/quiz/:categoryId/:quizSetId/quiz-starter" element={<QuizStarter />} />

        {/* TODO: Fix this issue
         * Issue: After authentication, when user logs in - component completly unmounts and blank screen appears
         */}
        <PrivateRoute path="/user-score" element={<UserResult />} />
        {/** PRIVATE ROUTES - ABOVE */}

        <Route path="*" element={<>Route Not found</>} />
      </Routes>
    </div>
  );
};
