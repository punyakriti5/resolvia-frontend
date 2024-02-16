import React from 'react';
import { Grid, Typography, IconButton, Box } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';
import Connect from '../assets/Connect.jpg';
import Navbar from '../components/Navbar';
import FooterComp from '../components/FooterComp';
import question from "../assets/query.jpg";

function About() {
  return (
    <>
      <Navbar />
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ mt: 10 }}>
          <Typography
            variant='h6'
            color='#034f84'
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            About Us
          </Typography>
          <Typography variant='body1' sx={{ mt: 3, ml: 10 }}>
            We live in the age of connectivity, where secure collaboration
            spaces are a key component for idea sharing and document sharing
            between people.We provide a collaborative environment along with
            features of moderation, interactive user dashboards based on
            contribution, user anonymity and many more.
          </Typography>
          <Typography variant='body1' sx={{ mt: 2, ml: 10 }}>
            Our product will fill a key void of technical discussions carried
            out between like minded people along with resource sharing.
          </Typography>
          <Typography
            variant='body1'
            color='#034f84'
            sx={{ mt: 2, ml: 10, fontWeight: 'bold' }}
          >
            Connect with us on :
            <IconButton color='primary'>
              <InstagramIcon fontSize='large' sx={{ ml: 2 }} />
              <FacebookIcon fontSize='large' sx={{ ml: 2 }} />
              <XIcon fontSize='large' sx={{ ml: 2 }} />
              <GitHubIcon fontSize='large' sx={{ ml: 2 }} />
            </IconButton>
          </Typography>
          <Typography
            variant='body1'
            color='#034f84'
            sx={{ mt: 2, ml: 10, fontWeight: 'bold' }}
          >
            Write to Us for help :
            <Typography variant='p' color='black' sx={{ ml: 3 }}>
              resolvia@gmail.com
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ mt: 8 }}>
          <Box
            component='img'
            sx={{
              width: '90%',
              height: '75vh',
            }}
            alt='Connect with Us'
            src={question}
          />
        </Grid>
      </Grid>
      <FooterComp />
    </>
  );
}

export default About;
