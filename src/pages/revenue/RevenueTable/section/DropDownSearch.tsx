import { Autocomplete } from "@mui/material";
import MDInput from "components/MDInput";

interface DropDownSearchProps {
  defaultValue: string;
  options: string[];
  size: "small" | "medium";
  width: string;
  variant?: "standard" | "outlined" | "filled";
  isAlternativeStyle?: boolean;
  setSelectedSearchOption: React.Dispatch<React.SetStateAction<string>>;
}

export const DropDownSearch = ({
  defaultValue,
  options,
  size,
  width,
  variant,
  isAlternativeStyle,
  setSelectedSearchOption,
}: DropDownSearchProps) => {
  return (
    <Autocomplete
      disableClearable
      defaultValue={defaultValue}
      options={options}
      onChange={(event, newValue) => {
        setSelectedSearchOption(newValue);
      }}
      size={size}
      sx={{
        width: width,
        "& .MuiInputBase-root": {
          ...(isAlternativeStyle
            ? {
                margin: "20px",
                marginTop: "25px",
                height: "2.6rem",
                fontSize: "1rem",
                lineHeight: "5px",
                border: "1px solid black",
              }
            : {
                height: "3rem",
                fontSize: "1rem",
                lineHeight: "30px",
              }),
        },
        "& .MuiAutocomplete-input": {
          ...(isAlternativeStyle
            ? {
                fontSize: "0.9rem",
                color: "dark",
                fontWeight: "600",
                textAlign: "center",
              }
            : {
                lineHeight: "145px",
                marginY: "10px",
                marginLeft: "15px",
              }),
        },
        "& .MuiAutocomplete-listbox": {
          ...(isAlternativeStyle ? { border: "10px solid black" } : { maxHeight: "200px" }),
        },
      }}
      renderInput={(params) => <MDInput variant={variant} {...params} />}
    />
  );
};
