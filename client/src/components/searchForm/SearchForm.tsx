import React, { useState, useEffect } from "react";
import { FaCar, FaSearch } from "react-icons/fa";
import { DateRangePicker } from "./DateRangePicker";
import { Dayjs } from "dayjs";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const SearchForm = () => {
  const [location, setLocation] = useState("");
  const [dayRange, setDayRange] = React.useState<Array<Dayjs | null>>([
    dayjs(new Date()),
    dayjs(new Date()),
  ]);
  const [days, setDays] = useState(0);

  useEffect(() => {
    if (dayRange[0] !== null && dayRange[1] !== null) {
      setDays(dayRange[1]?.diff(dayRange[0], "day") + 1);
    }
  }, [dayRange]);

  const onChangeFromDay = (newValue: Dayjs | null) => {
    setDayRange((oldRange) => {
      const newRange = [...oldRange];
      newRange[0] = newValue;
      return newRange;
    });
  };

  const onChangeToDay = (newValue: Dayjs | null) => {
    setDayRange((oldRange) => {
      const newRange = [...oldRange];
      newRange[1] = newValue;
      return newRange;
    });
  };

  return (
    <>
      <form
        action=""
        className="static md:w-[500px] w-[85vw] h-auto bg-white text-black shadow-xl"
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
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent w-full outline-none placeholder-black focus:placeholder-transparent"
            />
          </div>
          <DateRangePicker
            dayRange={dayRange}
            onChangeFromDay={onChangeFromDay}
            onChangeToDay={onChangeToDay}
          />
          <p>days: {days}</p>
          <Link
            to={`/cars?${location ? "location=" + location : ""}${
              dayRange[0] ? "&pick=" + dayRange[0].format("DD-MM-YYYY") : ""
            }${dayRange[1] ? "&drop=" + dayRange[1].format("DD-MM-YYYY") : ""}`}
          >
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
