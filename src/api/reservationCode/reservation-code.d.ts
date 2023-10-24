export namespace ReservationCodeAPI {
  export interface GetReservatioCodeRequest {
    reservationId: string;
  }

  export interface GetReservationCodeResponse {
    ok: boolean;
    code?: string;
    reservedTime?: ITimeWindow;
    error?: string;
  }
}
