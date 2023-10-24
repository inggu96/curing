import { styled } from "@mui/material";
import MDBox from "components/MDBox";

export default styled(MDBox)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",

  justifyContent: "space-between",
  backgroundColor: theme.palette.background.default,
  padding: "16px 32px",
  borderRadius: 8,
  gap: 12,

  ".top": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  ".weekday": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    ".daybox": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 34,
      height: 34,
      borderRadius: 9999,
      border: `1px solid ${theme.palette.common.black}`,
      cursor: "pointer",

      "&-text": {
        color: theme.palette.common.black,
      },

      "&.selected": {
        backgroundColor: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.main}`,

        "&-text": {
          color: theme.palette.common.white,
        },
      },
    },
  },
}));
