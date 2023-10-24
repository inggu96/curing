import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import TicketPlanTable from "components/TicketPlanTable";
import { useNavigate } from "react-router-dom";
import RKNewButton from "components/RKNewButton";
import { useAcademyStore } from "store";
import { useTicketPlanList } from "operations/queries/ticket-plan";
import { useCourtList } from "operations/queries/court";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Switch } from "@mui/material";
import { useMemo, useState } from "react";

const TicketPlanList = () => {
  const navigate = useNavigate();
  const academyId = useAcademyStore((state) => state.academy?.id);
  const { data: ticketPlans } = useTicketPlanList(academyId);
  const { data: courts } = useCourtList(academyId);
  const [visible, setVisible] = useState(false);

  const handleChangeVisibleTicketPlan = (isChecked: boolean) => {
    setVisible(isChecked);
  };
  const displayTicketPlans = useMemo(() => {
    if (!visible) {
      return ticketPlans?.filter((ticketPlan) => {
        if (ticketPlan.disableTime) {
          return false;
        }
        if (ticketPlan.hideTime) {
          return false;
        }
        if (ticketPlan.disableTime) {
          return false;
        }
        return true;
      });
    }
    return ticketPlans;
  }, [visible, ticketPlans, academyId]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox display="flex" flexDirection="row" gap={2}>
        <RKNewButton onClick={() => navigate("/admin/reservation/ticket-plan/create")} />
        <MDBox display="flex" flexDirection="row" alignItems="center">
          <MDTypography variant="body3">노출된 상품만 보기</MDTypography>
          <Switch onChange={(_, isChecked) => handleChangeVisibleTicketPlan(isChecked)} />
          <MDTypography variant="body3">전체 보기</MDTypography>
        </MDBox>
      </MDBox>
      <TicketPlanTable
        courts={courts}
        ticketPlans={displayTicketPlans}
        createRoute="/admin/reservation/ticket-plan"
      />
    </DashboardLayout>
  );
};

export default TicketPlanList;
