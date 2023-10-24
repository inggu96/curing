import { styled } from "@mui/material";
import MDBox from "components/MDBox";

const StickyGroup = styled(MDBox)(({ theme }) => ({
  backgroundColor: theme.palette.white.main,
  position: "fixed",
  bottom: 0,
  right: 20,
  width: "100%",
  padding: 20,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignContent: "center",
  boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.25)",
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  paddingLeft: "320px",
  zIndex: 2,
}));

export default StickyGroup;
