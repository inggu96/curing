import MDBox from "components/MDBox";
import { FIX_WIDTH } from "./styles";
import { Typography } from "@mui/material";

const RKCourtTableHeader = () => {
  return (
    <MDBox sx={{ display: "flex", flexDirection: "row" }}>
      <MDBox style={{ width: FIX_WIDTH.name }}>
        <Typography>이용권 이름</Typography>
      </MDBox>
      <MDBox style={{ width: FIX_WIDTH.court }}>
        <Typography>코트</Typography>
      </MDBox>
      <MDBox style={{ width: FIX_WIDTH.enablePayDate }}>
        <Typography>구매가능 기한</Typography>
      </MDBox>
      <MDBox style={{ width: FIX_WIDTH.enableUsedTime }}>
        <Typography>사용 기한</Typography>
      </MDBox>
      <MDBox style={{ width: FIX_WIDTH.unitOfTime }}>
        <Typography>시간 단위</Typography>
      </MDBox>
      <MDBox style={{ width: FIX_WIDTH.count }}>
        <Typography>횟수</Typography>
      </MDBox>
      <MDBox style={{ width: FIX_WIDTH.price }}>
        <Typography>가격</Typography>
      </MDBox>
      <MDBox style={{ width: FIX_WIDTH.serviceHide }}>
        <Typography>서비스 노출</Typography>
      </MDBox>
    </MDBox>
  );
};

export default RKCourtTableHeader;
