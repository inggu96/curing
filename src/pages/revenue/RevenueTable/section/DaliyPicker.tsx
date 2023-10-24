import React from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useRevenueStore } from "store/AcademyStore";

interface DaliyPickerProps {
  globalFilterValue: Dayjs | null;
  setGlobalFilterValue: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  pickData: (date: Dayjs) => void;
  selectedOption: string;
  format: string;
}

export const DaliyPicker = ({
  globalFilterValue,
  setGlobalFilterValue,
  pickData,
  selectedOption,
  format,
}: DaliyPickerProps) => {
  enum schedule {
    daily = "일간",
    week = "주간",
    month = "월간",
  }

  const { increMonth, decreMonth } = useRevenueStore((state) => ({
    increMonth: state.increMonth,
    decreMonth: state.decreMonth,
  }));

  const incrementDate = () => {
    if (globalFilterValue) {
      let newDate;
      switch (selectedOption) {
        case schedule.daily:
          newDate = globalFilterValue.add(1, "day");
          setGlobalFilterValue(newDate);
          pickData(newDate);
          break;
        case schedule.week:
          newDate = globalFilterValue.add(1, "week");
          setGlobalFilterValue(newDate);
          //  weekpickData(newDate);
          break;
        case schedule.month:
          newDate = globalFilterValue.add(1, "month");
          setGlobalFilterValue(newDate);
          pickData(newDate);
          increMonth();
          break;
      }
    } else {
      console.error("Invalid date value: ", globalFilterValue);
    }
  };

  const decrementDate = () => {
    if (globalFilterValue) {
      let newDate;
      switch (selectedOption) {
        case schedule.daily:
          newDate = globalFilterValue.subtract(1, "day");
          setGlobalFilterValue(newDate);
          pickData(newDate);
          break;
        case schedule.week:
          newDate = globalFilterValue.subtract(7, "day");
          setGlobalFilterValue(dayjs(newDate));
          //  weekpickData(newDate);
          break;
        case schedule.month:
          newDate = globalFilterValue.subtract(1, "month");
          setGlobalFilterValue(dayjs(newDate));
          pickData(newDate);
          decreMonth();
          break;
      }
    } else {
      console.error("Invalid date value:", globalFilterValue);
    }
  };
  return (
    <>
      <ArrowBack sx={{ cursor: "pointer" }} onClick={decrementDate} />
      <DatePicker
        sx={{ border: "none", "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
        showDaysOutsideCurrentMonth
        value={globalFilterValue}
        slotProps={{
          actionBar: { actions: ["clear"] },
        }}
        format={format}
        onChange={(newValue) => {
          pickData(newValue);
        }}
      />
      <ArrowForward sx={{ cursor: "pointer" }} onClick={incrementDate} />
    </>
  );
};
