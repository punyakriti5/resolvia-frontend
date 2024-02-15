import { useState, useEffect } from 'react';
import { Box, Container, Stack } from '@mui/material';
import question from '../assets/query.jpg';
import ask from '../assets/discussions.jpg';
import resolution from '../assets/resolution.jpg';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../features/user/userSlice';
import Navbar from '../components/Navbar';
import FooterComp from '../components/FooterComp';
import { BASE_API_URL } from '../constants';

function Home() {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [isCurrentUser, setCurrentUser] = useState(false);
  useEffect(() => {
    async function fetchUser() {
      if (currentUser) {
        try {
          const res = await fetch(`${BASE_API_URL}/api/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentUser),
          });
          const data = await res.json();
          if (!res.ok) {
            dispatch(signoutSuccess());
          } else {
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
        <Navigate to='user/:userId' state={currentUser} replace={true} />
      ) : (
        <>
          <Navbar />
          <Container
            component='div'
            sx={{ mt: 12, borderRadius: 5, p: 5, background: '#bed8ec' }}
          >
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
                sx={{ height: 150, width: 250, borderRadius: 5, boxShadow: 5 }}
              />

              <Box
                component='img'
                alt=' Ask here ...'
                src={ask}
                sx={{ height: 250, width: 300, borderRadius: 5, boxShadow: 5 }}
              />

              <Box
                component='img'
                alt='Get answer !'
                src={resolution}
                sx={{ height: 350, width: 350, borderRadius: 5, boxShadow: 5 }}
              />
              <h1>
                The art and science of asking question is the source of all
                knowledge
              </h1>
            </Stack>
          </Container>
          <FooterComp />
        </>
      )}
    </>
  );
}
export default Home;
