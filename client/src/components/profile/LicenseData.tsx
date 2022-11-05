import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DatePicker from "../../components/searchForm/DatePicker";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import axios from "axios";

const LicenseData = ({ auth }: any) => {
  const [licenseNum, setLicenseNum] = useState(auth.licenseNum);
  const [licenseCountry, setLicenseCountry] = useState(auth.licenseCountry);
  const [licenseIssueDate, setLicenseIssueDate] = useState(
    auth.licenseIssueDate
  );
  const [licenseExpireDate, setLicenseExpireDate] = useState(
    auth.licenseExpireDate
  );

  const onChangeIssue = (newValue: Dayjs) => {
    setLicenseIssueDate(() => newValue);
  };

  const onChangeExp = (newValue: Dayjs) => {
    setLicenseExpireDate(() => newValue);
  };

  const onSubmit = async () => {
    console.log("Submited");

    await axios.put(`http://localhost:8080/user/update/${auth.id}`, {
      licenseNum,
      licenseCountry,
      licenseIssueDate: licenseIssueDate.format("DD/MM/YYYY"),
      licenseExpireDate: licenseExpireDate.format("DD/MM/YYYY"),
    });
  };

  return (
    <>
      <form method="put" onSubmit={onSubmit} className="w-full">
        <h2 className="text-2xl text-center border-b mb-6">
          Driver License Details
        </h2>
        <div className=" flex justify-between items-center m-3">
          <label htmlFor="licenseNum" className="font-bold text-lg">
            First Name:
          </label>
          <input
            type="text"
            id="licenseNum"
            value={licenseNum}
            onChange={(e) => setLicenseNum(e.target.value)}
            className="rounded-lg border border-gray-400 focus:outline-sky-800 p-1 px-2 w-[45vw] md:w-[20vw]"
          />
        </div>
        <div className=" flex justify-between items-center m-3">
          <label htmlFor="licenseCountry" className="font-bold text-lg">
            Last Name:
          </label>
          <input
            type="text"
            id="licenseCountry"
            value={licenseCountry}
            onChange={(e) => setLicenseCountry(e.target.value)}
            className="rounded-lg border border-gray-400 focus:outline-sky-800 w-[250px] p-1 px-2 w-[45vw] md:w-[20vw]"
          />
        </div>
        <div className=" flex justify-between items-center h-fit m-3 ">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <label htmlFor="birthday" className="font-bold text-lg">
              Issued:
            </label>
            <DatePicker
              value={licenseIssueDate}
              onChange={onChangeIssue}
              min={dayjs().subtract(85, "year")}
              max={dayjs()}
            />
          </LocalizationProvider>
        </div>
        <div className=" flex justify-between items-center h-fit m-3 ">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <label htmlFor="birthday" className="font-bold text-lg">
              Expires:
            </label>
            <DatePicker
              value={licenseExpireDate}
              onChange={onChangeExp}
              min={dayjs()}
              max={dayjs().add(5, "year")}
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

export default LicenseData;
