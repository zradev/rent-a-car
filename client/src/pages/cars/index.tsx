import React, { useEffect, useState, useMemo } from "react";
import MainLayout from "../../layouts/MainLayout";
import axios from "axios";
import Car from "../../components/catalogue/Car";
import { ICar } from "../../../types.d";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import NoResults from "../../components/catalogue/NoResults";
import { useSearchParams } from "react-router-dom";
import CarSkeleton from "./../../components/catalogue/CarSkeleton";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
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
  const [sortingCity, setSortingCity] = useState(
    searchParams.get("city") || "all"
  );

  const cities = useMemo(() => {
    return Array.from(new Set(carsDB.map((car) => car.location)));
  }, [carsDB]);

  useEffect(() => {
    axios
      .get<ICar[]>("http://localhost:3004/cars")
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
        if (sortingType === "all") {
          return car.type !== null;
        } else {
          return (
            car.type.toLocaleLowerCase() === sortingType.toLocaleLowerCase()
          );
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

  const sortByCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "all") {
      searchParams.delete("city");
      setSortingCity("all");
    } else {
      searchParams.set("city", e.target.value);
      setSortingCity(e.target.value);
    }
    setSearchParams(searchParams);
  };

  return (
    <MainLayout>
      <div className=" w-full bg-gray-100 mb-5">
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
            <option value="all">Location</option>
            {cities.map((city, index) => (
              <option key={index} value={city} className="capitalize">
                {city}
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
