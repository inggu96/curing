/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import AcademyDetail from "pages/academy/AcademyDetail";
import TodayIcon from "@mui/icons-material/Today";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import PaymentIcon from "@mui/icons-material/Payment";
import CourtDetail from "pages/court/CourtDetail";
import CourtList from "pages/court/CourtList";
import CourtCreate from "pages/court/CourtCreate";
import TicketPlanList from "pages/ticket-plan/TicketPlanList";
import TicketPlanDetail from "pages/ticket-plan/TicketPlanDetail";
import TicketPlanCreate from "pages/ticket-plan/TicketPlanCreate";
import ReservationTimeTable from "pages/reservation/ReservationTimeTable";
import CouponList from "pages/coupon/CouponList";
import CouponCreate from "pages/coupon/CouponCreate";
import RevenueList from "pages/revenue/RevenueList";
import SettlementList from "pages/settlement/SettlementList";

const PREFIX_ROUTE = "/admin";

const routes = [
  {
    type: "collapse",
    name: "업체 정보",
    key: "acadmey",
    icon: <InfoOutlinedIcon />,
    noCollapse: true,
    route: `${PREFIX_ROUTE}/academy/detail`,
    component: <AcademyDetail />,
  },
  {
    type: "collapse",
    name: "예약",
    key: "reservation",
    icon: <TodayIcon />,
    collapse: [
      {
        name: "코트",
        key: "court",
        route: `${PREFIX_ROUTE}/reservation/court`,
        component: <CourtList />,
      },
      {
        name: "예약 상품",
        key: "product",
        route: `${PREFIX_ROUTE}/reservation/ticket-plan`,
        component: <TicketPlanList />,
      },
      {
        name: "예약 현황",
        key: "status",
        route: `${PREFIX_ROUTE}/reservation/status`,
        component: <ReservationTimeTable />,
      },
      // {
      //   name: "예약자 관리",
      //   key: "user",
      //   route: `${PREFIX_ROUTE}/reservation/user`,
      // },
    ],
  },
  {
    name: "코트 생성",
    key: "courtCreate",
    route: `${PREFIX_ROUTE}/reservation/court/create`,
    component: <CourtCreate />,
  },
  {
    name: "코트 상세",
    key: "courtDetail",
    route: `${PREFIX_ROUTE}/reservation/court/:id`,
    component: <CourtDetail />,
  },
  {
    name: "이용권 생성",
    key: "ticketPlanCreate",
    route: `${PREFIX_ROUTE}/reservation/ticket-plan/create`,
    component: <TicketPlanCreate />,
  },
  {
    name: "사용자 이용권 목록",
    key: "ticket",
    icon: <CardGiftcardOutlinedIcon />,
    noCollapse: true,
    route: `${PREFIX_ROUTE}/ticket-plan/:id/user`,
  },
  {
    name: "이용권 상세",
    key: "ticketPlanDetail",
    route: `${PREFIX_ROUTE}/reservation/ticket-plan/:id`,
    component: <TicketPlanDetail />,
  },
  {
    type: "collapse",
    name: "쿠폰",
    key: "coupon",
    icon: <CardGiftcardOutlinedIcon />,
    noCollapse: true,
    route: `${PREFIX_ROUTE}/coupon`,
    component: <CouponList />,
  },
  {
    name: "쿠폰",
    key: "couponCreate",
    icon: <CardGiftcardOutlinedIcon />,
    noCollapse: true,
    route: `${PREFIX_ROUTE}/coupon/create`,
    component: <CouponCreate />,
  },
  {
    type: "collapse",
    name: "결제",
    key: "revenue",
    icon: <PaymentIcon />,
    collapse: [
      {
        name: "사용자 결제내역",
        key: "revenue",
        route: `${PREFIX_ROUTE}/revenue/user`,
        component: <RevenueList />,
      },
      {
        name: "정산 내역",
        key: "settlement",
        route: `${PREFIX_ROUTE}/settlement/user`,
        component: <SettlementList />,
      },
    ],
  },
  // {
  //   type: "collapse",
  //   name: "공지",
  //   key: "notice",
  //   icon: <CampaignIcon />,
  //   noCollapse: true,
  //   route: `${PREFIX_ROUTE}/notice`,
  // },
  // {
  //   type: "collapse",
  //   name: "리뷰",
  //   key: "review",
  //   icon: <RateReviewIcon />,
  //   noCollapse: true,
  //   route: `${PREFIX_ROUTE}/review`,
  // },
  // {
  //   type: "collapse",
  //   name: "메시지",
  //   key: "message",
  //   icon: <MessageIcon />,
  //   noCollapse: true,
  //   route: `${PREFIX_ROUTE}/message`,
  // },
  // {
  //   type: "collapse",
  //   name: "고객",
  //   key: "user",
  //   icon: <GroupIcon />,
  //   noCollapse: true,
  //   route: `${PREFIX_ROUTE}/user`,
  // },
  // {
  //   type: "collapse",
  //   name: "통계",
  //   key: "metrics",
  //   icon: <InsightsIcon />,
  //   noCollapse: true,
  //   route: `${PREFIX_ROUTE}/pages`,
  // },
];

export default routes;
