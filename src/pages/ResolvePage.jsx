import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import Comment from '../components/Comment';
import docImage from '../assets/doc_image.png';
import { Carousel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import FooterComp from '../components/FooterComp';
import { BASE_API_URL } from '../constants';

function ResolvePage() {
  const { resolveSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [resolve, setResolve] = useState(null);
  const [user, setUser] = useState({});
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();
  //console.log(resolve);
  useEffect(() => {
    const fetchResolve = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_API_URL}/api/resolve/getresolves?slug=${resolveSlug}`,{
          credentials:"include",
        });
        const data = await res.json();

        if (!res.ok) {
          setError(true);

          setLoading(false);
          return;
        }
        if (res.ok) {
          setResolve(data.resolves[0]);
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

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`${BASE_API_URL}/api/user/getUser/${resolve.userId}`,{
          credentials:"include",
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [resolve]);

  const images = resolve ? resolve.media_content : [];
  console.log(images[0]);

  const handleLike = async resolveId => {
    try {
      if (!currentUser) {
        navigate('/login');
        return;
      }

      const res = await fetch(`${BASE_API_URL}/api/resolve/likeResolve/${resolveId}`, {
        method: 'PUT',
        credentials:'include',
      });
      console.log('response:', res);
      const data = await res.json();
      console.log('likesData', data);

      if (res.ok) {
        setResolve(
          resolve.map(resolve =>
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

  return (
    <>
      <Navbar />
      <Card
        sx={{
          maxWidth: 700,
          mt: 10,
          mx: 'auto',
          border: 1,
          borderColor: 'primary.main',
          boxShadow: 3,
        }}
      >
        {currentUser ? (
          <CardHeader
            avatar={
              <Avatar
                alt='user'
                src={
                  resolve && resolve.post_as === 'anonymous'
                    ? 'https://i.pinimg.com/originals/07/66/d1/0766d183119ff92920403eb7ae566a85.png'
                    : user.profilePicture
                }
                rounded
              />
            }
            title={
              resolve && resolve.post_as === 'anonymous'
                ? 'anonymous'
                : user.username
            }
            subheader={
              resolve &&
              new Date(resolve.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            }
          />
        ) : null}
        <CardContent>
          <Typography variant='body2' color='text.primary'>
            {resolve && resolve.title}
          </Typography>
          <Typography sx={{ my: 1 }} variant='body2' color='text.secondary'>
            {resolve && resolve.category}
          </Typography>
          <Typography variant='body2' color='text.primary'>
            {resolve && resolve.content}
          </Typography>
        </CardContent>

        <CardMedia sx={{ p: 2, height: '415px', position: 'relative' }}>
          <Carousel
            style={{
              width: '95%',
              height: '100%',
              position: 'absolute',
              overflow: 'hidden',
            }}
          >
            {images.map((image, i) => (
              <Carousel.Item key={`image-${i}`}>
                {image.substr(1 + image.lastIndexOf('.')) === 'png' ||
                image.substr(1 + image.lastIndexOf('.')) === 'jpg' ||
                image.substr(1 + image.lastIndexOf('.')) === 'jpeg' ? (
                  <img
                    src={image}
                    alt=''
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  />
                ) : (
                  <a href={image} target='_blank' rel='noreferrer'>
                    <img
                      src={docImage}
                      alt=''
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}
                    />
                    <Carousel.Caption>
                      <p style={{ color: 'black' }}>
                        {image.substr(1 + image.lastIndexOf('/'))}
                      </p>
                    </Carousel.Caption>
                  </a>
                )}
              </Carousel.Item>
            ))}
          </Carousel>
        </CardMedia>

        <CardActions>
          <Button
            size='small'
            variant='outlined'
            sx={{ height: 30, margin: 1 }}
          >
            <IconButton
              aria-label='upvote'
              sx={{ cursor: 'pointer' }}
              onClick={() => handleLike(resolve._id)}
            >
              <ThumbUpOutlinedIcon />
            </IconButton>
            <Typography textTransform={'lowercase'}>
              {resolve && resolve.numberOfLikes}
            </Typography>
          </Button>
          <Button
            size='small'
            variant='outlined'
            sx={{ height: 30, margin: 1 }}
          >
            <IconButton aria-label='downvote' sx={{ cursor: 'pointer' }}>
              <ThumbDownOutlinedIcon />
            </IconButton>
          </Button>
        </CardActions>
        <Comment resolveId={resolve && resolve._id} />
      </Card>
      <FooterComp/>
    </>
  );
}

export default ResolvePage;
