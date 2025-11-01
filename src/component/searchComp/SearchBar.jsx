import React from "react";
import { TextField, InputAdornment, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBar = ({ searchQuery, setSearchQuery, placeholder = "Search..." }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mb: { xs: 1, sm: 2 },
        width: "100%",
        px: { xs: 1, sm: 0 },
      }}
    >
      <TextField
        size="small"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        sx={{
          width: {
            xs: "100%", // full width on mobile
            sm: 250,
            md: 350,
            lg: 400,
          },
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "&:hover fieldset": {
              borderColor: "primary.main",
            },
          },
          "& .MuiInputBase-input": {
            fontWeight: 500,
            fontSize: {
              xs: "0.6rem", // Mobile
              sm: "0.7rem", // Tablet
              md: "0.85rem", // Desktop
            },
            py: { xs: 0.8, sm: 1 }, // Adjust vertical padding
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                color="primary"
                sx={{
                  fontSize: {
                    xs: "1rem", // Mobile
                    sm: "1.2rem", // Tablet
                    md: "1.4rem", // Desktop
                  },
                }}
              />
            </InputAdornment>
          ),
          endAdornment: searchQuery ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => setSearchQuery("")}
                sx={{
                  p: { xs: 0.3, sm: 0.4, md: 0.5 },
                }}
              >
                <ClearIcon
                  sx={{
                    fontSize: {
                      xs: "1rem",
                      sm: "1.2rem",
                      md: "1.3rem",
                    },
                  }}
                />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
      />
    </Box>
  );
};

export default SearchBar;
