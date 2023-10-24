import { Drawer, Pagination } from "@mui/material";
import { AdminAPI } from "api/admin/admin";
import RKNavigateBack from "components/RKNavigateBack";
import UserPlanOwnerTable, { UserTicketPlan } from "components/UserPlanOwnerTable";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useAdminTicket } from "operations/queries/admin";
import { useTickets } from "operations/queries/ticket";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TicketPlanDetailDrawer from "./TicketPlanDetailDrawer";

const TicketPlanUserList = () => {
  const { id, ...props } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectTicket, setSelectTicket] = useState<AdminAPI.AdminTicketResponseInfo | null>(null);

  console.log(id, props);
  const { data } = useAdminTicket({ ticketPlan: id, pageSize: 10, pageToken: `${page}` });

  const plans = useMemo(() => {
    if (!data) {
      return [];
    }

    const { ticketPlan, ...tickets } = data;
    return userTicketsToUserTicketPlan(tickets.items, ticketPlan);
  }, [data]);

  const handleOpen = (plan: UserTicketPlan) => {
    setSelectTicket(data.items.find((item) => item.id === plan.id));
    setIsDetailOpen(true);
  };
  const handleClose = () => {
    setIsDetailOpen(false);
  };

  const handleDelete = () => {};

  console.log(data);

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <RKNavigateBack title="이용권 구매자 목록" goBack={() => navigate(-1)} />

      <UserPlanOwnerTable plans={plans} onClickDetail={handleOpen} />
      <Pagination
        count={Math.round((data?.totalCount ?? 0) / 10) + 1}
        variant="outlined"
        onChange={(e) => console.log(e)}
      />

      <Drawer anchor="right" open={isDetailOpen} onClose={handleClose}>
        <TicketPlanDetailDrawer
          onClose={handleClose}
          onDelete={handleDelete}
          plan={selectTicket}
          ticketPlan={data?.ticketPlan}
        />
      </Drawer>
    </DashboardLayout>
  );
};

const userTicketsToUserTicketPlan = (
  tickets: AdminAPI.AdminTicketResponse["items"],
  ticketPlan?: TicketPlan
): UserTicketPlan[] => {
  if (!ticketPlan) {
    return [];
  }
  return tickets.map(
    (ticket) =>
      ({
        id: ticket.id,
        name: ticket.user.name,
        phone: ticket.user.phone,
        count: `${ticketPlan.maxTrys - ticket.usedCount}/${ticketPlan.maxTrys}`,
        createdTime: ticket.createdTime,
        userId: ticket.user.id,
        ticketPlanId: ticket.id,
      } as UserTicketPlan)
  );
};

export default TicketPlanUserList;
