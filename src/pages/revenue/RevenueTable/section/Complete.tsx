import React from "react";
import { Autocomplete } from "@mui/material";
import MDInput from "components/MDInput";

interface CompleteProps {
  defaultValue: string;
  options: string[];
  onChange: (event: any, newValue: string | null) => void;
  size?: "small" | "medium";
  sx?: any;
}

const Complete = ({ defaultValue, options, onChange, size = "small", sx }: CompleteProps) => {
  return (
    <Autocomplete
      disableClearable
      defaultValue={defaultValue}
      options={options}
      onChange={onChange}
      size={size}
      sx={sx}
      renderInput={(params) => <MDInput variant="standard" {...params} />}
    />
  );
};

export default Complete;
