import { styled } from "@mui/material";
import MDBox from "components/MDBox";
import CloseIcon from "@mui/icons-material/Close";

export const Overlay = styled(MDBox)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(56, 56, 56, 0.1)",
  zIndex: "9999",
  transition: "0.5s",
}));
export const RevenueModal = styled(MDBox)(({ theme }) => ({
  width: "20%",
  height: "100%",
  position: "absolute",
  right: 0,
  top: 0,
  backgroundColor: theme.palette.background.paper,
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "100px",
}));
export const Closebutton = styled(CloseIcon)(({ theme }) => ({
  position: "fixed",
  top: "20",
  right: "20px",
  cursor: "pointer",
}));
export const RevenueHistory = styled(MDBox)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));
export const RefundButton = styled(MDBox)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "auto",
  textAlign: "center",
}));
