import { Tooltip } from "@mui/material";
import MDBox from "components/MDBox";

import CreditCardOffIcon from "@mui/icons-material/CreditCardOff";
import TimerOffIcon from "@mui/icons-material/TimerOff";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

interface TicketPlanStatusProps {
  ticketPlan: TicketPlanWithAcademy;
}

const TicketPlanStatus = ({ ticketPlan }: TicketPlanStatusProps) => {
  return (
    <MDBox display="flex" flexDirection="row" alignItems="center" gap={2}>
      {ticketPlan.disableTime && (
        <Tooltip title="결제불가능">
          <CreditCardOffIcon />
        </Tooltip>
      )}
      {ticketPlan.expiredTime && (
        <Tooltip title="판매기한 만료">
          <TimerOffIcon />
        </Tooltip>
      )}
      {ticketPlan.hideTime && (
        <Tooltip title="숨겨진 상태">
          <VisibilityOffIcon />
        </Tooltip>
      )}
      {ticketPlan.deletedTime && (
        <Tooltip title="삭제된 상태">
          <RemoveCircleIcon />
        </Tooltip>
      )}
    </MDBox>
  );
};

export default TicketPlanStatus;
