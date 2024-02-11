import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
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
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import Comment from "../components/Comment";

import { Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";

function ResolvePage() {
  const images = [
    { id: 1, src: "https://picsum.photos/id/1015/1000/600" },
    { id: 2, src: "https://picsum.photos/id/1016/1000/600" },
    { id: 3, src: "https://picsum.photos/id/1018/1000/600" },
  ];

  const { resolveSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [resolve, setResolve] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchResolve = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/resolve/getresolves?slug=${resolveSlug}`);
        const data = await res.json();

        if (!res.ok) {
          setError(true);

          setLoading(false);
          return;
        }
        if (res.ok) {
          setResolve(data.resolves[0]);
          console.log("resolve", resolve);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchResolve();
  }, [resolveSlug]);

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
        {currentUser ? (
        <CardHeader
          avatar={
            <Avatar alt="user" img={resolve && resolve.post_as === 'anonymous' ? 'https://i.pinimg.com/originals/07/66/d1/0766d183119ff92920403eb7ae566a85.png' : currentUser.profilePicture} rounded /> 
          }
          title={resolve && resolve.post_as === 'anonymous' ? 'anonymous' : currentUser.username}
          subheader={
            resolve &&
            new Date(resolve.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          }
        />):null}
        <CardContent>
          <Typography variant="body2" color="text.primary">
            {resolve && resolve.title}
          </Typography>
          <Typography sx={{ my: 1 }} variant="body2" color="text.secondary">
            #artificialintelligence #artificialIntelligencedevelopment{" "}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {resolve && resolve.content}
          </Typography>
        </CardContent>

        <CardMedia sx={{ p: 2, height: "415px", position: "relative" }}>
          <Carousel
            style={{ width: "95%", height: "100%", position: "absolute" }}
          >
            {images.map((image) => (
              <Carousel.Item key={image.id}>
                <img
                  src={image.src}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
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
        <Comment  resolveId={resolve && resolve._id}/>
      </Card>
    </>
  );
}

export default ResolvePage;
