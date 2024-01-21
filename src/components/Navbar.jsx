import React from "react";
import MenuComp from "./MenuComp";
import logo from '../assets/app-logo.png';

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
import LogoutIcon from "@mui/icons-material/Logout";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import SearchComp from "./SearchComp";

function Navbar() {
  const theme = useTheme();
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

          <SearchComp />

          {isMatch ? (
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
              <Tooltip title="Create Resolve" arrow>
                <DrawIcon sx={{ mx: 3 }} aria-label="Create Resolve" />
              </Tooltip>
              <Tooltip title="About Us" arrow>
                <PermPhoneMsgIcon sx={{ mx: 3 }} aria-label="About Resolvia" />
              </Tooltip>
              <Tooltip title="My profile" arrow>
                <AccountCircleIcon sx={{ mx: 3 }} aria-label="User Profile" />
              </Tooltip>
              <Tooltip title="Logout" arrow>
                <LogoutIcon sx={{ mx: 3 }} aria-label="Logout" />
              </Tooltip>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
export default Navbar;
