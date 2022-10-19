import React from "react";

const CarSkeleton = () => {
  return (
    <div className="w-full bg-white p-4 border border-gray-300 border-b-gray-500">
      <div className="flex flex-col ">
        <div className="capitalize ">
          <div className="w-[38%] h-6 skeleton-bg"></div>
          <div className="w-[18%] h-3 skeleton-bg m-3 mt-5"></div>
        </div>
        <div className=" self-center w-[80%] h-[170px] md:h-[140px] skeleton-bg"></div>
        <div className="mt-3">
          <div className="w-[38%] h-5 skeleton-bg"></div>
          <div className="w-[33%] h-4 skeleton-bg mt-5"></div>
        </div>
      </div>
    </div>
  );
};

export default CarSkeleton;
