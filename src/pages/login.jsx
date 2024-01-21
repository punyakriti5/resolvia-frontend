import React from 'react';
//import { Dropdown } from '../components/Select';
import { Textinput } from '../components/Input';
import './login.css';
import { Button, Typography, Box, Stack, Divider } from '@mui/material';
import logo from '../assests/logo.png';
function Login() {
  const loginDetails = {
    username: '',
    password: '',
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log(loginDetails);
  };
  const updateDetails = (name, value) => {
    loginDetails[name] = value;
  };
  return (
    <>
      <main>
        <div className='App'>
          <form className='form'>
            <Typography variant='p' id='register'>
              Register ->
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
                RESOLVIA
              </Typography>
              <Textinput
                name='username'
                placeholder='Username'
                details={updateDetails}
              />
              <Textinput
                name='password'
                placeholder='Password'
                details={updateDetails}
              />
              <Typography variant='p'>Forgot Password?</Typography>
              <div>
                <Button
                  variant='contained'
                  type='submit'
                  onClick={handleSubmit}
                >
                  Login
                </Button>
              </div>
            </Stack>
          </form>
          <Divider margin-top='auto'> OR</Divider>
        </div>
      </main>
    </>
  );
}

export default Login;
