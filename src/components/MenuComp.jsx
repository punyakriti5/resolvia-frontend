import React, { useState, useRef } from "react";
import { IconButton, Menu, MenuItem} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../constants";

function MenuComp() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleClick = (event) => {
    setOpen(true);
    anchorRef.current = event.currentTarget;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignout = async () => {
    try {
      const res = await fetch(`${BASE_API_URL}/api/user/signout`, {
        method: "POST",
        credentials:'include'
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <IconButton
        onClick={(event) => {
          handleClick(event);
          anchorRef.current = event.currentTarget;
        }}
        size="large"
        sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>

      {currentUser ? (
        <Menu
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          anchorEl={anchorRef.current}
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
          <MenuItem onClick={handleClose} sx={{ cursor: "pointer" }}>
            <Link to="/create-resolve"> Create Resolve </Link>
          </MenuItem>
          <MenuItem onClick={handleClose} sx={{ cursor: "pointer" }}>
            <Link to="/about">About</Link>
          </MenuItem>
          <MenuItem onClick={handleClose} sx={{ cursor: "pointer" }}>
            <Link to="/user-profile">User Profile</Link>
          </MenuItem>

          <MenuItem onClick={handleSignout}>Logout</MenuItem>
        </Menu>
      ) : (
        <Menu
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          anchorEl={anchorRef.current}
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
          <MenuItem onClick={handleClose} sx={{ cursor: "pointer" }}>
            <Link to="/login">Login</Link>
          </MenuItem>
          <MenuItem onClick={handleClose} sx={{ cursor: "pointer" }}>
            <Link to="/about">About</Link>
          </MenuItem>
        </Menu>
      )}
    </>
  );
}
export default MenuComp;
