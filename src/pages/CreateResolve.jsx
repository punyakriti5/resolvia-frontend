import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Grid,
  Select,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import imgMen from "../assets/workingMen.webp";
import AddMedia from "../components/AddMedia";

function CreateResolve() {
  const [resolveData, setResolveData]= useState({});
  const [role, setRole] = useState("");
  const handleChange = (e) => {
    setRole(e.target.value);
  };
  const handleSubmit= async(e) => {
    e.preventDefault();
  }
  return (
    <>
      <Navbar />
      <Grid container spacing={2}>
        <Grid item xs={8} sx={{ mt: 10 }}>
          <form onSubmit={handleSubmit}>
          <Typography
            variant="body1"
            paddingLeft="15px"
            sx={{ fontWeight: "bold" }}
          >
            Get you query resolved here :
          </Typography>
          <Stack spacing={2} direction="row">
            <Typography
              variant="body1"
              padding="15px"
              sx={{ fontWeight: "normal", mt: 10 }}
            >
              {" "}
              username{" "}
            </Typography>

            <FormControl variant="standard" size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="sortBy">Post as : </InputLabel>
              <Select
                labelId="post as"
                id="postAsOptions"
                value={role}
                onChange={handleChange}
              >
                <MenuItem>Abishek</MenuItem>
                <MenuItem>Anonymous</MenuItem>
              </Select>
            </FormControl>
            <AddMedia />
          </Stack>
          <TextField
            fullWidth
            label="add your question title"
            id="title"
            sx={{ m: 1, bgcolor:"#bed8ec" }}
          />
          <TextField
            fullWidth
            label="add relatable tags"
            id="tags"
            sx={{ m: 1, bgcolor:"#bed8ec" }}
          />

          <TextField
            fullWidth
            label="add your question here ..."
            id="query"
            sx={{ m: 1, bgcolor:"#bed8ec" }}
            multiline
            rows={8}
          />
          <Button variant="contained" sx={{m:1}}> Post</Button>
          </form>
        </Grid>
        <Grid item xs={4} sx={{ mt: 10 }}>
          <Stack>
            <Typography variant="h5"> The smart ones ask when they don't know, and sometimes when they do !</Typography>
            <Box
              component='img'
            sx={{
              width: "30vw", height :"70vh"
            }}
              alt='Men asking his query from Resolvia'
              src={imgMen}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default CreateResolve;
