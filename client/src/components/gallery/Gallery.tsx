import React, { useState, useEffect } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useScrollLock } from "./../../hooks/useScrollLock";

interface IProps {
  images: string[];
}

const Gallery = ({ images }: IProps) => {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [openImgIndex, setOpenImgIndex] = useState(activeImgIndex);
  const { lockScroll, unlockScroll } = useScrollLock();

  useEffect(() => {
    isOpen ? lockScroll() : unlockScroll();
    setOpenImgIndex(() => activeImgIndex);
  }, [isOpen, activeImgIndex, lockScroll, unlockScroll]);

  const handleOnClick = () => {
    setIsOpen(() => !isOpen);
  };

  const getNextImgIndex = () => {
    if (openImgIndex === images.length - 1) {
      return 0;
    }
    return openImgIndex + 1;
  };

  const getPrevImgIndex = () => {
    if (openImgIndex === 0) {
      return images.length - 1;
    }
    return openImgIndex - 1;
  };

  return (
    <>
      {isOpen && (
        <div
          className={`${
            isOpen
              ? "fixed top-0 left-0 z-[9999] w-[100%] h-[100vh] overflow-hidden bg-black bg-opacity-50 "
              : "hidden"
          }`}
          onClick={() => setIsOpen(() => false)}
        >
          <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex w-[100%] md:w-max h-[50%] md:h-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenImgIndex(() => getPrevImgIndex());
              }}
              className="flex py-10 text-4xl text-white bg-transparent self-center border-none "
            >
              <FaArrowAltCircleLeft />
            </button>
            <img
              src={
                images[openImgIndex].includes("http")
                  ? images[openImgIndex]
                  : require(`../../assets/images/cars/${images[openImgIndex]}`)
              }
              alt="open"
              onClick={(e) => e.stopPropagation()}
              className="w-[300px] p-2 m-auto md:max-w-[80%] md:h-[80vh] md:w-[600px]"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenImgIndex(() => getNextImgIndex());
              }}
              className="flex py-10 text-4xl text-white bg-transparent self-center border-none "
            >
              <FaArrowAltCircleRight />
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center gap-3">
        <img
          src={
            images[activeImgIndex].includes("http")
              ? images[activeImgIndex]
              : require(`../../assets/images/cars/${images[activeImgIndex]}`)
          }
          alt="active"
          onClick={() => handleOnClick()}
          className="w-[480px] h-[320px] select-none pointer-events-none md:pointer-events-auto"
        />
        <div className="flex gap-5 overflow-x-auto">
          {images.map((image: string, index: number) => (
            <img
              src={
                image.includes("http")
                  ? image
                  : require(`../../assets/images/cars/${image}`)
              }
              alt=""
              onClick={() => setActiveImgIndex(() => index)}
              className={`${
                activeImgIndex === index
                  ? "border border-black"
                  : "border border-transparent hover:border-gray-500"
              } w-[100px] h-[100px] select-none`}
              key={index}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;
