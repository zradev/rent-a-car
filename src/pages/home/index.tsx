import React, { useState } from "react";
import SearchForm from "../../components/searchForm/SearchForm";

const Index = () => {
  const heroImg = require("../../assets/images/layouts/home_hero.jpg");

  return (
    <div className="w-full">
      <section>
        <div
          className={`flex items-center justify-center w-full h-[500px] bg-no-repeat bg-cover bg-center`}
          style={{
            backgroundImage: `url(${heroImg})`,
          }}
        >
          <SearchForm />
        </div>
      </section>
    </div>
  );
};

export default Index;
