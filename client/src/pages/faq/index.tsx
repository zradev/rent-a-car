import React from "react";
import Heading from "./../../components/common/Heading";
import MainLayout from "./../../layouts/MainLayout";

const index = () => {
  return (
    <MainLayout>
      <Heading title="Frequently Asked Questions" />
      <div className="flex flex-col gap-4 p-10 mb-10">
        <h3 className="text-xl font-bold">Q: How can I rent a car?</h3>
        <p>
          <b>A:</b> Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Voluptate ratione ipsa autem aut rerum reiciendis repudiandae?
          Necessitatibus corporis hic inventore.
        </p>
        <h3 className="text-xl font-bold mt-3">Q: Can I pay with card?</h3>
        <p>
          <b>A:</b> Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Voluptate ratione ipsa autem aut rerum reiciendis repudiandae?
          Necessitatibus corporis hic inventore.
        </p>
        <h3 className="text-xl font-bold mt-3">
          Q: What information should I give you when renting?
        </h3>
        <p>
          <b>A:</b> Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Voluptate ratione ipsa autem aut rerum reiciendis repudiandae?
          Necessitatibus corporis hic inventore.
        </p>
        <h3 className="text-xl font-bold mt-3">Q: Can I cancel my rent?</h3>
        <p>
          <b>A:</b> Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          temporibus omnis asperiores illo qui iure!
        </p>
        <h3 className="text-xl font-bold mt-3">
          Q: Do I need Driving License?
        </h3>
        <p>
          <b>A:</b> Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Voluptate ratione ipsa autem aut rerum reiciendis repudiandae?
          Necessitatibus corporis hic inventore.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia nemo
          id libero eligendi voluptate non!
        </p>
        <h3 className="text-xl font-bold mt-3">Q: Can I get discount?</h3>
        <p>
          <b>A:</b> Lorem ipsum dolor sit amet consectetur.
        </p>
        <h3 className="text-xl font-bold mt-3">
          Q: Will you provide us more locations in the future?
        </h3>
        <p>
          <b>A:</b> Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Voluptate ratione ipsa autem aut rerum reiciendis repudiandae?
          Necessitatibus corporis hic inventore.
        </p>
      </div>
    </MainLayout>
  );
};

export default index;
