import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import LoginSignupPage from "./pages/Login_Signup/LoginSignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home/Home";
const App = () => {
  return (
    <div className="h-screen">
      <Routes>
        <Route path="/login" element={<LoginSignupPage />} />
        <Route path="/signup" element={<LoginSignupPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
