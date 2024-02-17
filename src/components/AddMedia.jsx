import React, { useState, useEffect } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { popupStyle } from '../constants';

import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Tooltip,
  Input,
} from '@mui/material';

function AddMedia(props) {
  const { setMediaUrl } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const handleClick = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Input
        accept='image/*'
        type='file'
        style={{ display: 'none' }}
        id='add-file'
        onChange={e => setMediaUrl(e.target.files[0])}
      />
      <IconButton
        sx={{
          cursor: 'pointer',
        }}
        color='#034f84'
        onClick={handleClick}
      >
        <Tooltip title='Add Media' arrow>
          <AddCircleOutlineIcon fontSize='large' />
        </Tooltip>
      </IconButton>

      <Dialog onClose={handleClose} open={openDialog} sx={popupStyle}>
        <DialogTitle
          id='dialog-title'
          sx={{ textAlign: 'center', fontSize: '1rem', fontWeight: 'bold' }}
        >
          Import Media
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
            display='flex'
            flexDirection='column'
            alignItems='center'
            bgcolor={'ButtonShadow'}
          >
            <label htmlFor='add-file'>
              <DialogActions>
                <IconButton
                  color='primary'
                  component='span'
                  onClick={handleClose}
                >
                  <CloudUploadOutlinedIcon fontSize='large' />
                </IconButton>
              </DialogActions>
            </label>
            <Typography padding={2}>
              Click here to browse and upload any documents/pictures/videos or
              any other media.
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddMedia;
