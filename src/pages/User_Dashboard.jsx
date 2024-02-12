import React,{useState,useEffect, useRef} from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

import { Box, Container, Grid, useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../components/Navbar";
import CardComp from "../components/CardComp";
import MyResolveComp from "../components/MyResolveComp";
import SortingComp from "../components/SortingComp";

function User_Dashboard() {
  const matches = useMediaQuery("(min-width:960px)");
  const {userId} = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [feedResolve, setFeedResolve] = useState([]);
  const navigate = useNavigate();
  const [errorFeed,setErrorFeed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(true);

  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log("before set", isIntersecting)
          setIsIntersecting(entry.isIntersecting)
          console.log("after set", isIntersecting)
          if (entry.isIntersecting) {
            // Handle the entry, e.g., trigger rendering
            entry.target.dataset.visible = true;
          }
        });
      },
      { threshold: 0.5 } // Trigger when 20% of the element is visible
    );

    return () => {
      observerRef.current.disconnect();
    };
  }, []);


  useEffect(() => {
    const fetchAllResolve = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/resolve/getresolves`
        );
        const data = await res.json();
        if (res.ok) {
          setLoading(false);
          setFeedResolve(data.resolves);
        
          // if (data.feedResolve.length < 10) {
          //   setShowMore(false);
          // }

          // Connect intersection observer to CardComp elements

          const observeCard = (cardRef) => {
            if (cardRef) {
              observerRef.current.observe(cardRef);
            }
          };

          feedResolve.forEach((resolve) => {
            const cardRef =  document.getElementById(`card-${resolve._id}`);
            console.log("cardREf",cardRef)
            observeCard(cardRef);
          });

        }
      } catch (error) {
        setLoading(false);
        setErrorFeed(error.message);
      }
    };

    fetchAllResolve();
  }, []);

  const handleLike = async (resolveId) => {
    try {
      if (!currentUser) {
        navigate('/login');
        return;
      }

      console.log('currentUser:', currentUser);
      console.log('resolveId:', resolveId);

      const res = await fetch(`/api/resolve/likeResolve/${resolveId}`, {
        method: 'PUT',
      });
      console.log('response:', res);
      const data = await res.json();
      console.log('likesData', data);

      if (res.ok) {
        setFeedResolve(
          feedResolve.map((resolve) =>
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

  console.log("feedResolve", feedResolve)
  return (
    <> 
    <Box sx={{ display: "flex" }}>
    <CssBaseline />
    <Navbar />
    <Box
      sx={{
       
        maxWidth: 450,
        minWidth: 350,
        width:"45vw",
       
        position: "sticky",
        top: 0, 
        overflowY: "auto",
        boxShadow: 3,
      }}
    >
      <MyResolveComp />
    </Box>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={4}>
            <SortingComp />
          </Grid>
          <Grid item xs={12}>
          {feedResolve.map((resolve) => (
            <CardComp   key={resolve._id}
            resolve={resolve} onLike={handleLike} observerRef={observerRef}
            isIntersecting={isIntersecting}/>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  </Box>
    </>
  );
}

export default User_Dashboard;

