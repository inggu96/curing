import axiosInstance from "../axios";
import { ReservationAPI } from "./reservation";

export const getReservations = async (query: ReservationAPI.RservationListRequest) =>
  await axiosInstance.get<ReservationAPI.RservationListResponse>("/reservation/", {
    params: query,
  });

export const getReservation = async (id: string) =>
  await axiosInstance.get<ReservationAPI.ReservationDetailResponse>(`/reservation/${id}`);

export const cancelReservation = async (id: string) =>
  await axiosInstance.delete(`/reservation/${id}/cancel`);
