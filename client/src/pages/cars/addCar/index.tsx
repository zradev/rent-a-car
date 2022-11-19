import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AddCar from "../../../components/addCar/AddCar";
import AuthContext from "../../../context/AuthProvider";
import MainLayout from "../../../layouts/MainLayout";

const Index = () => {
  const { userRole } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole !== "user" && userRole !== "admin") {
      return navigate("/login");
    }
  }, [navigate, userRole]);

  return (
    <MainLayout>
      <AddCar />
    </MainLayout>
  );
};

export default Index;
