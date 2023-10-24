export namespace RevenueAPI {
  export interface IListRevenueRequest {
    pageToken?: string;
    pageSize?: string;
    /* sec 단위의 timestamp */
    startTime: string;
    /* sec 단위의 timestamp */
    endTime: string;
  }

  export interface IListRevenueResponse {
    items: IRevenue[];
    nextPageToken?: string;
    totalCount: number;
  }

  export interface IGetRevenueAmountRequest {
    /* sec 단위의 timestamp */
    startTime: string;
    /* sec 단위의 timestamp */
    endTime: string;
  }

  export interface IGetRevenueAmountResponse {
    amount: number;
  }
}
