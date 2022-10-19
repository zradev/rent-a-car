import React, { useState } from "react";
import { FaCar, FaSearch } from "react-icons/fa";
import Datetime from "./Datetime";

const SearchForm = () => {
  return (
    <>
      <form
        action=""
        className="static md:w-[500px] w-[85vw] h-[400px] bg-white text-black shadow-xl"
      >
        <div className="flex flex-col p-[20px] md:p-[48px] h-auto text-xl">
          <h2 className="text-2xl text-center font-black md:text-3xl mb-3">
            Let's find your car!
          </h2>
          <label>Pick-up location:</label>
          <div className="flex items-center w-[100%] h-10 gap-3 bg-gray-200 rounded-lg text-black outline-0 active:border-none p-5">
            <FaCar />
            <input
              type="text"
              placeholder="from"
              className="bg-transparent w-full outline-none placeholder-black focus:placeholder-transparent"
            />
          </div>
          <label>Pick-up at:</label>
          <Datetime />
          <label>Drop-off at:</label>
          <Datetime />
          <button className="flex items-center justify-center gap-5 mt-4 text-white bg-sky-800 text-start w-fit border-2 border-indigo-800 p-1 px-4 rounded-full outline-none">
            Search
            <FaSearch />
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchForm;
