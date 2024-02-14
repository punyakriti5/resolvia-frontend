import React, { useState, useEffect } from "react";
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
import FooterComp from "../components/FooterComp";


function UpdateProfile() {
  const {
    currentUser,
    loading,
    error: errorMessage,
  } = useSelector((state) => state.user);
  const [profileData, setProfileData] = useState({});

  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);

  const [selectedTags, setSelectedTags] = useState([]);
  const dispatch = useDispatch();




  useEffect(() => {
    const getProfileData = async () => {
      try {
        const res = await fetch(`/api/user/getUser/${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setProfileData(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getProfileData();
  }, []);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.id]: e.target.value,
    });
  };

  const handleClick = (tag) => {
    const selectedIndex = selectedTags.indexOf(tag);
    let newSelectedTags = [];

    if (selectedIndex === -1) {
      newSelectedTags = [...selectedTags, tag];
    } else {
      newSelectedTags = [
        ...selectedTags.slice(0, selectedIndex),
        ...selectedTags.slice(selectedIndex + 1),
      ];
    }

    setSelectedTags(newSelectedTags);
    setProfileData({ ...profileData, category: newSelectedTags });
    console.log("profiledata after click", profileData);
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
      console.log("update starting...");
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
              {profileData && (
                <img
                  src={profileData.profilePicture}
                  alt="profile-picture"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
            </Avatar>
            <Typography sx={{ fontWeight: "medium", mt: 2 }}>
              {profileData && profileData.username}
            </Typography>
            <Typography>{profileData && profileData.email}</Typography>
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
                  label={profileData.firstname === "" ? "Firstname" : ""}
                  type="text"
                  size="small"
                  required
                  onChange={handleChange}
                  value={profileData.firstname}
                  sx={{ my: 2 }}
                />

                <TextField
                  id="lastname"
                  label={profileData.firstname === "" ? "Lastname" : ""}
                  type="text"
                  size="small"
                  required
                  onChange={handleChange}
                  value={profileData.lastname}
                  sx={{ mb: 2 }}
                />

                <TextField
                  id="age"
                  label={profileData.age === "" ? "Age" : ""}
                  type="text"
                  size="small"
                  required
                  onChange={handleChange}
                  value={profileData.age}
                  sx={{ mb: 2 }}
                />

                <TextField
                  id="gender"
                  label={profileData.gender === "" ? "Gender" : ""}
                  type="text"
                  size="small"
                  required
                  onChange={handleChange}
                  value={profileData.gender}
                  sx={{ mb: 2 }}
                />

                <TextField
                  id="education"
                  label={profileData.education === "" ? "Education" : ""}
                  type="text"
                  size="small"
                  required
                  onChange={handleChange}
                  value={profileData.education}
                  sx={{ mb: 2 }}
                />

                <TextField
                  id="profession"
                  label={profileData.profession === "" ? "Profession" : ""}
                  type="text"
                  size="small"
                  required
                  onChange={handleChange}
                  value={profileData.profession}
                  sx={{ mb: 2 }}
                />

                <TextField
                  id="country"
                  label={profileData.country === "" ? "Country" : ""}
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

                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  {dataTags.tags.map((tagObject, index) => {
                    const tagLabel = Object.values(tagObject)[0];
                    return (
                      <Grid item xs={2} sm={4} md={4}>
                        <Chip
                          key={index}
                          label={tagLabel}
                          id="category"
                          onClick={() => handleClick(tagLabel)}
                          color={
                            selectedTags.includes(tagLabel)
                              ? "primary"
                              : "default"
                          }
                        />
                      </Grid>
                    );
                  })}
                </Grid>

                <Button type="submit" variant="contained" sx={{ m: 1 }}>
                  {" "}
                  save
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <FooterComp />
    </>
  );
}

export default UpdateProfile;
