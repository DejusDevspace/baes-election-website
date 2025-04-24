import React, { createContext, useState, useEffect } from "react";
import authService from "../services/AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const studentData = await authService.getCurrentStudent();
          setStudent(studentData);
        }
      } catch (err) {
        console.error("Authentication error:", err);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const { student, token } = await authService.login(credentials);
      localStorage.setItem("token", token);
      setStudent(student);
      return student;
    } catch (err) {
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setStudent(null);
  };

  return (
    <AuthContext.Provider value={{ student, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
