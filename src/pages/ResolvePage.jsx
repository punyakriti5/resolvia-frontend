import React from 'react';
import './ResolvePage.css'
import Navbar from '../components/Navbar';

import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Typography,
  } from "@mui/material";
  import { blue } from "@mui/material/colors";
  import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
  import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import { Container } from '@mui/system';

function ResolvePage() {
    const images = [
        'https://picsum.photos/id/1015/1000/600',
        'https://picsum.photos/id/1016/1000/600',
        'https://picsum.photos/id/1018/1000/600'
      ];
    
  return (
   <>
   <Navbar />
   <Card
        sx={{
          maxWidth: 700,
          mt: 10,
          mx: "auto",
          border: 1,
          borderColor: "primary.main",
          boxShadow: 3,
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: blue[100] }} aria-label="resolve">
              A
            </Avatar>
          }
          title="Abishek"
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography variant="body2" color="text.primary">
            Artificial Intelligence scope in future
          </Typography>
          <Typography sx={{ my: 1 }} variant="body2" color="text.secondary">
            #artificialintelligence #artificialIntelligencedevelopment{" "}
          </Typography>
          <Typography variant="body2" color="text.primary">
            How do you envision the responsible integration of artificial
            intelligence in the society, considering both its potential benefits
            and the ethical challenges it may pose? What kind of principles
            should guide the development and deployment of AI technologies?
          </Typography>
        </CardContent>
        

       
        <CardActions>
          <Button size="small" variant="outlined" sx={{ height: 30 , margin:1}}>
            <IconButton aria-label="upvote" sx={{ cursor: "pointer" }}>
              <ThumbUpOutlinedIcon />
            </IconButton>
            <Typography textTransform={"lowercase"}>2k</Typography>
          </Button>
          <Button size="small" variant="outlined" sx={{ height: 30 ,  margin:1}}>
            <IconButton aria-label="downvote" sx={{ cursor: "pointer" }}>
              <ThumbDownOutlinedIcon />
            </IconButton>
          </Button>
        </CardActions>
      </Card>
    
   </>
  )
}

export default ResolvePage;


  
