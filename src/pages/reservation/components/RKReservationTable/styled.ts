import { Theme, styled } from "@mui/material";
import MDBox from "components/MDBox";

export const STYLES = {
  CELL_WIDTH: 120,
  CELL_HEIGHT: 24,
};

export const RKWeekReservationTableRoot = styled(MDBox)<{ cellCount?: number }>(
  ({ theme, cellCount = 7 }) => ({
    display: "grid",
    gridTemplateColumns: `repeat(${cellCount + 1}, 120px)`,

    ".hour-group-wrapper": {
      ".hour-group": {
        display: "grid",
        gridTemplateRows: "repeat(6, 1fr)",
        gridTemplateColumns: "repeat(2, 1fr)",
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: theme.palette.black,
        borderBottomColor: theme.palette.black,
        borderStyle: "solid",
        gridColumnGap: 4,
        ...theme.typography.body3,

        ".hour-group-cell": {
          backgroundColor: theme.palette.white.main,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          borderBottomColor: theme.palette.grey[300],
          height: STYLES.CELL_HEIGHT,

          "&:last-child": {
            borderBottomWidth: 0,
          },
        },

        ".hour-cell": {
          backgroundColor: theme.palette.white,
          gridRow: `span 6`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "auto",
          borderBottomWidth: 0,
        },
      },
    },
    ".time-group": {
      position: "relative",
      ".time-cell": {
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: theme.palette.grey[300],
        width: STYLES.CELL_WIDTH,
        height: STYLES.CELL_HEIGHT,

        "&.no-border": {
          height: STYLES.CELL_HEIGHT + 1,
          borderBottomWidth: 1,
          borderBottomColor: theme.palette.black.main,
          borderBottomStyle: "solid",
        },
      },

      ".time-point": {
        position: "absolute",
        width: "100%",
        backgroundColor: `${theme.palette.primary.main}99`,
        paddingLeft: 10,
        paddingTop: 5,
      },
    },
    ".header-cell": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
      borderWidth: 0,
      borderRight: 1,
      borderBottomWidth: 1,
      borderColor: theme.palette.grey[300],
      borderBottomColor: theme.palette.black.main,
      borderStyle: "solid",
      backgroundColor: theme.palette.white.main,
    },
  })
);
