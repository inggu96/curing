import { Table, TableBody, TableRow } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import { useRevenueStore } from "store/AcademyStore";
import BlankDates from "./CalendarSection/BlankDates";
import Dates from "./CalendarSection/Dates";
import WeekDays from "./CalendarSection/WeekDays";
import CalendarRoot from "./CalendarRoot";

interface Props {
  columns: { accessor: string; [key: string]: any }[];
  data: { [key: string]: any }[];
  setGlobalFilterValue: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

const RevenueCalendar = ({ columns, data, setGlobalFilterValue, setSelectedOption }: Props) => {
  const { monthDate } = useRevenueStore((state) => ({
    monthDate: state.monthDate,
  }));

  const weeks = useMemo(() => {
    return getCalendarRows(monthDate);
  }, [monthDate]);
  return (
    <CalendarRoot>
      <Table>
        <WeekDays />
        <TableBody>
          {weeks.map((row, idx) => (
            <TableRow className="tableRow" key={idx}>
              {row.map((date, index) => {
                const isWeekend = (index === 0 || index === 6) && true;
                const dayData = data.find((d: any) => dayjs(date).isSame(dayjs(d?.day), "day"));

                if (date === 0) return <BlankDates key={index} />;
                return (
                  <Dates
                    date={date}
                    data={dayData}
                    isWeekend={isWeekend}
                    key={index}
                    setSelectedOption={setSelectedOption}
                    setGlobalFilterValue={setGlobalFilterValue}
                  />
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CalendarRoot>
  );
};

export default RevenueCalendar;

function getCalendarRows(monthDate: any) {
  const totalDaysInMonth = monthDate.daysInMonth();
  const startDate = monthDate.startOf("month").startOf("week");
  const lastDate = monthDate.endOf("month").endOf("week");

  const startBlankCount = monthDate.startOf("month").diff(startDate, "day");
  const endBlankCount = lastDate.diff(monthDate.endOf("month"), "day");
  const rowCount = Math.ceil((totalDaysInMonth + startBlankCount + endBlankCount) / 7);
  const allDates = [
    ...Array(startBlankCount).fill(0),
    ...Array(totalDaysInMonth)
      .fill(0)
      .map((_, i) => monthDate.add(i, "day")),
    ...Array(endBlankCount).fill(0),
  ];

  const rows = Array(rowCount)
    .fill(0)
    .map((_, i) => [...allDates].splice(i * 7, 7));

  return rows;
}
