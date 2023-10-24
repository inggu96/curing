import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

interface WeekPickerProps {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  setStartDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  pickData: (type: "start" | "end") => (date: Dayjs | null) => void;
}

export const WeekPicker = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  pickData,
}: WeekPickerProps) => {
  const incrementDate = () => {
    if (startDate && endDate) {
      setStartDate(startDate.add(1, "week"));
      setEndDate(endDate.add(1, "week"));
    }
  };

  const decrementDate = () => {
    if (startDate && endDate) {
      setStartDate(startDate.subtract(1, "week"));
      setEndDate(endDate.subtract(1, "week"));
    }
  };

  return (
    <>
      <ArrowBack sx={{ cursor: "pointer" }} onClick={decrementDate} />

      <DatePicker
        sx={{
          border: "none",
          "& .MuiOutlinedInput-notchedOutline": { border: "none" },
          width: "18rem",
          marginLeft: "-10px",
          "& .MuiIconButton-root": { width: "7px", marginLeft: "-5px" },
        }}
        showDaysOutsideCurrentMonth
        value={startDate}
        slotProps={{ actionBar: { actions: ["clear"] } }}
        onChange={pickData("start")}
      />

      <DatePicker
        sx={{
          border: "none",
          "& .MuiOutlinedInput-notchedOutline": { border: "none" },
          width: "18rem",
          "& .MuiIconButton-root": { padding: "5px", width: "7px", marginLeft: "5px" },
        }}
        showDaysOutsideCurrentMonth
        value={endDate}
        slotProps={{ actionBar: { actions: ["clear"] } }}
        onChange={pickData("end")}
      />

      <ArrowForward sx={{ cursor: "pointer" }} onClick={incrementDate} />
    </>
  );
};
