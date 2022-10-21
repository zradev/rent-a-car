import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo/logo.jpg";

const LoginForm = () => {
  const bgImg = require("../../assets/images/layouts/bg-reg-form.webp");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [password, setPassword] = useState<string | null>(null);

  useEffect(() => {
    setIsEmailValid(isValidEmail(email));
    console.log(email);
    console.log(isValidEmail(email));
  }, [email]);

  const isValidEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  };

  return (
    <div className="flex w-full h-[100vh]">
      <div className="w-full md:w-[580px] p-8">
        <img src={logo} alt="logo" width={60} />
        <form className="flex flex-col">
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className={`border border-black ${
              email !== null
                ? isEmailValid
                  ? "border-green-600"
                  : "border-rose-400"
                : ""
            } focus:border-sky-500 outline-none rounded-md p-1.5`}
          />
        </form>
        <p
          className={`${
            isEmailValid && email !== "" && email !== null ? "hidden" : "block"
          } text-rose-500 font-semibold`}
        >
          Please enter a valid email address.
        </p>
      </div>
      <div
        className="w-full h-full bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImg})`,
        }}
      ></div>
    </div>
  );
};

export default LoginForm;
