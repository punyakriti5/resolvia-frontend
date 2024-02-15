import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_API_URL } from '../constants';

function Oauth(props) {
  const { text } = props;
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      //console.log(resultsFromGoogle);
      const res = await fetch(`${BASE_API_URL}/api/auth/google`, {
        method: 'POST',
        credentials:'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        console.log(data);
        navigate('/user/:username');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      variant='outlined'
      type='button'
      sx={{ textTransform: 'capitalize' }}
      startIcon={<GoogleIcon />}
      onClick={handleGoogleClick}
    >
      {text}
    </Button>
  );
}

export default Oauth;
