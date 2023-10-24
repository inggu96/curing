interface IRevenue {
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

interface IRevenueColumns {
  Header: string;
  accessor: string;
  width: string;
  Filter?: typeof DropDown | typeof DateRangeColumnFilter;
  filter: string | ((rows: any[], id: string, filterValue: any[]) => any[]);
}
interface IRevenueData {
  id: number;
  ticket: string;
  name: string;
  cost: string;
  phone: string;
  day: string;
}

enum RevenueState {
  undefined = "undefined",
  pending = "pending",
  paid = "paid",
  canceled = "canceled",
}
declare module "Dayjs" {
  const Dayjs: any;
  export default Dayjs;
}
