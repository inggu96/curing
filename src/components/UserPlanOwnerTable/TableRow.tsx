import { Typography } from "@mui/material";
import RKTableCell from "components/RKTable/RKTableCell";
import RKTableRow from "components/RKTable/RKTableRow";
import { FIX_WIDTH } from "./styled";
import { UserTicketPlan } from ".";
import dayjs from "dayjs";
import MDButton from "components/MDButton";

interface TableRowAction {
  onClickDetail?: () => void;
}

const TableRow = ({
  name,
  phone,
  count,
  createdTime,
  onClickDetail,
}: UserTicketPlan & TableRowAction) => (
  <RKTableRow>
    <RKTableCell width={FIX_WIDTH.name}>
      <Typography variant="body2" fontWeight={600}>
        {name}
      </Typography>
    </RKTableCell>
    <RKTableCell width={FIX_WIDTH.phone}>
      <Typography variant="body2" fontWeight={600}>
        {phone}
      </Typography>
    </RKTableCell>
    <RKTableCell width={FIX_WIDTH.count}>
      <Typography variant="body2" fontWeight={600}>
        {count}
      </Typography>
    </RKTableCell>
    <RKTableCell width={FIX_WIDTH.createdTime}>
      <Typography variant="body2" fontWeight={600}>
        {dayjs(createdTime).format("YYYY.MM.DD HH:mm")}
      </Typography>
    </RKTableCell>
    <RKTableCell width={FIX_WIDTH.option}>
      <MDButton variant="contained" color="dark" onClick={onClickDetail}>
        자세히
      </MDButton>
    </RKTableCell>
  </RKTableRow>
);

export default TableRow;
