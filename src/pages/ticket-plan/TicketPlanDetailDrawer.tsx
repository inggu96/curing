import { AdminAPI } from "api/admin/admin";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import CloseIcon from "@mui/icons-material/Close";
import MDTypography from "components/MDTypography";
import { Dialog, DialogContent } from "@mui/material";
import { useState } from "react";

interface TicketPlanDetailDrawerProps {
  plan?: AdminAPI.AdminTicketResponseInfo;
  ticketPlan?: TicketPlan;
  onClose?: () => void;
  onDelete?: () => void;
}

const TicketPlanDetailDrawer = ({
  plan,
  ticketPlan,
  onClose,
  onDelete,
}: TicketPlanDetailDrawerProps) => {
  const [openCancel, setOpenCancel] = useState(false);

  const handleDelete = () => {
    onDelete?.();
    setOpenCancel(false);
  };
  return (
    <MDBox sx={{ padding: 2 }} display="flex" flexDirection="column">
      <MDBox display="flex" flexDirection="row" justifyContent="flex-end">
        <CloseIcon
          fontSize="medium"
          sx={{ color: "#000000", cursor: "pointer" }}
          onClick={onClose}
        />
      </MDBox>
      <MDBox display="flex" flexDirection="column">
        <MDTypography variant="body2" fontWeight="bold">
          {plan.user.name}
        </MDTypography>
        <MDTypography variant="body2" fontWeight="bold">
          {plan.user.phone}
        </MDTypography>
      </MDBox>
      {ticketPlan.type === "coupon" && (
        <MDButton
          variant="contained"
          color="error"
          onClick={() => setOpenCancel(true)}
          sx={{ mt: 2 }}
        >
          쿠폰 삭제
        </MDButton>
      )}

      <Dialog
        open={openCancel}
        onClose={() => {
          setOpenCancel(false);
        }}
      >
        <DialogContent>
          <MDTypography sx={{ textAlign: "center" }}>정말 삭제하시겠습니까?</MDTypography>
          <MDBox display="flex" flexDirection="column" alignItems="center" p={2}>
            <MDTypography variant="body3">{ticketPlan.name}</MDTypography>
            <MDTypography variant="body3">{plan.user.name}</MDTypography>
            <MDTypography variant="body3">{plan.user.phone}</MDTypography>
          </MDBox>
          <MDButton color="error" fullWidth onClick={handleDelete}>
            쿠폰을 삭제합니다
          </MDButton>
        </DialogContent>
      </Dialog>
    </MDBox>
  );
};

export default TicketPlanDetailDrawer;
