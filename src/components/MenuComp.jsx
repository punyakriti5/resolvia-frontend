import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function MenuComp() {
  const {currentUser} = useSelector(state => state.user)
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
  open={open}
  onClose={handleClose}
  onClick={handleClose}
  PaperProps={{
    elevation: 0,
    sx: {
      overflow: "visible",
      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
      mt: 1.5,
    },
  }}
  transformOrigin={{ horizontal: "right", vertical: "top" }}
  anchorOrigin={{ horizontal: "right", vertical: "top" }}
>
  {currentUser && (
    <Link to="/create-resolve">
      <MenuItem onClick={handleClose} sx={{ cursor: "pointer" }}>
        <Typography> Create Resolve </Typography>
      </MenuItem>
    </Link>
  )}

  <MenuItem onClick={handleClose} sx={{ cursor: "pointer" }}>
    <Typography> About Us </Typography>
  </MenuItem>

  {currentUser && (
    <Link to="/user-profile">
      <MenuItem onClick={handleClose} sx={{ cursor: "pointer" }}>
        <Typography> My Profile </Typography>
      </MenuItem>
    </Link>
  )}

  {currentUser ? (
    <Link to="/">
      <MenuItem onClick={handleClose} sx={{ cursor: "pointer" }}>
        <Typography> Logout </Typography>
      </MenuItem>
    </Link>
  ) : (
    <Link to="/login">
      <MenuItem onClick={handleClose} sx={{ cursor: "pointer" }}>
        <Typography> Login </Typography>
      </MenuItem>
    </Link>
  )}
</Menu>

    </>
  );
}
export default MenuComp;
