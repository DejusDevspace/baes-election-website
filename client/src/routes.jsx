import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Vote from "./pages/Vote";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/vote" element={<Vote />} />
      {/* <Route path="/results" element={<Results />} /> */}
      {/* <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      /> */}
      {/* <Route path="/404" element={<NotFound />} /> */}
      {/* <Route path="*" element={<Navigate to="/404" />} /> */}
    </Routes>
  );
};

export default AppRoutes;
