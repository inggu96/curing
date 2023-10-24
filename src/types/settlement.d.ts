interface ISettlement {
  orderId: string;
  ticketPlan: string;
  orderName: string;
  amount: number;
  state: string;
  createdTime: Date;
  updatedTime: Date;
  user: {
    name: string;
    phone: string;
  };
}

interface ISettlements {
  Header: string;
  accessor: string;
  width: string;
  Filter?: typeof DropDown;
  filter: string | ((rows: any[], id: string, filterValue: any[]) => any[]);
}
interface ISettlementData {
  id: number;
  day: string;
  cost: string;
  agency: string;
  curing: string;
  total: string;
}

enum RevenueState {
  undefined = "undefined",
  pending = "pending",
  paid = "paid",
  canceled = "canceled",
}
