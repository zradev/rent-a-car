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
  const [preventAnimationOnLoad, setPreventAnimationOnLoad] = useState(true);
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
    <div ref={bubble}>
      <button
        onClick={() => {
          setIsOpen((prev) => {
            setPreventAnimationOnLoad(false);
            return !prev;
          });
        }}
        className={`flex items-center justify-center relative bg-gray-200 z-50 w-9 h-9 m-auto text-xl rounded-full hover:border`}
      >
        <p className="w-min h-min">{user?.firstName[0].toLocaleUpperCase()}</p>
      </button>
      <div
        className={`fixed md:absolute top-0 w-full h-full pt-[20vh] px-9 md:w-max md:static md:h-auto md:p-5 md:mt-2 bg-white ${
          isOpen
            ? " right-[-100%] md:top-[100%] slide-in-right md:animate:none md:animate-none md:rounded-lg md:border"
            : preventAnimationOnLoad
            ? " right-[-100%] md:hidden"
            : " right-0 slide-out-right md:hidden"
        }`}
      >
        {isOpen && (
          <ul className="flex flex-col items-center space-y-10 md:space-y-1 md:gap-4 text-2xl md:text-xl mt-10 md:mt-0">
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
    </div>
  );
};

export default UserBubble;
