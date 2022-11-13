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
  const [isOpen, setIsOpen] = useState(false);
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

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
  }, [navigate, user]);

  const handleDelete = async () => {
    await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/user/delete/${user?.id}`
    );
    logout();
    navigate("/");
  };

  return (
    <MainLayout>
      {isOpen && (
        <div
          className={`${
            isOpen
              ? "fixed top-0 left-0 z-[9999] w-[100%] h-[100vh] overflow-hidden bg-black bg-opacity-50 "
              : "hidden"
          }`}
          onClick={() => setIsOpen(() => false)}
        >
          <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex w-auto h-auto">
            <div className="flex flex-col gap-5 bg-white px-8 pt-10 text-xl">
              <h1>Please confirm</h1>
              <p>Are you sure you want to delete this account?</p>
              <div className="flex gap-8 justify-center">
                <button
                  onClick={() => setIsOpen(() => false)}
                  className="bg-sky-100 text-black font-bold text-start w-fit my-10 border-2 border-black p-1 px-4 rounded-full hover:bg-sky-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="text-white bg-sky-800 text-start w-fit my-10 border-2 border-indigo-800 p-1 px-4 rounded-full hover:bg-sky-700"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoading ? (
        <div className="h-[100vh]">Loading...</div>
      ) : (
        user && (
          <div className="flex flex-col items-center gap-[50px] w-full p-3 lg:px-[250px] md:px-[200px] my-[50px]">
            <PersonalData user={user!} />
            <LicenseData user={user!} />
            <div className="text-center">
              <h2>
                This is permanent. <br />
                When you delete your account, you won't be able to retrieve it
                and all your data and rentals will be lost. <br />
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
                onClick={() => setIsOpen(true)}
              >
                Delete Account
              </button>
            </div>
          </div>
        )
      )}
    </MainLayout>
  );
};

export default Index;
