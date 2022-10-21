import React, { useState, useEffect } from "react";
import { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface IProps {
  dayRange: Array<Dayjs | null>;
  onChangeFromDay: (newValue: Dayjs | null) => void;
  onChangeToDay: (newValue: Dayjs | null) => void;
}

export const BasicDatePicker = ({
  dayRange,
  onChangeFromDay,
  onChangeToDay,
}: IProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <label>Pick-up at:</label>
      <DatePicker
        label="Basic example"
        value={dayRange[0]}
        onChange={(newValue) => onChangeFromDay(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
      <label>Drop-off at:</label>
      <DatePicker
        label="Basic example"
        value={dayRange[1]}
        onChange={(newValue) => onChangeToDay(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};
