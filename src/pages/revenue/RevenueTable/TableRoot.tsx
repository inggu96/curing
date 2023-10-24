import { styled } from "@mui/material";
import MDBox from "components/MDBox";

export default styled(MDBox)(({ theme }) => ({
  ".tableWrap": { background: "none", boxShadow: "none" },
  ".tableContainer": {
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.palette.background.paper,
    justifyContent: "center",
    alignItems: " center",
    columnGap: "30px",
    borderRadius: "15px",
    paddingLeft: "20px",
  },
  ".calendar": {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #d2d6da",
    width: "15rem",
  },
  ".revenue": {
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.palette.background.paper,
    justifyItems: "center",
    alignItems: " center",
    columnGap: "20px",
    borderRadius: "15px",
    paddingLeft: "20px",
    height: "52px",
  },
  ".pagenation": {
    display: "flex",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "15px",
    marginTop: "20px",

    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  ".iconBold": {
    fontWeight: "bold",
  },
  ".emptyBox": {
    height: "20px",
  },
  ".totalCost": {
    color: "#7bdc00",
  },
}));
