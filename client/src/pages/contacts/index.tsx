import React from "react";
import Heading from "./../../components/common/Heading";
import MainLayout from "./../../layouts/MainLayout";

const index = () => {
  const submitForm = () => {
    console.log("Submitted");
    alert("The form was submitted");
  };
  return (
    <MainLayout>
      <Heading title="Contacts" subtitle="Get Help And Friendly Support" />
      <form
        onSubmit={submitForm}
        className="flex flex-col gap-1 justify-center items-center mb-[50px]"
      >
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          required
          className="w-3/5 md:w-1/5 border rounded-lg mb-3 p-0.5"
        />
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          required
          className="w-3/5 md:w-1/5 border rounded-lg mb-3 p-0.5"
        />
        <label htmlFor="email">Message</label>
        <textarea
          required
          className="w-4/5 md:w-2/5 h-[100px] border rounded-lg mb-3 p-0.5"
          cols={6}
        />
        <input
          type="submit"
          className="text-white bg-sky-800 text-start w-fit border-2 border-indigo-800 p-1 px-4 rounded-full"
        />
      </form>
    </MainLayout>
  );
};

export default index;
