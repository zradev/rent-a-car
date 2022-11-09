import React, { useState, useEffect } from "react";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DatePicker from "./DatePicker";
import { useLocation } from "react-router-dom";

export const DateRangePicker = ({ setDays }: { setDays?: any }) => {
  const [dayRange, setDayRange] = useState<Array<string>>([
    sessionStorage.getItem("pick")
      ? sessionStorage.getItem("pick")!
      : dayjs(new Date()).format("DD-MM-YYYY"),
    sessionStorage.getItem("drop")
      ? sessionStorage.getItem("drop")!
      : dayjs(new Date()).format("DD-MM-YYYY")!,
  ]);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!sessionStorage.getItem("pick")) {
      sessionStorage.setItem("pick", dayjs(new Date()).format("DD-MM-YYYY"));
    }
    if (!sessionStorage.getItem("drop")) {
      sessionStorage.setItem("drop", dayjs(new Date()).format("DD-MM-YYYY"));
    }
  }, []);

  useEffect(() => {
    if (setDays) {
      const hours = dayjs(dayRange[1], "DD-MM-YYYY").diff(
        dayjs(dayRange[0], "DD-MM-YYYY"),
        "hour"
      );
      const daysDiff = Math.floor(hours / 24) + 1;
      setDays(() => daysDiff);
    }
  }, [dayRange, setDays]);

  const onChangeFromDay = (newValue: Dayjs) => {
    setDayRange((oldRange) => {
      const newRange = [...oldRange];
      newRange[0] = newValue.format("DD-MM-YYYY");
      return newRange;
    });
    if (newValue.isAfter(dayRange[1])) {
      onChangeToDay(newValue);
    }
    sessionStorage.setItem("pick", newValue.format("DD-MM-YYYY"));
  };

  const onChangeToDay = (newValue: Dayjs) => {
    setDayRange((oldRange) => {
      const newRange = [...oldRange];
      newRange[1] = newValue.format("DD-MM-YYYY");
      return newRange;
    });
    sessionStorage.setItem("drop", newValue.format("DD-MM-YYYY"));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div
        className={`flex flex-row ${
          pathname === "/" && "md:flex-col"
        }  justify-center items-center gap-3 mx-3 p-1`}
      >
        <div
          className={`grid grid-cols-1 ${
            pathname === "/" && "md:grid-cols-2"
          } items-center`}
        >
          <label>Pick-up at:</label>
          <DatePicker
            min={dayjs(new Date())}
            max={dayjs(new Date(), "DD-MM-YYYY").add(2, "month")}
            value={dayjs(dayRange[0], "DD-MM-YYYY")}
            onChange={(newValue) => onChangeFromDay(newValue)}
          />
        </div>
        <div
          className={`grid grid-cols-1 ${
            pathname === "/" && "md:grid-cols-2"
          } items-center`}
        >
          <label>Drop-off at:</label>
          <DatePicker
            min={dayjs(dayRange[0], "DD-MM-YYYY") || dayjs(new Date())}
            max={dayjs(new Date(), "DD-MM-YYYY").add(2, "month")}
            value={dayjs(dayRange[1], "DD-MM-YYYY")}
            onChange={(newValue) => onChangeToDay(newValue)}
          />
        </div>
      </div>
    </LocalizationProvider>
  );
};
