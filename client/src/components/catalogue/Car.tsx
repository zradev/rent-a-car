import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import { ICar } from "./../../../types.d";

interface IProps {
  car: ICar;
}

const Car = ({ car }: IProps) => {
  return (
    <Link
      to={`product/${car.id}`}
      key={car.id}
      className="w-full bg-white p-4 border border-gray-300 border-b-gray-500"
    >
      <div className="flex flex-col ">
        <div className="capitalize ">
          <h1 className="text-xl font-bold mb-3">
            {car.brand} {car.model}
          </h1>
          <h2 className="text-md mb-2 ml-3">{car.type}</h2>
        </div>
        <div className="flex self-center w-[80%] h-[170px] md:h-[140px]">
          <img
            src={require(`../../assets/images/cars/${car.images[0]}`)}
            alt="car"
          />
        </div>
        <div className="mt-3">
          <h1 className="text-xl text-red-500 font-bold">
            {formatCurrency(car.price)} | day
          </h1>
          <h2 className="text-md text-blue-800">
            {formatCurrency(car.price * 2)} total
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default Car;
