import React, { useState, useContext, useEffect, useRef } from "react";
import AuthContext from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import { useScrollLock } from "../../hooks/useScrollLock";
import { IUser } from "../../utils/interfaces";

const UserBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<IUser | null>();
  const { logout, getUserData } = useContext(AuthContext);
  const { lockScroll, unlockScroll } = useScrollLock();
  const bubble = useRef<any>(null);

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
    if (window.innerWidth < 768) isOpen ? lockScroll() : unlockScroll();
  }, [isOpen, lockScroll, unlockScroll]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (bubble.current && !bubble.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [bubble]);

  return (
    <div
      ref={bubble}
      className="relative flex flex-col justify-center items-center text-center select-none bg-gray-200 rounded-full w-[40px] h-[40px] md:w-9 md:h-9 md:ml-3 cursor-pointer border hover:border-gray-300"
      onClick={() => {
        setTimeout(() => setIsOpen((prev) => !prev), 100);
      }}
    >
      {
        // Display profile picture if you add file system to store images
      }
      <p className="m-auto"> {user?.firstName[0].toLocaleUpperCase()}</p>
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
          {user?.role === "admin" && (
            <li>
              <Link to="/add-car">Add Car</Link>
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
