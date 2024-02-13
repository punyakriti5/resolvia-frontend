import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import{Chip} from '@mui/material';


  
function TileComp({tags}) {
  return (

    <div>
      {tags.map((tag, index) => (
        <Chip key={index} label={tag.label} />
      ))}
    </div>
  );
};


{/* <>
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
    </> */}
  

export default TileComp