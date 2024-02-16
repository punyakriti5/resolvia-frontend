import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Avatar,
  Box,
  Button,
  Container,
  Chip,
  Input,
  Stack,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import dataTags from "../data/tags.json";
import Navbar from "../components/Navbar";
import FooterComp from "../components/FooterComp";
import update from "../assets/updateProfile.jpg";
import { BASE_API_URL } from "../constants";

function UpdateProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [profileData, setProfileData] = useState({});
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState([]);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const res = await fetch(
          `${BASE_API_URL}/api/user/getUser/${currentUser._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
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

  useEffect(() => {
    const getProfilePhotoUrl = async () => {
      const form = new FormData();
      form.append("photo", profilePhoto);
      try {
        const res = await fetch(`${BASE_API_URL}/api/user/uploadPhoto`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: form,
        });
        const data = await res.json();
        if (res.ok) {
          setProfileData(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getProfilePhotoUrl();
  }, [profilePhoto]);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch(
        `${BASE_API_URL}/api/user/update/${currentUser._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(profileData),
        }
      );
      const data = await res.json();
      console.log("data", data);
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        setProfileData(data);
        navigate(`/user-profile/${currentUser._id}`);
      }
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
            <Input
              accept="image/*"
              style={{ display: "none" }}
              id="profilePicture"
              type="file"
              onChange={(e) => setProfilePhoto(e.target.files[0])}
            />
            <Stack direction="row" ml={4}>
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
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </Avatar>
              <label htmlFor="profilePicture">
                <IconButton color="primary" component="span">
                  <EditIcon fontSize="md" />
                </IconButton>
              </label>
            </Stack>
            <Typography sx={{ fontWeight: "medium", mt: 2 }}>
              {profileData && profileData.firstname
                ? profileData.firstname + " " + profileData.lastname
                : profileData.username}
            </Typography>
            <Typography>{profileData && profileData.email}</Typography>
          </Box>
          <Box
            component="img"
            sx={{
              height: 310,
              width: 300,
              mx: "15%",
            }}
            alt="update your profile"
            src={update}
          />
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

                {/* <Button type="submit" variant="contained" sx={{ m: 1 }}>
                  {" "}
                  save
                </Button> */}
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
                    mb: 1.5,
                  }}
                >
                  Add your interests
                </Typography>

                <Container style={{ maxHeight: "380px", overflow: "auto" }}>
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
                </Container>

                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
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
