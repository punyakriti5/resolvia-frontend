import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import network from "../assets/network.png";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import Navbar from '../components/Navbar';
import FooterComp from '../components/FooterComp';
import { blue } from '@mui/material/colors';
import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BadgeIcon from '@mui/icons-material/Badge';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { Button } from 'react-bootstrap';
import { BASE_API_URL } from '../constants';
import TypingEffect from '../components/TypingEffect';

function UserProfile() {
  const { currentUser } = useSelector(state => state.user);
  const [userData, setUserData] = useState({});
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await fetch(
          `${BASE_API_URL}/api/user/getUser/${currentUser._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        if (res.ok) {
          setUserData(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUserData();
  }, []);

  console.log(userData, 'userData');
  return (
    <>
      <Navbar />
      <Grid container spacing={2} sx={{ mt: 7, mb: 8}}>
        <Grid item xs={12} md={4} lg={4}>
          <Box display='flex' flexDirection='column' alignItems='center' p={2}>
            <Avatar
              sx={{
                bgcolor: blue[100],
                height: '110px',
                width: '110px',
               
              }}
              aria-label='resolve'
            >
              {userData && (
                <img
                  src={userData.profilePicture}
                  alt='profile-picture'
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </Avatar>
            <Typography sx={{ fontWeight: 'medium', mt: 1 }}>
              {userData && userData.username}
            </Typography>
            <Typography> {userData && userData.email}</Typography>
            <Link
              to={`/update-profile/${userData._id}`}
              style={{ textDecoration: 'none', color: 'blue' }}
            >
              <Button variant='contained'>Update your profile</Button>
            </Link>
          </Box>

          <Paper>
            <Box
              display='flex'
              flexDirection='column'
              //alignItems='stretch'
              p={1}
            >
              <Typography
                variant='body1'
                color='#034f84'
                sx={{
                  textAlign: 'center',
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                  pb:1,
                  mb:1,
               borderBottom: 1,
              borderColor: '#034f84',
                }}
              >
                Highlights
              </Typography>
             
              <Box display='flex' flexDirection='row' alignItems="center"  mx={15} my={0.5}>
                <Tooltip title='Fullname' placement='left-start' arrow>
                  <BadgeIcon
                    fontSize='medium'
                    sx={{ color: theme => theme.palette.grey[500], mx:1, }}
                  />
                </Tooltip>
                {/* <Typography>`${currentUser.firstName} ${currentUser.lastName}`</Typography> */}

                <Typography variant='body2'>
                  {' '}
                  {userData && userData.firstname}{' '}
                  {userData && userData.lastname}
                </Typography>
              </Box>

              <Box display='flex' flexDirection='row' alignItems="center" mx={15} my={0.5}>
                <Tooltip title='Education' placement='left-start' arrow>
                  <SchoolIcon
                    fontSize='medium'
                    sx={{ color: theme => theme.palette.grey[500],mx:1 }}
                  />
                </Tooltip>
                {/* <Typography>{currentUser.education}</Typography> */}

                <Typography variant='body2' >
                  {' '}
                  {userData && userData.education}
                </Typography>
              </Box>

              <Box display='flex' flexDirection='row' alignItems="center" mx={15} my={0.5}>
                <Tooltip title='Profession' placement='left-start' arrow>
                  <BusinessCenterIcon
                    fontSize='medium'
                    sx={{ color: theme => theme.palette.grey[500] , mx:1}}
                  />
                </Tooltip>

                <Typography variant="body2">
                  {' '}
                  {userData && userData.profession}
                </Typography>
              </Box>

              <Box display='flex' flexDirection='row'alignItems="center" mx={15} my={0.5}>
                <Tooltip title='Country' placement='left-start' arrow>
                  <LocationOnIcon
                    fontSize='medium'
                    sx={{ color: theme => theme.palette.grey[500],mx:1 }}
                  />
                </Tooltip>

                <Typography variant="body2">
                  {' '}
                  {userData && userData.country}
                </Typography>
              </Box>
            </Box>
          </Paper>

        </Grid>
      
        <Grid item xs={12} md={4} lg={4}>
          <Paper>
            <Box
              display='flex'
              flexDirection='column'
              
              p={1}
            >
              <Typography
                variant='body1'
                color='#034f84'
                sx={{
                  textAlign: 'center',
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                  mb:1,
                  pb:1,
                  borderBottom: 1,
                 borderColor: '#034f84',
                }}
              >
                Your interests
              </Typography>
            
              {userData &&
                userData.category &&
                userData.category.map(category => (
                  <Typography variant="body2" mx={15} my={0.5} key={category}>{category}</Typography>
                ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
        <Typography
            variant="body1"
            sx={{
              color: "#034f84",
              fontWeight:'bold'
            }}
          >
            <TypingEffect text="Meet with the best at Resolvia Community!"/>
          </Typography>
        
  <Box
              component="img"
              sx={{
                width: "35vw",
                height: "78vh",
              }}
              alt="connecting with people"
              src={network}
            />
      </Grid>
      </Grid>
      <FooterComp />
    </>
  );
}

export default UserProfile;
