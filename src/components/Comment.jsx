import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import AddMedia from "../components/AddMedia";
import { useSelector, } from "react-redux";
import {
    Avatar,
    Box,
    IconButton,
    TextField,
Stack,
} from '@mui/material';

function Comment() {
    const {currentUser} = useSelector(state => state.user)
  return (
    <>
    <Stack spacing={2} direction="row" p={2}>
    <Avatar alt='user' img={currentUser.profilePicture} rounded />
    <TextField
  label="Be a part of discussion, add your comment..."
  variant="outlined"
  size="small"
  fullWidth
  InputProps={{
    endAdornment: (
      <Box sx={{ display: "flex" }}>
        <AddMedia />
        <IconButton >
          <SendIcon />
        </IconButton>
      </Box>
    )
  }}
/>
    </Stack>
    </>
  )
}

export default Comment