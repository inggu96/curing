interface IReservation {
  id: string;
  academy: IReservationAcademy;
  time: ITimeWindow;
  ticketPlan: Pick<
    TicketPlanWithCourt,
    "id" | "name" | "maxTime" | "courts" | "hideTime" | "disableTime" | "deletedTime"
  >;
  user: IReservationUser;
  createdTime: Date;
}

interface IReservationAcademy {
  id: string;
  name: string;
}

interface IReservationUser {
  id: string;
  name: string;
  phone: string;
}

interface IReservationList {
  items: IReservation[];
  nextPageToken: string;
  totalCount?: number;
}

interface ITimeWindow {
  academy?: string;
  start: Date;
  end: Date;
}
