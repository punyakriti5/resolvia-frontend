import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
import { blue } from '@mui/material/colors';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import defaultImage from '../assets/imageAI.jpg';
import { BASE_API_URL } from '../constants';

function CardComp({ resolve, onLike }) {
  const { currentUser } = useSelector(state => state.user);
  const [showMore, setShowMore] = useState(true);
  const [feedResolve, setFeedResolve] = useState([]);
  const [errorFeed, setErrorFeed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isContentjpg, setIsContentjpg] = useState(false);
  const [user, setUser] = useState({});
  let index = 0;

  const lookupMediaContent = resolve => {
    const media = resolve.media_content.length;
    if (media > 0) {
      for (let i = 0; i < media; i++) {
        if (
          resolve.media_content[i]
            .substr(1 + resolve.media_content[i].lastIndexOf('.'))
            .trim() === 'png' ||
          resolve.media_content[i]
            .substr(1 + resolve.media_content[i].lastIndexOf('.'))
            .trim() === 'jpg' ||
          resolve.media_content[i]
            .substr(1 + resolve.media_content[i].lastIndexOf('.'))
            .trim() === 'jpeg'
        ) {
          setIsContentjpg(true);
          index = i;
          break;
        }
      }
    }
  };

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
    lookupMediaContent(resolve);
  }, [feedResolve]);

  return (
    <>

      <Card
        sx={{
          maxWidth: 700,
          my: 4,
          mx: 'auto',
          border: 1,
          borderColor: 'primary.main',
          boxShadow: 3,
        }}
      >
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
        <CardContent>
          <Typography variant='body2' color='text.primary'>
            {resolve.title}
          </Typography>
          <Typography sx={{ my: 1 }} variant='body2' color='text.secondary'>
            {resolve.category}
          </Typography>
          <Typography variant='body2' color='text.primary'>
            {resolve.content}
          </Typography>
        </CardContent>

        <CardMedia
          component='img'
          height='300'
          sx={{ px: 2 }}
          image={isContentjpg ? resolve.media_content[index] : defaultImage}
          //'https://www.simplilearn.com/ice9/free_resources_article_thumb/Types_of_Artificial_Intelligence.jpg'
          alt='Artificial Intelligence'
        />
        <CardActions>
          <Button
            size='small'
            variant='outlined'
            sx={{ height: 30, margin: 1 }}
          >
            <IconButton
              aria-label='upvote'
              sx={{ cursor: 'pointer' }}
              onClick={() => onLike(resolve._id)}
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
          <Link to={`/resolve/${resolve.slug}`}>
            <Button variant='contained' sx={{ height: 30, cursor: 'pointer' }}>
              learn more
            </Button>
          </Link>
        </CardActions>
      </Card>
    </>
  );
}
export default CardComp;
