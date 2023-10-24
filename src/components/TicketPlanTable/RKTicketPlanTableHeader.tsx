import { Typography } from "@mui/material";
import { FIX_WIDTH } from "./styles";
import RKTableCell from "components/RKTable/RKTableCell";
import RKTableRow from "components/RKTable/RKTableRow";

const RKTicketPlanTableHeader = () => {
  return (
    <RKTableRow>
      <RKTableCell width={FIX_WIDTH.name}>
        <Typography variant="body2">이용권 이름</Typography>
      </RKTableCell>
      <RKTableCell width={FIX_WIDTH.court}>
        <Typography variant="body2">구매가능 기한</Typography>
      </RKTableCell>
      <RKTableCell width={FIX_WIDTH.enableDays}>
        <Typography variant="body2">시간단위</Typography>
      </RKTableCell>
      <RKTableCell width={FIX_WIDTH.count}>
        <Typography variant="body2">횟수</Typography>
      </RKTableCell>
      <RKTableCell width={FIX_WIDTH.enable}>
        <Typography variant="body2">서비스 노출</Typography>
      </RKTableCell>
      <RKTableCell width={FIX_WIDTH.options}></RKTableCell>
      <RKTableCell width={FIX_WIDTH.status}>상태</RKTableCell>
    </RKTableRow>
  );
};

export default RKTicketPlanTableHeader;
