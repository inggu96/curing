import RKInput from "components/RKInput";
import React, { FormEvent, useRef, useState } from "react";

interface SearchProps {
  onSubmit: (filter: string) => void;
  selectedSearchOption: string;
}

const Search = ({ onSubmit, selectedSearchOption }: SearchProps): JSX.Element => {
  const filterRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  let placeholderText = "";

  enum filterOption {
    reservation = "예약자명",
    court = "코트종류",
    ticket = "이용권종류",
  }

  switch (selectedSearchOption) {
    case filterOption.reservation:
      placeholderText = "이름으로 검색";
      break;
    case filterOption.court:
      placeholderText = "코트로 검색";
      break;
    case filterOption.ticket:
      placeholderText = "이용권으로 검색";
      break;
    default:
      placeholderText = "";
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (filterRef.current) {
      onSubmit(inputValue);
    }
    setInputValue("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <RKInput
        sx={{ width: "20rem", display: "flex" }}
        name="filter"
        placeholder={placeholderText}
        ref={filterRef}
        value={inputValue}
        onChange={handleInputChange}
      />
    </form>
  );
};

export default Search;
