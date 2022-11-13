import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AddCar from "../../../components/addCar/AddCar";
import AuthContext from "../../../context/AuthProvider";
import MainLayout from "../../../layouts/MainLayout";
import { IUser } from "../../../utils/interfaces";

const Index = () => {
  const { getUserData } = useContext(AuthContext);
  const [user, setUser] = useState<IUser | null>();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = async () => {
      try {
        const data = await getUserData();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    userData();
  }, [getUserData]);

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
  }, [navigate, user]);

  return (
    <MainLayout>
      <AddCar />
    </MainLayout>
  );
};

export default Index;
