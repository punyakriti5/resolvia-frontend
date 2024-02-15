import { Avatar,Box , Divider, Stack, Typography } from "@mui/material";
import React,{useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { blue } from "@mui/material/colors";
import { BASE_API_URL } from "../constants";

function CommentSection({ comment }) {
  const [user, setUser] = useState({});
 
  console.log("comment section ",comment);
 console.log("userId",comment.userId);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`${BASE_API_URL}/api/user/getUser/${comment.userId}`,{
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
  }, [comment]);

  const formatDistance = (date) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const oneWeek = 7 * oneDay;
    const oneMonth = 30 * oneDay;
  
    const diffInMilliseconds = Date.now() - date.getTime();
  
    if (diffInMilliseconds < oneDay) {
      return " today";
    }
    else if(diffInMilliseconds> oneDay && diffInMilliseconds < 2* oneDay){
      return "yesterday";
    }
     else if (diffInMilliseconds < oneWeek  ) {
      return `${Math.floor(diffInMilliseconds / oneDay)} days ago`;
    } 
    else if (diffInMilliseconds < oneMonth) {
      return `${Math.floor(diffInMilliseconds / oneWeek)} weeks ago`;
    } else {
      return `${Math.floor(diffInMilliseconds / oneMonth)} months ago`;
    }
  };

  return (
    <><Box margin="15px">
      <Stack spacing={2} direction="row" alignItems="center">
      <Avatar src={user.profilePicture} alt={user.username} rounded />
      <Typography variant="body2">{user.username}</Typography>
      <Typography  sx={{ color: 'gray', fontSize: '0.75rem' }}>{formatDistance(new Date(comment.createdAt))}</Typography>
      </Stack>
      <Typography variant="body1" marginLeft="55px"color={blue}>{comment.content}</Typography>
      </Box>
      <Divider sx={{ marginTop: '10px', marginBottom: '10px' }}/>
    </>
  );
}

export default CommentSection;
