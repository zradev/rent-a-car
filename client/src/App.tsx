import React from "react";
import "./assets/global.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Cars from "./pages/cars";
import Login from "./pages/login";
import Register from "./pages/register";
import { AuthProvider } from "./context/AuthProvider";
import useScrollToTop from "./hooks/useScrollToTop";

function App() {
  useScrollToTop();
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
