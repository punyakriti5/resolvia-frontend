import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import TileComp from "../components/TileComp";

function SetupProfile() {
  const [profileData, setProfileData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("http://localhost:3001/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

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
            <form onSubmit={handleSubmit}>
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
                    fontWeight: "bold",
                  }}
                >
                  Profile settings
                </Typography>
                <TextField
                  id="firstname"
                  label="Firstname"
                  type="text"
                  size="small"
                  required
                  onChange={handleChange}
                  sx={{ my: 2 }}
                />

                <TextField
                  id="lastname"
                  label="Lastname"
                  type="text"
                  size="small"
                  required
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />

                <TextField
                  id="age"
                  label="Age"
                  type="text"
                  size="small"
                  required
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  id="gender"
                  label="Gender"
                  type="text"
                  size="small"
                  required
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  id="education"
                  label="Education"
                  type="text"
                  size="small"
                  required
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  id="profession"
                  label="Profession"
                  type="text"
                  size="small"
                  required
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  id="country"
                  label="Country"
                  type="text"
                  size="small"
                  required
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" sx={{ m: 1 }}>
                  {" "}
                  save
                </Button>
              </Box>
            </form>
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
              {" "}
              <Typography
                variant="body1"
                color="#034f84"
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Add your interests
              </Typography>
              <TileComp />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default SetupProfile;
