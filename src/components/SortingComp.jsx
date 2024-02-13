import {
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  Stack,
  MenuItem,
  Typography,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import React, { useState } from 'react';

function SortingComp({ sortBy, sortOrder, handleSortBy, handleSortOrder }) {
  console.log('props ', { sortBy, sortOrder, handleSortBy, handleSortOrder });

  return (
    <>
      <Stack direction='row'>
        <Box sx={{ minWidth: 200, mt: 7, ml: 67 }}>
          <FormControl variant='standard' fullWidth>
            <InputLabel id='sortBy'>Sort By : </InputLabel>
            <Select
              labelId='sortBy'
              id='sortingOptions'
              value={sortBy}
              defaultValue={sortBy}
              onChange={handleSortBy}
            >
              <MenuItem value={'latest'}>latest</MenuItem>
              <MenuItem value={'popularity'}>popularity</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button sx={{ mt: 7, ml: 3 }} onClick={handleSortOrder}>
          {sortOrder === 'desc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
        </Button>
      </Stack>
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
