import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";

interface IProps {
  car: ICar;
}

interface ICar {
  id: number;
  brand: string;
  model: string;
  year: number;
  type: string;
  price: number;
  fuel: string;
  seats: number;
  images: string[];
  description: string;
  location: string;
  count: number;
}

const Car = ({ car }: IProps) => {
  return (
    <Link to={`product/${car.id}`} key={car.id}>
      <div className="flex flex-col  w-[100vw] md:w-[40vw] bg-white border border-gray-300 hover:border-sky-800 cursor-pointer">
        <div className="flex flex-col md:flex-row gap-4 md:gap-[200px] justify-between capitalize m-6 md:items-center ">
          <div className="flex flex-col gap-4">
            <h2 className="uppercase font-bold">{car.type}</h2>
            <img
              src={require(`../../assets/images/cars/${car.images[0]}`)}
              alt="post"
              className="w-[80vw] md:w-[200px]"
            />
            <h2>
              {car.brand} {car.model}
            </h2>
          </div>
          <div className="w-[150px]">
            <p>Location: {car.location}</p>
            <p>Fuel: {car.fuel}</p>
            <p>Year: {car.year}</p>
            <p>Seats: {car.seats}</p>
            <p>Cars available: {car.count}</p>
          </div>
        </div>
        <div className="flex justify-center items-center text-center border-t border-gray-300 text-2xl text-center hover:text-blue-500">
          <h2 className="w-auto ml-auto">{formatCurrency(car.price)}</h2>
          <span className="bg-green-700 text-white ml-auto w-[50px] h-full py-2">
            &#62;
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Car;
