import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import question from '../assets/query.jpg';
import ask from '../assets/discussions.jpg';
import resolution from '../assets/resolution.jpg';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../features/user/userSlice';
import Navbar from '../components/Navbar';
import FooterComp from '../components/FooterComp';

import { BASE_API_URL } from '../constants';
import TypingEffect from '../components/TypingEffect';

function Home() {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [isCurrentUser, setCurrentUser] = useState(false);
  const token = sessionStorage.getItem('token');
  useEffect(() => {
    async function fetchUser() {
      if (currentUser) {
        try {
          const res = await fetch(`${BASE_API_URL}/api/auth/refresh`, {
            method: 'POST',

            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(currentUser),
          });
          const data = await res.json();
          if (!res.ok) {
            dispatch(signoutSuccess());
          } else {
            sessionStorage.setItem('token', data.accessToken);
            setCurrentUser(true);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    }
    fetchUser();
  }, []);

  return (
    <>
      {isCurrentUser ? (
        <Navigate
          to={`user/${currentUser._id}`}
          state={currentUser}
          replace={true}
        />
      ) : (
        <>
          <Navbar />

          <Box
            component='div'
            sx={{
              mt: 8,
              width: '100%',
              p: 5,
              background: '#bed8ec',
              display: 'flex',
    //           justifyContent: 'center', // Center the content horizontally
    // alignItems: 'center', // Center the content vertically

            }}
          >
            <Stack
              direction='column'
              justifyContent='center'
              alignItems='center'
              spacing={2}
            >
              <Typography
                variant='h4'
                color='#034f84'
                fontWeight={'bold'}
                px={5}
              >
                Welcome to Resolvia
              </Typography>
              <Typography
                variant='body1'
                color='#034f84'
                fontWeight={'bold'}
                px={5}
              >
                where connectivity meets innovation and the future of technical
                discussions and resource sharing unfolds.
              </Typography>
            </Stack>

            <Stack
              direction='row'
              justifyContent='center'
              alignItems='center'
              spacing={2}
            >
              <Box
                component='img'
                alt='Have query ?'
                src={question}
                sx={{
                  height: 135,
                  width: 250,
                  borderRadius: 5,
                  boxShadow: 5,
                  display: { md: 'flex', lg: 'flex', xs: 'none' },
                }}
              />

              <Box
                component='img'
                alt=' Ask here...'
                src={ask}
                sx={{
                  height: 225,
                  width: 300,
                  borderRadius: 5,
                  boxShadow: 5,
                  display: { md: 'flex', lg: 'flex', xs: 'none' },
                }}
              />

              <Box
                component='img'
                alt='Get answer'
                display= 'flex'
                src={resolution}
                sx={{ height: 300, width: 325, borderRadius: 5, boxShadow: 5 }}
              />
            </Stack>
          </Box>

          <Typography
            variant='h5'
            sx={{
              color: '#034f84',
              px: '26%',
              pb: 8,
              background: '#bed8ec',
              display: 'flex',
            }}
          >
            <TypingEffect text='Have a query? -> Ask to Resolvia  -> Get it resolved ! ' />
          </Typography>

          <FooterComp />
        </>
      )}
    </>
  );
}
export default Home;
