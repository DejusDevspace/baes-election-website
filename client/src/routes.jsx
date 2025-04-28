import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Vote from "./pages/VotingPage";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import NotFound from "./pages/404";
import ThankYou from "./pages/ThankYou";

const AppRoutes = () => {
  const { student } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={student ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/vote"
        element={
          <ProtectedRoute>
            <Vote />
          </ProtectedRoute>
        }
      />
      <Route path="/response-recorded" element={<ThankYou />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default AppRoutes;
