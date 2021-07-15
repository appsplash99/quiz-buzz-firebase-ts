import React from "react";
import { useUser } from "reactfire";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { Login, PlayQuizSet, QuizCategories, QuizStarter, UserResult, Signup } from "../pages";

export const QuizBuzzRoutes = () => {
  const { data: user } = useUser();
  return (
    <div className={`quiz-app__body ${user && "mt-8"}`}>
      <Routes>
        {/* PUBLIC ROUTES */}
        {<Route path="/signup" element={<Signup />} />}
        {!user && <Route path="/login" element={<Login />} />}
        {/* TODO: MAKE LEADER BOARD */}
        <Route path="/" element={<>QUIZ LEADERBOARD</>} />

        {/** PRIVATE ROUTES - BELOW */}
        <PrivateRoute path="/quiz-categories" element={<QuizCategories />} />
        <PrivateRoute path="/play-quiz" element={<PlayQuizSet />} />
        <PrivateRoute path="/quiz-starter" element={<QuizStarter />} />
        <PrivateRoute path="/user-score" element={<UserResult />} />

        <Route path="*" element={<>Route Not found</>} />
      </Routes>
    </div>
  );
};
