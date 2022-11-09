import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { handleAxiosErrors } from "../../utils/helpfulFunctions";

const RegisterForm = () => {
  const bgImg = require("../../assets/images/layouts/register-bg.jpg");

  const [fName, setFname] = useState<string>("");
  const [isFNameClicked, setIsFNameClicked] = useState(false);

  const [lName, setLname] = useState<string>("");
  const [isLNameClicked, setIsLNameClicked] = useState(false);

  const [email, setEmail] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailClicked, setIsEmailClicked] = useState(false);

  const [password, setPassword] = useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordClicked, setIsPasswordClicked] = useState(false);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isUserValid = () => {
    return (
      isEmailValid && isPasswordValid && fName.length >= 2 && lName.length >= 2
    );
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();

    if (isUserValid()) {
      try {
        await axios.post("http://localhost:8080/user/register", {
          firstName: fName,
          lastName: lName,
          email,
          password,
        });
        navigate("/login");
      } catch (error) {
        setError(handleAxiosErrors(error));
      }
    } else {
      setError("All fields are required!");
    }
  };

  useEffect(() => {
    setIsEmailValid(isValidEmail(email));
  }, [email]);

  useEffect(() => {
    setIsPasswordValid(isValidPassword(password));
  }, [password]);

  const isValidEmail = (email: string | null) => {
    return (
      email !== null &&
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
    );
  };

  const isValidPassword = (password: string | null) => {
    return (
      password !== null &&
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    );
  };

  return (
    <div className="block md:flex w-full h-[100vh]">
      <div
        className="relative z-0 w-full md:h-full bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImg})`,
        }}
      ></div>
      <div className="relative z-10 flex flex-col gap-4 w-[100vw] md:w-[50vw] overflow-auto p-10">
        <h2 className="w-full text-center text-4xl">Create your account</h2>
        <button className="flex justify-center items-center text-xl font-semibold gap-2 text-gray-500 border p-2 px-auto hover:shadow-md">
          <FcGoogle className="text-3xl" />
          Google
        </button>
        <p className="text-center">or</p>
        {error && <div className="text-2xl text-rose-400">{error}</div>}
        <form className="flex flex-col ">
          <label htmlFor="fName" className="mt-3">
            First Name
          </label>
          <input
            type="text"
            id="fName"
            placeholder="Christian"
            onChange={(e) => setFname(e.target.value)}
            onBlur={() => setIsFNameClicked(true)}
            className={`border border-black ${
              isFNameClicked
                ? fName?.length >= 2
                  ? "border-green-600"
                  : "border-rose-400"
                : ""
            } focus:border-sky-500 outline-none rounded-md p-1.5`}
          ></input>
          <label htmlFor="lName" className="mt-3">
            Last Name
          </label>
          <input
            type="text"
            id="lName"
            placeholder="Smith"
            onChange={(e) => setLname(e.target.value)}
            onBlur={() => setIsLNameClicked(true)}
            className={`border border-black ${
              isLNameClicked
                ? lName?.length >= 2
                  ? "border-green-600"
                  : "border-rose-400"
                : ""
            } focus:border-sky-500 outline-none rounded-md p-1.5`}
          />
          <label htmlFor="email" className="mt-3">
            Email Address
          </label>
          <input
            type="email"
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
          <label htmlFor="password" className="mt-3">
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
                ? isPasswordValid
                  ? "border-green-600"
                  : "border-rose-400"
                : ""
            } focus:border-sky-500 outline-none rounded-md p-1.5`}
          />
          <div className="text-gray-400 mt-3">
            <h2>Password must have:</h2>
            <p> {"\u2022"} At least 1 upper-case and 1 lower-case letter</p>
            <p> {"\u2022"} At least 1 number</p>
            <p> {"\u2022"} At least 1 special symbol</p>
            <p> {"\u2022"} Min 8 and max 50 characters</p>
          </div>
        </form>
        <div className="flex flex-col justify-center items-center mt-3 gap-2">
          <button
            onClick={handleRegister}
            className="w-full border bg-gray-100 text-xl p-1 px-3 rounded-lg hover:bg-green-600 hover:text-white"
          >
            Sign Up
          </button>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
