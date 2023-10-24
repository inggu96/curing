import { styled } from "@mui/material";

export default styled("div")(({ theme }) => {
  const { palette, typography, borders, functions } = theme;
  const { text, white, dark, inputBorderColor, transparent } = palette;
  const { borderRadius, borderWidth } = borders;
  return {
    overflowX: "auto",
    minHeight: 500,

    "& .rk-table-cell": {
      paddingRight: 0,
    },
  };
});
