import React from "react";
import Carousel from "../../components/carousel/Carousel";
import SearchForm from "../../components/searchForm/SearchForm";
import MainLayout from "../../layouts/MainLayout";
import { CARDS, CAR_TYPES } from "../../utils/constants";
import { Link } from "react-router-dom";
import Heading from "../../components/common/Heading";

const Index = () => {
  const heroImg = require("../../assets/images/layouts/home_hero.jpg");

  return (
    <MainLayout>
      <div>
        <div
          className={`flex items-center justify-center w-full h-[500px] bg-no-repeat bg-cover bg-center`}
          style={{
            backgroundImage: `url(${heroImg})`,
          }}
        >
          <SearchForm />
        </div>
        <section className="flex justify-center my-[70px]">
          <div className="w-[95%] md:w-[85%] lg:w-2/3">
            <Heading title="What car do you want to pick up?" />
            <Carousel items={CAR_TYPES} />
          </div>
        </section>
        <section className=" w-[80%] m-auto ">
          <Heading title="Why choose us?" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {CARDS.map((card, index) => (
              <div
                key={index}
                className="flex items-center space-x-8 md:p-4 md:mb-2 md:shadow-md"
              >
                <card.image className="w-[55px] h-[55px] text-sky-900" />
                <div className="w-fit">
                  <h2 className="text-2xl mb-4">{card.label}</h2>
                  <p>{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <Link to="/cars">
            <div className="flex justify-center items-center cursor-pointer w-full h-[80px] text-3xl mt-10 bg-sky-800 text-white md:text-black md:transition-colors md:duration-700 md:bg-gray-200 md:hover:bg-sky-800 md:hover:text-white">
              Rent now
            </div>
          </Link>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
