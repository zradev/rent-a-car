import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo/logo.jpg";
import AuthContext from "./../../../context/AuthProvider";
import UserBubble from "../../profile/UserBubble";
import { useScrollLock } from "../../../hooks/useScrollLock";

const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [preventAnimationOnLoad, setPreventAnimationOnLoad] = useState(true);
  const { auth } = useContext(AuthContext);
  const { lockScroll, unlockScroll } = useScrollLock();
  const navRef = useRef<any>(null);
  const buttonRef = useRef<any>(null);

  useEffect(() => {
    isNavbarOpen ? lockScroll() : unlockScroll();
  }, [isNavbarOpen, lockScroll, unlockScroll]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsNavbarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navRef]);

  return (
    <nav className=" bg-white shadow-sm  p-3 md:mx-10">
      <div className=" flex items-center w-full text-black font-semibold text-lg">
        <div className="relative z-50 flex flex-row-reverse md:flex-row justify-between w-[60%] md:w-auto mr-auto">
          <Link
            to="/"
            className="flex justify-center items-center gap-3 hover:text-blue-500"
          >
            <img src={logo} alt="logo" width={60} />
            <p className="hidden md:block text-3xl  font-semibold">
              Rent a Car
            </p>
          </Link>
          <button
            ref={buttonRef}
            onClick={() =>
              setIsNavbarOpen((prev) => {
                setPreventAnimationOnLoad(false);
                return !prev;
              })
            }
            className={`relative z-50 w-10 md:hidden text-5xl hover:text-blue-500`}
          >
            {isNavbarOpen ? "x" : "="}
          </button>
        </div>
        <div
          className={`top-0 w-full h-full pt-[20vh] px-9 md:w-auto md:static md:h-auto md:p-0 bg-white ${
            isNavbarOpen
              ? "fixed md:static left-[-100%] slide-in-left"
              : preventAnimationOnLoad
              ? "fixed md:block left-[-100%] "
              : "fixed md:block left-0 slide-out-left"
          }`}
        >
          <ul
            className="flex flex-col items-center space-y-10 md:space-y-0 md:gap-4 text-2xl md:text-xl mt-10 md:flex-row md:mt-0"
            ref={navRef}
          >
            <li className="hover:text-blue-500">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-blue-500">
              <Link to="/cars">Cars</Link>
            </li>
            <li className="hover:text-blue-500">
              <Link to="/contacts">Contacts</Link>
            </li>
            <li className="hover:text-blue-500">
              <Link to="/about">About Us</Link>
            </li>
          </ul>
        </div>
        <div className="ml-3 relative">
          {!auth ? (
            <Link to="/login">
              <button className="relative text-white bg-sky-800 text-start w-fit border-2 border-indigo-800 p-1 px-4 rounded-full hover:bg-sky-700">
                Log in
              </button>
            </Link>
          ) : (
            <UserBubble />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
