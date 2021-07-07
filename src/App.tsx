import React from "react";
import { Route, Routes } from "react-router-dom";

/** AS PER REACTFIRE DOCS */
// Import auth directly because most components need it
// Other Firebase libraries can be lazy-loaded as-needed
import "firebase/auth";

// components
import { Home } from "./pages/Home";
import { QuizCategories } from "./pages/QuizCategories";
import { PlayQuizSet } from "./pages/PlayQuizSet";
import { QuizStarter } from "./pages/QuizStarter";
import { PrivateRoute } from "./components/PrivateRoute";
import { QuizBuzzNav } from "./components/QuizBuzzNav";

// Pages
import { SignUpPage } from "./pages/SignUp";
import { LoginPage } from "./pages/Login";
import { UserScore } from "./pages/UserScore";

// css styles
import "./App.css";

export const App = () => {
  const [showMobileNav, setShowMobileNav] = React.useState<boolean>(false);

  return (
    <div className="flex flex-col items-center">
      <QuizBuzzNav showMobileNav={showMobileNav} setShowMobileNav={setShowMobileNav} />
      <div className="quiz-app__body mt-8">
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/** PRIVATE ROUTES - BELOW */}
          <PrivateRoute path="/quiz-categories" element={<QuizCategories />} />
          <PrivateRoute path="/quiz/:categoryId/:quizSetId/:questionNumber" element={<PlayQuizSet />} />
          <PrivateRoute path="/quiz/:categoryId/:quizSetId/quiz-starter" element={<QuizStarter />} />

          {/* TODO: Fix this issue
           * Issue: After authentication, when user logs in - component completly unmounts and blank screen appears
           */}
          <PrivateRoute path="/user-score" element={<UserScore />} />
          {/** PRIVATE ROUTES - ABOVE */}

          <Route path="*" element={<>Route Not found</>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
