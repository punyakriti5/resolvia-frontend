import React, { useState, useEffect } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloseIcon from '@mui/icons-material/Close';

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
  const { formData, setformData = () => {} } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [file, setFile] = useState(null);
  const handleClick = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Input
        type='file'
        style={{ display: 'none' }}
        id='add-file'
        onChange={e => setFile(e.target.files[0])}
        //onClick={handlefileUpload}
        value={''}
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

      <Dialog
        onClose={handleClose}
        open={openDialog}
        sx={{ width: 400, height: 350, marginLeft: 35, marginTop: 3 }}
      >
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
                <IconButton color='primary' component='span'>
                  <CloudUploadOutlinedIcon fontSize='large' />
                </IconButton>
              </DialogActions>
              {file
                ? console.log('file Recieved')
                : console.log('file Not recieved')}
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
