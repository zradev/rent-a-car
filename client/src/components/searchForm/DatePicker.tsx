import React from "react";
import { DatePicker as DatePick } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";

interface IProps {
  value: Dayjs | null;
  onChange: (newValue: any) => void;
  min?: Dayjs | null;
  max?: Dayjs | null;
}

const DatePicker = ({ value, onChange, min, max }: IProps) => {
  return (
    <DatePick
      inputFormat="DD/MM/YYYY"
      minDate={min}
      maxDate={max}
      value={value}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} />}
      className={
        min?.year()! < dayjs().subtract(18, "year").year()
          ? "w-[45vw] md:w-[20vw]"
          : ""
      }
    />
  );
};

export default DatePicker;
