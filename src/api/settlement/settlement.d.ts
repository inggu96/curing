export namespace SettlementAPI {
  export interface ISettlementHistory {
    id: string;
    // 주문 ID입니다. 최소 길이는 6자, 최대 길이는 64자입니다.
    orderId: string;
    // 결제한 금액입니다.
    amount: number;
    // 결제 수수료 부가세입니다
    vat: number;
    // 지급 금액입니다. 결제 금액 amount에서 수수료인 fee를 제외한 금액입니다.
    payOutAmount: number;
    // 결제 수수료입니다.
    fee: number;
    // 거래가 승인된 시점의 날짜와 시간 정보입니다.
    approvedAt: Date;
    // 지급 금액의 정산 기준이 되는 정산 매출일입니다. 상점의 정산 주기에 따라 달라집니다. yyyy-MM-dd 형식입니다
    soldDate: string;
    // 지급 금액을 상점에 지급할 정산 지급일입니다. 상점의 정산 기준일과 정산 주기에 따라 달라집니다. yyyy-MM-dd 형식입니다.
    paidOutDate: string;
    // settlement 전체 응답을 string으로 저장합니다.
    fullResponse?: string;

    createdTime: Date;
    updatedTime: Date;
    deletedTime: Date | null;
  }

  export interface ICreateSettlementHistoryRequest {
    date: string;
  }

  export interface ICreatePaymentHistorySummaryRequest {
    date: string;
  }

  export interface IPaymentHistorySummary {
    id: string;
    academy: string;
    amount: number;
    payOutAmount: number;
    vat: number;
    fee: number;
    curingfee: number;
    from: Date;
    to: Date;
    createdTime: Date;
    updatedTime: Date;
    deletedTime: Date | null;
  }

  export interface IPaymentHistorySummaryResponse {
    message: string;
    data: IPaymentHistorySummary[];
  }

  export interface ISettlementHistorySummaryResponse {
    message: string;
    data: ISettlementHistorySummary[];
  }

  export interface ICreateSettlementHistorySummaryRequest {
    paidOutDate: string;
  }

  export interface ISettlementHistorySummary {
    id: string;
    academy: string;
    amount: number;
    payOutAmount: number;
    vat: number;
    fee: number;
    curingfee: number;
    from: Date;
    to: Date;
    paidOutDate: string;
    createdTime: Date;
    updatedTime: Date;
    deletedTime: Date | null;
  }

  export interface ICreateSettlementHistorySummary {
    academy: string;
    amount: number;
    payOutAmount: number;
    vat: number;
    fee: number;
    curingfee: number;
    from: Date;
    to: Date;
    paidOutDate: string;
  }

  export interface CommonResponse {
    message: string;
  }

  export interface IGetPaymentHistorySummariesRequest {
    date?: string;
  }

  export interface IGetSettlementHistorySummariesRequest {
    date?: string;
  }
}
