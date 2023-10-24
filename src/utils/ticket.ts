export const typeToText = (type: TicketPlan["type"]) => {
  if (type === "ticket") return "이용권";
  if (type === "coupon") return "쿠폰";
  return "";
};

export const toSafeBusinessDay = (businessDays?: IBusinessDay[]) => {
  return (
    businessDays?.map((day) => {
      let end = day.to;
      if (day.to === "00:00") {
        end = "23:59";
      }

      return {
        ...day,
        to: end,
      };
    }) ?? []
  );
};
