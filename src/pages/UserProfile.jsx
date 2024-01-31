import React from "react";
import { useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { blue } from "@mui/material/colors";
import SchoolIcon from "@mui/icons-material/School";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BadgeIcon from "@mui/icons-material/Badge";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

function UserProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <Navbar />
      <Grid container spacing={2} sx={{ mt: 8 }}>
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
              A
            </Avatar>
            <Typography sx={{ fontWeight: "medium", mt: 2 }}>
              username
            </Typography>
            <Typography>user email id</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
            <Paper>
          <Box display="flex" flexDirection="column" alignItems="center" p={2}>
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
                <BadgeIcon fontSize="medium" sx={{color: (theme) => theme.palette.grey[500],}}/>
              </Tooltip>
              {/* <Typography>`${currentUser.firstName} ${currentUser.lastName}`</Typography> */}
             
              <Typography > FullName</Typography>
             
          </Box>

            <Box display="flex" flexDirection="row" alignItems="center">
              <Tooltip title="Education" placement="left-start" arrow>
                <SchoolIcon fontSize="medium" sx={{color: (theme) => theme.palette.grey[500],}} />
              </Tooltip>
              {/* <Typography>{currentUser.education}</Typography> */}
            
              <Typography > Education</Typography>
             
            </Box>

            <Box display="flex" flexDirection="row" alignItems="center">
              <Tooltip title="Profession" placement="left-start" arrow>
                <BusinessCenterIcon fontSize="medium" sx={{color: (theme) => theme.palette.grey[500],}}/>
              </Tooltip>
              
              <Typography > Profession</Typography>
             
            </Box>

            <Box display="flex" flexDirection="row" alignItems="center"  >
            
              <Tooltip title="Country" placement="left-start" arrow>
                <LocationOnIcon fontSize="medium" sx={{color: (theme) => theme.palette.grey[500],}}/>
              </Tooltip>
             
              <Typography > Country</Typography>
            
            </Box>
          </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
            <Paper>
          <Box display="flex" flexDirection="column" alignItems="center" p={2}>
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
          </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default UserProfile;
