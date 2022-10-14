import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import axios from "axios";
import Car from "../../components/catalogue/Car";
import { ICar } from "../../../types";
import Filters from "./../../components/filters/Filters";

const Index = () => {
  const [cars, setCars] = useState<ICar[]>([]);

  useEffect(() => {
    axios.get<ICar[]>("http://localhost:3004/cars").then((res) => {
      setCars(res.data);
    });
  }, []);

  return (
    <MainLayout>
      <div className="flex w-full">
        <Filters />
        <div className="container flex flex-wrap flex-col gap-4 justify-center items-center text-lg">
          {cars?.map((car) => (
            <Car key={car.id} car={car} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
