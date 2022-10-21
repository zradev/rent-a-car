import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo/logo.jpg";
import { FcGoogle } from "react-icons/fc"

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

  const isValidPassword = (password: string | null) => {
    return password !== null && /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,20}$/.test(password);
  };

  return (
    <div className="block md:flex w-full h-[100vh]">
      <div className="relative z-10 flex flex-col gap-4 w-[100vw] md:w-[580px] p-10">
        <img src={logo} alt="logo" width={60} />
        <h2 className="text-4xl">Log in to your account</h2>
        <button className="flex justify-center items-center text-xl font-semibold gap-2 text-gray-500 border p-2 px-auto hover:shadow-md"><FcGoogle className="text-3xl" />Google</button>
        <form className="flex flex-col">
          <label htmlFor="email" className="mt-10">Email Address</label>
          <input
            type="text"
            id="email"
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
            className={`border border-black ${email !== null
              ? isEmailValid
                ? "border-green-600"
                : "border-rose-400"
              : ""
              } focus:border-sky-500 outline-none rounded-md p-1.5`}
          />
          <label htmlFor="email" className="mt-10">Password</label>
          <input
            type="password"
            id="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            className={`border border-black ${password !== null
              ? "border-green-600"
              : "border-rose-400"
              } focus:border-sky-500 outline-none rounded-md p-1.5`}
          />
        </form>
        <div className="flex justify-center items-center mt-10 gap-2">
          <button onClick={() => { }} className="border bg-gray-100 text-xl p-1 px-3 rounded-lg hover:bg-green-600 hover:text-white">Login</button>
          <p>Don't have an account? <Link to="/register" className="text-blue-400">Sign Up</Link></p>
        </div>
      </div>
      <div
        className="relative z-0 w-full md:h-full bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImg})`,
        }}
      ></div>
    </div>
  );
};

export default LoginForm;
