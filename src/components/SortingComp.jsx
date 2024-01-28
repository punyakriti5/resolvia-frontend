import { Button,Box, FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";
import React,{useState} from "react";

function SortingComp() {
  const [sort, setSort]= useState('');
  const handleChange = (e) => {
    setSort(e.target.value);
  };
  return (
  <>
 <Box sx={{ minWidth: 200 , mt :7, ml:67}}>
 
      <FormControl variant="standard" fullWidth>
        <InputLabel id="sortBy">Sort By : </InputLabel>
        <Select
          labelId="sortBy"
          id="sortingOptions"
          value={sort}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>default</em>
          </MenuItem>
          <MenuItem  value={"latest"}>latest</MenuItem>
          <MenuItem value={"popularity"}>popularity</MenuItem>
        </Select>
      </FormControl>
    </Box>
  </>
   
  );
}

export default SortingComp;

 // <Button
    //   variant="outlined"
    //   size="medium"
    //   sx={{ height: 40, bgcolor: "#bed8ec",borderRadius: 2, mt :9, ml :80 }}
    //   startIcon={<SwapVertOutlinedIcon />}
    //   className="top-right-button"
    // >
    //   <Typography
    //     variant="body2"
    //     color="text.primary"
    //     textTransform={"lowercase"}
    //   >
    //     sort by categories
    //   </Typography>
    // </Button>
