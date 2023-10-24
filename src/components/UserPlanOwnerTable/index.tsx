import RKTableRoot from "components/RKTable/RKTableRoot";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import MDBox from "components/MDBox";

export interface UserTicketPlan {
  id: string;
  userId: string;
  ticketPlanId: string;
  count: string;
  name: string;
  phone: string;
  createdTime: Date;
}

interface UserPlanOwnerTableProps {
  plans: UserTicketPlan[];
  onClickDetail: (plan: UserTicketPlan) => void;
}

const UserPlanOwnerTable = ({ plans, onClickDetail }: UserPlanOwnerTableProps) => {
  return (
    <RKTableRoot>
      <TableHeader />
      <MDBox display="flex" flexDirection="column" gap={1} mt={1}>
        {plans?.map((plan) => (
          <TableRow {...plan} key={plan.id} onClickDetail={() => onClickDetail(plan)} />
        ))}
      </MDBox>
    </RKTableRoot>
  );
};

export default UserPlanOwnerTable;
