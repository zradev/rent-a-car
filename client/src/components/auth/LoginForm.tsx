import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const LoginForm = () => {
  const bgImg = require("../../assets/images/layouts/login-bg.jpg");

  const [email, setEmail] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailClicked, setIsEmailClicked] = useState(false);

  const [password, setPassword] = useState<string>("");
  const [isPasswordClicked, setIsPasswordClicked] = useState(false);

  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsEmailValid(isValidEmail(email));
  }, [email]);

  const isValidEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  };

  const handleLogin = async (e: any) => {
    if (isValidEmail(email)) {
      try {
        const response = await axios.post(
          "http://localhost:8080/user/login",
          {
            email,
            password,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        const jwt = response?.data?.token;
        login(jwt);
        setEmail("");
        setPassword("");
        navigate("/");
      } catch (error: any) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        } else {
          setError("Oops! Something Went Wrong.");
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="block md:flex w-full h-[100vh]">
      <div className="relative z-10 flex flex-col gap-4 w-[100vw] md:w-[50vw] overflow-auto p-10">
        <h2 className="w-full text-center text-4xl">Log in to your account</h2>
        <button className="flex justify-center items-center text-xl font-semibold gap-2 text-gray-500 border p-2 px-auto hover:shadow-md">
          <FcGoogle className="text-3xl" />
          Google
        </button>
        <p className="text-center">or</p>
        {error && <div className="text-2xl text-rose-400">{error}</div>}
        <form className="flex flex-col">
          <label htmlFor="email" className="mt-3">
            Email Address
          </label>
          <input
            type="text"
            id="email"
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setIsEmailClicked(true)}
            className={`border border-black ${
              isEmailClicked
                ? isEmailValid
                  ? "border-green-600"
                  : "border-rose-400"
                : ""
            } focus:border-sky-500 outline-none rounded-md p-1.5`}
          />
          <p className="text-rose-400">
            {isEmailClicked
              ? email.length === 0
                ? "Please enter your email address."
                : isEmailValid
                ? ""
                : "Invalid email address."
              : ""}
          </p>
          <label htmlFor="email" className="mt-3">
            Password
          </label>
          <input
            type="password"
            id="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setIsPasswordClicked(true)}
            className={`border border-black ${
              isPasswordClicked
                ? password?.length === 0
                  ? "border-rose-400"
                  : "border-green-600"
                : ""
            } focus:border-sky-500 outline-none rounded-md p-1.5`}
          />
          <p className="text-rose-400">
            {isPasswordClicked &&
              password?.length === 0 &&
              "Please enter your password."}
          </p>
        </form>
        <div className="flex flex-col justify-center items-center mt-3 gap-2">
          <button
            onClick={handleLogin}
            className="w-full border bg-gray-100 text-xl p-1 px-3 rounded-lg hover:bg-green-600 hover:text-white"
          >
            Login
          </button>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400">
              Sign Up
            </Link>
          </p>
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
