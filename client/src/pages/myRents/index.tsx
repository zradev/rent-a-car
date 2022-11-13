import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import MainLayout from "./../../layouts/MainLayout";
import AuthContext from "./../../context/AuthProvider";
import { IUser } from "../../utils/interfaces";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { FaClock, FaCheck, FaTrash, FaSpinner } from "react-icons/fa";

const Index = () => {
  const [user, setUser] = useState<IUser | null>();
  const [orders, setOrders] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number>();
  const { getUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(orders);

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

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/orders/get-all-from/${user?.id}`
        );

        const sortedData = data.sort(
          (a: any, b: any) =>
            new Date(dayjs(b.drop, "DD-MM-YYYY").toDate()).getTime() -
            new Date(dayjs(a.drop, "DD-MM-YYYY").toDate()).getTime()
        );
        setOrders(sortedData);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, [user?.id]);

  const handleDelete = async () => {
    await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/orders/delete/${deleteId}`
    );
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
              <p>Are you sure you want to delete this rental order?</p>
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
      {orders && (
        <div className="flex flex-col my-10 justify-center items-center ">
          <h2 className="text-2xl text-center mb-3 md:mb-8">Your Rents:</h2>
          <table className="w-full mx-0.5 md:w-2/3 text-center mb-[200px]">
            <thead>
              <tr>
                <th>№</th>
                <th>Car</th>
                <th>Pick</th>
                <th>Drop</th>
                <th className="">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any, index: number) => (
                <tr key={order._id} className="[&>*]:py-2">
                  <td>{index + 1}</td>
                  <td>
                    <Link
                      to={`/cars/product/${order.carId}`}
                      className="text-sky-800 font-bold"
                    >
                      See
                    </Link>
                  </td>
                  <td>{order.pick}</td>
                  <td>{order.drop}</td>
                  <td className="flex gap-3 justify-center">
                    {order.isActive ? (
                      <>
                        {dayjs(order.pick, "DD-MM-YYYY") > dayjs() ? (
                          <>
                            <p className="hidden md:block">Pending</p>
                            <FaClock className="text-yellow-500" />
                          </>
                        ) : (
                          <>
                            <p className="hidden md:block">Ongoing</p>
                            <FaSpinner className="text-sky-500 animate-spin" />
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <p className="hidden md:block">Completed</p>
                        <FaCheck className="text-green-500" />
                      </>
                    )}
                  </td>
                  {dayjs(order.pick, "DD-MM-YYYY") > dayjs() && (
                    <td>
                      <button
                        onClick={() => {
                          setIsOpen(true);
                          setDeleteId(order._id);
                        }}
                        className="bg-red-500 text-white font-bold p-1"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </MainLayout>
  );
};

export default Index;
