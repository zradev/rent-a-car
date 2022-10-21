import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo/logo.jpg";
import { FcGoogle } from "react-icons/fc"

const RegisterForm = () => {
    const bgImg = require("../../assets/images/layouts/bg-reg-form.webp");

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

    const [isUserValid, setIsUserValid] = useState(false);

    const [passwordRepeat, setPasswordRepeat] = useState<string>("");

    const handleLogin = () => {
        if (isEmailValid && isPasswordValid && fName.length > 3 && lName.length > 3) {
            setIsUserValid(true);
        } else {
            // DISPLAY ERRORS 
        }
    }

    useEffect(() => {
        if (isUserValid) {
            // POST USER TO DB 
            // REDIRECT TO LOGIN
        }
    }, [isUserValid])

    useEffect(() => {
        setIsEmailValid(isValidEmail(email));
    }, [email]);

    useEffect(() => {
        setIsPasswordValid(isValidPassword(password));
    }, [password]);

    const isValidEmail = (email: string | null) => {
        return email !== null && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
    };

    const isValidPassword = (password: string | null) => {
        return password !== null && /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,20}$/.test(password);
    };

    return (
        <div className="block md:flex flex-row-reverse w-full h-[100vh]">
            <div className="relative z-10 flex flex-col gap-4 w-[100vw] md:w-[50vw] p-10">
                <img src={logo} alt="logo" width={60} />
                <h2 className="text-4xl">Create your account</h2>
                <button className="flex justify-center items-center text-xl font-semibold gap-2 text-gray-500 border p-2 px-auto hover:shadow-md"><FcGoogle className="text-3xl" />Google</button>
                <form className="flex flex-col">
                    <label htmlFor="fName" className="mt-10">First Name</label>
                    <input
                        type="text"
                        id="fName"
                        placeholder="Christian"
                        onChange={(e) => setFname(e.target.value)}
                        onClick={() => setIsFNameClicked(true)}
                        className={`border border-black ${isFNameClicked ? fName?.length > 3
                            ? "border-green-600"
                            : "border-rose-400"
                            : ""
                            } focus:border-sky-500 outline-none rounded-md p-1.5`}
                    />
                    <label htmlFor="lName" className="mt-10">Last Name</label>
                    <input
                        type="text"
                        id="lName"
                        placeholder="Smith"
                        onChange={(e) => setLname(e.target.value)}
                        onClick={() => setIsLNameClicked(true)}
                        className={`border border-black ${isLNameClicked
                            ? lName?.length > 3
                                ? "border-green-600"
                                : "border-rose-400"
                            : ""
                            } focus:border-sky-500 outline-none rounded-md p-1.5`}
                    />
                    <label htmlFor="email" className="mt-10">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="example@email.com"
                        onChange={(e) => setEmail(e.target.value)}
                        onClick={() => setIsEmailClicked(true)}
                        className={`border border-black ${isEmailClicked ? isEmailValid
                            ? "border-green-600"
                            : "border-rose-400"
                            : ""
                            } focus:border-sky-500 outline-none rounded-md p-1.5`}
                    />
                    <label htmlFor="password" className="mt-10">Password</label>
                    <input
                        type="password"
                        id="password"
                        autoComplete="off"
                        onChange={(e) => setPassword(e.target.value)}
                        onClick={() => setIsPasswordClicked(true)}
                        className={`border border-black ${isPasswordClicked
                            ? isPasswordValid
                                ? "border-green-600"
                                : "border-rose-400"
                            : ""
                            } focus:border-sky-500 outline-none rounded-md p-1.5`}
                    />
                </form>
                <div className="flex justify-center items-center mt-10 gap-2">
                    <button onClick={() => { }} className="border bg-gray-100 text-xl p-1 px-3 rounded-lg hover:bg-green-600 hover:text-white">Login</button>
                    <p>Already have an account? <Link to="/login" className="text-blue-400">Log In</Link></p>
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

export default RegisterForm;
