import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
function TileComp() {
  return (
<>
    <Box sx={{ width: 1 }}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 4">
          <Item></Item>
        </Box>
        <Box gridColumn="span 2">
          <Item></Item>
        </Box>
        <Box gridColumn="span 3">
          <Item></Item>
        </Box>
        <Box gridColumn="span 2">
          <Item></Item>
        </Box>
        <Box gridColumn="span 3">
          <Item></Item>
        </Box>
      </Box>
    </Box>
    </>
  )
}

export default TileComp