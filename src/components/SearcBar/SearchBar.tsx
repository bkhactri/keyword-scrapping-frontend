import React, { useState } from "react";
import { TextField } from "@mui/material";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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
