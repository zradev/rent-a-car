import React from "react";
import Header from "./components/header";
import "./assets/global.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";

function App() {
  return (
    <div className="w-full h-full">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
