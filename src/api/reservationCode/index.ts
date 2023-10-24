import axiosInstance from "../axios";
import { ReservationCodeAPI } from "./reservation-code";

export const getReservationCode = async (data: ReservationCodeAPI.GetReservatioCodeRequest) =>
  axiosInstance.post<ReservationCodeAPI.GetReservationCodeResponse>("reservation-code", data);
