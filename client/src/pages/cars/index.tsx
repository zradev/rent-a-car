import React, { useEffect, useState, useMemo } from "react";
import MainLayout from "../../layouts/MainLayout";
import axios from "axios";
import Car from "../../components/catalogue/Car";
import { ICar } from "../../../types.d";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import NoResults from "../../components/catalogue/NoResults";
import { useSearchParams } from "react-router-dom";
import CarSkeleton from "./../../components/catalogue/CarSkeleton";
import { DateRangePicker as DatePicker } from "../../components/searchForm/DateRangePicker";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dayRange, setDayRange] = React.useState<Array<Dayjs | null>>([
    searchParams.get("pick")
      ? dayjs(searchParams.get("pick"), "DD/MM/YYYY")
      : dayjs(new Date()),
    searchParams.get("drop")
      ? dayjs(searchParams.get("drop"), "DD/MM/YYYY")
      : dayjs(new Date()),
  ]);

  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState<ICar[]>([]);
  const [carsDB, setCarsDB] = useState<ICar[]>([]);
  const [sortByPriceIndex, setSortByPriceIndex] = useState(0);
  const [sortingType, setSortingType] = useState(
    searchParams.get("type") || "all"
  );
  const [sortingFuel, setSortingFuel] = useState(
    searchParams.get("fuel") || "all"
  );
  const [sortingLocation, setSortingLocation] = useState(
    searchParams.get("location") || "all"
  );

  const locations = useMemo(() => {
    return Array.from(new Set(carsDB.map((car) => car.location)));
  }, [carsDB]);
  const [days, setDays] = useState(0);

  useEffect(() => {
    if (dayRange[0] !== null && dayRange[1] !== null) {
      setDays(dayRange[1]?.diff(dayRange[0], "day") + 1);
    }
  }, [dayRange]);

  useEffect(() => {
    axios
      // .get<ICar[]>(`${process.env.REACT_APP_REGISTER_URL}/cars/get-all`)
      .get<ICar[]>(`http://localhost:8080/cars/get-all`)
      .then((res) => {
        setCarsDB(res.data);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setTimeout(() => setIsLoading(false), 300);
      });
  }, []);

  useEffect(() => {
    const sortedCars = carsDB
      .filter((car) => {
        return sortingType === "all"
          ? car.type !== null
          : car.type.toLocaleLowerCase() === sortingType.toLocaleLowerCase();
      })
      .filter((car) => {
        return sortingFuel === "all"
          ? car.fuel !== null
          : car.fuel === sortingFuel;
      })
      .filter((car) => {
        return sortingLocation === "all"
          ? car.location !== null
          : car.location === sortingLocation;
      })
      .sort((a, b) => {
        if (sortByPriceIndex === 0) {
          return a._id - b._id;
        } else if (sortByPriceIndex === 1) {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    setCars(sortedCars);
  }, [carsDB, sortByPriceIndex, sortingType, sortingFuel, sortingLocation]);

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

  const sortByPrice = () => {
    if (sortByPriceIndex === 0) {
      setSortByPriceIndex(1);
    } else if (sortByPriceIndex === 1) {
      setSortByPriceIndex(-1);
    } else {
      setSortByPriceIndex(0);
    }
  };

  const sortByType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "all") {
      setSortingType("all");
      searchParams.delete("type");
    } else {
      searchParams.set("type", e.target.value);
      setSortingType(e.target.value);
    }
    setSearchParams(searchParams);
  };

  const sortByFuel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "all") {
      searchParams.delete("fuel");
      setSortingFuel("all");
    } else {
      searchParams.set("fuel", e.target.value);
      setSortingFuel(e.target.value);
    }
    setSearchParams(searchParams);
  };

  const sortByLocation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "all") {
      searchParams.delete("location");
      setSortingLocation("all");
    } else {
      searchParams.set("location", e.target.value);
      setSortingLocation(e.target.value);
    }
    setSearchParams(searchParams);
  };
  return (
    <MainLayout>
      <div className=" w-full bg-gray-100 mb-5">
        <div className="flex flex-col md:flex-row justify-center items-center bg-white p-6 gap-3 text-xl mt-5">
          <DatePicker
            dayRange={dayRange}
            onChangeFromDay={onChangeFromDay}
            onChangeToDay={onChangeToDay}
          />
        </div>
        <div className="flex  gap-4 justify-center items-center m-auto font-semibold text-md">
          <button onClick={sortByPrice} className="flex m-2">
            Price
            {sortByPriceIndex === 0 ? (
              <>
                <FaArrowDown className="text-transparent ml-1" />
              </>
            ) : sortByPriceIndex === 1 ? (
              <>
                <FaArrowDown className="ml-1" />
              </>
            ) : (
              <>
                <FaArrowUp className="ml-1" />
              </>
            )}
          </button>
          <select
            id="type"
            name="type"
            onChange={(e) => sortByType(e)}
            className="bg-transparent outline-none my-2 [&>*]:bg-gray-100"
          >
            <option
              value={searchParams.get("type") || "all"}
              selected
              className="hidden"
            >
              {searchParams.get("type") || "Type"}
            </option>
            <option value="all">Type</option>
            <option value="economy">Economy</option>
            <option value="estate">Estate</option>
            <option value="luxury">Luxury</option>
            <option value="SUV">SUV</option>
            <option value="cargo">Cargo</option>
          </select>
          <select
            id="fuel"
            name="fuel"
            onChange={(e) => sortByFuel(e)}
            className="bg-transparent outline-none my-2 [&>*]:bg-gray-100"
          >
            <option
              value={searchParams.get("fuel") || "all"}
              selected
              className="hidden"
            >
              {searchParams.get("fuel") || "Fuel"}
            </option>
            <option value="all">Fuel</option>
            <option value="petrol">Petrol</option>
            <option value="disel">Diesel</option>
            <option value="hybrid">Hybrid</option>
            <option value="electric">Electric</option>
          </select>
          <select
            id="location"
            name="location"
            onChange={(e) => sortByLocation(e)}
            className="bg-transparent outline-none my-2 [&>*]:bg-gray-100 capitalize"
          >
            <option
              value={searchParams.get("location") || "all"}
              selected
              className="hidden"
            >
              {searchParams.get("location") || "Location"}
            </option>
            <option value="all">Location</option>
            {locations.map((location, index) => (
              <option key={index} value={location} className="capitalize">
                {location}
              </option>
            ))}
          </select>
        </div>
        {isLoading ? (
          <div className="grid gap-2 mx-2 grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            {Array(8)
              .fill(true)
              .map((_, index) => (
                <CarSkeleton key={index} />
              ))}
          </div>
        ) : cars.length > 0 ? (
          <div className="grid gap-2 mx-2 grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            {cars.map((car) => (
              <Car key={car._id} car={car} days={days} />
            ))}
          </div>
        ) : (
          <NoResults />
        )}
      </div>
    </MainLayout>
  );
};

export default Index;
