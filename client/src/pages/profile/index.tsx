import React, { useState, useEffect, useContext } from "react";
import MainLayout from "./../../layouts/MainLayout";
import AuthContext from "./../../context/AuthProvider";
import PersonalData from "../../components/profile/PersonalData";
import { IUser } from "../../utils/interfaces";
import LicenseData from "../../components/profile/LicenseData";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const { getUserData, logout } = useContext(AuthContext);
  const [user, setUser] = useState<IUser | null>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/user/delete/${user?.id}`
    );
    logout();
    navigate("/");
  };

  return (
    <MainLayout>
      {isLoading ? (
        <div className="h-[100vh]">Loading...</div>
      ) : user ? (
        <div className="flex flex-col items-center gap-[50px] w-full p-3 lg:px-[250px] md:px-[200px] my-[50px]">
          <PersonalData user={user!} />
          <LicenseData user={user!} />
          <div className="text-center">
            <h2>
              This is permanent. <br />
              When you delete your account, you won't be able to retrieve it and
              all your data and rentals will be lost. <br />
              If you have an{" "}
              <Link
                to="/my-rents"
                className="md:hover:text-sky-500 text-lg text-sky-900 font-bold"
              >
                active rental
              </Link>{" "}
              you won't be able to delete your account.
            </h2>
            <button
              className="text-white bg-sky-800 text-start w-fit my-10 border-2 border-indigo-800 p-1 px-4 rounded-full hover:bg-sky-700"
              onClick={handleDelete}
            >
              Delete Account
            </button>
          </div>
        </div>
      ) : (
        <p>Please Log In</p>
      )}
    </MainLayout>
  );
};

export default Index;
