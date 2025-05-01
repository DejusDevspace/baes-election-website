import React, { useState, useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { VotingProvider } from "./context/VotingContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContent = () => {
  const { loading } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-primary z-0">
      <ToastContainer position="top-left" autoClose={3000} theme="colored" />

      {loading ? (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden text-white">
          <img
            src="/assets/logo.png"
            alt="logo"
            className="min-h-[20%] z-10 animate-spin-slow"
          />
        </div>
      ) : (
        <>
          <Header />
          <main className="relative z-10 flex-grow flex flex-col justify-center items-center">
            <AppRoutes />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <VotingProvider>
        <Router>
          <AppContent />
        </Router>
      </VotingProvider>
    </AuthProvider>
  );
}

export default App;
