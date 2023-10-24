import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import MDBox from "components/MDBox";
import MDDatePicker from "components/MDDatePicker";
import dayjs from "dayjs";

interface RKTimeRangeProps {
  labels?: string[];
  startDate?: dayjs.Dayjs;
  endDate?: dayjs.Dayjs;
  onChangeStartDate?: (date: dayjs.Dayjs) => void;
  onChangeEndDate?: (date: dayjs.Dayjs) => void;
}

const RKTimeRange = ({
  labels,
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate,
}: RKTimeRangeProps) => {
  return (
    <MDBox sx={{ display: "flex", flexDirection: "row", gap: 1, width: "100%" }}>
      <MobileTimePicker
        label={labels?.at(0) ?? "운영시작"}
        minutesStep={10}
        defaultValue={startDate}
        onAccept={(e: dayjs.Dayjs) => onChangeStartDate?.(e)}
        sx={{ flex: 1 }}
      />
      <MobileTimePicker
        label={labels?.at(1) ?? "운영종료"}
        minutesStep={10}
        defaultValue={endDate}
        onAccept={(e: dayjs.Dayjs) => onChangeEndDate?.(e)}
        sx={{ flex: 1 }}
      />
    </MDBox>
  );
};

export default RKTimeRange;
