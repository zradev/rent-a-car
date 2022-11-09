import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

interface IProps {
  items: IItem[];
  slidesPerView?: number;
  spacing?: number;
  autoplay?: boolean;
}

interface IItem {
  image: any;
  name: string;
}

const Carousel = ({
  items,
  slidesPerView = 4,
  spacing = 50,
  autoplay = true,
}: IProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);

  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={isMobile ? spacing / 2 : spacing}
      slidesPerView={isMobile ? slidesPerView - 1 : slidesPerView}
      autoplay={
        autoplay
          ? {
              delay: 3000,
              disableOnInteraction: false,
            }
          : false
      }
      pagination={{
        clickable: true,
      }}
    >
      {items.map((item: IItem, index: number) => (
        <SwiperSlide key={index}>
          <Link to={`cars?type=${item.name}`}>
            <img
              src={item.image}
              alt="carousel-item"
              className="w-[150px] h-[70px] md:h-[90px]"
            />
            <h2 className="text-lg font-semibold text-center mt-2 mb-9">
              {item.name}
            </h2>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
