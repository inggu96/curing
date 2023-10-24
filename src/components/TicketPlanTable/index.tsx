import RKTableRoot from "components/RKTable/RKTableRoot";
import RKTicketPlanTableHeader from "./RKTicketPlanTableHeader";
import RKTableRow from "components/RKTable/RKTableRow";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import RKTicketPlanTableRow from "./RKTicketPlanTableRow";
import { Dialog, DialogContent, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  useCreateTicketPlan,
  useDeleteTicketPlan,
  useUpdateTicketPlanStatus,
} from "operations/mutations/ticket-plan";
import { FIX_WIDTH } from "./styles";
import { useCreateCourt } from "operations/mutations/court";
import { useRef, useState } from "react";
import MDButton from "components/MDButton";

const toRenderPlan = (ticketPlans: TicketPlanAPI.TicketPlanResponseWithData[]) => {
  return (
    ticketPlans?.reduce<Record<string, TicketPlanAPI.TicketPlanResponseWithData[]>>((acc, cur) => {
      const currentMap: any =
        cur.courts?.reduce((result, court) => {
          return (
            {
              ...result,
              [court.id]: [cur],
            } ?? {}
          );
        }, {}) ?? {};

      const keys = [...new Set([...Object.keys(acc ?? {}), ...Object.keys(currentMap)])];

      // merge acc and currentMap
      return keys.reduce((result, key) => {
        return {
          ...result,
          [key]: [...(acc[key] || []), ...(currentMap[key] || [])],
        };
      }, {});
    }, {}) ?? {}
  );
};

const ticketPlanToTicketPlanSubmitValue = ({
  id,
  ...ticketPlan
}: TicketPlan): TicketPlanSubmitValue => ({
  ...ticketPlan,
  nextAccessDuration: ticketPlan.accessDuration,
});

interface TicketPlanTableProps {
  ticketPlans: TicketPlanWithAcademy[];
  courts: ICourt[];
  createRoute: string;
}

const TicketPlanTable = ({ ticketPlans, courts, createRoute }: TicketPlanTableProps) => {
  const navigate = useNavigate();
  const { mutate: updateTicketPlanStatus } = useUpdateTicketPlanStatus();
  const { mutate: deleteTicketPlan, isLoading: isDeleteLoading } = useDeleteTicketPlan();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const selectedTicketPlan = useRef<TicketPlanAPI.TicketPlanResponseWithData | null>(null);

  const courtTicketPlanMap = toRenderPlan(ticketPlans || []);

  const handleEdit = (ticketPlan: TicketPlanAPI.TicketPlanResponseWithData) => {
    navigate(`${createRoute}/${ticketPlan.id}`);
  };

  const handleCopy = (ticketPlan: TicketPlanAPI.TicketPlanResponseWithData) => {
    const { courts, academy, name, ...plan } = ticketPlan;
    const _ticketPlan: TicketPlan = {
      ...plan,
      name: `${name}의 복사본`,
      academy: academy.id,
      courts: courts.map((court) => court.id),
    };

    const copyTicketPlanValue = ticketPlanToTicketPlanSubmitValue(_ticketPlan);

    // @ts-ignore
    navigate(`${createRoute}/create`, { state: copyTicketPlanValue });
  };

  const handleDelete = () => {
    const { id } = selectedTicketPlan.current;

    if (!isDeleteLoading) {
      deleteTicketPlan(id);
    }
  };

  const handleToggle = (ticketPlan: TicketPlanAPI.TicketPlanResponseWithData) => {
    updateTicketPlanStatus({
      id: ticketPlan.id,
      isHide: ticketPlan.hideTime === null,
    });
  };

  const openDeleteDialog = (ticketPlan: TicketPlanAPI.TicketPlanResponseWithData) => {
    selectedTicketPlan.current = ticketPlan;
    setIsDeleteOpen(true);
  };

  const handleCancel = () => {
    selectedTicketPlan.current = null;
    setIsDeleteOpen(false);
  };

  return (
    <RKTableRoot>
      <RKTicketPlanTableHeader />
      <MDBox sx={{ mt: 5, display: "flex", flexDirection: "column", gap: 1 }}>
        {Object.entries(courtTicketPlanMap).map(([courtId, ticketPlans]) => {
          const court = courts?.find((court) => court.id === courtId);
          console.log("court --> ", court);
          return (
            <>
              <RKTableRow>
                <CourtName
                  variant="h6"
                  sx={{ width: Object.values(FIX_WIDTH).reduce((acc, cur) => acc + cur) }}
                >
                  {court?.name}
                </CourtName>
              </RKTableRow>
              {ticketPlans.map((ticketPlan) => (
                <RKTicketPlanTableRow
                  key={ticketPlan.id}
                  isUseable={ticketPlan.hideTime === null}
                  plan={ticketPlan}
                  onClickEdit={() => handleEdit(ticketPlan)}
                  onClickDelete={() => openDeleteDialog(ticketPlan)}
                  onClickCopy={() => handleCopy(ticketPlan)}
                  onToggleUseable={() => handleToggle(ticketPlan)}
                />
              ))}
            </>
          );
        })}
      </MDBox>
      <Dialog
        open={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
        }}
      >
        <DialogContent>
          <MDTypography sx={{ textAlign: "center" }}>정말 삭제하시겠습니까?</MDTypography>
          <MDBox display="flex" flexDirection="column" alignItems="center" p={2}>
            <MDTypography variant="body3">{selectedTicketPlan.current?.name}</MDTypography>
          </MDBox>
          <MDButton color="error" fullWidth onClick={handleCancel}>
            이용권/쿠폰을 삭제합니다.
          </MDButton>
        </DialogContent>
      </Dialog>
    </RKTableRoot>
  );
};

const CourtName = styled(MDTypography)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",

  "::before": {
    display: "block",
    content: "''",
    width: 3,
    marginRight: 12,
    background: theme.palette.primary.main,
  },
}));

// const getCourtNameStyle = (color: string = ) => ({
//   display: "flex",
//   flexDirection: "row",

//   "::before": {
//     display: "block",
//     content: "''",
//     width: 3,
//     background: "#AAAAAA",
//   },
// });

export default TicketPlanTable;
