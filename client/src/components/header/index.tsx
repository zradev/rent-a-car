import React from "react";
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";

const index = () => {
  return (
    <header className="z-50 fixed w-full top-0 bg-white">
      <Banner />
      <Navbar />
    </header>
  );
};

export default index;
