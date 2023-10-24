import { SxProps, Theme } from "@mui/material";
import MDBox from "components/MDBox";

const RKTableCell = ({
  width,
  children,
  sx,
}: {
  width: number | string;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}) => (
  <MDBox
    className="rk-table-cell"
    sx={{
      width,
      display: "inline-flex",
      paddingRight: 30,
      alignItems: "center",
      ...sx,
    }}
  >
    {children}
  </MDBox>
);

export default RKTableCell;
