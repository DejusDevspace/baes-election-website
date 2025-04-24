import React, { useState, useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function App() {
  // const { student, loading } = useContext(AuthContext);

  return (
    <AuthProvider>
      <Router>
        <div className="relative flex flex-col overflow-x-hidden bg-primary z-0">
          <Header />
          <main className="relative z-10 flex-grow flex flex-col justify-center items-center">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
