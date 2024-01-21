import React from 'react';
import './login.css';
import { Textinput } from '../components/Input';
import logo from '../assets/app-logo.png';
import { Button, Typography, Stack, Box, Container } from '@mui/material';

export function Login() {
  const LoginDetails = {
    UserName: '',
    Password: '',
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log(LoginDetails);
    //console.log(UserDetails);
  };
  const updateDetails = (name, value) => {
    LoginDetails[name] = value;
  };
  return (
    <>
      <main>
        <Container className='App'>
          <div className='form'>
            <Typography variant='h6' id='register'>
              {' '}
              Register ->{' '}
            </Typography>
            <Box
              component='img'
              sx={{
                height: 70,
                width: 73,
              }}
              alt='Logo'
              src={logo}
            />
            <Stack spacing={2}>
              <Typography variant='h5' id='logo-name'>
                {' '}
                Register ->{' '}
              </Typography>
              <Textinput name='UserName' details={updateDetails} />
              <Textinput name='Password' details={updateDetails} />
              <Typography variant='p'> Forgot Password? </Typography>
              <Button variant='contained' type='submit' onClick={handleSubmit}>
                Login
              </Button>
            </Stack>
          </div>
        </Container>
      </main>
    </>
  );
}
