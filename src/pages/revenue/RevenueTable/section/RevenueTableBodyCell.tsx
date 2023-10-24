import { ReactNode } from "react";

// @mui material components
import { Theme } from "@mui/material/styles";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";

// Declaring prop types for RevenueTableBodyCell
interface Props {
  children: ReactNode;
  align?: "left" | "right" | "center";
  cellIndex?: number;
  cellCount?: number;
  isFirstRow?: number;
  isLastCell?: number;
}
function RevenueTableBodyCell({
  align,
  children,
  cellIndex,
  isFirstRow,
  isLastCell,
}: Props): JSX.Element {
  return (
    <MDBox
      component="td"
      textAlign={align}
      py={2.2}
      px={3}
      sx={({ palette: { light }, typography: { size } }: Theme) => ({
        fontSize: size.md,
        borderBottomLeftRadius: cellIndex === 0 ? "15px" : "0px",
        borderBottomRightRadius: cellIndex === isLastCell ? "15px" : "0px",
        borderTopLeftRadius: cellIndex === 0 ? "15px" : "0px",
        borderTopRightRadius: cellIndex === isLastCell ? "15px" : "0px",
      })}
    >
      <MDBox
        display="inline-block"
        width="max-content"
        color="dark"
        sx={{ verticalAlign: "middle" }}
      >
        {children}
      </MDBox>
    </MDBox>
  );
}

// Declaring default props for RevenueTableBodyCell
RevenueTableBodyCell.defaultProps = {
  align: "left",
};

export default RevenueTableBodyCell;
