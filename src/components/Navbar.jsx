import { useEffect, useState } from 'react';
import MenuComp from './MenuComp';
import logo from '../assets/app-logo.png';
import { Link, useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import DrawIcon from '@mui/icons-material/Draw';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import SearchComp from './SearchComp';
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../features/user/userSlice';
import { BASE_API_URL } from '../constants';

function Navbar(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  const handleSignout = async () => {
    try {
      const res = await fetch(`${BASE_API_URL}/api/user/signout`, {
        method: 'POST',
        credentials:"include",
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

  const handleDashboard = () => {
    {
      currentUser ? navigate('/user/:userId') : navigate('/');
    }
  };
  return (
    <>
      <AppBar sx={{ background: '#034f84' }}>
        <Toolbar>
          <Box
            onClick={handleDashboard}
            component='img'
            sx={{
              height: 45,
              width: 45,
              cursor: 'pointer',
            }}
            alt='Logo'
            src={logo}
          />

          <Typography
            variant='h6'
            color={'white'}
            component='div'
            fontWeight={'medium'}
            sx={{ flexGrow: 1, mx: 2 }}
          >
            RESOLVIA
          </Typography>

          {currentUser && props.handleSearch ? (
            <SearchComp
              searchTerm={props.searchTerm}
              handleSearch={props.handleSearch}
            />
          ) : (
            <SearchComp />
          )}

          {isMatch ? (
            <MenuComp />
          ) : (
            <IconButton
              sx={{
                marginLeft: 'auto',
                cursor: 'pointer',
                display: { md: 'flex', xs: 'none' },
              }}
              size='large'
              color='inherit'
            >
              {currentUser ? (
                <Link to='/create-resolve'>
                  <Tooltip title='Create Resolve' arrow>
                    <Box color='white' fontSize='large'>
                      <DrawIcon sx={{ mx: 3 }} aria-label='Create Resolve' />
                    </Box>
                  </Tooltip>
                </Link>
              ) : null}
              <Link to='/about'>
                <Tooltip title='Contact Us' arrow>
                  <Box color='white' fontSize='large'>
                    <PermPhoneMsgIcon
                      sx={{ mr: 3 }}
                      aria-label='About Resolvia'
                    />
                  </Box>
                </Tooltip>
              </Link>
              {currentUser ? (
                <Link to='/user-profile'>
                  <Tooltip title={`${currentUser.username}'s profile`} arrow>
                    <Avatar sx={{ height: '25px', width: '25px' }}>
                      {currentUser && (
                        <img
                          src={currentUser.profilePicture}
                          alt='profile-picture'
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      )}
                    </Avatar>
                  </Tooltip>
                </Link>
              ) : null}

              {currentUser ? (
                <IconButton onClick={handleSignout}>
                  <Tooltip title='Logout' arrow>
                    <Box color='white' fontSize='large'>
                      <LogoutIcon
                        sx={{ mx: 3 }}
                        aria-label='Logout'
                        color='inherit'
                      />
                    </Box>
                  </Tooltip>
                </IconButton>
              ) : (
                <Link to='/login'>
                  <Tooltip title='Login' arrow>
                    <Box color='white' fontSize='large'>
                      <LoginIcon sx={{ mx: 3 }} aria-label='Login' />
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
