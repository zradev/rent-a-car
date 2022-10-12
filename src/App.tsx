import React from "react";
import Header from "./components/header";
import "./assets/global.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="w-full h-full">
      <Header />
      <Routes>
        <Route path="/" element={<></>} />
      </Routes>
    </div>
  );
}

export default App;
