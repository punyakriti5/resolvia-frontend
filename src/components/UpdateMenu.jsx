import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Stack, Modal, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { popupStyle } from '../constants';

function UpdateMenu(props) {
  const { resolveId, resolveSlug, handleDelete } = props;
  const [openModal, setOpenModal] = React.useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };
  const handleOpenModal = () => {
    setAnchorEl(null);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = e => {
    navigate(`/update-resolve/${resolveId}/${resolveSlug}`);
  };
  return (
    <div>
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='long-menu'
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: '20ch',
            width: '20ch',
          },
        }}
      >
        <Stack direction='column'>
          <IconButton color='primary' component='span' onClick={handleEdit}>
            <EditIcon fontSize='md' />
          </IconButton>
          <IconButton
            color='primary'
            component='span'
            onClick={handleOpenModal}
          >
            <DeleteIcon fontSize='md' />
          </IconButton>
        </Stack>
      </Menu>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box sx={{ ...popupStyle, width: 300 }}>
          <h2 id='child-modal-title'>Alert</h2>
          <p id='child-modal-description'>
            Are you Sure, that you want to delete?
          </p>
          <Button onClick={handleDelete}>Yes</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default UpdateMenu;
