export interface ValidError<T> {
  fieldName: keyof T;
  type: string;
  message: string;
}

export const validTicketPlan = (
  plan: Partial<TicketPlanSubmitValue>
): ValidError<TicketPlanSubmitValue>[] => {
  const errors: ValidError<TicketPlanSubmitValue>[] = [];
  if (!plan.name) {
    errors.push({
      fieldName: "name",
      type: "ticketPlan",
      message: "이름을 입력해주세요.",
    });
  }

  if (!plan.courts || plan.courts.length === 0) {
    errors.push({
      fieldName: "courts",
      type: "ticketPlan",
      message: "코트를 선택해주세요.",
    });
  }

  if (!plan.maxTrys && plan.maxTrys < -1) {
    errors.push({
      fieldName: "maxTrys",
      type: "ticketPlan",
      message: "최대 예약 횟수를 -1 이하로 설정할수 없습니다.",
    });
  }

  if ((plan.price !== 0 && !plan.price) || plan.price < 0) {
    errors.push({
      fieldName: "price",
      type: "ticketPlan",
      message: "가격을 0원 미만으로 세팅할수 없습니다.",
    });
  }

  return errors;
};
