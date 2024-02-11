import React,{useState, useEffect} from "react";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
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

function CardComp({resolve, onLike}) {
  console.log("resolve in card comp",resolve)
  const { currentUser } = useSelector((state) => state.user);
  const [showMore, setShowMore] = useState(true);
  const [feedResolve, setFeedResolve] = useState([]);
  const [errorFeed,setErrorFeed] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [user, setUser] = useState({});
 

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/getUser/${resolve.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [feedResolve]);


   console.log('feedResolve', feedResolve)
  return (
    <>
    
      <Card
        sx={{
          maxWidth: 700,
          my: 4,
          mx: "auto",
          border: 1,
          borderColor: "primary.main",
          boxShadow: 3,
        }}
      >
        <CardHeader
         avatar={
          <Avatar alt="user" img={resolve && resolve.post_as === 'anonymous' ? 'https://i.pinimg.com/originals/07/66/d1/0766d183119ff92920403eb7ae566a85.png' : user.profilePicture} rounded /> 
        }
          title={resolve && resolve.post_as === 'anonymous' ? 'anonymous' : user.username}
          subheader={
            resolve &&
            new Date(resolve.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          }
        />
        <CardContent>
          <Typography variant="body2" color="text.primary">
            {resolve.title}
          </Typography>
          <Typography sx={{ my: 1 }} variant="body2" color="text.secondary">
            #artificialintelligence #artificialIntelligencedevelopment{" "}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {resolve.content}
          </Typography>
        </CardContent>

        <CardMedia
          component="img"
          height="300"
          sx={{ px : 2,}}
          image="https://www.simplilearn.com/ice9/free_resources_article_thumb/Types_of_Artificial_Intelligence.jpg"
          alt="Artificial Intelligence"
        />
        <CardActions>
          <Button size="small" variant="outlined" sx={{ height: 30 , margin:1}}>
            <IconButton aria-label="upvote" sx={{ cursor: "pointer" }} onClick={() => onLike(resolve._id)}>
              <ThumbUpOutlinedIcon />
            </IconButton>
            <Typography textTransform={"lowercase"}>{resolve && resolve.numberOfLikes}</Typography>
          </Button>
          <Button size="small" variant="outlined" sx={{ height: 30 ,  margin:1}}>
            <IconButton aria-label="downvote" sx={{ cursor: "pointer" }}>
              <ThumbDownOutlinedIcon />
            </IconButton>
          </Button>
          <Link to={`/resolve/${resolve.slug}`}>
          <Button variant="contained" sx={{ height: 30, cursor: "pointer" }}>
            learn more
          </Button>
          </Link>
        </CardActions>
      </Card>
       
    </>
  );
}
export default CardComp;
