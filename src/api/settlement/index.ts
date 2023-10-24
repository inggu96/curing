import axiosInstance from "../axios";
import { SettlementAPI } from "./settlement";

export const createPaymentSettlement = async (
  data: SettlementAPI.ICreateSettlementHistoryRequest
) => {
  const response = await axiosInstance.post<SettlementAPI.CommonResponse>(
    "/settlement/create",
    data
  );
  return response.data;
};

export const createSettlementHistorySummary = async (
  data: SettlementAPI.ICreateSettlementHistorySummaryRequest
) => {
  const response = await axiosInstance.post<SettlementAPI.CommonResponse>(
    "/settlement/summary",
    data
  );
  return response.data;
};

export const createPaymentHistorySummary = async (
  data: SettlementAPI.ICreatePaymentHistorySummaryRequest
) => {
  const response = await axiosInstance.post<SettlementAPI.CommonResponse>(
    `/settlement/payment-summary`,
    data
  );
  return response.data;
};

export const getPaymentHistorySummary = async (date: string) => {
  const response = await axiosInstance.get<SettlementAPI.IPaymentHistorySummaryResponse>(
    `/settlement/payment-summary`,
    { params: { date } }
  );
  return response.data;
};

export const getSettlementHistorySummary = async (date: string) => {
  const response = await axiosInstance.get<SettlementAPI.ISettlementHistorySummaryResponse>(
    `/settlement/summary`,
    { params: { date } }
  );
  return response.data;
};

export const getSettlementHistorySummaryFromAcademy = async (academyId: string, date: string) => {
  const response = await axiosInstance.get<SettlementAPI.ISettlementHistorySummaryResponse>(
    `/settlement/summary/${academyId}`,
    { params: { date } }
  );
  return response.data;
};

//

// export const getSettlementHistorySummary = async (date: string) => {
//   const response = await axiosInstance.get<SettlementAPI.ISettlementHistorySummaryResponse>(
//     `/settlement/summary`,
//     { params: { date } }
//   );
//   return response.data;
// };
