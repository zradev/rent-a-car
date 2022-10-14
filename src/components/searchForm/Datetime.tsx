import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function BasicDateTimePicker() {
  const currentDate = new Date();
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(currentDate));
  const minDate = currentDate.toISOString().slice(0, -8);
  const maxDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1))
    .toISOString()
    .slice(0, -8);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        value={value}
        minDate={minDate}
        maxDate={maxDate}
        onChange={(newValue: any) => {
          setValue(newValue);
          console.log(newValue);
        }}
        className="bg-gray-200 w-fit"
      />
    </LocalizationProvider>
  );
}
