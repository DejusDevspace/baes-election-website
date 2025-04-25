import React, { useState, useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { VotingProvider } from "./context/VotingContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import baesLogo from "./assets/logo.png";

const AppContent = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-primary text-white">
        <img
          src={baesLogo}
          alt="logo"
          className="min-h-[20%] z-10 animate-spin-slow"
        />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col overflow-x-hidden bg-primary z-0">
      <Header />
      <main className="relative z-10 flex-grow flex flex-col justify-center items-center">
        <AppRoutes />
      </main>
      <Footer />
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
