import React from "react";
import MainLayout from "../../layouts/MainLayout";
import Heading from "./../../components/common/Heading";

const index = () => {
  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center w-full p-8 md:p-[80px]">
        <Heading title="About Us" />
        <div className="flex flex-col-reverse md:flex-row gap-2 mb-8">
          <div className="flex flex-col gap-5">
            <p className="w-full md:w-[65%]">
              <b>We are Lorem ipsum dolor sit amet</b> consectetur adipisicing
              elit. Eum ex facere deserunt at labore ut nisi expedita minus
              magni, fuga, unde aliquam sequi. Laborum aliquam quam, sit
              possimus, rerum tenetur sapiente tempora, fuga hic omnis similique
              vel sint delectus nulla! Consequuntur assumenda incidunt, amet sed
              vel ipsam ipsa ipsum eum quod maiores voluptate facilis, fugit
              explicabo sint, itaque commodi rerum!
            </p>
            <p className="w-full md:w-[55%]">
              Lorem ipsum dolor sit, <b>amet consectetur adipisicing elit.</b>
              Quis saepe corporis cupiditate aut possimus sit ex, dolorum
              consequatur aperiam iure?
            </p>
          </div>
          <img src="https://picsum.photos/400/300" alt="about" />
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-bold">Lorem ipsum dolor sit amet?</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              provident earum quo placeat, corporis voluptate deserunt tempora
              voluptatem saepe iusto aliquid natus beatae commodi quos totam
              dolor voluptatum sed delectus? Doloremque neque sed vero earum ut
              cupiditate dignissimos aspernatur ducimus?
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold">Lorem ipsum dolor sit amet?</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              provident earum quo placeat, corporis voluptate deserunt tempora
              voluptatem saepe iusto aliquid
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Lorem ipsum dolor sit amet?</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              provident earum quo placeat, corporis voluptate deserunt tempora
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptatibus deserunt error ea. Ducimus adipisci molestiae ullam
              minima temporibus, atque deserunt. tem saepe iusto aliquid natus
              beatae commodi quos totam dolor voluptatum sed delectus?
              Doloremque neque sed vero earum ut cupiditate dignissimos
              aspernatur ducimus? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Cupiditate eius reprehenderit veniam quae! Esse
              recusandae praesentium alias ipsum fugiat optio?
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default index;
