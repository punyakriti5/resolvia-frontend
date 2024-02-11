import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Grid,
  Select,
  TextField,
  Typography,
  Alert,
  Stack,
  Input,
} from '@mui/material';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import imgMen from '../assets/workingMen.webp';
import AddMedia from '../components/AddMedia';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CreateResolve() {
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);
  const [resolveData, setResolveData] = useState({
    post_as: currentUser.username,
  });
  const [file, setFile] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFileUpload = e => {
    setFile(e.target.files);
  };
  const handleChange = e => {
    setResolveData({ ...resolveData, post_as: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    files.forEach((newfile, i) => {
      formData.append(`document`, newfile);
    });
    formData.append('title', resolveData.title);
    formData.append('category', resolveData.category);
    formData.append('content', resolveData.content);
    formData.append('post_as', resolveData.post_as);
    if (file.length > 3) {
      return setErrorMessage('No more than 3 files can be uploaded');
    }
    console.log(formData);
    try {
      const res = await fetch('/api/resolve/create', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      if (res.ok) {
        navigate(`/resolve/${data.slug}`);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  const files = file ? [...file] : [];
  return (
    <>
      <Navbar />
      <Grid container spacing={2}>
        <Grid item xs={8} sx={{ mt: 10 }}>
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <Typography
              variant='body1'
              paddingLeft='15px'
              sx={{ fontWeight: 'bold' }}
            >
              Get you query resolved here :
            </Typography>
            <Stack spacing={2} direction='row'>
              <Typography
                variant='body1'
                padding='15px'
                sx={{ fontWeight: 'normal', mt: 10 }}
              >
                {' '}
                username{' '}
              </Typography>

              <FormControl
                variant='standard'
                size='small'
                sx={{ minWidth: 120 }}
              >
                <InputLabel id='sortBy'>Post as : </InputLabel>
                <Select
                  labelId='post as'
                  id='postAsOptions'
                  defaultValue={resolveData.post_as.toString()}
                  onChange={handleChange}
                >
                  <MenuItem value={currentUser.username}>
                    {currentUser.username}
                  </MenuItem>
                  <MenuItem value='anonymous'>Anonymous</MenuItem>
                </Select>
              </FormControl>
              {/* <AddMedia formData={resolveData} setformData={setResolveData} /> */}
              <input type='file' multiple onChange={handleFileUpload} />
            </Stack>
            <TextField
              type='text'
              fullWidth
              label='add your question title'
              id='title'
              required
              sx={{ m: 1, bgcolor: '#bed8ec' }}
              onChange={e =>
                setResolveData({ ...resolveData, title: e.target.value })
              }
            />
            <TextField
              fullWidth
              label='add relatable tags'
              id='tags'
              sx={{ m: 1, bgcolor: '#bed8ec' }}
              onChange={e =>
                setResolveData({ ...resolveData, category: e.target.value })
              }
            />

            <TextField
              fullWidth
              label='add your description here ...'
              id='content'
              sx={{ m: 1, bgcolor: '#bed8ec' }}
              multiline
              required
              rows={8}
              onChange={e =>
                setResolveData({ ...resolveData, content: e.target.value })
              }
            />
            <Button variant='contained' type='submit' sx={{ m: 1 }}>
              {' '}
              Post
            </Button>
            {errorMessage && (
              <Alert severity='error' variant='filled' sx={{ width: '70%' }}>
                {errorMessage}
              </Alert>
            )}
          </form>
        </Grid>
        <Grid item xs={4} sx={{ mt: 10 }}>
          <Stack>
            <Typography variant='h5'>
              {' '}
              The smart ones ask when they don't know, and sometimes when they
              do !
            </Typography>
            <Box
              component='img'
              sx={{
                width: '30vw',
                height: '70vh',
              }}
              alt='Men asking his query from Resolvia'
              src={imgMen}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default CreateResolve;
