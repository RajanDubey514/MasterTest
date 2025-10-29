// Login.jsx
import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { alertSuccess } from "../../component/alert/Alert";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .required("Password is required"),
});

const Login = ({ setIsLoggedIn }) => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      // Simulate login & token
      localStorage.setItem("authToken", "fake-jwt-token");
      setIsLoggedIn(true);
      alertSuccess("Login Successful");
    },
  });

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Poppins, sans-serif",
        // background: "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: { xs: "90%", sm: 400 },
          p: 4,
          borderRadius: 4,
          background: "rgba(255, 255, 255, 0.05)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            background: "linear-gradient(45deg, #43cea2, #185a9d)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          Login
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "rgba(255,255,255,0.7)", mb: 2 }}
        >
          Sign in to continue
        </Typography>

        <Divider sx={{ mb: 3, borderColor: "rgba(255,255,255,0.2)" }} />

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            name="email"
            size="small"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: "#7dbaff" }} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2.5, input: { color: "black" } }}
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            name="password"
            type={showPassword ? "text" : "password"}
            size="small"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: "#7dbaff" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{ color: "black" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2.5, input: { color: "black" } }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              py: 1.2,
              fontWeight: "bold",
              fontSize: "1rem",
              background: "linear-gradient(90deg, #43cea2 0%, #185a9d 100%)",
              borderRadius: "10px",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(67, 206, 162, 0.4)",
              },
            }}
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
