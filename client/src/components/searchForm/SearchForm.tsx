import React, { useState } from "react";
import { FaCar, FaSearch } from "react-icons/fa";
import { DateRangePicker } from "./DateRangePicker";
import { Link } from "react-router-dom";

const SearchForm = () => {
  const [location, setLocation] = useState("");

  return (
    <>
      <form
        action=""
        className="static md:w-[500px] w-[85vw] h-auto bg-white text-black shadow-xl"
      >
        <div className="flex flex-col justify-center items-center space-y-3 p-5 md:p-[48px] h-auto text-xl">
          <h2 className="text-2xl text-center font-black md:text-3xl mb-3">
            Let's find your car !
          </h2>
          <label>Pick-up location:</label>
          <div className="flex items-center w-[100%] h-10 space-x-3 bg-gray-200 rounded-lg text-black outline-0 active:border-none p-5">
            <FaCar />
            <input
              type="text"
              placeholder="from"
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent w-full outline-none placeholder-black focus:placeholder-transparent"
            />
          </div>
          <DateRangePicker />
          <Link to={`/cars?${location ? "location=" + location : ""}`}>
            <button className="flex items-center justify-center gap-5 mt-4 text-white bg-sky-800 text-start w-fit border-2 border-indigo-800 p-1 px-4 rounded-full outline-none hover:bg-sky-700">
              Search
              <FaSearch />
            </button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default SearchForm;
