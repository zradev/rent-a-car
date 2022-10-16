import React, { useState } from "react";
import Carousel from "../../components/carousel/Carousel";
import SearchForm from "../../components/searchForm/SearchForm";
import MainLayout from "../../layouts/MainLayout";
import { CAR_TYPES } from "../../utils/constants";

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
        <div className="flex justify-center my-[70px]">
          <div className="w-[95%] md:w-[85%] lg:w-2/3">
            <h1 className="text-center text-2xl font-bold my-5">
              What car do want to pick up?
            </h1>
            <Carousel items={CAR_TYPES} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
