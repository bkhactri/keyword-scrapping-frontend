import React from "react";
import { TextField } from "@mui/material";

interface SearchBarProps {
  searchTerm: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ searchTerm, handleSearch }: SearchBarProps) => {
  return (
    <TextField
      label="Search keyword"
      variant="outlined"
      value={searchTerm}
      onChange={handleSearch}
      fullWidth
      size="small"
    />
  );
};

export default SearchBar;
