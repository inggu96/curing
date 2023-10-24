import { styled, Table } from "@mui/material";

export default styled(Table)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  ".tableRow": {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "1px",
  },
}));
