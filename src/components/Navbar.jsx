import React from "react";
import MenuComp from "./MenuComp";
import logo from '../assets/app-logo.png';
import {Link, useLocation} from 'react-router-dom';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DrawIcon from "@mui/icons-material/Draw";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from "@mui/icons-material/Logout";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import SearchComp from "./SearchComp";
import { useSelector, } from "react-redux";

function Navbar() {
  const theme = useTheme();
  const {currentUser} = useSelector(state => state.user)
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <AppBar sx={{ background: "#034f84" }}>
        <Toolbar>
          <Box
              component='img'
              sx={{
                height: 45,
                width: 45,
              }}
              alt='Logo'
              src={logo}
            />
          <Typography
            
            variant="h6"
            component="div"
            fontWeight={"medium"}
            sx={{ flexGrow: 1, mx: 2 }}
          >
            RESOLVIA
          </Typography>

         { currentUser ? (<SearchComp /> ) : null}

          { isMatch ? (
            <MenuComp />
          ) : (
            <IconButton
              sx={{
                marginLeft: "auto",
                cursor: "pointer",
                display: { md: "flex", xs: "none" },
              }}
              size="large"
              color="inherit"
            >
              {currentUser ? (
              <Link to="/create-resolve">
              <Tooltip title="Create Resolve" arrow>
                <DrawIcon sx={{ mx: 3 }} aria-label="Create Resolve" />
              </Tooltip>
              </Link>) : null }

              <Tooltip title="About Us" arrow>
                <PermPhoneMsgIcon sx={{ mx: 3 }} aria-label="About Resolvia" />
              </Tooltip>
              {currentUser ? (
                < Link to="/user-profile">
              <Tooltip title="My profile" arrow>
                <AccountCircleIcon sx={{ mx: 3 }} aria-label="User Profile" />
              </Tooltip>
              </Link>
              ): null}

              {currentUser ? (
                <Link to="/">
              <Tooltip title="Logout" arrow>
                <LogoutIcon sx={{ mx: 3 }} aria-label="Logout" color="inherit"/>
              </Tooltip>
              </Link>
              ):(
                <Link to="/login">
                  <Tooltip title="Login" arrow>
                    <LoginIcon sx={{ mx: 3 }} aria-label="Login" />
                  </Tooltip>
                </Link>
              )}
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
export default Navbar;
