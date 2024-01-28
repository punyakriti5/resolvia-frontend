import React, { useState } from 'react';
import './login.css';
import logo from '../assets/app-logo.png';
import img from '../assets/discussions.jpg';
import GoogleIcon from '@mui/icons-material/Google';
import Oauth from '../components/Oauth';
import {
  Button,
  Typography,
  Stack,
  Box,
  Container,
  Grid,
  TextField,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../features/user/userSlice';

function Login() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = e => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('http://localhost:3001/api/auth/signin', {
        method: 'POST',
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
              width: '67vw',
              height: '100vh',
            }}
            alt='img'
            src={img}
          />
        </Grid>
        <Grid item xs={4}>
          <Container className='App' sx={{ height: '100vh', width: '32vw' }}>
            <form onSubmit={handleSubmit} className='form'>
              <Box
                component='img'
                sx={{
                  height: 65,
                  width: 65,
                }}
                alt='Logo'
                src={logo}
              />
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
                <Typography variant='p'> Forgot Password? </Typography>
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
            </form>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
