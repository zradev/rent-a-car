import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DatePicker from "../../components/searchForm/DatePicker";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import axios from "axios";
import { IUser } from "../../utils/interfaces";
import { COUNTRIES } from "../../utils/constants";

const LicenseData = ({ user }: { user: IUser }) => {
  const [licenseNum, setLicenseNum] = useState(user.licenseNum);
  const [licenseCountry, setLicenseCountry] = useState(user.licenseCountry);
  const [licenseIssueDate, setLicenseIssueDate] = useState<Dayjs>(
    dayjs(user.licenseIssueDate, "DD-MM-YYYY")
  );
  const [licenseExpireDate, setLicenseExpireDate] = useState<Dayjs>(
    dayjs(user.licenseExpireDate, "DD-MM-YYYY")
  );

  const onChangeIssue = (newValue: Dayjs) => {
    setLicenseIssueDate(() => newValue);
  };

  const onChangeExp = (newValue: Dayjs) => {
    setLicenseExpireDate(() => newValue);
  };

  const onSubmit = async () => {
    await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/user/update/${user.id}`,
      {
        licenseNum,
        licenseCountry,
        licenseIssueDate: licenseIssueDate.format("DD/MM/YYYY"),
        licenseExpireDate: licenseExpireDate.format("DD/MM/YYYY"),
      }
    );
  };

  return (
    <>
      <form method="put" onSubmit={onSubmit} className="w-full">
        <h2 className="text-2xl text-center border-b mb-6">
          Driver License Details
        </h2>
        <div className=" flex justify-between items-center m-3">
          <label htmlFor="licenseNum" className="font-bold text-lg">
            License Number:
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
            Country:
          </label>
          <select
            defaultValue={user.licenseCountry || "Select"}
            onChange={(e) => setLicenseCountry(e.target.value)}
            className="rounded-lg border border-gray-400 focus:outline-sky-800 p-1 px-2 w-[45vw] md:w-[20vw]"
          >
            {COUNTRIES.map((country: string) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className=" flex justify-between items-center h-fit m-3 ">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <label htmlFor="birthday" className="font-bold text-lg">
              Issued at:
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
              Expires at:
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
