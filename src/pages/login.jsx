import React, { useState } from 'react';
import './login.css';
import logo from '../assets/app-logo.png';
import img from '../assets/discussions.jpg';

import Oauth from '../components/Oauth';
import {
  Alert,
  Button,
  Typography,
  Stack,
  Box,
  Container,
  Grid,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../features/user/userSlice';
import { BASE_API_URL } from '../constants';


function Login() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector(state => state.user);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.up('md'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = e => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    //console.log(errorMessage);
    if (!formData.username || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch(`${BASE_API_URL}/api/auth/signin`, {
        method: 'POST',
        credentials:"include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/user/:username');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box
            component='img'
            sx={{
              width: '68vw',
              height: '100vh',
            }}
            alt='img'
            src={img}
          />
        </Grid>
        <Grid item xs={4}>
          <Container className='App' sx={{ height: '100vh', width: '34.5vw' }}>
            <form onSubmit={handleSubmit} className='form'>
              {isMatch ? (
                <Box
                  component='img'
                  sx={{
                    height: 60,
                    width: 60,
                  }}
                  alt='Logo'
                  src={logo}
                />
              ) : null}
              <Stack spacing={2}>
                <Link to='/' id='logo-name'>
                  RESOLVIA
                </Link>
                <Typography variant='h6'> Log in to your account</Typography>

                <TextField
                  id='username'
                  label='Username'
                  type='text'
                  size='small'
                  required
                  onChange={handleChange}
                />
                <TextField
                  id='password'
                  label='Password'
                  type='password'
                  size='small'
                  required
                  onChange={handleChange}
                />
                <Typography variant='p' sx={{ cursor: 'pointer' }}>
                  {' '}
                  Forgot Password?{' '}
                </Typography>
                <Button
                  variant='contained'
                  type='submit'
                  sx={{ textTransform: 'capitalize' }}
                >
                  Login
                </Button>
                <Oauth text={'Login with Google'} />
                <Typography variant='body2'>
                  {' '}
                  Don't have an account ? <Link to='/signup'>Sign Up</Link>
                </Typography>
              </Stack>
              {errorMessage && (
                <Alert severity='error' variant='filled' sx={{ width: '63%' }}>
                  {errorMessage}
                </Alert>
              )}
            </form>
            {/* {errorMessage && (
              <Snackbar autoHideDuration={6000}>
                <Alert severity='error' variant='filled' sx={{ width: '100%' }}>
                  {errorMessage}
                </Alert>
              </Snackbar>
            )} */}
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
