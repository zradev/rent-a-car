import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo/logo.jpg";

const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <nav className="relative bg-white shadow-sm m-5 mx-10">
      <div className="flex items-center justify-between w-full text-black font-semibold text-lg">
        <div className="relative z-50  flex justify-between w-full md:w-auto">
          <Link
            to="/"
            className="flex justify-center items-center gap-3 hover:text-blue-500"
          >
            <img src={logo} alt="logo" width={60} />
            <p className=" text-3xl  font-semibold">Rent a Car</p>
          </Link>
          <button
            onClick={() => setIsNavbarOpen((prev) => !prev)}
            className={`relative z-50 w-10 md:hidden text-5xl hover:text-blue-500`}
          >
            {isNavbarOpen ? "x" : "="}
          </button>
        </div>
        <div
          className={`top-0 w-full h-full pt-[20vh] px-9 md:w-auto md:static md:h-auto md:p-0 bg-white ${
            isNavbarOpen
              ? "fixed md:static left-[-100%] slide-in-left"
              : "fixed md:block left-0 slide-out-left"
          }`}
        >
          <ul className="flex flex-col items-center gap-6 text-xl mt-10 md:flex-row md:mt-0">
            <li className="hover:text-blue-500">
              <Link to="/cars">Cars</Link>
            </li>
            <li className="hover:text-blue-500">
              <Link to="/locations">Locations</Link>
            </li>
            <li className="hover:text-blue-500">
              <Link to="/contacts">Contacts</Link>
            </li>
            <li className="hover:text-blue-500">
              <Link to="/about">About Us</Link>
            </li>
            <button className="text-white bg-blue-800 text-start w-fit border-2 border-indigo-800	 p-1 px-4 rounded-full bg-gray-100">
              Log in
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
