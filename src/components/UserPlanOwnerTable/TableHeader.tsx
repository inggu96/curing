import { Typography } from "@mui/material";
import RKTableCell from "components/RKTable/RKTableCell";
import RKTableRow from "components/RKTable/RKTableRow";
import { FIX_WIDTH } from "./styled";

const TableHeader = () => (
  <RKTableRow>
    <RKTableCell width={FIX_WIDTH.name}>
      <Typography variant="body2">이름</Typography>
    </RKTableCell>
    <RKTableCell width={FIX_WIDTH.phone}>
      <Typography variant="body2">전화번호</Typography>
    </RKTableCell>
    <RKTableCell width={FIX_WIDTH.count}>
      <Typography variant="body2">남은 횟수</Typography>
    </RKTableCell>
    <RKTableCell width={FIX_WIDTH.createdTime}>
      <Typography variant="body2">발급일시</Typography>
    </RKTableCell>
    <RKTableCell width={FIX_WIDTH.option}></RKTableCell>
  </RKTableRow>
);

export default TableHeader;
