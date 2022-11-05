import React from "react";
import "./assets/global.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Cars from "./pages/cars";
import Login from "./pages/login";
import Register from "./pages/register";
import About from "./pages/about";
import Contacts from "./pages/contacts";
import Terms from "./pages/terms";
import FAQ from "./pages/faq";
import Profile from "./pages/profile";
import AddCar from "./pages/addCar";
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
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-car" element={<AddCar />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
