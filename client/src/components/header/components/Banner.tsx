import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Banner = ({ isFooter = false }: { isFooter?: boolean }) => {
  return (
    <div
      className={` ${
        isFooter ? "flex justify-center bg-transparent text-2xl" : "hidden"
      } md:flex items-center justify-end [&>*]:hover:cursor-pointer gap-4 md:bg-sky-700 text-white text-md font-semibold tracking-wider pr-2 p-1`}
    >
      {!isFooter && (
        <>
          <a href="mailto:email@example.com">email@example</a>
          <a href="tel:123-456-7890">123-456-7890</a>
        </>
      )}
      <a href="https://www.facebook.com">
        <FaFacebook />
      </a>
      <a href="https://www.instagram.com">
        <FaInstagram />
      </a>
      <a href="https://www.twitter.com">
        <FaTwitter />
      </a>
      <a href="https://www.github.com">
        <FaGithub />
      </a>
    </div>
  );
};

export default Banner;
