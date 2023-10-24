import { styled } from "@mui/material";
import MDBox from "components/MDBox";

export default styled(MDBox)(({ theme }) => ({
  backgroundColor: theme.palette.white.main,
  width: "fit-content",
  whiteSpace: "nowrap",
  borderRadius: 16,
  padding: "16px 24px",
}));
