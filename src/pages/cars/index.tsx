import React, { useEffect, useState, useMemo } from "react";
import MainLayout from "../../layouts/MainLayout";
import axios from "axios";
import Car from "../../components/catalogue/Car";
import { ICar } from "../../../types";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import NoResults from "../../components/catalogue/NoResults";

const Index = () => {
  const [cars, setCars] = useState<ICar[]>([]);
  const [carsDB, setCarsDB] = useState<ICar[]>([]);
  const [sortByPriceIndex, setSortByPriceIndex] = useState(0);
  const [sortingType, setSortingType] = useState("all");
  const [sortingFuel, setSortingFuel] = useState("all");
  const [sortingCity, setSortingCity] = useState("all");

  const cities = useMemo(() => {
    return Array.from(new Set(carsDB.map((car) => car.location)));
  }, [cars]);

  useEffect(() => {
    axios.get<ICar[]>("http://localhost:3004/cars").then((res) => {
      setCars(res.data);
      setCarsDB(res.data);
    });
  }, []);

  useEffect(() => {
    const sortedCars = carsDB
      .filter((car) => {
        if (sortingType === "all") {
          return car.type !== null;
        } else {
          return car.type === sortingType;
        }
      })
      .filter((car) => {
        if (sortingFuel === "all") {
          return car.fuel !== null;
        } else {
          return car.fuel === sortingFuel;
        }
      })
      .filter((car) => {
        if (sortingCity === "all") {
          return car.location !== null;
        } else {
          return car.location === sortingCity;
        }
      })
      .sort((a, b) => {
        if (sortByPriceIndex === 0) {
          return a.id - b.id;
        } else if (sortByPriceIndex === 1) {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    console.log("rerender");

    setCars(sortedCars);
  }, [carsDB, sortByPriceIndex, sortingType, sortingFuel, sortingCity]);

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
    } else {
      setSortingType(e.target.value);
    }
  };

  const sortByFuel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "all") {
      setSortingFuel("all");
    } else {
      setSortingFuel(e.target.value);
    }
  };

  const sortByCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "all") {
      setSortingCity("all");
    } else {
      setSortingCity(e.target.value);
    }
  };

  return (
    <MainLayout>
      <div className=" w-full bg-gray-100">
        <div className="flex  gap-4 justify-center items-center m-auto font-semibold text-md">
          <button onClick={sortByPrice} className="flex m-2">
            {sortByPriceIndex === 0 ? (
              <>
                Price <FaArrowDown className="text-transparent ml-1" />
              </>
            ) : sortByPriceIndex === 1 ? (
              <>
                Price <FaArrowDown className="ml-1" />
              </>
            ) : (
              <>
                Price <FaArrowUp className="ml-1" />
              </>
            )}
          </button>
          <select
            id="type"
            name="type"
            onChange={(e) => sortByType(e)}
            className="bg-transparent outline-none my-2 [&>*]:bg-gray-100"
          >
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
            <option value="all">Fuel</option>
            <option value="petrol">Petrol</option>
            <option value="disel">Diesel</option>
            <option value="hybrid">Hybrid</option>
            <option value="electric">Electric</option>
          </select>
          <select
            id="city"
            name="city"
            onChange={(e) => sortByCity(e)}
            className="bg-transparent outline-none my-2 [&>*]:bg-gray-100"
          >
            <option value="all">All</option>
            {cities.map((city, index) => (
              <option key={index} value={city} className="capitalize">
                {city}
              </option>
            ))}
          </select>
        </div>
        {cars.length > 0 ? (
          <div className="grid gap-2 mx-2 grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            {cars.map((car) => (
              <Car key={car.id} car={car} />
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
