import {
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  Stack,
  Tooltip,
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
          {sortOrder === 'desc' ? (
            <Tooltip title='Sort Ascending' arrow>
              <ArrowUpwardIcon />{' '}
            </Tooltip>
          ) : (
            <Tooltip title='Sort Descending' arrow>
              <ArrowDownwardIcon />
            </Tooltip>
          )}
        </Button>
      </Stack>
    </>
  );
}

export default SortingComp;
