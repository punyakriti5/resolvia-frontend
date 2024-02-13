import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { Box, Container, Grid, useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../components/Navbar';
import CardComp from '../components/CardComp';
import MyResolveComp from '../components/MyResolveComp';
import SortingComp from '../components/SortingComp';
function User_Dashboard() {
  const matches = useMediaQuery('(min-width:960px)');
  const { userId } = useParams();
  const { currentUser } = useSelector(state => state.user);
  const [feedResolve, setFeedResolve] = useState([]);
  const navigate = useNavigate();
  const [errorFeed, setErrorFeed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [sortOrder, setSortOrder] = useState('desc');
  const location = useLocation();
  useEffect(() => {
    const fetchAllResolve = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/resolve/getresolves?sortBy=${sortBy}&sortOrder=${sortOrder}&searchTerm=${searchTerm}`
        );
        const data = await res.json();
        if (res.ok) {
          setLoading(false);
          setFeedResolve(data.resolves);
          //console.log('feedResolve', feedResolve);
          if (data.feedResolve.length < 10) {
            setShowMore(false);
          }
        }
      } catch (error) {
        setLoading(false);
        setErrorFeed(error.message);
      }
    };

    fetchAllResolve();
  }, [sortBy, sortOrder, searchTerm]);
  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };
  const handleSortBy = e => {
    setSortBy(e.target.value);
  };
  const handleSortOrder = () => {
    // console.log('Clicking this button');
    if (sortOrder === 'desc') {
      setSortOrder('asc');
    } else {
      setSortOrder('desc');
    }
  };
  const handleLike = async resolveId => {
    try {
      if (!currentUser) {
        navigate('/login');
        return;
      }

      console.log('currentUser:', currentUser);
      console.log('resolveId:', resolveId);

      const res = await fetch(`/api/resolve/likeResolve/${resolveId}`, {
        method: 'PUT',
      });
      console.log('response:', res);
      const data = await res.json();
      console.log('likesData', data);

      if (res.ok) {
        setFeedResolve(
          feedResolve.map(resolve =>
            resolve._id === resolveId
              ? {
                  ...resolve,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : resolve
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log('feedResolve', feedResolve);
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar searchTerm={searchTerm} handleSearch={handleSearch} />
        <Box
          sx={{
            maxWidth: 450,
            minWidth: 350,
            width: '45vw',

            position: 'sticky',
            top: 0,
            overflowY: 'auto',
            boxShadow: 3,
          }}
        >
          <MyResolveComp />
        </Box>
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            p: 3,
          }}
        >
          <Container maxWidth='lg'>
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={4}>
                <SortingComp
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  handleSortBy={handleSortBy}
                  handleSortOrder={handleSortOrder}
                />
              </Grid>
              <Grid item xs={12}>
                {feedResolve.map(resolve => (
                  <CardComp
                    key={resolve._id}
                    resolve={resolve}
                    onLike={handleLike}
                  />
                ))}
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default User_Dashboard;
