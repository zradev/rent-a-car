import React, { useState, useEffect, useContext } from "react";
import MainLayout from "./../../layouts/MainLayout";
import AuthContext from "./../../context/AuthProvider";
import PersonalData from "../../components/profile/PersonalData";
import { IAuth } from "../../utils/interfaces";

const Index = () => {
  const { auth, getUserData } = useContext(AuthContext);
  const [user, setUser] = useState<IAuth>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = async () => {
      try {
        const data = await getUserData();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    userData();
  }, [getUserData]);

  return (
    <MainLayout>
      {isLoading ? (
        <div className="h-[100vh]">Loading...</div>
      ) : auth ? (
        <div className="flex flex-col md:flex-row w-full p-3 lg:px-[250px] md:px-[200px]">
          <PersonalData auth={user} />
        </div>
      ) : (
        <p>Please Log In</p>
      )}
    </MainLayout>
  );
};

export default Index;
