import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { Link } from "react-router-dom";

const UserBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, auth } = useContext(AuthContext);
  return (
    <div
      className="relative flex flex-col justify-center items-center text-center select-none bg-gray-200 rounded-full w-[40px] h-[40px] md:w-9 md:h-9 md:ml-3 cursor-pointer border hover:border-gray-300"
      onClick={() => {
        setTimeout(() => setIsOpen((prev) => !prev), 100);
      }}
    >
      {
        // Display profile picture if you add file system to store images
      }
      <p className="m-auto"> {auth?.firstName[0].toLocaleUpperCase()}</p>
      {isOpen && (
        <ul
          className={`fixed md:absolute top-[10%] md:top-[100%] w-full h-full md:h-auto md:w-[115px] bg-white pt-[105px] md:p-3 text-xl md:text-md text-black md:text-gray-600 md:font-thin  rounded md:border mt-1 cursor-default ${
            isOpen &&
            "flex flex-col gap-4 left-[200%] md:left-auto slide-in-left md:animate-none"
          }`}
        >
          <li className="hover:text-gray-800">
            <Link to="/profile">Profile</Link>
          </li>
          {auth?.role === "admin" && (
            <li>
              <Link to="/new-car">Add Car</Link>
            </li>
          )}
          <li>
            <Link to="/my-rents">My Rents</Link>
          </li>
          <li>
            <button onClick={logout}>Sign out</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserBubble;
