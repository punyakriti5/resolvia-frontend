import React from "react";
import MenuComp from "./MenuComp";
import logo from '../assets/app-logo.png';
import {Link, useNavigate} from 'react-router-dom';
import {
  AppBar,
  Avatar,
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
import { useSelector, useDispatch} from "react-redux";
import { signoutSuccess } from '../features/user/userSlice';

function Navbar() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {currentUser} = useSelector(state => state.user)
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const handleSignout = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate('/');
      }
    } catch (error) {
      console.log(error.message);
    }
  };
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
                 <Box color="white" fontSize="large">
                <DrawIcon sx={{ mx: 3 }} aria-label="Create Resolve" />
                </Box>
              </Tooltip>
              </Link>) : null }

              <Tooltip title="About Us" arrow>
                <PermPhoneMsgIcon sx={{ mx: 3 }} aria-label="About Resolvia" />
              </Tooltip>
              {currentUser ? (
                < Link to="/user-profile">
              <Tooltip title={`${currentUser.username}'s profile`} arrow>
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
                {/* <AccountCircleIcon sx={{ mx: 3 }} aria-label="User Profile" /> */}
              </Tooltip>
              </Link>
              ): null}

              {currentUser ? (
                <IconButton onClick={handleSignout}>
              <Tooltip title="Logout"  arrow>
              <Box color="white" fontSize="large">
                <LogoutIcon sx={{ mx: 3 }} aria-label="Logout" color="inherit"/>
                </Box>
              </Tooltip>
              </IconButton>
              ):(
               
                <Link to="/login">
                  <Tooltip title="Login" arrow>
                  <Box color="white" fontSize="large">
                    <LoginIcon sx={{ mx: 3 }} aria-label="Login"/>
                    </Box>
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
