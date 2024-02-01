import React from "react";
import { Box, Container, Grid, Typography,useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../components/Navbar";
import CardComp from "../components/CardComp";
import MyResolveComp from "../components/MyResolveComp";
import SortingComp from "../components/SortingComp";

function User_Dashboard() {
  const matches = useMediaQuery("(min-width:960px)");

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
            <CardComp />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </Box>

    </>
  );
}

export default User_Dashboard;

