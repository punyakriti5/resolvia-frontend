import { Button, Typography } from "@mui/material";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";
import React from "react";

function SortingComp() {
  return (
    <Button
      variant="outlined"
      size="small"
      sx={{ height: 20, borderRadius: 5 }}
      startIcon={<SwapVertOutlinedIcon />}
      className="top-right-button"
    >
      <Typography
        variant="body2"
        color="text.secondary"
        textTransform={"lowercase"}
      >
        sort by categories
      </Typography>
    </Button>
  );
}

export default SortingComp;
