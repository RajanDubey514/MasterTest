import React, { useState } from "react";
import {
  Box,
  IconButton,
  Badge,
  Popover,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";

const Notificationmenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  // Fake notifications
  const notifications = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    message: `Notification ${i + 1}: This is a sample alert message.`,
  }));

  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box>
      {/* 🔔 Notification Icon */}
     <IconButton
            color="inherit"
            onClick={handleClick}
            sx={{ p: 0.5 }} // smaller padding
            >
            <Badge
                badgeContent={notifications.length}
                color="error"
                sx={{
                "& .MuiBadge-badge": {
                    fontSize: "0.65rem",
                    height: 16,
                    minWidth: 16,
                },
                }}
            >
                <NotificationsIcon sx={{ fontSize: "18px" }} />
            </Badge>
            </IconButton>

      {/* 🧭 Popover Notification List */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            width: 320,
            maxHeight: 200,
            overflowY: "auto",
            borderRadius: 2,
            boxShadow: 3,
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1.5,
            borderBottom: "1px solid #eee",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Notifications
          </Typography>
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* List of Notifications */}
        <List dense>
          {notifications.map((notif) => (
            <ListItem
              key={notif.id}
              sx={{
                borderBottom: "1px solid #f0f0f0",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <ListItemText primary={notif.message} />
            </ListItem>
          ))}
        </List>
      </Popover>
    </Box>
  );
};

export default Notificationmenu;

