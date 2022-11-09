import React from "react";
import MainLayout from "./../../layouts/MainLayout";

const Redirect = () => {
  return (
    <MainLayout>
      <div className="flex text-center flex-col justify-center items-center my-[50px]">
        <img
          src={
            "https://ik.imagekit.io/jtpsjzhns/images/components/redirect_-i7POAE6VW.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1664180783264"
          }
          alt="redirect"
          className="w-[180px] h-[180px]"
        />
        <h3>This Page Isn't Available Right Now</h3>
        <p className="max-w-[60vw] mt-3">
          The page you requested cannot be displayed right now. It may be
          temporarily unavailable, the link you clicked on may have expired, or
          you may not have permission to view this page.
        </p>
      </div>
    </MainLayout>
  );
};

export default Redirect;
