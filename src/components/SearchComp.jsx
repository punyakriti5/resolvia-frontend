import { Button, InputBase, useMediaQuery, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

function SearchComp() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      {isMatch ? (
        <Button color="inherit"
        variant="outlined"
        size="medium">
          <SearchIcon />
        </Button>
      ) : (
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
      )}
    </>
  );
}

export default SearchComp;
