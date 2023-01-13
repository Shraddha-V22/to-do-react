import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useTheme } from "@mui/material";
import { useAuth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { signUp } = useAuth();

  async function registerUser(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    await signUp(data.get("email"), data.get("password"), data.get("name"));
    navigate("/login");
  }

  return (
    <Container
      component={"main"}
      maxWidth="xs"
      sx={{
        backgroundColor: theme.palette.common.white,
        padding: "0.2rem 0 2rem 0",
        borderRadius: 2,
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          mt: theme.spacing(4),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            m: 1,
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component={"h1"} variant="h5">
          Sign Up
        </Typography>
        <form
          onSubmit={registerUser}
          sx={{
            width: "100%",
            mt: 1,
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            name="name"
            autoFocus
            autoComplete="given-name"
            type="text"
            label="Name"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            autoFocus
            autoComplete="off"
            type="email"
            label="Email"
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            autoFocus
            autoComplete="current-password"
            type="password"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            sx={{
              margin: theme.spacing(3, 0),
            }}
          >
            Register
          </Button>
        </form>
      </Box>
      <Link href="/login">Already have an account? Sign In</Link>
    </Container>
  );
}
