import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Grid,
  Select,
  TextField,
  Tooltip,
  Typography,
  Alert,
  Stack,
  Input,
} from '@mui/material';
import dataTags from '../data/tags.json';
import Navbar from '../components/Navbar';
import FooterComp from '../components/FooterComp';
import imgMen from '../assets/workingMen.webp';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_API_URL } from '../constants';

function UpdateResolve() {
  const navigate = useNavigate();
  const { resolveId, resolveSlug } = useParams();
  const { currentUser } = useSelector(state => state.user);
  const [resolveData, setResolveData] = useState({
    post_as: currentUser.username,
  });
  const [loading, setLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);
  const [file, setFile] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchResolve = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${BASE_API_URL}/api/resolve/getresolves?slug=${resolveSlug}&resolveId=${resolveId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        if (!res.ok) {
          setErrorMessage(data.message);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setResolveData(data.resolves[0]);
          setLoading(false);
        }
      } catch (error) {
        setErrorMessage(error.message);
        setLoading(false);
      }
    };
    fetchResolve();
  }, [resolveId, resolveSlug]);

  useEffect(() => {
    if (!loading && resolveData.category[0]) {
      setSelectedTags(resolveData.category[0].split(','));
      console.log(selectedTags);
    }
  }, [loading]);

  const handleFileUpload = e => {
    setFile(e.target.files);
  };
  const handleCategory = e => {
    const selectedValues = e.target.value;
    setSelectedTags(selectedValues);
    setResolveData({ ...resolveData, category: selectedValues });
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
    if (
      resolveData.media_content &&
      file.length + resolveData.media_content.length > 3
    ) {
      return setErrorMessage('No more than 3 files can be uploaded');
    }

    try {
      const res = await fetch(
        `${BASE_API_URL}/api/resolve/update/${resolveId}`,
        {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      if (res.ok) {
        navigate(`/resolve/${data._id}/${data.slug}`);
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
              Get you resolve Updated here :
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
                  <MenuItem value={currentUser && currentUser.username}>
                    {currentUser && currentUser.username}
                  </MenuItem>
                  <MenuItem value='anonymous'>Anonymous</MenuItem>
                </Select>
              </FormControl>
              {resolveData.media_content &&
              resolveData.media_content.length < 3 ? (
                <>
                  <Tooltip
                    title={`${3 - file.length} file can be
                    added`}
                    arrow
                  >
                    <input type='file' multiple onChange={handleFileUpload} />
                  </Tooltip>
                </>
              ) : null}
            </Stack>
            <TextField
              type='text'
              fullWidth
              placeholder='add your question title'
              id='title'
              disabled={true}
              required
              sx={{ m: 1, bgcolor: '#bed8ec' }}
              onChange={e =>
                setResolveData({ ...resolveData, title: e.target.value })
              }
              value={resolveData.title}
            />
            <FormControl fullWidth>
              <InputLabel id='multiple-options-label'>
                Select Multiple Tags
              </InputLabel>
              <Select
                fullWidth
                placeholder='add relatable tags'
                id='tags'
                sx={{ m: 1, bgcolor: '#bed8ec' }}
                multiple
                value={selectedTags}
                onChange={handleCategory}
                renderValue={selected => (
                  <div>
                    {selected.map(value => (
                      <Chip key={value} label={value} />
                    ))}
                  </div>
                )}
              >
                {dataTags.tags.map((tagObject, index) => {
                  const tagValue = Object.values(tagObject)[0];
                  if (!selectedTags.includes(tagValue)) {
                    return (
                      <MenuItem key={index} value={tagValue}>
                        {tagValue}
                      </MenuItem>
                    );
                  } else {
                    return null;
                  }
                })}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              //label='add your description here ...'
              placeholder='add your description here ...'
              id='content'
              sx={{ m: 1, bgcolor: '#bed8ec' }}
              multiline
              required
              rows={8}
              onChange={e =>
                setResolveData({ ...resolveData, content: e.target.value })
              }
              value={resolveData.content}
            />
            <Button variant='contained' type='submit' sx={{ m: 1 }}>
              {' '}
              Update
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
      <FooterComp />
    </>
  );
}

export default UpdateResolve;
