export namespace ReservationAPI {
  export interface RservationListRequest {
    userId?: string;
    ticketId?: string;
    ticketPlan?: string | null;
    academyId?: string;
    pageToken?: string | null;
    pageSize?: number;
    start?: string;
    end?: string;
  }
  export interface RservationListResponse extends IReservationList {}

  export interface ReservationDetailResponse extends IReservation {}
}
