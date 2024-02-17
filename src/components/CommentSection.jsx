import {
  Avatar,
  Box,
  Divider,
  Stack,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { blue } from '@mui/material/colors';
import { BASE_API_URL, popupStyle } from '../constants';

function CommentSection({ comment }) {
  const [user, setUser] = useState({});
  const token = sessionStorage.getItem('token');
  const [openDialog, setOpenDialog] = useState(false);
  const handleClick = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(
          `${BASE_API_URL}/api/user/getUser/${comment.userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  const formatDistance = date => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const oneWeek = 7 * oneDay;
    const oneMonth = 30 * oneDay;

    const diffInMilliseconds = Date.now() - date.getTime();

    if (diffInMilliseconds < oneDay) {
      return ' today';
    } else if (diffInMilliseconds > oneDay && diffInMilliseconds < 2 * oneDay) {
      return 'yesterday';
    } else if (diffInMilliseconds < oneWeek) {
      return `${Math.floor(diffInMilliseconds / oneDay)} days ago`;
    } else if (diffInMilliseconds < oneMonth) {
      return `${Math.floor(diffInMilliseconds / oneWeek)} weeks ago`;
    } else {
      return `${Math.floor(diffInMilliseconds / oneMonth)} months ago`;
    }
  };

  return (
    <>
      <Box margin='15px'>
        <Stack spacing={2} direction='row' alignItems='center'>
          <Avatar src={user.profilePicture} alt={user.username} rounded />
          <Typography variant='body2'>{user.username}</Typography>
          <Typography sx={{ color: 'gray', fontSize: '0.75rem' }}>
            {formatDistance(new Date(comment.createdAt))}
          </Typography>
        </Stack>
        <Typography variant='body1' marginLeft='55px' color={blue}>
          {comment.content}
        </Typography>
        {comment.mediaContent.length > 0 && (
          <Box
            component='img'
            sx={{
              height: 100,
              width: 100,
              ml: 5,
            }}
            onClick={handleClick}
            alt='commentImage'
            src={comment.mediaContent}
          />
        )}
        <Divider sx={{ marginTop: '10px', marginBottom: '10px' }} />
      </Box>
      <Dialog
        onClose={handleClose}
        open={openDialog}
        sx={{ ...popupStyle, width: '40%', height: '50%' }}
      >
        <DialogTitle
          id='dialog-title'
          sx={{ textAlign: 'center', fontSize: '1rem', fontWeight: 'bold' }}
        >
          {comment.mediaContent.substr(
            1 + comment.mediaContent.lastIndexOf('/')
          )}
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>
          <Box
            component='img'
            sx={{ objectFit: 'fill', width: '100%', height: '100%' }}
            alt='commentImage'
            src={comment.mediaContent}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CommentSection;
