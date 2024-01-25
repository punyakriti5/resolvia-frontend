import React, { useState } from "react";
import "./login.css";
import logo from "../assets/app-logo.png";
import GoogleIcon from "@mui/icons-material/Google";
import {
  Button,
  Typography,
  Stack,
  Box,
  Container,
  TextField,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";


function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('http://localhost:3001/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok) {
        navigate('/about');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <>
      <main>
        <Container className="App">
          <div className="form">
            <form onSubmit={handleSubmit}>
              <Box
                component="img"
                sx={{
                  height: 65,
                  width: 65,
                }}
                alt="Logo"
                src={logo}
              />
              <Stack spacing={2}>
                <Link to="/" id="logo-name">
                  RESOLVIA
                </Link>
                <Typography variant="body1">
                  {" "}
                  Create your account here
                </Typography>

                <TextField
                  id="username"
                  label="Username"
                  type="text"
                  size="small"
                  required
                  onChange={handleChange}
                />
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  size="small"
                  required
                  onChange={handleChange}
                />
                <TextField
                  id="mobileNum"
                  label="MobileNumber"
                  type="text"
                  size="small"
                  required
                  onChange={handleChange}
                />
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  size="small"
                  required
                  onChange={handleChange}
                />

                <Button
                  variant="contained"
                  type="submit"
                  sx={{ textTransform: "capitalize" }}
                >
                  Signup
                </Button>
                <Button
                  variant="outlined"
                  type="link"
                  sx={{ textTransform: "capitalize" }}
                  startIcon={<GoogleIcon />}
                >
                  Signup with Google
                </Button>
                <Typography variant="body2">
                  {" "}
                  Already have an account ? <Link to="/login">Login</Link>
                </Typography>
              </Stack>
            </form>
          </div>
        </Container>
      </main>
    </>
  );
}

export default SignUp;
