import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useVoting } from "../../context/VotingContext";

/**
 * Wraps protected routes and redirects unauthenticated users
 * @param {ReactNode} children - Component to render if authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { student, loading } = useContext(AuthContext);
  const { hasVoted } = useVoting();

  if (loading) return <p>Loading...</p>;

  if (!student) return <Navigate to="/login" replace />;

  if (hasVoted) return <Navigate to="/response-recorded" replace />;

  return children;
};

export default ProtectedRoute;
