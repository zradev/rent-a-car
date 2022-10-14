import React, { useState } from "react";
import { FaCar } from "react-icons/fa";
import Datetime from "./Datetime";

const SearchForm = () => {
  const [datetime, setDatetime] = useState("");

  const currentDate = new Date();
  const minDate = currentDate.toISOString().slice(0, -8);
  const maxDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1))
    .toISOString()
    .slice(0, -8);

  const handleDatetimeChange = (e: React.FormEvent<HTMLInputElement>) => {
    const date = e.currentTarget.value;
    setDatetime(date);
  };
  return (
    <>
      <form
        action=""
        className="relative md:w-[500px] w-[85vw] h-[350px] bg-white text-black shadow-xl"
      >
        <div className="flex flex-col p-[20px] md:p-[48px] text-xl">
          <h2 className="text-2 xl font-black md:text-3xl mb-3">
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
        </div>
      </form>
    </>
  );
};

export default SearchForm;
