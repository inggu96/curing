import { Dialog, DialogContent, Drawer, Grid, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import MDButton from "components/MDButton";
import { useState } from "react";

interface RKReservationDetailDrawerProps {
  reservation: IReservation | null;
  code?: string;
  onClose?: () => void;
  onCancel?: () => void;
}

const reservationTimeFormat = (time: string | Date) => dayjs(time).format("YYYY.MM.DD HH:mm");

const RKReservationDetailDrawer = ({
  onClose = () => {},
  onCancel = () => {},
  code,
  reservation,
}: RKReservationDetailDrawerProps) => {
  const [openCancel, setOpenCancel] = useState(false);

  if (!reservation) {
    return (
      <MDBox>
        <MDTypography>정보가 없습니다</MDTypography>
      </MDBox>
    );
  }

  return (
    <MDBox sx={{ padding: 2 }} display="flex" flexDirection="column" gap={1}>
      <MDBox display="flex" flexDirection="row" justifyContent="flex-end">
        <CloseIcon
          fontSize="medium"
          sx={{ color: "#000000", cursor: "pointer" }}
          onClick={onClose}
        />
      </MDBox>
      <MDBox display="flex" flexDirection="column">
        <MDTypography variant="body2" fontWeight="bold">
          {reservation.user.name}
        </MDTypography>

        {/* <MDTypography>회원 닉네임</MDTypography> */}
        {/* <MDTypography>20대 남성</MDTypography> */}
        <MDTypography variant="body2" fontWeight="bold">
          {reservation.user.phone}
        </MDTypography>
        {/* <MDTypography>이메일</MDTypography> */}
      </MDBox>
      <MDBox>
        <MDTypography variant="h6">구매내역</MDTypography>
        <MDBox display="flex" flexDirection="row">
          <MDBox width={60}>
            <MDTypography variant="body3">상품</MDTypography>
          </MDBox>
          <MDBox flex={1}>
            <MDTypography variant="body3">{reservation.ticketPlan.name}</MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" flexDirection="row">
          <MDBox width={60}>
            <MDTypography variant="body3">구매일시</MDTypography>
          </MDBox>
          <MDBox flex={1}>
            <MDTypography variant="body3">
              {dayjs(reservation.createdTime).format("YYYY.MM.DD. HH:mm")}
            </MDTypography>
          </MDBox>
        </MDBox>
        {/* <MDBox display="flex" flexDirection="row">
          <MDBox width={60}>
            <MDTypography variant="body3">결제금액</MDTypography>
          </MDBox>
          <MDBox flex={1}>
            <MDTypography variant="body3">{reservation.ticketPlan.price}</MDTypography>
          </MDBox>
        </MDBox> */}
      </MDBox>

      <MDBox>
        <MDTypography variant="h6">이용권 이용일시</MDTypography>
        <MDBox>
          <MDBox display="flex" justifyContent="space-between" alignItems="center">
            <MDTypography variant="body3">
              {dayjs(reservation.time.start).format("YYYY.MM.DD HH:mm")} ~ <br />
              {dayjs(reservation.time.end).format("YYYY.MM.DD HH:mm")}
            </MDTypography>
            {/* <MDTypography variant="body3">2회</MDTypography> */}
          </MDBox>
        </MDBox>
      </MDBox>

      <MDBox>
        <MDTypography variant="h6">이용권 예약일시</MDTypography>
        <MDTypography variant="body3">
          {dayjs(reservation.createdTime).format("YYYY.MM.DD HH:mm")}
        </MDTypography>
      </MDBox>

      <MDBox>
        <MDTypography variant="h6">시간 단위</MDTypography>
        <MDTypography variant="body3">{reservation.ticketPlan.maxTime}분</MDTypography>
      </MDBox>

      <MDBox>
        <MDTypography variant="h6">코트</MDTypography>
        <MDTypography variant="body3">{reservation.ticketPlan.courts.at(0).name}</MDTypography>
      </MDBox>

      <MDBox>
        <MDTypography variant="h6">예약 인증번호</MDTypography>
        <MDTypography variant="body3">{code}</MDTypography>
      </MDBox>

      <MDButton color="error" onClick={() => setOpenCancel(true)}>
        예약취소
      </MDButton>

      <Dialog
        open={openCancel}
        onClose={() => {
          console.log("close");
          setOpenCancel(false);
        }}
      >
        <DialogContent>
          <MDTypography sx={{ textAlign: "center" }}>정말 예약을 취소하시겠습니까?</MDTypography>
          <MDBox display="flex" flexDirection="column" alignItems="center" p={2}>
            <MDTypography variant="body3">{reservation.user.name}</MDTypography>
            <MDTypography variant="body3">{reservation.user.phone}</MDTypography>
            <MDTypography variant="body3">{reservation.ticketPlan.name}</MDTypography>
            <MDTypography variant="body3">
              {reservationTimeFormat(reservation.time.start)} ~{" "}
              {reservationTimeFormat(reservation.time.end)}
            </MDTypography>
          </MDBox>
          <MDButton color="error" fullWidth onClick={onCancel}>
            예약을 취소합니다.
          </MDButton>
        </DialogContent>
      </Dialog>
    </MDBox>
  );
};

export default RKReservationDetailDrawer;
