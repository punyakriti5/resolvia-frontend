import { Button, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

function SearchComp() {
  return (
    <Button
      color="inherit"
      variant="outlined"
      size="medium"
      endIcon={<SearchIcon />}
    >
      <InputBase
        color="inherit"
        placeholder="Search Resolve"
        inputProps={{ sx: { "&::placeholder": { color: "white" } } }}
      />
    </Button>
  );
}

export default SearchComp;
