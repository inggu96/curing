import axiosInstance from "../axios";
import { RevenueAPI } from "./revenue";

export const getRevenueList = async (academyId: string, qeury: RevenueAPI.IListRevenueRequest) =>
  axiosInstance.get<RevenueAPI.IListRevenueResponse>(`/admin/revenue/${academyId}`, {
    params: qeury,
  });

export const getRevenueAmount = async (
  academyId: string,
  qeury: RevenueAPI.IGetRevenueAmountRequest
) =>
  axiosInstance.get<RevenueAPI.IGetRevenueAmountResponse>(`/revenue/${academyId}/amount`, {
    params: qeury,
  });
