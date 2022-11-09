import React, { useEffect, useState, useContext } from "react";
import MainLayout from "./../../layouts/MainLayout";
import axios from "axios";
import { ICar } from "./../../../types.d";
import { useParams, useNavigate, Link } from "react-router-dom";
import { formatCurrency } from "./../../utils/formatCurrency";
import { handleAxiosErrors } from "../../utils/helpfulFunctions";
import { DateRangePicker } from "./../../components/searchForm/DateRangePicker";
import AuthContext from "./../../context/AuthProvider";
import { IUser } from "../../utils/interfaces";
import Gallery from "./../../components/gallery/Gallery";

const Index = () => {
  const [car, setCar] = useState<ICar>();
  const [user, setUser] = useState<IUser | null>();
  const [error, setError] = useState<String>();
  const [days, setDays] = useState(1);
  const [modal, setModal] = useState(false);
  const { id } = useParams();
  const { getUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getCar = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/cars/get/${id}`
        );
        setCar(() => data);
      } catch (error) {
        navigate("/redirect");
      }
    };
    getCar();
  }, [id, navigate]);

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

  const handleOrder = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/orders/create`, {
        userId: user?.id,
        carId: car?._id,
        pick: sessionStorage.getItem("pick"),
        drop: sessionStorage.getItem("drop"),
      });
      navigate("/my-rents");
    } catch (error) {
      if (user === null) {
        setError("Error: You need to Log in to Rent a Car.");
      } else {
        setError(handleAxiosErrors(error));
      }
      window.scrollTo(0, 0);
    }
  };

  const handleDelete = async () => {
    try {
      if (user?.role === "admin") {
        await axios.delete(
          `${process.env.REACT_APP_SERVER_URL}/cars/delete/${car?._id}`
        );
        navigate("/cars");
      }
    } catch (error) {
      if (user === null) {
        setError("Error: You need to Log in to Rent a Car.");
      } else {
        setError(handleAxiosErrors(error));
      }
      window.scrollTo(0, 0);
    }
  };

  return (
    <MainLayout>
      {modal && (
        <div
          className={`${
            modal
              ? "fixed top-0 left-0 z-[9999] w-[100%] h-[100vh] overflow-hidden bg-black bg-opacity-50 "
              : "hidden"
          }`}
          onClick={() => setModal(() => false)}
        >
          <div className="flex flex-col p-5 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]  w-[100%] md:w-auto h-fit md:h-auto bg-white font-bold text-lg">
            <h1 className="mb-10">Please confirm</h1>
            <p>Are you sure you want to delete this car?</p>
            <div className="flex">
              <button
                onClick={() => setModal(false)}
                className="flex m-auto text-black w-fit my-6 border-2 border-indigo-800 p-1 px-4 rounded-full hover:bg-sky-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex m-auto text-white bg-sky-800 w-fit my-6 border-2 border-indigo-800 p-1 px-4 rounded-full hover:bg-sky-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {car ? (
        <div className="flex flex-col gap-5 md:pЬ-[80px] mt-3">
          {user?.role === "admin" && (
            <div className="self-center">
              <Link to={`/cars/edit/${car?._id}`}>
                <button className="w-fit self-center mt-5 border rounded-full border-gray-400 hover:border-gray-500 px-6 py-1 bg-gray-100 hover:bg-gray-200 m-5">
                  EDIT
                </button>
              </Link>
              <button
                className="w-fit self-center mt-5 border rounded-full border-gray-400 hover:border-gray-500 px-6 py-1 bg-gray-100 hover:bg-gray-200 m-5"
                onClick={() => setModal(true)}
              >
                DELETE
              </button>
            </div>
          )}
          {error && (
            <div className="text-2xl text-center text-rose-400">{error}</div>
          )}
          <div className="text-center capitalize text-2xl">
            <h1 className="font-bold">{car?.brand + " " + car?.model}</h1>
            <div className="flex w-fit text-lg gap-8 m-auto mt-2">
              <p>Type: {car?.type}</p>
              <p>Fuel: {car?.fuel}</p>
              <p>Seats: {car?.seats}</p>
              <p>Year: {car?.year}</p>
            </div>
          </div>
          <Gallery images={car?.images} />
          <div className="flex flex-col gap-5 text-lg p-4">
            <p>{car?.description}</p>
            <div className="md:w-1/3 text-center self-center">
              <DateRangePicker setDays={setDays} />
            </div>
            <button
              onClick={handleOrder}
              className="flex m-auto text-white bg-sky-800 text-start w-fit my-6 border-2 border-indigo-800 p-1 px-4 rounded-full hover:bg-sky-700"
            >
              Rent Now - {formatCurrency(car?.price! * days)}
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-[100vh]"></div>
      )}
    </MainLayout>
  );
};

export default Index;
