import { Card, CardContent, FormControl, Select, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import MDBox from "components/MDBox";
import dayjs, { Dayjs } from "dayjs";

export const DisplayType = {
  WEEK: "WEEK",
  DAY: "DAY",
  MONTH: "MONTH",
};

type DisplayTypeKeys = keyof typeof DisplayType;

interface FilterRowProps {
  type?: DisplayTypeKeys;
  selectDate?: Dayjs;
  onChangeType?: (type: DisplayTypeKeys) => void;
  onChangeDate?: (date: Dayjs) => void;
}

const FilterRow = ({
  type = "DAY",
  selectDate = dayjs(),
  onChangeType,
  onChangeDate,
}: FilterRowProps) => (
  <Card>
    <CardContent>
      <MDBox display="flex" flexDirection="row" alignItems="center">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 90 }}>
          <Select
            value={type}
            onChange={(e) => onChangeType(e.target.value as keyof typeof DisplayType)}
            sx={{ height: 40 }}
          >
            <MenuItem value="DAY">일간</MenuItem>
            <MenuItem value="WEEK">주간</MenuItem>
            {/* <MenuItem value="MONTH">월간</MenuItem> */}
          </Select>
        </FormControl>
        <DatePicker onChange={onChangeDate} value={selectDate} />
      </MDBox>
    </CardContent>
  </Card>
);

export default FilterRow;
