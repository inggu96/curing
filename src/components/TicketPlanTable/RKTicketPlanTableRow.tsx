import { FormControl, Switch, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import RKTableCell from "components/RKTable/RKTableCell";
import RKTableRow from "components/RKTable/RKTableRow";
import { FIX_WIDTH } from "./styles";
import MDTypography from "components/MDTypography";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import TicketPlanStatus from "components/TicketPlanStatus";

import VisibilityIcon from "@mui/icons-material/Visibility";

interface RKTicketPlanTableRowProps {
  plan: TicketPlanWithCourt;
  isUseable?: boolean;
  onClickEdit?: () => void;
  onClickCopy?: () => void;
  onClickDelete?: () => void;
  onToggleUseable?: (isOn: boolean) => void;
}

const RKTicketPlanTableRow = ({
  plan,
  isUseable,
  onClickEdit,
  onClickCopy,
  onClickDelete,
  onToggleUseable,
}: RKTicketPlanTableRowProps) => (
  <RKTableRow>
    <RKTableCell width={FIX_WIDTH.name}>
      <Typography
        variant="body2"
        fontWeight={600}
        sx={{
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        {plan.name}
      </Typography>
    </RKTableCell>
    <RKTableCell width={FIX_WIDTH.court}>
      <Typography variant="body2" fontWeight={600}>
        {plan.availableDays}일
      </Typography>
    </RKTableCell>
    <RKTableCell width={FIX_WIDTH.enableDays}>
      <Typography variant="body2" fontWeight={600}>
        {plan.maxTime}분
      </Typography>
    </RKTableCell>
    <RKTableCell width={FIX_WIDTH.enableDays}>
      <Typography variant="body2" fontWeight={600}>
        {plan.maxTrys}회
      </Typography>
    </RKTableCell>
    <RKTableCell width={FIX_WIDTH.enable}>
      <Typography variant="body2" fontWeight={600}>
        {isUseable ? "노출" : "미노출"}
      </Typography>
      <FormControl>
        <Switch checked={isUseable} onChange={(event) => onToggleUseable?.(event.target.checked)} />
      </FormControl>
    </RKTableCell>
    <RKTableCell width={FIX_WIDTH.options}>
      <MDBox
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
          height: 21,
        }}
      >
        <MDBox sx={buttonItemStyle()} onClick={onClickEdit}>
          <VisibilityIcon />
          <MDTypography variant="body3" className="label">
            자세히
          </MDTypography>
        </MDBox>
        <MDBox sx={buttonItemStyle()} onClick={onClickCopy}>
          <ContentCopyIcon />
          <MDTypography variant="body3" className="label">
            복사
          </MDTypography>
        </MDBox>
        <MDBox sx={buttonItemStyle()} onClick={onClickDelete}>
          <DeleteIcon />
          <MDTypography variant="body3" className="label">
            삭제
          </MDTypography>
        </MDBox>
      </MDBox>
    </RKTableCell>
    <RKTableCell width={FIX_WIDTH.options}>
      <TicketPlanStatus ticketPlan={plan} />
    </RKTableCell>
  </RKTableRow>
);

const buttonItemStyle = () => ({
  flexDirection: "row",
  display: "flex",
  alignItems: "center",
  gap: 1,
  cursor: "pointer",

  // "&:hover": {
  //   color: "#FF0000",

  //   "& .label": {
  //     color: "#FF0000",
  //   },
  // },
});

export default RKTicketPlanTableRow;
