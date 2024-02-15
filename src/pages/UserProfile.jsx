import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import FooterComp from "../components/FooterComp";
import { blue } from "@mui/material/colors";
import SchoolIcon from "@mui/icons-material/School";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BadgeIcon from "@mui/icons-material/Badge";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { Button } from "react-bootstrap";
import { BASE_API_URL } from "../constants";

function UserProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [userData, setUserData] = useState({});
 
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await fetch(`${BASE_API_URL}/api/user/getUser/${currentUser._id}`,{
          credentials:"include",
        });
        const data = await res.json();
        if (res.ok) {
          setUserData(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUserData();
  }, []);

  console.log(userData,"userData");
  return (
    <>
      <Navbar />
      <Grid container spacing={2} sx={{ mt: 8, mb:22 }}>
        <Grid item xs={12} md={4} lg={4}>
          <Box display="flex" flexDirection="column" alignItems="center" p={2}>
            <Avatar
              sx={{
                bgcolor: blue[100],
                height: "120px",
                width: "120px",
                mt: 1,
              }}
              aria-label="resolve"
            >
              {userData && (
                <img
                  src={userData.profilePicture}
                  alt="profile-picture"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
            </Avatar>
            <Typography sx={{ fontWeight: "medium", mt: 2 }}>
              {userData && userData.username}
            </Typography>
            <Typography> {userData && userData.email}</Typography>
            <Link to='/update-profile'>
            <Button variant="contained"> Update your profile</Button>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              p={2}
            >
              <Typography
                variant="body1"
                color="#034f84"
                sx={{
                  textAlign: "center",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                Highlights
              </Typography>
              <Divider />
              <Box display="flex" flexDirection="row" alignItems="center">
                <Tooltip title="Fullname" placement="left-start" arrow>
                  <BadgeIcon
                    fontSize="medium"
                    sx={{ color: (theme) => theme.palette.grey[500] }}
                  />
                </Tooltip>
                {/* <Typography>`${currentUser.firstName} ${currentUser.lastName}`</Typography> */}

                <Typography>
                  {" "}
                  {userData && userData.firstname}{" "}
                  {userData && userData.lastname}
                </Typography>
              </Box>

              <Box display="flex" flexDirection="row" alignItems="center">
                <Tooltip title="Education" placement="left-start" arrow>
                  <SchoolIcon
                    fontSize="medium"
                    sx={{ color: (theme) => theme.palette.grey[500] }}
                  />
                </Tooltip>
                {/* <Typography>{currentUser.education}</Typography> */}

                <Typography> {userData && userData.education}</Typography>
              </Box>

              <Box display="flex" flexDirection="row" alignItems="center">
                <Tooltip title="Profession" placement="left-start" arrow>
                  <BusinessCenterIcon
                    fontSize="medium"
                    sx={{ color: (theme) => theme.palette.grey[500] }}
                  />
                </Tooltip>

                <Typography> {userData && userData.profession}</Typography>
              </Box>

              <Box display="flex" flexDirection="row" alignItems="center">
                <Tooltip title="Country" placement="left-start" arrow>
                  <LocationOnIcon
                    fontSize="medium"
                    sx={{ color: (theme) => theme.palette.grey[500] }}
                  />
                </Tooltip>

                <Typography> {userData && userData.country}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
  <Paper>
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={2}
    >
      <Typography
        variant="body1"
        color="#034f84"
        sx={{
          textAlign: "center",
          textTransform: "capitalize",
          fontWeight: "bold",
        }}
      >
        Your interests
      </Typography>
      <Divider />
      {userData && userData.category && userData.category.map(category => (
        <p key={category}>{category}</p>
      ))}
    </Box>
  </Paper>
</Grid>
      </Grid>
      <FooterComp/>
    </>
  );
}

export default UserProfile;
