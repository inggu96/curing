import React, { useEffect, useState } from "react";
import { useRevenueStore } from "store/AcademyStore";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MDBox from "components/MDBox";
import { Divider, Drawer } from "@mui/material";
import ModalButton from "./RevenueTable/section/ModalButton";
import { Closebutton, Overlay, RefundButton, RevenueHistory, RevenueModal } from "./DetailRoot";

interface SelectedId {
  cost: string;
  day: string;
  id: number;
  name: string;
  phone: string;
  ticket: string;
}
interface RevenueDetailProp {
  selectedId: SelectedId;
  isOnModal: boolean;
}

const RevenueDetail = ({ selectedId, isOnModal }: RevenueDetailProp) => {
  const { modalOff } = useRevenueStore((state) => ({
    modalOff: state.modalOff,
  }));

  return (
    <Drawer open={isOnModal} anchor="right">
      <Overlay
        onClick={(event) => {
          modalOff();
          event.stopPropagation();
        }}
      >
        <RevenueModal
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <Closebutton
            onClick={(event) => {
              modalOff();
            }}
          />
          <MDBox color="secondary">
            <Typography variant="h6">{selectedId?.name}</Typography>
            <Typography variant="h6">{selectedId?.phone}</Typography>
          </MDBox>
          <MDBox>
            <Typography variant="h5">구매내역</Typography>
            <Typography variant="h6">
              <span style={{ color: "primary" }}>상품</span> {selectedId?.ticket}
            </Typography>
            <Typography variant="h6">
              <span style={{ color: "primary" }}>구매일시</span> {selectedId?.day}
            </Typography>
            <Typography variant="h6">
              <span style={{ color: "primary" }}>결제금액</span> {selectedId?.cost}
            </Typography>
            <Typography variant="h6">
              <span style={{ color: "primary" }}>남은 횟수</span>
            </Typography>
          </MDBox>
          <MDBox>
            <Typography variant="h5">이용권 예약내역</Typography>
            <MDBox
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography color="secondary" variant="h6">
                {selectedId?.day} ~
                <br />
                {selectedId?.day}
              </Typography>
              <Typography variant="h6">
                2회
                <span style={{ color: "primary" }}> →</span>
              </Typography>
            </MDBox>
            <Divider />
            <RevenueHistory
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography color="secondary" variant="h6">
                {selectedId?.day} ~
                <br />
                {selectedId?.day}
              </Typography>
              <Typography variant="h6">
                2회
                <span style={{ color: "primary" }}> →</span>
              </Typography>
            </RevenueHistory>
          </MDBox>
          <RefundButton>
            <Typography color="secondary" variant="h6">
              환불에는 1~3일영업일정도
              <br />
              소요될 수 있습니다
            </Typography>
            <ModalButton onClick={() => window.alert("modal")} />
          </RefundButton>
        </RevenueModal>
      </Overlay>
    </Drawer>
  );
};

export default RevenueDetail;
