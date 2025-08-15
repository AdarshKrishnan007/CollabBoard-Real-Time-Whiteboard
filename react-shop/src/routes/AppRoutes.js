import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Boards from "../pages/Boards";
import WhiteboardPage from "../pages/WhiteboardPage";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/Boards" element={<Boards />} />
      <Route path="/whiteboard/:id" element={<WhiteboardPage />} />
    </Routes>
  );
}

export default AppRoutes;
