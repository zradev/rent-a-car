import React from "react";
import "./assets/global.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Cars from "./pages/cars";
import Login from "./pages/login";

function App() {
  return (
    <div className="w-full h-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
