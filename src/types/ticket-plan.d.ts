type TicketType = "ticket" | "coupon";

interface TicketPlan {
  id: string;
  type: TicketType;
  academy: string;
  courts: string[];
  name: string;
  description: string;
  price: number;
  maxTime: number;
  maxTrys: number;
  maxQuantity: number;
  availableDays: number;
  startTime: Date | null;
  purchaseDuration: number;
  createdTime: Date;
  deletedTime: Date | null;
  disableTime: Date | null;
  hideTime: Date | null;
  expiredTime: Date | null;
  isUserRestricted: boolean;
  accessDuration: IBusinessDay[];
}

interface TicketPlanWithAcademy extends Omit<TicketPlan, "academy"> {
  academy: IAcademy;
  courts: ICourt[];
}

interface TicketPlanWithCourt extends Omit<TicketPlan, "courts"> {
  courts: ICourt[];
}

interface ITicketPlanWhitelistUser {
  id: string;
  userId: string;
  ticketPlanId: string;
}

interface TicketPlanSubmitValue extends Omit<TicketPlan, "id"> {
  id?: string;
  nextAccessDuration: TicketPlan["accessDuration"];
}
