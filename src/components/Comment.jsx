import React, { useState, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import AddMedia from '../components/AddMedia';
import { useSelector } from 'react-redux';
import { Avatar, Box, IconButton, TextField, Stack } from '@mui/material';
import CommentSection from './CommentSection';
import { BASE_API_URL } from '../constants';

function Comment({ resolveId }) {
  const { currentUser } = useSelector(state => state.user);
  const [comment, setComment] = useState({ content: '' });
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);

  console.log('commentss', comments);
  const handleSubmit = async e => {
    e.preventDefault();
    if (comment.content.length > 200) {
      return;
    }
    if (!comment.content) {
      setCommentError('Comment cannot be empty.');
      return;
    }
    try {
      const res = await fetch(`${BASE_API_URL}/api/comment/createComment`, {
        credentials:'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment.content,
          resolveId,
          userId: currentUser._id,
        }),
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
        const res = await fetch(`${BASE_API_URL}/api/comment/getResolveComments/${resolveId}`,{
          credentials:"include",
        });
        const data = await res.json();
        if (res.ok) {
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
      <form onSubmit={handleSubmit}>
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
                  <AddMedia />
                  <IconButton type='submit'>
                    <SendIcon />
                  </IconButton>
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
