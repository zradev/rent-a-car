import React from "react";
import { FOOTER_DATA } from "./../../utils/constants";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo/logo-footer.png";
import Banner from "../header/components/Banner";

const Footer = () => {
  return (
    <footer className="capitalize grid grid-cols-1 md:grid-cols-3 bg-slate-800 text-white pt-8 md:p-8 gap-8 text-center md:text-start">
      <Link
        to="/"
        className="hidden md:flex flex-col justify-center items-center gap-3 hover:text-gray-400"
      >
        <img src={logo} alt="logo" width={60} />
        <p className=" text-3xl  font-semibold ">Rent a Car</p>
      </Link>
      {FOOTER_DATA.map((row, index) => (
        <div key={index} className="">
          <h2 className="text-2xl font-bold">{row.label}</h2>
          <ul>
            {row.links.map((link, index) => (
              <li key={index}>
                <Link to={link.link} className="text-xl hover:text-gray-400">
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="md:hidden">
        <Banner isFooter={true} />
      </div>
    </footer>
  );
};

export default Footer;
