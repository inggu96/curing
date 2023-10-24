import { Typography } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import RKTimeRange from "components/RKTimeRange";
import { WEEKDAY } from "constant";
import { getWeekdayToString } from "utils/date";
import RKTimeRangeWithDayRoot from "./RKTimeRangeWithDayRoot";
import { Dayjs } from "dayjs";
import MDButton from "components/MDButton";
import DeleteIcon from "@mui/icons-material/Delete";

export interface RKTimeRangeWithDayProps {
  selectDays?: IBusinessDay["day"][];
  startDate?: Dayjs;
  endDate?: Dayjs;
  labels?: string[];
  onSelectDay?: (day: number) => void;
  onChangeStartDate?: (date: Dayjs) => void;
  onChangeEndDate?: (date: Dayjs) => void;
  onDelete?: () => void;
}

const RKTimeRangeWithDay = ({
  startDate,
  endDate,
  selectDays = [],
  labels,
  onSelectDay,
  onChangeStartDate,
  onChangeEndDate,
  onDelete,
}: RKTimeRangeWithDayProps) => {
  return (
    <RKTimeRangeWithDayRoot>
      <MDBox className="top">
        <MDBox className="weekday">
          {WEEKDAY.map((day) => (
            <DayBox day={day} key={day} selected={selectDays.includes(day)} onClick={onSelectDay} />
          ))}
        </MDBox>
        <MDButton onClick={() => onDelete?.()}>
          <DeleteIcon />
        </MDButton>
      </MDBox>
      <MDBox>
        <RKTimeRange
          labels={labels}
          startDate={startDate}
          endDate={endDate}
          onChangeStartDate={onChangeStartDate}
          onChangeEndDate={onChangeEndDate}
        />
      </MDBox>
    </RKTimeRangeWithDayRoot>
  );
};

const DayBox = ({
  day,
  selected,
  onClick,
}: {
  day: number;
  selected?: boolean;
  onClick?: (e: number) => void;
}) => (
  <div className={`daybox ${selected ? "selected" : ""}`} onClick={() => onClick?.(day)}>
    <MDTypography variant="body3" className="daybox-text">
      {getWeekdayToString(day)}
    </MDTypography>
  </div>
);

export default RKTimeRangeWithDay;
