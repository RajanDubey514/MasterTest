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
        mb: 1,
        width: "100%",
      }}
    >
      <TextField
        size="small"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        sx={{
          width: { xs: "100%", sm: 250, md: 350 },
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "&:hover fieldset": {
              borderColor: "primary.main",
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
          endAdornment: searchQuery ? (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => setSearchQuery("")}>
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
      />
    </Box>
  );
};

export default SearchBar;
