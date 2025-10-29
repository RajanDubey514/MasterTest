import React, { useState } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
  IconButton,
} from "@mui/material";

export default function ProfileMenu({ onLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // fake user data
  const user = {
    name: "Rajan Dubey",
    email: "rajan@example.com",
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleChangePassword = () => {
    handleClose();
    alert("Change Password clicked 🛠️");
  };

  const handleLogoutClick = () => {
    handleClose();
    onLogout();
  };

  return (
    <Box>
      <IconButton onClick={handleClick} sx={{ p: 0 }}>
        <Avatar
          alt={user.name}
          src="/fake-profile.jpg" // optional
          sx={{ width: 30, height: 30 }}
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            borderRadius: 2,
            minWidth: 200,
          },
        }}
      >
        {/* User Info */}
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2">{user.name}</Typography>
          <Typography variant="caption" color="text.secondary">
            {user.email}
          </Typography>
        </Box>
        <Divider />

        <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
        <MenuItem onClick={handleLogoutClick} sx={{ color: "error.main" }}>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}
