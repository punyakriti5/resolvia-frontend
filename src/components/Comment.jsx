import React, { useState, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import AddMedia from '../components/AddMedia';
import { useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  IconButton,
  TextField,
  Stack,
  Tooltip,
} from '@mui/material';
import CommentSection from './CommentSection';
import { BASE_API_URL } from '../constants';

function Comment({ resolveId }) {
  const { currentUser } = useSelector(state => state.user);
  const [comment, setComment] = useState({ content: '' });
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [mediaUrl, setMediaUrl] = useState(null);
  const token = sessionStorage.getItem('token');

  const handleSubmit = async e => {
    e.preventDefault();
    if (comment.content.length > 200) {
      return;
    }
    if (!comment.content) {
      setCommentError('Comment cannot be empty.');
      return;
    }
    const form = new FormData();
    form.append('userId', currentUser._id);
    form.append('resolveId', resolveId);
    form.append('content', comment.content);
    form.append('media', mediaUrl);
    try {
      const res = await fetch(`${BASE_API_URL}/api/comment/createComment`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });
      const data = await res.json();
      if (res.ok) {
        setComment({ content: '' });
        setCommentError(null);

        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(
          `${BASE_API_URL}/api/comment/getResolveComments/${resolveId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        if (res.ok) {
          console.log(data);
          setComments(data);
        } else {
          console.log('Error:', res.statusText);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [resolveId]);

  return (
    <>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <Stack spacing={2} direction='row' p={2}>
          <Avatar
            alt={currentUser && currentUser.username}
            src={currentUser && currentUser.profilePicture}
            rounded
          />
          <TextField
            onChange={e => setComment({ ...comment, content: e.target.value })}
            value={comment.content}
            label='Be a part of discussion, add your comment...'
            variant='outlined'
            size='small'
            fullWidth
            InputProps={{
              endAdornment: (
                <Box sx={{ display: 'flex' }}>
                  <AddMedia setMediaUrl={setMediaUrl} />
                  <Tooltip
                    title={
                      mediaUrl ? 'Submit with file' : 'Submit without file'
                    }
                    arrow
                  >
                    <IconButton type='submit'>
                      <SendIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              ),
            }}
          />
        </Stack>
      </form>
      {comments.map(comment => (
        <CommentSection key={comment._id} comment={comment} />
      ))}
    </>
  );
}

export default Comment;
