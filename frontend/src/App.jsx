import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route, Outlet } from "react-router-dom";
import LoginSignupPage from "./pages/Login_Signup/LoginSignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home/Home";

import Navbar from "./pages/Home/components/Navbar";
import Profile from "./pages/Profile/Profile";

const ProtectedLayout = () => {
  return (
    <div className="h-screen relative bg-[#efebd5]">
      <Navbar />
      <Outlet /> {/* This renders the nested child routes */}
    </div>
  );
};

const App = () => {
  return (
    <div className="h-screen">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginSignupPage />} />
        <Route path="/signup" element={<LoginSignupPage />} />

        {/* Protected Routes with Navbar */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
