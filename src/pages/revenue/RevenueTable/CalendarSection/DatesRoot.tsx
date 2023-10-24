import { styled } from "@mui/system";
import TableCell from "@mui/material/TableCell";

interface DayStyledProps {
  isWeekend: boolean;
}
interface CostDivProps {
  cost?: number;
}

export const DatesRoot = styled("td")(({ theme }) => ({
  display: "grid",
  gridTemplateRows: "40px 120px",
  gap: "1px",
  fontWeight: "600",
  cursor: "pointer",
}));
export const DayDiv = styled("div")(({ isWeekend }: DayStyledProps) => ({
  textAlign: "left",
  padding: "10px",
  lineHeight: "20px",
  backgroundColor: "#ffff",
  color: isWeekend ? "#F44334" : undefined,
  width: "100%",
}));

export const BoxDiv = styled("div")(({ theme }) => ({
  backgroundColor: "#ffff",
  fontSize: "12px",
  padding: "4px",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  color: "#ffff",
  width: "100%",
}));
export const CostDiv = styled("div")<CostDivProps>(({ theme, cost }) => ({
  backgroundColor: cost ? "#7CDC00 " : "#C7CCD0",
  borderRadius: "8px",
  padding: "8px 16px",
  textAlign: "left",
}));

export const CountDiv = styled("div")<CostDivProps>(({ theme, cost }) => ({
  backgroundColor: cost ? "#7CDC00 " : "#C7CCD0",
  borderRadius: "8px",
  padding: "8px 16px",
  display: "flex",
  justifyContent: "space-between",
}));
