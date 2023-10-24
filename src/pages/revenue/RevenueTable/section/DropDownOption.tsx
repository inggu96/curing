import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";

interface DropDownOptionProps {
  onSubmit: (filter: string) => void;
  label: string;
}

const DropDownOption = ({ onSubmit, label }: DropDownOptionProps): JSX.Element => {
  const [inputValue, setInputValue] = useState("");

  const handleAutocomplete = (event: any, newValue: string | null) => {
    setInputValue(newValue);
    if (newValue !== null) {
      onSubmit(newValue);
    }
  };
  return (
    <>
      <Autocomplete
        disableClearable
        value={inputValue}
        sx={{ width: "12rem" }}
        onChange={handleAutocomplete}
        options={["", "김민재", "otherData"]}
        renderInput={(params) => <TextField variant="standard" {...params} label={label} />}
      />
    </>
  );
};

export default DropDownOption;
