import React, { useState } from 'react';
import './login.css';
import logo from '../assets/app-logo.png';
import img from '../assets/discussions.jpg';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Oauth from '../components/Oauth';
import { BASE_API_URL } from '../constants';

function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up('md'));

  const handleChange = e => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    //console.log(formData);
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch(`${BASE_API_URL}/api/auth/signup`, {
        method: 'POST',
        credentials:'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/login');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
          <Container className='App' sx={{ height: '100vh', width: '32vw' }}>
            <form onSubmit={handleSubmit} className='form'>
              {isLarge ? (
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
                <Typography variant='h6'> Create your account here</Typography>

                <TextField
                  id='username'
                  label='Username'
                  type='text'
                  size='small'
                  required
                  onChange={handleChange}
                />
                <TextField
                  id='email'
                  label='Email'
                  type='email'
                  size='small'
                  required
                  onChange={handleChange}
                />
                <TextField
                  id='mobileNum'
                  label='MobileNumber'
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

                <Button
                  variant='contained'
                  type='submit'
                  sx={{ textTransform: 'capitalize' }}
                  disabled={loading}
                >
                  {!errorMessage && loading ? (
                    <>
                      <CircularProgress size={20} />
                      <span style={{ paddingLeft: '10px' }}>Loading...</span>
                    </>
                  ) : (
                    'Sign Up'
                  )}
                </Button>
                <Oauth text={'Signup with Google'} />
                <Typography variant='body2'>
                  {' '}
                  Already have an account ? <Link to='/login'>Login</Link>
                </Typography>
              </Stack>
              {errorMessage && (
                <Alert severity='error' variant='filled' sx={{ width: '63%' }}>
                  {errorMessage}
                </Alert>
              )}
            </form>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

export default SignUp;
