import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Box, Container, Stack } from '@mui/material';
import question from '../assets/query.jpg';
import ask from '../assets/discussions.jpg';
import resolution from '../assets/resolution.jpg';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
  const { currentUser } = useSelector(state => state.user);
  const [isCurrentUser, setCurrentUser] = useState(false);
  useEffect(() => {
    if (currentUser) {
      setCurrentUser(true);
    }
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
        </>
      )}
    </>
  );
}
export default Home;
