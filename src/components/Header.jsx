import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../firebase";

export default function Header() {
  const theme = useTheme();
  const { user, signOut } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  function handleProfileMenuOpen(e) {
    setAnchorEl(e.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  async function logout() {
    await signOut();
    navigate("/login");
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id="user-profile-menu"
      keepMounted
      transformOrigin={{
        horizontal: "left",
        vertical: "top",
      }}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <AppBar color="inherit">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography
            component={"h1"}
            variant="h5"
            sx={{ fontWeight: "700", color: theme.palette.secondary.dark }}
          >
            TODO
          </Typography>
        </Box>
        {user ? (
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleProfileMenuOpen}
          >
            {user?.displayName ?? user?.email.split("@")[0]}
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )}
      </Toolbar>
      {renderMenu}
    </AppBar>
  );
}
