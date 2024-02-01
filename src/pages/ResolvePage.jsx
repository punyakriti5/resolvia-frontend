import React from "react";
import Navbar from "../components/Navbar";

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
import Comment from "../components/Comment";

import { Carousel} from "react-bootstrap";

function ResolvePage() {
  const images = [
    { id: 1, src: "https://picsum.photos/id/1015/1000/600" },
    { id: 2, src: "https://picsum.photos/id/1016/1000/600" },
    { id: 3, src: "https://picsum.photos/id/1018/1000/600" },
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
       
<CardMedia sx={{ p: 2, height: "300px", position: "relative" }}>
    <Carousel style={{ width: "96%", height: "100%", position: "absolute",marginLeft:"14px", marginRight:"14px"}}>
      {images.map((image) => (
        <Carousel.Item key={image.id}>
          <img src={image.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}  />
        </Carousel.Item>
      ))}
    </Carousel>
  </CardMedia>
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            sx={{ height: 30, margin: 1 }}
          >
            <IconButton aria-label="upvote" sx={{ cursor: "pointer" }}>
              <ThumbUpOutlinedIcon />
            </IconButton>
            <Typography textTransform={"lowercase"}>2k</Typography>
          </Button>
          <Button
            size="small"
            variant="outlined"
            sx={{ height: 30, margin: 1 }}
          >
            <IconButton aria-label="downvote" sx={{ cursor: "pointer" }}>
              <ThumbDownOutlinedIcon />
            </IconButton>
          </Button>
        </CardActions>
       <Comment />
      </Card>
    </>
  );
}

export default ResolvePage;
