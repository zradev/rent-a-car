import React, { useState } from "react";
import SearchForm from "../../components/searchForm/SearchForm";
import MainLayout from "../../layouts/MainLayout";

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
      </div>
    </MainLayout>
  );
};

export default Index;
