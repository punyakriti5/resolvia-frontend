import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import Navbar from "../components/Navbar";

import { useDispatch, useSelector } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../features/user/userSlice";
import dataTags from "../data/tags.json";

function UpdateProfile() {
  const [profileData, setProfileData] = useState({});
  const {
    currentUser,
    loading,
    error: errorMessage,
  } = useSelector((state) => state.user);

  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setProfileData({
      ...currentUser,
      ...profileData,
      [e.target.id]: e.target.value,
    });
  };

  console.log(" before currentUser", currentUser);

  const handleTagClick = (tagValue) => {
    console.log("currentUser", currentUser);
    if (currentUser.category.includes(tagValue)) {
      const updatedCategory = currentUser.category.filter(
        (value) => value !== tagValue
      );

      setProfileData((prevState) => ({
        ...prevState,
        category: updatedCategory,
      }));
    } else {
      const updatedCategory = [...currentUser.category, tagValue];
      setProfileData((prevState) => ({
        ...prevState,
        category: updatedCategory,
      }));
    }
    console.log("after click currentUser", currentUser);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(profileData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });
      const data = await res.json();
      console.log("data", data);
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
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
              {currentUser && currentUser.username}
            </Typography>
            <Typography>{currentUser && currentUser.email}</Typography>
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
                  value={profileData.firstname}
                  sx={{ my: 2 }}
                />

                <TextField
                  id="lastname"
                  label="Lastname"
                  type="text"
                  size="small"
                  required
                  onChange={handleChange}
                  value={profileData.lastname}
                  sx={{ mb: 2 }}
                />

                <TextField
                  id="age"
                  label="Age"
                  type="text"
                  size="small"
                  required
                  onChange={handleChange}
                  value={profileData.age}
                  sx={{ mb: 2 }}
                />

                <TextField
                  id="gender"
                  label="Gender"
                  type="text"
                  size="small"
                  required
                  onChange={handleChange}
                  value={profileData.gender}
                  sx={{ mb: 2 }}
                />

                <TextField
                  id="education"
                  label="Education"
                  type="text"
                  size="small"
                  required
                  onChange={handleChange}
                  value={profileData.education}
                  sx={{ mb: 2 }}
                />

                <TextField
                  id="profession"
                  label="Profession"
                  type="text"
                  size="small"
                  required
                  onChange={handleChange}
                  value={profileData.profession}
                  sx={{ mb: 2 }}
                />

                <TextField
                  id="country"
                  label="Country"
                  type="text"
                  size="small"
                  required
                  onChange={handleChange}
                  value={profileData.country}
                  sx={{ mb: 2 }}
                />

                <Button type="submit" variant="contained" sx={{ m: 1 }}>
                  {" "}
                  save
                </Button>
              </Box>
            </form>
          </Paper>
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
                  Add your interests
                </Typography>

                {dataTags.tags.map((tagObject, index) => {
                  const tagValue = Object.values(tagObject)[0];
                  return (
                    <Chip
                      key={index}
                      label={tagValue}
                      id="category"
                      onClick={() => handleTagClick(tagValue)}
                      selected={currentUser.category.includes(tagValue)}
                    />
                  );
                })}

                <Button type="submit" variant="contained" sx={{ m: 1 }}>
                  {" "}
                  save
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default UpdateProfile;
