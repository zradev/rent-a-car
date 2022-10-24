import React from "react";

const NoResults = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 bg-white py-7">
        <img
          src={
            "https://ik.imagekit.io/jtpsjzhns/images/components/no_result_found_Z_r7bpcKfG.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1664180783191"
          }
          alt="no-results-found"
        />
        <div className="flex flex-col justify-center text-center text-2xl">
          <h2>No Results Found!</h2>
          <p>Please try changing the filters.</p>
        </div>
      </div>
    </>
  );
};

export default NoResults;
