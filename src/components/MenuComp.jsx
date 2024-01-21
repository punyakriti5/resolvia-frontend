import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function MenuComp() {
  const [openmenu, setOpenmenu] = useState(null);
  const open = Boolean(openmenu);
  const handleClick = (event) => {
    setOpenmenu(event.currentTarget);
  };
  const handleClose = () => {
    setOpenmenu(null);
  };
  return (
    <>
      <IconButton
        onClick={handleClick}
        size="large"
        sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        openmenu={openmenu}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            // '&::before': {
            //   content: '""',
            //   display: 'block',
            //   position: 'absolute',
            //   top: 0,
            //   right: 14,
            //   width: 10,
            //   height: 10,
            //   bgcolor: 'background.paper',
            //   transform: 'translateY(-50%) rotate(45deg)',
            //   zIndex: 0,
            // },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem onClick={handleClose} sx={{ cursor: "pointer" }}>
          <Typography> Create Resolve </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ cursor: "pointer" }}>
          <Typography> About Us </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ cursor: "pointer" }}>
          <Typography> My Profile </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ cursor: "pointer" }}>
          <Typography> Logout </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
export default MenuComp;
