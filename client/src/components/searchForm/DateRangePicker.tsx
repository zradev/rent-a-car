import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DatePicker from "./DatePicker";

interface IProps {
  dayRange: Array<Dayjs | null>;
  onChangeFromDay: (newValue: Dayjs | null) => void;
  onChangeToDay: (newValue: Dayjs | null) => void;
}

export const DateRangePicker = ({
  dayRange,
  onChangeFromDay,
  onChangeToDay,
}: IProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <label>Pick-up at:</label>
      <DatePicker
        min={dayjs(new Date())}
        max={dayjs(new Date()).add(2, "month")}
        value={dayRange[0]}
        onChange={(newValue) => onChangeFromDay(newValue)}
      />
      <label>Drop-off at:</label>
      <DatePicker
        min={dayRange[0] || dayjs(new Date())}
        max={dayjs(new Date()).add(2, "month")}
        value={dayRange[1]}
        onChange={(newValue) => onChangeToDay(newValue)}
      />
    </LocalizationProvider>
  );
};
