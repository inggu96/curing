import { ReactNode } from "react";

// @mui material components
import Icon from "@mui/material/Icon";
import { Theme } from "@mui/material/styles";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";

// Material Dashboard 2 PRO React TS contexts
import { useMaterialUIController } from "context";

// Declaring props types for RevenueTableHeadCell
interface Props {
  width?: string | number;
  children: ReactNode;
  sorted?: false | "none" | "asce" | "desc";
  align?: "left" | "right" | "center";
  cellIndex?: number;
  isFirstRow?: number;
  isLastRow?: number;
}

function RevenueTableHeadCell({
  width,
  children,
  align,
  cellIndex,
  isFirstRow,
  isLastRow,
}: Props): JSX.Element {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDBox
      component="th"
      py={2}
      px={3}
      sx={({ palette: { light }, borders: { borderWidth } }: Theme) => ({
        borderBottomLeftRadius: isFirstRow && cellIndex === 0 ? "15px" : "0px",
        borderTopRightRadius: isLastRow ? "15px" : "0px",
        borderTopLeftRadius: isFirstRow && cellIndex === 0 ? "15px" : "0px",
        borderBottomRightRadius: isLastRow ? "15px" : "0px",
      })}
    >
      <MDBox
        position="relative"
        textAlign={align}
        color={darkMode ? "white" : "dark"}
        opacity={1}
        sx={({ typography: { size, fontWeightBold } }: Theme) => ({
          fontSize: size.md,
          fontWeight: fontWeightBold,
          textTransform: "uppercase",
        })}
      >
        {children}
      </MDBox>
    </MDBox>
  );
}

// Declaring default props for RevenueTableHeadCell
RevenueTableHeadCell.defaultProps = {
  width: "auto",
  sorted: "none",
  align: "left",
};

export default RevenueTableHeadCell;
