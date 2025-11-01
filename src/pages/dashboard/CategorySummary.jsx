// src/pages/CategorySummary.js
import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import DevicesIcon from "@mui/icons-material/Devices";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import WeekendIcon from "@mui/icons-material/Weekend";
import ToysIcon from "@mui/icons-material/Toys";

const categories = [
  { name: "Electronics", value: 400, icon: <DevicesIcon />, color: "#1976d2" },
  { name: "Fashion", value: 300, icon: <CheckroomIcon />, color: "#e91e63" },
  { name: "Groceries", value: 300, icon: <LocalGroceryStoreIcon />, color: "#4caf50" },
  { name: "Furniture", value: 200, icon: <WeekendIcon />, color: "#ff9800" },
  { name: "Toys", value: 150, icon: <ToysIcon />, color: "#9c27b0" },
];

const CategorySummary = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        justifyContent: "space-between",
        mb: 1,
      }}
    >
      {categories.map((cat) => (
        <Box
          key={cat.name}
          sx={{
            flex: "1 1 180px",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            bgcolor: "#fff",
            borderRadius: 2,
            boxShadow: 2,
            p: 2,
            transition: "all 0.3s ease",
            "&:hover": { transform: "scale(1.03)", boxShadow: 4 },
          }}
        >
          <Box
            sx={{
              backgroundColor: cat.color,
              width: 36,
              height: 36,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            {cat.icon}
          </Box>
          <Box>
            <Typography variant="p" fontWeight={600}>
              {cat.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {cat.value}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CategorySummary;
