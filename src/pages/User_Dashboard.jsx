import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Box, Container, Grid, useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../components/Navbar";
import CardComp from "../components/CardComp";
import MyResolveComp from "../components/MyResolveComp";
import SortingComp from "../components/SortingComp";

function User_Dashboard() {
  const matches = useMediaQuery("(min-width:960px)");
  const { userId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [feedResolve, setFeedResolve] = useState([]);
  const navigate = useNavigate();
  const [errorFeed, setErrorFeed] = useState(false);
  const [loading, setLoading] = useState(true);
  //const [startIndex, setStartIndex]=useState(0);
  //const [isIntersecting, setIsIntersecting] = useState(false);
  //const [page, setPage] = useState(0);
  const observerRef = useRef(null);
  const resolvePerPage = 2;
  let startIndex=0;

  useEffect(() => {
    const fetchInitialResolve = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/resolve/getresolves?startIndex=0&limit=${resolvePerPage}`
        );
        const data = await res.json();
        console.log("response initialdata", data);
        if (res.ok) {
          setLoading(false);
          setFeedResolve(data.resolves);
          console.log("initialdata", feedResolve);
        }
      } catch (error) {
        setLoading(false);
        setErrorFeed(error.message);
      }
    };
    fetchInitialResolve();
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        console.log("entries", entries);
        entries.forEach((entry) => {
          console.log("entry", entry);
          if (entry.isIntersecting) {
            const fetchNextResolve = async () => {
              //setStartIndex(startIndex+ 2);
              startIndex +=2;
              console.log("startIndex", startIndex);
              setLoading(true);
              try {
                const res = await fetch(
                  `/api/resolve/getresolves?startIndex=${startIndex}&limit=${resolvePerPage}`
                );
                const data = await res.json();
                if (res.ok) {
                  setLoading(false);
                  setFeedResolve((prevFeedResolve) => [
                    ...prevFeedResolve,
                    ...data.resolves,
                  ]);
                }
              } catch (error) {
                setLoading(false);
                setErrorFeed(error.message);
              }
            };
            fetchNextResolve();
          }
        });
      },
      { threshold: 0.5 }
    );

    const card = document.getElementById("cardEnd");
    if (card) {
      observerRef.current.observe(card);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleLike = async (resolveId) => {
    try {
      if (!currentUser) {
        navigate("/login");
        return;
      }

      const res = await fetch(`/api/resolve/likeResolve/${resolveId}`, {
        method: "PUT",
      });
      console.log("response:", res);
      const data = await res.json();
      console.log("likesData", data);

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

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Navbar />
        <Box
          sx={{
            maxWidth: 450,
            minWidth: 350,
            width: "45vw",

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
                  <CardComp
                    id="card"
                    key={resolve._id}
                    resolve={resolve}
                    onLike={handleLike}
                    observerRef={observerRef}
                  />
                ))}
                <div id="cardEnd"></div>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default User_Dashboard;

// useEffect(() => {
//   const fetchResolves = async () => {
//     try {
//       const res = await fetch(`/api/resolve/getresolves`);
//       const data = await res.json();
//       if (res.ok) {
//         setFeedResolve(data.resolves);
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//     fetchResolves();

// }, []);
