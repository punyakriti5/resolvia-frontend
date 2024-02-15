import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  Box,
  Button,
  Container,
  InputBase,
  Typography,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DrawIcon from '@mui/icons-material/Draw';
import myResolve from '../assets/myResolvee.jpg';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BASE_API_URL } from '../constants';

function MyResolveComp() {
  const { currentUser } = useSelector(state => state.user);
  const [userResolves, setUserResolves] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [mySearch, setMySearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(true);
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  useEffect(() => {
    const fetchResolves = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${BASE_API_URL}/api/resolve/getresolves?userId=${currentUser._id}&startIndex=0&limit=${rowsPerPage}&mySearch=${mySearch}`,{
            credentials:"include",
          }
        );
        const data = await res.json();
        if (res.ok) {
          setLoading(false);
          setUserResolves(data.resolves);
          if (data.resolves.length < rowsPerPage) {
            setShowMore(false);
          }
        }
      } catch (error) {
        setLoading(false);
        setErrorMessage(error.message);
      }
    };

    fetchResolves();
  }, [mySearch]);
  //console.log("userResolves", userResolves)
  const handleSearch = e => {
    setMySearch(e.target.value);
  };
  const handleShowMore = async () => {
    setPage(prevPage => prevPage + 1);
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_API_URL}/api/resolve/getresolves?userId=${currentUser._id}&startIndex=${startIndex}&limit=${rowsPerPage}&mySearch=${mySearch}`,{
          credentials:"include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setLoading(false);
        setUserResolves(prevUserResolves => [
          ...prevUserResolves,
          ...data.resolves,
        ]);
        if (data.resolves.length < rowsPerPage) {
          setShowMore(false);
        }
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <Container sx={{ mt: 10 }}>
        <Stack spacing={2}>
          <Typography
            variant='body1'
            color='#034f84'
            sx={{
              textAlign: 'center',
              textTransform: 'capitalize',
              fontWeight: 'bold',
              borderBottom: 1.5,
              borderColor: '#034f84',
            }}
          >
            My Resolves
          </Typography>
          {currentUser && userResolves.length > 0 ? (
            <Button variant='outlined' endIcon={<SearchIcon />}>
              <InputBase
                placeholder=' My resolves'
                value={mySearch}
                onChange={handleSearch}
              />
            </Button>
          ) : (
            <>
              <Button variant='outlined' endIcon={<SearchIcon />}>
                <InputBase
                  placeholder=' My resolves'
                  value={mySearch}
                  onChange={handleSearch}
                />
              </Button>
              <Stack spacing={2} direction='row'>
                <Typography
                  variant='body1'
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'medium',
                  }}
                >
                  Not created any resolve yet?
                </Typography>
                <Link to='/create-resolve'>
                  <Button
                    variant='contained'
                    size='small'
                    sx={{ backgroundColor: '#034f84', width: '90%' }}
                    startIcon={<DrawIcon />}
                  >
                    Create Resolve
                  </Button>
                </Link>
              </Stack>
              <Box
                component='img'
                sx={{
                  alignSelf: 'center',
                  width: '320px',
                  height: '420px',
                }}
                alt='create my resolves'
                src={myResolve}
              />
            </>
          )}
          {userResolves.map(resolve => (
            <Accordion key={resolve.slug}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {resolve.title}
              </AccordionSummary>
              <AccordionDetails>{resolve.content}</AccordionDetails>
              <Link to={`/resolve/${resolve.slug}`}>
                <AccordionActions>
                  <Button variant='contained' sx={{ height: 30 }}>
                    learn more
                  </Button>
                </AccordionActions>
              </Link>
            </Accordion>
          ))}
          {showMore ? (
            <Button onClick={handleShowMore}> Show more</Button>
          ) : (
            <Typography variant='body1'>No more Resolve</Typography>
          )}
        </Stack>
      </Container>
    </>
  );
}

export default MyResolveComp;
