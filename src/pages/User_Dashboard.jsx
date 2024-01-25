import React from "react";
import { Box, Container, Drawer } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../components/Navbar";
import CardComp from "../components/CardComp";
import MyResolveComp from "../components/MyResolveComp";
import SortingComp from "../components/SortingComp";
import { useParams } from "react-router-dom";

const drawerWidth = 300;
function User_Dashboard() {
  const params = useParams();

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Navbar />

        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Navbar />
          <Box sx={{ overflow: "auto" }}>
            <MyResolveComp />
          </Box>
        </Drawer>

        <Container sx={{ mt: 10 }}>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Navbar />
            <SortingComp />
            <CardComp />
          </Box>
        </Container>
      </Box>

      {/* <h6>{params.userName}</h6> */}
    </>
  );
}
export default User_Dashboard;
