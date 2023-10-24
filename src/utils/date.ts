import dayjs from "dayjs";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Asia/Seoul");

export const getWeekdayToString = (day: number) => ["일", "월", "화", "수", "목", "금", "토"][day];

export const reduceDaysToWeekDay = (acc: string[], cur: number) => {
  if (getWeekdayToString(cur) in acc) {
    return acc;
  }

  return [...acc, getWeekdayToString(cur)];
};

export const sortWeekDays = (days: number[]) => {
  const tempDays = [...new Set([...days])];
  tempDays.sort((a, b) => a - b);

  return tempDays.reduce(reduceDaysToWeekDay, []);
};
