import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DatePicker from "../../components/searchForm/DatePicker";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import axios from "axios";
import { IUser } from "../../utils/interfaces";

const PersonalData = ({ user }: { user: IUser }) => {
  const [fName, setFName] = useState(user.firstName);
  const [lName, setLName] = useState(user.lastName);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [bday, setBday] = useState<Dayjs>(dayjs(user.birthday, "DD-MM-YYYY"));

  const onChangeBday = (newValue: Dayjs) => {
    setBday(() => newValue);
  };

  const onSubmit = async () => {
    console.log("Submited");

    await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/user/update/${user.id}`,
      {
        firstName: fName,
        lastName: lName,
        phone,
        email,
        birthday: bday.format("DD/MM/YYYY"),
      }
    );
  };

  return (
    <>
      <form method="put" onSubmit={onSubmit} className="w-full">
        <h2 className="text-2xl text-center border-b mb-6">Personal Data</h2>
        <div className=" flex justify-between items-center m-3">
          <label htmlFor="fName" className="font-bold text-lg">
            First Name:
          </label>
          <input
            type="text"
            id="fName"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
            className="rounded-lg border border-gray-400 focus:outline-sky-800 p-1 px-2 w-[45vw] md:w-[20vw]"
          />
        </div>
        <div className=" flex justify-between items-center m-3">
          <label htmlFor="lName" className="font-bold text-lg">
            Last Name:
          </label>
          <input
            type="text"
            id="lName"
            value={lName}
            onChange={(e) => setLName(e.target.value)}
            className="rounded-lg border border-gray-400 focus:outline-sky-800 p-1 px-2 w-[45vw] md:w-[20vw]"
          />
        </div>
        <div className=" flex justify-between items-center m-3">
          <label htmlFor="phone" className="font-bold text-lg">
            Phone Number:
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="rounded-lg border border-gray-400 focus:outline-sky-800  p-1 px-2 w-[45vw] md:w-[20vw]"
          />
        </div>
        <div className=" flex justify-between items-center m-3">
          <label htmlFor="email" className="font-bold text-lg">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-gray-400 focus:outline-sky-800  p-1 px-2 w-[45vw] md:w-[20vw]"
          />
        </div>
        <div className=" flex justify-between items-center h-fit m-3 ">
          <label htmlFor="birthday" className="font-bold text-lg">
            Date of birth
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={bday}
              onChange={onChangeBday}
              min={dayjs().subtract(85, "year")}
              max={dayjs().subtract(18, "year")}
            />
          </LocalizationProvider>
        </div>
        <div className="flex justify-center items-center">
          <input
            type="submit"
            className="text-white bg-sky-800 text-start w-fit my-10 border-2 border-indigo-800 p-1 px-4 rounded-full hover:bg-sky-700"
            value={"Update"}
          />
        </div>
      </form>
    </>
  );
};

export default PersonalData;
