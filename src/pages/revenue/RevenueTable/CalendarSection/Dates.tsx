import { TableCell } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { BoxDiv, CostDiv, CountDiv, DatesRoot, DayDiv } from "./DatesRoot";

interface IDates {
  date: Date;
  isWeekend: boolean;
  data: { [key: string]: any };
  setGlobalFilterValue: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

const Dates = ({ date, isWeekend, data = {}, setGlobalFilterValue, setSelectedOption }: IDates) => {
  return (
    <DatesRoot
      align="center"
      style={{
        display: "grid",
        gridTemplateRows: "40px 120px",
        gap: "1px",
        fontWeight: "600",
        cursor: "pointer",
      }}
      onClick={() => {
        setGlobalFilterValue(dayjs(date));
        setSelectedOption("일간");
        console.log(setGlobalFilterValue(dayjs(date)));
        console.log(data);
        console.log(date);
      }}
    >
      <DayDiv isWeekend={isWeekend}>{`${dayjs(date).get("date")}일`}</DayDiv>
      <BoxDiv>
        <CostDiv cost={data?.cost}>{data?.cost ?? 0} 원</CostDiv>
        <CountDiv cost={data?.cost}>
          <div>결제 건</div>
          <div>{data?.index ?? 0} 회</div>
        </CountDiv>
      </BoxDiv>
    </DatesRoot>
  );
};

export default Dates;
